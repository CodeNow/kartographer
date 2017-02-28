'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const configFetcher = require('external/config-fetcher.js')
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
    id: testId
  })

  describe('run', () => {
    beforeEach((done) => {
      sinon.stub(configFetcher, 'fromInstanceId')
      sinon.stub(publisher, 'publishTask')
      done()
    })

    afterEach((done) => {
      publisher.publishTask.restore()
      configFetcher.fromInstanceId.restore()
      done()
    })

    it('should call instance apply', () => {
      const testConfig = {
        test: 'me'
      }

      publisher.publishTask.resolves()
      configFetcher.fromInstanceId.resolves(testConfig)

      return worker.run()
      .then(() => {
        sinon.assert.calledOnce(configFetcher.fromInstanceId)
        sinon.assert.calledWith(configFetcher.fromInstanceId, testId)

        sinon.assert.calledOnce(publisher.publishTask)
        sinon.assert.calledWith(publisher.publishTask, 'config.assert', testConfig)
      })
    })
  }) // end run
})
