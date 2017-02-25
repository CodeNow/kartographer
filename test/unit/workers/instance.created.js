'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const apiClient = require('external/runnable-api-client.js')
const publisher = require('external/publisher.js')
const Worker = require('workers/instance.created.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('instance.created unit test', () => {
  const testId = '123'
  const worker = new Worker({
    instanceId: testId
  })

  describe('run', () => {
    beforeEach((done) => {
      sinon.stub(apiClient, 'getConfigsForInstance')
      sinon.stub(publisher, 'publishTask')
      done()
    })

    afterEach((done) => {
      publisher.publishTask.restore()
      apiClient.getConfigsForInstance.restore()
      done()
    })

    it('should call instance apply', () => {
      const testConfig = {
        test: 'me'
      }

      publisher.publishTask.resolves()
      apiClient.getConfigsForInstance.resolves(testConfig)

      return worker.run()
      .then(() => {
        sinon.assert.calledOnce(apiClient.getConfigsForInstance)
        sinon.assert.calledWith(apiClient.getConfigsForInstance, testId)

        sinon.assert.calledOnce(publisher.publishTask)
        sinon.assert.calledWith(publisher.publishTask, 'config.assert', testConfig)
      })
    })
  }) // end run
})
