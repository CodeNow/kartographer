'use strict'
const Promise = require('bluebird')
const keypather = require('keypather')()

const Deployment = require('models/deployment.js')
const K8Config = require('models/k8config.js')
const logger = require('logger.js')
const Service = require('models/service.js')

class ConfigConverter {
  constructor () {
    this.log = logger.child()
  }

  /**
   * @param {Instance} instance
   * @returns {Promise}
   * @resolves {K8Config}
   */
  fromInstance (instance) {
    const log = this.log.child({ instance })
    log.info('called')

    return Promise.try(() => {
      return this._convertInstanceToConfigs(instance)
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

  /**
   * @param  {Instance} instance
   * @return {Object} configs
   *         {Deployment} configs.deployments.<name>
   *         {Service} configs.services.<name>
   */
  _convertInstanceToConfigs (instance) {
    this.log.info('called', { instance })
    const configs = {
      deployments: {},
      services: {}
    }
    configs.deployments[instance.lowerName] = Deployment.fromInstance(instance)

    if (this._doesExposePort(instance)) {
      configs.services[instance.lowerName] = Service.fromInstance(instance)
    }

    return configs
  }

  /**
   * @param  {Instance} instance
   * @return {Boolean} true if instance exposes port
   */
  _doesExposePort (instance) {
    return !!keypather.get(instance, 'container.ports')
  }
}

module.exports = new ConfigConverter()
