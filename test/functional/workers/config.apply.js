'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const database = require('external/database.js')
const Worker = require('workers/config.apply.js')
const mockJsonConfigs = require('../../fixtures/json-configs.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply functional test', () => {
  let testJob
  const testNamespace = 'bargemaster'
  const testConfigId = 'bosun'

  describe('run', () => {
    beforeEach((done) => {
      process.env.KUBECTL_PATH = './test/fixtures/kube-ctl-mock.sh'
      process.env.CONFIG_FILE_PATH = '/path'
      database.__purgeDb()
      database.saveJsonConfig(testConfigId, testNamespace, {
        services: mockJsonConfigs.services1
      })

      testJob = {
        configId: testConfigId,
        namespace: testNamespace
      }
      done()
    })

    it('should send correct args to kubectl', () => {
      const worker = new Worker(testJob)

      return worker.run()
        .then((stdout) => {
          const args = stdout.split(':::')[2]
          const didFileExist = stdout.split(':::')[1]

          expect(didFileExist).to.contain('YES')

          expect(args).to.contain(`--namespace=${testNamespace}`)
          expect(args).to.contain(`--kubeconfig=${process.env.CONFIG_FILE_PATH}`)
          expect(args).to.contain('apply')
          expect(args).to.contain('-f')
          expect(args).to.contain('--output=name')
        })
    })
  }) // end run
})
