'use strict'
const Promise = require('bluebird')
const WorkerStopError = require('error-cat/errors/worker-stop-error')
const keypather = require('keypather')()

const KubectlWrapper = require('external/kubectl-wrapper.js')
const logger = require('logger.js')
const publisher = require('external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'container.life-cycle.started' })
  }

  run () {
    if (!this._isUserContainer()) {
      return Promise.resolve()
    }
    return this._getSpec()
    .then((spec) => {
      const ports = spec.ports.reduce((out, portSpec) => {
        const key = `${portSpec.port}/${portSpec.protocol}`.toLowerCase()
        out[key] = [{
          HostIp: '0.0.0.0',
          HostPort: `${portSpec.nodePort}`
        }]
      }, {})
      this.job.inspectData.NetworkSettings.Ports = ports
      this.log.trace('XXX ports publish')
      publisher.publishEvent('container.network.attached', this.job)
    })
    .catch((err) => {
      // TODO: remove
      this.log.error({ err }, 'XXX failed to get')
    })
  }

  /**
   * @param  {String} configs full yaml configs for entire cluster
   * @return {Promise}
   */
  _getSpec () {
    this.log.trace('_getSpec called')

    const kubectl = new KubectlWrapper({
      namespace: this.job.inspectData.Config.Labels['io.kubernetes.pod.namespace']
    })

    return kubectl.getServiceInfo(this.job.inspectData.Config.Labels['io.kubernetes.container.name'])
    .get('spec')
  }

  _isUserContainer () {
    return keypather.get(this.job, 'inspectData.Config.Labels.type') === 'user-container'
  }

  _stopWorker (err) {
    throw new WorkerStopError(err.message, err)
  }
}
