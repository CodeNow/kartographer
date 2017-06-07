'use strict'
const Code = require('code')
const fs = require('fs')
const Lab = require('lab')
const Promise = require('bluebird')

const KubectlWrapper = require('external/kubectl-wrapper.js')
const mockJsonConfigs = require('../../fixtures/json-configs.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('KubectlWrapper functional test', () => {
  let testConfig
  let kubectl
  const testNamespace = 'v1'

  describe('apply', () => {
    beforeEach((done) => {
      process.env.KUBECTL_PATH = './test/fixtures/kube-ctl-mock.sh'
      process.env.CONFIG_FILE_PATH = '/path'

      kubectl = new KubectlWrapper({
        namespace: testNamespace
      })

      testConfig = {
        service: mockJsonConfigs.services1,
        deployment: mockJsonConfigs.deployments1
      }
      done()
    })

    it('should clean up file', () => {
      return kubectl.apply(testConfig)
        .then((stdout) => {
          const tmpFile = stdout.split(':::')[0]

          const doesFileExist = fs.existsSync(tmpFile)
          expect(doesFileExist).to.be.false()
        })
    })
  }) // end apply

  describe('delete', () => {
    beforeEach((done) => {
      process.env.KUBECTL_PATH = './test/fixtures/kube-ctl-mock.sh'
      process.env.CONFIG_FILE_PATH = '/path'

      kubectl = new KubectlWrapper({
        namespace: testNamespace
      })

      done()
    })

    it('should call delete cluster', () => {
      return kubectl.deleteNamespace()
        .then((stdout) => {
          const args = stdout.split(':::')[2]

          expect(args).to.contain(`delete namespace ${testNamespace}`)
        })
    })
  }) // end delete
})
