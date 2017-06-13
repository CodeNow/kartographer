'use strict'
const Promise = require('bluebird')
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const KubectlWrapper = require('../external/kubectl-wrapper.js')
const logger = require('../logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.apply' })
  }

  run () {
    return Promise.try(() => {
      return this._applyConfigToKubernetes()
    })
    .catch(KubectlWrapper.ValidationError, this._stopWorker)
  }

  /**
   * @param  {String} configs full yaml configs for entire cluster
   * @return {Promise}
   */
  _applyConfigToKubernetes () {
    this.log.trace('_applyConfigToKubernetes called')

    const kubectl = new KubectlWrapper({
      namespace: this.job.namespace
    })

    return kubectl.apply(this.job.configs)
  }

  _stopWorker (err) {
    throw new WorkerStopError(err.message, err)
  }
}
