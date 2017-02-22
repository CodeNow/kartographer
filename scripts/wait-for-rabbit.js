'use strict'
const Promise = require('bluebird')

const publisher = require('external/publisher.js')

Promise.try(() => {
  return connect()
})
.then(() => {
  return publisher.disconnect()
})

function connect () {
  return publisher.connect()
    .catch(() => {
      return Promise.delay(1000).then(connect)
    })
}
