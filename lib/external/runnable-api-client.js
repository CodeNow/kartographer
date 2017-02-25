'use strict'
const Promise = require('bluebird')
const RunnableClient = require('@runnable/api-client')

const Deployment = require('models/deployment')
const Service = require('models/service')

class Client {
  constructor () {
    this.api = new RunnableClient(process.env.RUNNABLE_API_URL, {
      userContentDomain: process.env.RUNNABLE_USER_CONTENT_DOMAIN
    })
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
   * Logout from Runnable API Client
   *
   * @resolves {void}
   * @returns {Promise}
   */
  logout () {
    return Promise.fromCallback(cb => {
      this.api.logout(cb)
    })
  }

  /**
   * @param {String} instanceId
   * @resolves {Array<Object>} instances - All instances part of this cluster
   * @returns {Promise}
   */
  getConfigForInstance (instanceId) {
    return Promise.fromCallback(cb => {
      this.api.fetchInstance(instanceId, cb)
    })
    .then((instance) => {
      if (instance.masterPod) {
        return this._getClusterInfoForMasterPod(instance)
      }
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
   *             {String} namespace
   *             {String} configId
   *             {Array<Instances>} instances instances in cluster
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

  _convertInstancesToK8Configs (instances) {
    return instances.reduce((out, instance) => {
      out.deployments[instance.lowerName] = Deployment.fromInstance(instance).config
      if (instance.container.ports) {
        out.services[instance.lowerName] = Service.fromInstance(instance).config
      }

      return out
    }, {
      deployments: {},
      services: {}
    })
  }
}

module.exports = new Client()
