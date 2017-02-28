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
        ports: [{
          host: 80,
          container: 90
        }, {
          host: 50,
          container: 60
        }]
      }
      done()
    })

    it('should add ports', (done) => {
      const out = new Deployment(testDeploy)

      expect(out.config.spec.ports).to.equal([{
        protocol: 'TCP',
        port: 80,
        targetPort: 90
      }, {
        protocol: 'TCP',
        port: 50,
        targetPort: 60
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
            targetPort: 25672,
            port: 64576
          }, {
            protocol: 'TCP',
            targetPort: 4369,
            port: 64579
          }, {
            protocol: 'TCP',
            targetPort: 5671,
            port: 64578
          }, {
            protocol: 'TCP',
            targetPort: 5672,
            port: 64577
          }],
          type: 'NodePort'
        }
      })
      done()
    })
  }) // end fromInstance
}) // end service.js unit test

