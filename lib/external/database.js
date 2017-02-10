'use strict'
const Promise = require('bluebird')
const logger = require('logger.js')

var db = {}

class Database {
  constructor () {
    this.log = logger
  }

  _getDbKey (configId, namespace) {
    return configId + ':' + namespace
  }

  saveJsonConfig (config) {
    db[this._getDbKey(config.configId, config.namespace)] = config
  }

  getConfigByIdAndNamespace (configId, namespace) {
    return Promise.try(() => {
      console.log('XX, ', db[this._getDbKey(configId, namespace)], configId, namespace, db)
      return db[this._getDbKey(configId, namespace)]
    })
  }

  __purgeDb () {
    db = {}
  }
}

module.exports = new Database()
