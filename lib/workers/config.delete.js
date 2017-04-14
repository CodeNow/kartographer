'use strict'
const Promise = require('bluebird')
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const KubectlWrapper = require('external/kubectl-wrapper.js')
const logger = require('logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.delete' })
  }

  run () {
    return Promise.try(() => {
      return this._deleteConfigs()
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
  _deleteConfigs () {
    this.log.trace('_deleteConfigs called')

    const kubectl = new KubectlWrapper({
      namespace: this.job.namespace
    })

    return kubectl.deleteConfigs(this.job.configName)
  }

  _stopWorker (err) {
    throw new WorkerStopError(err.message, err)
  }
}
