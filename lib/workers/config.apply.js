'use strict'
const joi = require('joi')
const Promise = require('bluebird')

const logger = require('logger.js')
const database = require('external/database.js')
const KubectlWrapper = require('external/kubectl-wrapper.js')

class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.apply' })
  }

  run () {
    return Promise.try(() => {
      return this._getConfigFromDatabase(this.job.configId)
    }).bind(this)
    .then(this._applyConfigToKubernetes)
  }

  /**
   * @param  {String} configId
   * @return {Promise}
   * @resoles {String} yaml file of complete cluster config
   */
  _getConfigFromDatabase (configId) {
    this.log.trace('_getConfigFromDatabase called', {
      configId
    })
    return database.getClusterConfigYaml(configId)
  }

  /**
   * @param  {String} config full yaml config for entire cluster
   * @return {Promise}
   */
  _applyConfigToKubernetes (config) {
    this.log.trace('_applyConfigToKubernetes called')

    const kubectl = new KubectlWrapper({
      endpoint: process.env.KUBE_ENDPOINT,
      namespace: config.namespace
    })

    return kubectl.apply(config.data)
  }
}

module.exports = {
  _Worker: Worker,

  jobSchema: joi.object({
    configId: joi.string().required()
  }).unknown().required().label('config.apply job data'),

  task: (job) => {
    return new Worker(job).run()
  }
}
