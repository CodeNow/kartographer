'use strict'
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const database = require('external/database.js')
const KubectlWrapper = require('external/kubectl-wrapper.js')
const logger = require('logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.apply' })
  }

  run () {
    return this._getConfigFromDatabase().bind(this)
      .then(this._applyConfigToKubernetes)
      .catch(KubectlWrapper.ValidationError, this._stopWorker)
  }

  /**
   * @return {Promise}
   * @resoles {String} yaml file of complete cluster configs
   */
  _getConfigFromDatabase () {
    this.log.trace('_getConfigFromDatabase called')
    return database.getConfigsByIdAndNamespace(this.job.configId, this.job.namespace)
  }

  /**
   * @param  {String} configs full yaml configs for entire cluster
   * @return {Promise}
   */
  _applyConfigToKubernetes (configs) {
    this.log.trace('_applyConfigToKubernetes called')

    const kubectl = new KubectlWrapper({
      namespace: this.job.namespace
    })

    return kubectl.apply(configs)
  }

  _stopWorker (err) {
    throw new WorkerStopError(err.message, err)
  }
}
