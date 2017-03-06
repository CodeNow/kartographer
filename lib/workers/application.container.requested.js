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

    return configFetcher.fromRequest(this.job)
      .then((config) => {
        return publisher.publishTask('config.assert', config)
      })
  }
}
