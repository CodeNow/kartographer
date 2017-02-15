'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const database = require('external/database.js')
const mockJsonConfigs = require('../../fixtures/json-configs.js')
const publisher = require('external/publisher.js')
const Worker = require('workers/config.assert.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply functional test', () => {
  let testJob
  let worker
  const testNamespace = 'cocket'
  const testId = 'earing'

  describe('run', () => {
    beforeEach((done) => {
      database.__purgeDb()
      sinon.stub(publisher, 'publishTask')
      testJob = {
        namespace: testNamespace,
        configId: testId,
        configs: {
          deployments: mockJsonConfigs.deployments1
        }
      }

      worker = new Worker(testJob)
      done()
    })

    afterEach((done) => {
      publisher.publishTask.restore()
      done()
    })

    it('should update existing config', () => {
      database.saveJsonConfig({
        namespace: testNamespace,
        configId: testId,
        configs: {
          services: mockJsonConfigs.services1
        }
      })

      return worker.run()
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, testNamespace)
        })
        .then((config) => {
          expect(config.configs).to.equal({
            services: mockJsonConfigs.services1,
            deployments: mockJsonConfigs.deployments1
          })
        })
    })

    it('should create new config', () => {
      return worker.run(testJob)
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, testNamespace)
        })
        .then((config) => {
          expect(config.configs).to.equal({
            deployments: mockJsonConfigs.deployments1
          })
        })
    })

    it('should create new namespace with parent config', () => {
      database.saveJsonConfig({
        namespace: 'master',
        configId: testId,
        configs: {
          services: mockJsonConfigs.services1
        }
      })

      return worker.run(testJob)
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, testNamespace)
        })
        .then((config) => {
          expect(config.configs).to.equal({
            services: mockJsonConfigs.services1,
            deployments: mockJsonConfigs.deployments1
          })
        })
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, 'master')
        })
        .then((config) => {
          expect(config.configs).to.equal({
            services: mockJsonConfigs.services1
          })
        })
    })

    it('should publish config.apply job', () => {
      return worker.run(testJob)
        .then((stdout) => {
          sinon.assert.calledOnce(publisher.publishTask)
          sinon.assert.calledWith(publisher.publishTask, 'config.apply', {
            configId: testId,
            namespace: testNamespace,
            configs: {
              deployments: mockJsonConfigs.deployments1
            }
          })
        })
    })
  }) // end apply
})
