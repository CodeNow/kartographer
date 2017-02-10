'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const database = require('external/database.js')
const Worker = require('workers/config.apply.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply functional test', () => {
  let testJob
  const testEndpoint = 'api.runnable.com'
  const testNamespace = 'bargemaster'
  const testConfigId = 'bosun'

  describe('run', () => {
    beforeEach((done) => {
      process.env.KUBECTL_PATH = './test/fixtures/kube-ctl-mock.sh'
      process.env.KUBE_ENDPOINT = testEndpoint
      database.__purgeDb()
      database.saveJsonConfig({
        configId: testConfigId,
        namespace: testNamespace,
        configs: {
          services: [{
            'kind': 'Service',
            'apiVersion': 'v1',
            'metadata': {
              'name': 'testt'
            },
            'spec': {
              'selector': {
                'app': 'testt'
              },
              'ports': [
                {
                  'protocol': 'TCP',
                  'port': 80,
                  'targetPort': 80
                }
              ],
              'type': 'NodePort'
            }
          }]
        }
      })

      testJob = {
        configId: testConfigId,
        namespace: testNamespace
      }
      done()
    })

    it('should send correct args to kubectl', () => {
      return Worker.task(testJob)
        .then((stdout) => {
          const args = stdout.split(':::')[2]
          const didFileExist = stdout.split(':::')[1]

          expect(didFileExist).to.contain('YES')

          expect(args).to.contain(`--namespace=${testNamespace}`)
          expect(args).to.contain(`--server=${testEndpoint}`)
          expect(args).to.contain('apply')
          expect(args).to.contain('-f')
          expect(args).to.contain('--output=name')
        })
    })
  }) // end apply
})
