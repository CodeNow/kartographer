'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const yaml = require('js-yaml')
const fs = require('fs')

const Worker = require('workers/config.assert.js')
const database = require('external/database.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply functional test', () => {
  let testJob

  describe('run', () => {
    beforeEach((done) => {
      testJob = {
        namespace: 'v1',
        configId: '1',
        configs: {
          deployments: [yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.frontend.yml'))]
        }
      }
      done()
    })

    it('should update existing config', () => {
      database.saveJsonConfig({
        namespace: 'v1',
        configId: '1',
        configs: {
          services: [yaml.safeLoad(fs.readFileSync('./test/fixtures/service.frontend.yml'))]
        }
      })

      return Worker.task(testJob)
        .then((stdout) => {
          return database.getConfigByIdAndNamespace('1', 'v1')
        })
        .then((config) => {
          expect(config.configs).to.equal({
            deployments: [yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.frontend.yml'))],
            services: [yaml.safeLoad(fs.readFileSync('./test/fixtures/service.frontend.yml'))]
          })
        })
    })

    // it('should create new config', () => {
    //   return Worker.task(testJob)
    //     .then((stdout) => {

    //     })
    // })

    // it('should create new namespace with parent config', () => {
    //   return Worker.task(testJob)
    //     .then((stdout) => {

    //     })
    // })
  }) // end apply
})
