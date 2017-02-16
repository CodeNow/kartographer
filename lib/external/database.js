'use strict'
const Promise = require('bluebird')
const logger = require('logger.js')
const keypather = require('keypather')()

var db = {}

class Database {
  constructor () {
    this.log = logger
  }

  saveJsonConfig (configId, namespace, configs) {
    this.log.trace('saveJsonConfig called', { configId, namespace, configs })
    keypather.set(db, `${configId}.${namespace}`, configs)
    return configs
  }

  getConfigsByIdAndNamespace (configId, namespace) {
    this.log.trace('getConfigsByIdAndNamespace called', { configId, namespace })

    return Promise.try(() => {
      const configs = db[configId]
      if (!configs) {
        throw new ConfigNotFound(configId)
      }

      const out = configs[namespace]
      if (!out) {
        throw new NamespaceNotFound(configId, namespace, db[configId]['master'])
      }

      return out
    })
  }

  __purgeDb () {
    db = {}
  }
}

module.exports = new Database()

class ConfigNotFound extends Error {
  constructor (id) {
    super(`config with id: ${id} not found`)
  }
}
module.exports.ConfigNotFound = ConfigNotFound

class NamespaceNotFound extends Error {
  constructor (id, ns, config) {
    super(`namespace: ${ns} does not exist for config id: ${id}`)
    this.parentConfig = config
  }
}
module.exports.NamespaceNotFound = NamespaceNotFound
