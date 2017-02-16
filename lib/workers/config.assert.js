'use strict'
const keypather = require('keypather')()
const omitDeep = require('omit-deep')
const pick = require('101/pick')
const Promise = require('bluebird')

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
    return {
      configs: {}
    }
  }

  _returnParentConfig (namespaceNotFoundErr) {
    this.log.trace('_returnParentConfig called', { namespaceNotFoundErr })
    return namespaceNotFoundErr.parentConfig
  }

  _mergeConfigs (configs) {
    this.log.trace('_mergeConfigs called', { configs })
    return Object.assign({}, configs.configs, this.job.configs)
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

      const services = Object.keys(configs.services).reduce((out, name) => {
        out[name] = configs.services[name]
        keypather.set(out[name], 'spec.type', 'NodePort')
        return out
      }, {})

      return Object.assign({}, configs, { services })
    })
  }

  _overrideDeploys (configs) {
    this.log.trace('_overrideDeploys called', { configs })
    return configs
  }

  /**
   * @param  {database.Config.Configs} configs
   * @return {database.Config} saved config
   */
  _saveJsonConfig (configs) {
    this.log.trace('_saveJsonConfig called', { configs })
    return database.saveJsonConfig({
      configId: this.job.configId,
      namespace: this.job.namespace,
      configs: configs
    })
  }

  _publishConfigApply (configs) {
    this.log.trace('_publishConfigApply called', { configs })
    publisher.publishTask('config.apply', configs)
  }
}
