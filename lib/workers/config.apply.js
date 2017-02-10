'use strict'
const joi = require('joi')

const logger = require('logger.js')
const database = require('external/database.js')
const KubectlWrapper = require('external/kubectl-wrapper.js')

class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.apply' })
  }

  run () {
    return this._getConfigFromDatabase().bind(this)
    .then(this._applyConfigToKubernetes)
  }

  /**
   * @return {Promise}
   * @resoles {String} yaml file of complete cluster config
   */
  _getConfigFromDatabase () {
    this.log.trace('_getConfigFromDatabase called')
    return database.getConfigsByIdAndNamespace(this.job.configId, this.job.namespace)
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

    return kubectl.apply(config.configs)
  }
}

module.exports = {
  _Worker: Worker,

  jobSchema: joi.object({
    configId: joi.string().required(),
    namespace: joi.string().required()
  }).unknown().required().label('config.apply job data'),

  task: (job) => {
    return new Worker(job).run()
  }
}
