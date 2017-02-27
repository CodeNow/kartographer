'use strict'

const configFetcher = require('external/config-fetcher.js')
const logger = require('logger.js')
const publisher = require('external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'instance.created' })
  }

  run () {
    this.log.trace('instance.created called')

    return configFetcher.fromInstanceId(this.job.instanceId)
      .then((config) => {
        return publisher.publishTask('config.assert', config)
      })
  }
}
