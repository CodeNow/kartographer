'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const publisher = require('external/publisher.js')
const mockInstances = require('../../fixtures/instances.js')
const Worker = require('workers/instance.updated.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('instance.updated.js functional test', () => {
  const testOrg = mockInstances.masterRepo.owner.github

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
      const testInstance = mockInstances.masterRepo
      const worker = new Worker({
        instance: testInstance
      })

      return worker.run(testInstance)
      .then((out) => {
        sinon.assert.calledOnce(publisher.publishTask)
        sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
          namespace: `${testOrg}-master`,
          configs: {
            deployments: {
              kartographer: mockInstances.masterRepoK8Deployment
            },
            services: {}
          }
        })
      })
    })

    it('should return configs', () => {
      const testInstance = mockInstances.masterNonRepo
      const worker = new Worker({
        instance: testInstance
      })

      return worker.run(testInstance)
      .then((out) => {
        sinon.assert.calledOnce(publisher.publishTask)
        sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
          namespace: `${testOrg}-master`,
          configs: {
            deployments: {
              rabbitmq: mockInstances.masterNonRepoK8Deployment
            },
            services: {
              rabbitmq: mockInstances.masterNonRepoK8Service
            }
          }
        })
      })
    })
  }) // end run
})
