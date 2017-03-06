'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const publisher = require('external/publisher.js')
const mockRequests = require('../../fixtures/requests.js')
const Worker = require('workers/application.container.requested.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('application.container.requested.js functional test', () => {
  const testOrg = mockRequests.masterRepo.Labels.githubOrgId

  beforeEach((done) => {
    sinon.stub(publisher, 'publishTask')
    done()
  })

  afterEach((done) => {
    publisher.publishTask.restore()
    done()
  })

  describe('run', () => {
    it('should return configs for repo container', () => {
      const testRequest = mockRequests.masterRepo
      const worker = new Worker(testRequest)

      return worker.run()
      .then((out) => {
        sinon.assert.calledOnce(publisher.publishTask)
        sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
          namespace: `${testOrg}-master`,
          configs: {
            deployments: {
              kartographer: mockRequests.masterRepoK8Deployment
            },
            services: {}
          }
        })
      })
    })

    it('should return configs', () => {
      const testRequest = mockRequests.masterNonRepo
      const worker = new Worker(testRequest)

      return worker.run()
      .then((out) => {
        sinon.assert.calledOnce(publisher.publishTask)
        sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
          namespace: `${testOrg}-master`,
          configs: {
            deployments: {
              RabbitMQ: mockRequests.masterNonRepoK8Deployment
            },
            services: {
              RabbitMQ: mockRequests.masterNonRepoK8Service
            }
          }
        })
      })
    })
  }) // end run
})
