'use strict'
const Promise = require('bluebird')
const keypather = require('keypather')()

const Job = require('../models/job.js')
const K8Config = require('../models/k8config.js')
const logger = require('../logger.js')
const Service = require('../models/service.js')

class ConfigConverter {
  constructor () {
    this.log = logger.child()
  }

  fromClusterConfigBuilt (clusterConfig) {
    const log = this.log.child({ clusterConfig })
    log.info('called')

    return Promise.try(() => {
      return this._convertClusterConfigBuiltToConfigs(clusterConfig)
    })
      .then((configs) => {
        return new K8Config({
          namespace: `${instance.owner.github}-${this._getNamespace(instance)}`,
          configs
        })
      })
  }

  _getNamespace (instance) {
    if (this._isMaster(instance)) {
      return 'master'
    }

    if (this._isMasterTesting(instance)) {
      return 'master-testing'
    }

    if (this._isIsolation(instance)) {
      return instance.isolated
    }

    return this._getShortHash(instance)
  }

  _isMaster (instance) {
    return instance.masterPod && !instance.isTesting
  }

  _isMasterTesting (instance) {
    return instance.masterPod && instance.isTesting
  }

  _isIsolation (instance) {
    return !!instance.isolated
  }

  _getShortHash (instance) {
    return instance.shortHash
  }

  _convertClusterConfigBuiltToConfigs (clusterConfig) {
    this.log.info('called', {config: clusterConfig})
    const configs = {
      jobs: {},
      services: {}
    }

    configs.jobs[clusterConfig.name] = Job.fromClusterConfigBuilt(clusterConfig)

    if (clusterConfig.length) {
      configs.services[clusterConfig.name] = Service.fromClusterConfigBuilt(instance)
    }

    return configs
  }
}

module.exports = new ConfigConverter()
