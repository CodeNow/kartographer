'use strict'

const configConverter = require('../external/config-converter.js')
const logger = require('logger.js')
const publisher = require('../external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'kart.kill' })
  }

  run () {
    return Promise.try(() => {
      const name = this.job.name.split('-').pop()
      publisher.publishTask('config.delete', {
        name,
        namespace: configConverter.getNamespace({
          masterPod: this.job.masterPod,
          isTesting: this.job.isTesting,
          isolated: this.job.isolated,
          instanceName: name,
          githubOrgId: this.job.owner.github
        })
      })
    })
    .catch((err) => {
      this.log.error('error', { err })
      throw err
    })
  }
}
