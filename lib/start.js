'use strict'
const CriticalError = require('error-cat/errors/critical-error')
const ErrorCat = require('error-cat')

const log = require('./logger.js')
const publisher = require('external/publisher.js')
const runnableAPI = require('external/runnable-api-client')
const server = require('external/worker-server.js')

module.exports = () => {
  return runnableAPI.login()
    .then(() => {
      log.info('logged into api')
      return publisher.start()
    })
    .then(() => {
      log.info('Publisher Started')
      return server.start()
    })
    .then(() => {
      log.info('Worker Started')
    })
    .catch((err) => {
      log.fatal({ err }, 'application failed to start')
      ErrorCat.report(new CriticalError(
        'Worker Server Failed to Start',
        { err }
      ))
      process.exit(1)
    })
}
