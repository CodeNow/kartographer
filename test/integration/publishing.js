'use strict'
require('loadenv')()

const Code = require('code')
const Lab = require('lab')
const PonosServer = require('ponos').Server

const publisher = require('../../lib/external/publisher.js')

const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const expect = Code.expect

let testStub

const testSubscriber = new PonosServer({
  name: process.env.APP_NAME,
  rabbitmq: {
    channel: {
      prefetch: process.env.WORKER_PREFETCH
    },
    hostname: process.env.RABBITMQ_HOSTNAME,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD
  },
  tasks: {
    'config.apply': {
      task: (job) => {
        testStub(job)
      }
    }
  }
})

describe('rabbitmq integration test', () => {
  beforeEach((done) => {
    publisher.start()
      .then(() => {
        return testSubscriber.start()
      })
      .asCallback(done)
  })

  afterEach((done) => {
    publisher._publisher.disconnect()
      .then(() => {
        return testSubscriber.stop()
      })
      .asCallback(done)
  })

  describe('check publishing', () => {
    it('should publish test job', (done) => {
      const configId = '1234'
      const testJob = {
        configId: configId
      }

      testStub = (jobData) => {
        expect(jobData.configId).to.equal(configId)
        done()
      }

      publisher.publishTask('config.apply', testJob)
    })
  }) // end publishContainerNetworkAttached
}) // end rabbitmq integration test
