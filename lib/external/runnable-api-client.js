'use strict'
const Promise = require('bluebird')
const RunnableClient = require('@runnable/api-client')

const Deployment = require('models/deployment')
const Service = require('models/service')

class Client {
  constructor () {
    this.api = new RunnableClient(process.env.RUNNABLE_API_URL)
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
  getConfigForInstance (instanceId) {
    return Promise.fromCallback(cb => {
      this.api.fetchInstance(instanceId, cb)
    })
    .then((instance) => {
      return this._getClusterInfoForMasterPod(instance)
    })
    .then((clusterInfo) => {
      return {
        configs: this._convertInstancesToK8Configs(clusterInfo.instances),
        namespace: clusterInfo.namespace,
        configId: clusterInfo.configId
      }
    })
  }

  /**
   * @param  {Instance} instance
   * @return {Promise}
   * @resolves {Object}
   *           {String} namespace
   *           {String} configId
   *           {Array<Instances>} instances instances in cluster
   */
  _getClusterInfoForMasterPod (instance) {
    return Promise.fromCallback(cb => {
      this.api.fetchInstances({
        owner: {
          github: instance.owner.github
        },
        masterPod: true,
        isTesting: false
      }, cb)
    })
    .then((instances) => {
      return {
        instances: instances,
        namespace: 'master',
        configId: instance.owner.github + '-master'
      }
    })
  }

  /**
   * @param  {Array<Instance>} instances
   * @return {Object}
   *         {Object.Deployment} deployments
   *         {Object.Service} services
   */
  _convertInstancesToK8Configs (instances) {
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
