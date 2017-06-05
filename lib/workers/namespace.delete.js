'use strict'
const Promise = require('bluebird')
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const KubectlWrapper = require('../external/kubectl-wrapper.js')
const logger = require('../logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'namespace.delete' })
  }

  run () {
    return Promise.try(() => {
      return this._deleteKubernetesNamespace()
    })
    .catch(KubectlWrapper.ValidationError, this._stopWorker)
    .catch(KubectlWrapper.NotFoundError, this._stopWorker)
  }

  /**
   * @param  {String} configs full yaml configs for entire cluster
   * @return {Promise}
   */
  _deleteKubernetesNamespace () {
    this.log.trace('_deleteKubernetesNamespace called')

    const kubectl = new KubectlWrapper({
      namespace: this.job.namespace
    })

    return kubectl.deleteNamespace()
  }

  _stopWorker (err) {
    throw new WorkerStopError(err.message, err)
  }
}
