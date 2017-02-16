'use strict'
const omitDeep = require('omit-deep')
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
      // .then(this._removeUsupportedKinds)
      .then(this._removeUsupportedKeys)
      // .then(this._overrideServices)
      // .then(this._overrideDeploys)
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

  _mergeConfigs (savedConfig) {
    this.log.trace('_mergeConfigs called', { savedConfig })
    return Object.assign({}, savedConfig.configs, this.job.configs)
  }

  _removeUsupportedKeys (config) {
    this.log.trace('_removeUsupportedKeys called', { config })
    return Promise.try(() => {
      return omitDeep(config, ['annotations', 'resources', 'volumes', 'volumeMounts'])
    })
  }

  /**
   * @param  {database.Config.Configs} newConfigs
   * @return {database.Config} saved config
   */
  _saveJsonConfig (newConfigs) {
    this.log.trace('_saveJsonConfig called', { newConfigs })
    return database.saveJsonConfig({
      configId: this.job.configId,
      namespace: this.job.namespace,
      configs: newConfigs
    })
  }

  _publishConfigApply (config) {
    this.log.trace('_publishConfigApply called', { config })
    publisher.publishTask('config.apply', config)
  }
}
