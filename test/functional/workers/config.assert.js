'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const Worker = require('workers/config.assert.js')
const database = require('external/database.js')
const mockJsonConfigs = require('../../fixtures/json-configs.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply functional test', () => {
  let testJob
  const testNamespace = 'cocket'
  const testId = 'earing'

  describe('run', () => {
    beforeEach((done) => {
      database.__purgeDb()
      testJob = {
        namespace: testNamespace,
        configId: testId,
        configs: {
          deployments: [mockJsonConfigs.deployments.frontend]
        }
      }
      done()
    })

    it('should update existing config', () => {
      database.saveJsonConfig({
        namespace: testNamespace,
        configId: testId,
        configs: {
          services: [mockJsonConfigs.services.frontend]
        }
      })

      return Worker.task(testJob)
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, testNamespace)
        })
        .then((config) => {
          expect(config.configs).to.equal({
            deployments: [mockJsonConfigs.deployments.frontend],
            services: [mockJsonConfigs.services.frontend]
          })
        })
    })

    it('should create new config', () => {
      return Worker.task(testJob)
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, testNamespace)
        })
        .then((config) => {
          expect(config.configs).to.equal({
            deployments: [mockJsonConfigs.deployments.frontend]
          })
        })
    })

    it('should create new namespace with parent config', () => {
      database.saveJsonConfig({
        namespace: 'master',
        configId: testId,
        configs: {
          services: [mockJsonConfigs.services.frontend]
        }
      })

      return Worker.task(testJob)
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, testNamespace)
        })
        .then((config) => {
          expect(config.configs).to.equal({
            services: [mockJsonConfigs.services.frontend],
            deployments: [mockJsonConfigs.deployments.frontend]
          })
        })
        .then((stdout) => {
          return database.getConfigsByIdAndNamespace(testId, 'master')
        })
        .then((config) => {
          expect(config.configs).to.equal({
            services: [mockJsonConfigs.services.frontend]
          })
        })
    })
  }) // end apply
})
