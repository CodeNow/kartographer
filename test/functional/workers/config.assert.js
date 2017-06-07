'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const mockJsonConfigs = require('../../fixtures/json-configs.js')
const publisher = require('external/publisher.js')
const Worker = require('workers/config.assert.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('config.apply functional test', () => {
  let testJob
  let worker
  const testNamespace = 'cocket'

  describe('run', () => {
    beforeEach((done) => {
      sinon.stub(publisher, 'publishTask')
      testJob = {
        namespace: testNamespace,
        configs: {
          jobs: mockJsonConfigs.jobs1
        }
      }

      worker = new Worker(testJob)
      done()
    })

    afterEach((done) => {
      publisher.publishTask.restore()
      done()
    })

    it('should publish config.apply job', () => {
      return worker.run(testJob)
        .then((stdout) => {
          sinon.assert.calledOnce(publisher.publishTask)
          sinon.assert.calledWith(publisher.publishTask, 'config.apply', {
            namespace: testNamespace,
            configs: {
              jobs: mockJsonConfigs.jobs1
            }
          })
        })
    })
  }) // end apply
})
