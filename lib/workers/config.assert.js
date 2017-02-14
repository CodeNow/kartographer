'use strict'

const logger = require('logger.js')
const database = require('external/database.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({
      // job,
      queue: 'config.assert'
    })
  }

  run () {
    return database.getConfigsByIdAndNamespace(this.job.configId, this.job.namespace).bind(this)
      .catch(database.ConfigNotFound, this._returnEmpty)
      .catch(database.NamespaceNotFound, this._returnParentConfig)
      .then(this._mergeConfigs)
      // .then(_removeUsupportedKeys)
      // .then(_addRequiredKeys)
      .then(this._saveJsonConfig)
      // .then(_publishConfigApply)
  }

  _returnEmpty () {
    this.log.trace('_returnEmpty called')
    return {
      configId: this.job.configId,
      namespace: this.job.namespace,
      configs: {}
    }
  }

  _mergeConfigs (savedConfig) {
    this.log.trace('_mergeConfigs called', { savedConfig })
    return Object.assign({}, savedConfig.configs, this.job.configs)
  }

  _returnParentConfig (namespaceNotFoundErr) {
    this.log.trace('_returnParentConfig called', { namespaceNotFoundErr })
    return namespaceNotFoundErr.parentConfig
  }

  _saveJsonConfig (newConfigs) {
    this.log.trace('_saveJsonConfig called', { newConfigs })
    return database.saveJsonConfig({
      configId: this.job.configId,
      namespace: this.job.namespace,
      configs: newConfigs
    })
  }

}
