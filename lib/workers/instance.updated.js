'use strict'

const configFetcher = require('external/config-fetcher.js')
const logger = require('logger.js')
const publisher = require('external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'instance.updated' })
  }

  run () {
    this.log.trace('instance.updated called')

    return configFetcher.fromInstanceId(this.job.instance.id)
      .then((config) => {
        return publisher.publishTask('config.assert', config)
      })
  }
}
