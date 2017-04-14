'use strict'
const Promise = require('bluebird')
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const KubectlWrapper = require('external/kubectl-wrapper.js')
const logger = require('logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.apply' })
  }

  run () {
    return Promise.try(() => {
      return this._deleteService()
    })
    .catch(KubectlWrapper.ValidationError, this._stopWorker)
    .catch((err) => {
      // TODO: remove
      this.log.fatal({ err }, 'XXX failed delete')
    })
  }

  /**
   * @param  {String} configs full yaml configs for entire cluster
   * @return {Promise}
   */
  _deleteService () {
    this.log.trace('_deleteService called')

    const kubectl = new KubectlWrapper({
      namespace: this.job.namespace
    })

    return kubectl.deleteConfigs(this.job.name)
  }

  _stopWorker (err) {
    throw new WorkerStopError(err.message, err)
  }
}
