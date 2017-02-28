'use strict'
const keypather = require('keypather')()

const Deployment = require('models/deployment.js')
const K8Config = require('models/k8config.js')
const logger = require('logger.js')
const runnableApi = require('external/runnable-api-client.js')
const Service = require('models/service.js')

class Client {
  constructor () {
    this.log = logger.child()
  }

  /**
   * @param {String} instanceId
   * @resolves {Array<Object>} instances - All instances part of this cluster
   * @returns {Promise}
   * @resolves {K8Config}
   */
  fromInstanceId (instanceId) {
    const log = this.log.child({ instanceId })
    log.info('fromInstanceId called')

    return runnableApi.fetchInstanceWithId(instanceId)
    .then((instance) => {
      log.trace('instance received', { instance })

      return runnableApi.getInstancesWithMasterPod(instance)
      .then((instances) => {
        return this._convertInstancesToK8Configs(instances)
      })
      .then((configs) => {
        return new K8Config({
          namespace: 'master',
          configId: instance.owner.github + '-master',
          configs: configs
        })
      })
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
    return !!keypather.get(instance, 'container.ports')
  }
}

module.exports = new Client()
