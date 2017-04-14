'use strict'

const configFetcher = require('external/config-converter.js')
const logger = require('logger.js')
const publisher = require('external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'application.container.requested' })
  }

  run () {
    this.log.trace('application.container.requested called')
    // ignore extra api container
    if (~this.job.Labels.instanceName.indexOf('dark-theme') && !!this.job.Labels.isolated) {
      return
    }
    // add isolation if dark-theme OR --
    if (~this.job.Labels.instanceName.indexOf('dark-theme') || ~this.job.Labels.instanceName.indexOf('--')) {
      this.job.Labels.isolated = 'dark-theme-' + this.job.Labels.isolated
      this.log.trace('XXX update isolated dark-theme')
    }

    // hack to make instance names correct
    this.job.Labels.instanceName = this.job.Labels.instanceName.split('-').pop()
    return configFetcher.fromRequest(this.job)
    .then((config) => {
      this.log.trace({ config }, 'config generated')
      return publisher.publishTask('config.assert', config)
    })
  }
}
