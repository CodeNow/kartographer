'use strict'
const keypather = require('keypather')()
const merge = require('deepmerge')
const omitDeep = require('omit-deep')
const pick = require('101/pick')
const Promise = require('bluebird')
const traverse = require('traverse')

const database = require('external/database.js')
const logger = require('logger.js')
const publisher = require('external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({
      job,
      queue: 'config.assert'
    })
  }

  run () {
    return database.getConfigsByIdAndNamespace(this.job.configId, this.job.namespace).bind(this)
      .catch(database.ConfigNotFound, this._returnEmpty)
      .catch(database.NamespaceNotFound, this._returnParentConfig)
      .then(this._mergeConfigs)
      .then(this._removeUnsupportedKinds)
      .then(this._removeUsupportedKeys)
      .then(this._overrideServices)
      .then(this._overrideDeploys)
      .then(this._saveJsonConfig)
      .then(this._publishConfigApply)
  }

  _returnEmpty () {
    this.log.trace('_returnEmpty called')
    return {}
  }

  _returnParentConfig (namespaceNotFoundErr) {
    this.log.trace('_returnParentConfig called', { namespaceNotFoundErr })
    return namespaceNotFoundErr.parentConfig
  }

  _mergeConfigs (configs) {
    this.log.trace('_mergeConfigs called', { configs })
    return merge(configs, this.job.configs, { clone: true })
  }

  _removeUnsupportedKinds (configs) {
    this.log.trace('_removeUnsupportedKinds called', { configs })
    return Promise.try(() => {
      return pick(configs, ['deployments', 'pods', 'replicaSets', 'replicationControllers', 'services'])
    })
  }

  _removeUsupportedKeys (configs) {
    this.log.trace('_removeUsupportedKeys called', { configs })
    return Promise.try(() => {
      return omitDeep(configs, ['annotations', 'resources', 'volumes', 'volumeMounts'])
    })
  }

  _overrideServices (configs) {
    this.log.trace('_overrideServices called', { configs })
    return Promise.try(() => {
      if (!configs.services) {
        return configs
      }
      const outConfigs = Object.assign({}, configs)

      Object.keys(outConfigs.services).forEach((name) => {
        keypather.set(configs.services[name], 'spec.type', 'NodePort')
      })

      return outConfigs
    })
  }

  _overrideDeploys (configs) {
    this.log.trace('_overrideDeploys called', { configs })
    return Promise.try(() => {
      return traverse(configs).map(function (key) {
        if (this.key === 'restartPolicy') {
          this.update('Never')
        }

        if (this.key === 'replicas') {
          this.update(1)
        }
      })
    })
  }

  /**
   * @param  {database.Config.Configs} configs
   * @return {database.Config} saved config
   */
  _saveJsonConfig (configs) {
    this.log.trace('_saveJsonConfig called', { configs })
    return database.saveJsonConfig(this.job.configId, this.job.namespace, configs)
  }

  _publishConfigApply (configs) {
    this.log.trace('_publishConfigApply called', { configs })
    publisher.publishTask('config.apply', {
      configId: this.job.configId,
      namespace: this.job.namespace,
      configs: configs
    })
  }
}
