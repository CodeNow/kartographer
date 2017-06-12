'use strict'

const configFetcher = require('../external/config-converter.js')
const logger = require('../logger.js')
const publisher = require('../external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'instance.updated' })
  }

  run () {
    // TODO: hack to only allow codenow
    if (this.job.instance.owner.github !== 2335750) {
      return
    }

    this.log.trace('instance.updated called')

    return configFetcher.fromInstance(this.job.instance)
      .then((config) => {
        return publisher.publishTask('config.assert', config)
      })
  }
}
