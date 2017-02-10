'use strict'
const Code = require('code')
const fs = require('fs')
const Lab = require('lab')
const Promise = require('bluebird')

const KubectlWrapper = require('external/kubectl-wrapper.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('KubectlWrapper functional test', () => {
  let testConfig
  let kubectl
  const testEndpoint = 'api.runnable.com'
  const testNamespace = 'v1'

  describe('apply', () => {
    beforeEach((done) => {
      process.env.KUBECTL_PATH = './test/fixtures/kube-ctl-mock.sh'

      kubectl = new KubectlWrapper({
        endpoint: testEndpoint,
        namespace: testNamespace
      })

      testConfig = {
        'service': [{
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
        }],
        'deployment': [{
          'kind': 'Deployment',
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
      done()
    })

    it('should send correct args to kubectl', () => {
      return kubectl.apply(testConfig)
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

    it('should clean up file', () => {
      return kubectl.apply(testConfig)
        .then((stdout) => {
          const tmpFile = stdout.split(':::')[0]

          const doesFileExist = fs.existsSync(tmpFile)
          expect(doesFileExist).to.be.false()
        })
    })
  }) // end apply
})
