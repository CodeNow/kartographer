'use strict'
const Promise = require('bluebird')

const RabbitConnector = require('ponos/lib/rabbitmq')
const publisher = new RabbitConnector({
  name: 'test'
})

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
