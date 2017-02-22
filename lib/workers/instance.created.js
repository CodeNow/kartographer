'use strict'

const logger = require('logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'instance.created' })
  }

  run () {
    return this.log.trace('instance.created called')
  }
}
