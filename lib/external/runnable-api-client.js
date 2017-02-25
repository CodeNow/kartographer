'use strict'
const Promise = require('bluebird')
const RunnableClient = require('@runnable/api-client')

const Deployment = require('models/deployment')
const logger = require('logger.js')
const Service = require('models/service')

class Client {
  constructor () {
    this.api = new RunnableClient(process.env.RUNNABLE_API_URL)
    this.log = logger.child()
  }

  /**
   * Login into Runnable API Client
   *
   * @resolves {void}
   * @returns {Promise}
   */
  login () {
    return Promise.fromCallback(cb => {
      this.api.githubLogin(process.env.HELLO_RUNNABLE_GITHUB_TOKEN, cb)
    })
  }

  /**
   * @param {String} instanceId
   * @resolves {Array<Object>} instances - All instances part of this cluster
   * @returns {Promise}
   * @resolves {Object}
   *           {String} namespace
   *           {String} configId
   *           {Object} configs  k8 configs
   */
  getConfigsForInstance (instanceId) {
    const log = this.log.child({ instanceId })
    log.info('getConfigsForInstance called')

    return Promise.fromCallback(cb => {
      this.api.fetchInstance(instanceId, cb)
    })
    .then((instance) => {
      log.trace('instance received', { instance })

      return this._getClusterInfoForMasterPod(instance)
      .then((instances) => {
        return this._convertInstancesToK8Configs(instances)
      })
      .then((configs) => {
        return {
          namespace: 'master',
          configId: instance.owner.github + '-master',
          configs: configs
        }
      })
    })
  }

  /**
   * @param  {Instance} instance
   * @return {Promise}
   * @resolves {Array<Instances>} instances part of cluster
   */
  _getClusterInfoForMasterPod (instance) {
    this.log.info('_getClusterInfoForMasterPod called', { instance })

    return Promise.fromCallback(cb => {
      this.api.fetchInstances({
        owner: {
          github: instance.owner.github
        },
        masterPod: true,
        isTesting: false
      }, cb)
    })
  }

  /**
   * @param  {Array<Instance>} instances
   * @return {Object}
   *         {Object.Deployment} deployments
   *         {Object.Service} services
   */
  _convertInstancesToK8Configs (instances) {
    this.log.info('_convertInstancesToK8Configs called', { instances })

    return instances.reduce((out, instance) => {
      out.deployments[instance.lowerName] = Deployment.fromInstance(instance).config
      if (this._doesExposePort(instance)) {
        out.services[instance.lowerName] = Service.fromInstance(instance).config
      }

      return out
    }, {
      deployments: {},
      services: {}
    })
  }

  /**
   * @param  {Instance} instance
   * @return {Boolean} true if instance exposes port
   */
  _doesExposePort (instance) {
    return instance.container.ports
  }
}

module.exports = new Client()
