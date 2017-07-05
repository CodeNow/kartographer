'use strict'

const configFetcher = require('../external/config-converter.js')
const logger = require('../logger.js')
const publisher = require('../external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'cluster-config.built' })
  }

  run () {
    // TODO: hack to only allow codenow
    if (this.job.instance.owner.github !== 2335750) {
      return
    }

    this.log.trace('called')

    return configFetcher.fromClusterConfigBuilt(this.job.config)
      .then((config) => {
        return publisher.publishTask('config.assert', config)
      })
  }
}
