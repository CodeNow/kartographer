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
    const name = this.job.Labels.instanceName.split('-').pop()
    publisher.publishTask('config.delete', {
      name,
      namespace: configConverter.getNamespace({
        masterPod: this.job.masterPod,
        isTesting: this.job.isTesting,
        isolated: this.job.isolated,
        instanceName: this.job.instanceName,
        githubOrgId: this.job.owner.github
      })
    })
  }
}
