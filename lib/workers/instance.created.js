'use strict'

const apiClient = require('external/runnable-api-client.js')
const logger = require('logger.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'instance.created' })
  }

  run () {
    this.log.trace('instance.created called')
    // return apiClient.getConfigsForInstance()
    //   .then((config) => {

    //   })
  }
}
