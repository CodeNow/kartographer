'use strict'
const Promise = require('bluebird')
const keypather = require('keypather')()

const Deployment = require('models/deployment.js')
const Job = require('models/job.js')
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
        namespace: `${instance.owner.github}-${this._getNamespace(instance)}`.toLowerCase(),
        configs
      })
    })
  }

  fromRequest (request) {
    const log = this.log.child({ request })
    log.info('called')

    return Promise.try(() => {
      return this._convertRequestToConfigs(request)
    })
    .then((configs) => {
      // TODO: fix for container
      return new K8Config({
        namespace: `${request.Labels.githubOrgId}-${this._getNamespace(request.Labels)}`,
        configs
      })
    })
  }

  _getNamespace (info) {
    if (this._isMaster(info)) {
      return 'master'
    }

    if (this._isMasterTesting(info)) {
      return 'master-testing'
    }

    if (this._isIsolation(info)) {
      return info.isolated
    }

    return this._getInstanceName(info)
  }

  _isMaster (info) {
    return info.masterPod && !info.isTesting
  }

  _isMasterTesting (info) {
    return info.masterPod && info.isTesting
  }

  _isIsolation (info) {
    return !!info.isolated
  }

  _getInstanceName (info) {
    return info.instanceName.toLowerCase()
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

  _convertRequestToConfigs (request) {
    this.log.info('called', { request })
    const configs = {
      deployments: {},
      services: {},
      jobs: {}
    }

    // TODO: make testing container for testing job
    if (request.Labels.isTestReporter) {
      configs.jobs[request.Labels.instanceName] = Job.fromRequest(request)
    } else {
      configs.deployments[request.Labels.instanceName] = Deployment.fromRequest(request)
    }

    if (request.Ports && request.Ports.length) {
      configs.services[request.Labels.instanceName] = Service.fromRequest(request)
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
