'use strict'
require('loadenv')()
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const Deployment = require('models/service.js')
const mockInstances = require('../../fixtures/instances.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('service.js unit test', () => {
  describe('constructor', () => {
    let testDeploy

    beforeEach((done) => {
      testDeploy = {
        name: 'test',
        ports: [80, 90]
      }
      done()
    })

    it('should add ports', (done) => {
      const out = new Deployment(testDeploy)

      expect(out.config.spec.ports).to.equal([{
        protocol: 'TCP',
        targetPort: 80
      }, {
        protocol: 'TCP',
        targetPort: 90
      }])
      done()
    })
  }) // end constructor

  describe('fromInstance', () => {
    it('should create config from repo instance', (done) => {
      const out = Deployment.fromInstance(mockInstances.masterNonRepo)

      expect(out).to.be.instanceof(Deployment)
      expect(out.config).to.equal({
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'rabbitmq'
        },
        spec: {
          selector: {
            app: 'rabbitmq'
          },
          ports: [{
            protocol: 'TCP',
            targetPort: 64576
          }, {
            protocol: 'TCP',
            targetPort: 64579
          }, {
            protocol: 'TCP',
            targetPort: 64578
          }, {
            protocol: 'TCP',
            targetPort: 64577
          }],
          type: 'NodePort'
        }
      })
      done()
    })
  }) // end fromInstance
}) // end service.js unit test

