'use strict'
require('loadenv')()
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const Deployment = require('models/deployment.js')
const mockInstances = require('../../fixtures/instances.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('deployment.js unit test', () => {
  describe('constructor', () => {
    let testDeploy

    beforeEach((done) => {
      testDeploy = {
        name: 'test',
        image: 'test'
      }
      done()
    })

    it('should add ports', (done) => {
      testDeploy.ports = [80, 90]

      const out = new Deployment(testDeploy)

      expect(out.config.spec.template.spec.containers[0].ports).to.equal([{
        containerPort: 80
      }, {
        containerPort: 90
      }])
      done()
    })

    it('should not add ports', (done) => {
      const out = new Deployment(testDeploy)
      expect(out.config.spec.template.spec.containers[0].ports).to.not.exist()
      done()
    })

    it('should add envs', (done) => {
      const testEnvs = [{
        name: '1',
        value: '1'
      }, {
        name: '2',
        value: '2'
      }]
      testDeploy.env = testEnvs

      const out = new Deployment(testDeploy)

      expect(out.config.spec.template.spec.containers[0].env).to.equal(testEnvs)
      done()
    })

    it('should not add envs', (done) => {
      const out = new Deployment(testDeploy)
      expect(out.config.spec.template.spec.containers[0].env).to.not.exist()
      done()
    })
  }) // end constructor

  describe('fromInstance', () => {
    it('should create config from repo instance', (done) => {
      const out = Deployment.fromInstance(mockInstances.masterRepo)

      expect(out).to.be.instanceof(Deployment)
      expect(out.config).to.equal({
        apiVersion: 'extensions/v1beta1',
        kind: 'Deployment',
        metadata: {
          name: 'kartographer'
        },
        spec: {
          replicas: 1,
          template: {
            metadata: {
              labels: {
                app: 'kartographer'
              }
            },
            spec: {
              containers: [{
                name: 'kartographer',
                image: 'localhost/2335750/58af7d5a1d7ce610001bec73:58af7d5ba2b4a41100146cce',
                env: [{
                  name: 'RABBITMQ_HOSTNAME',
                  value: 'rabbitmq-staging-codenow.runnable.ninja'
                }, {
                  name: 'test',
                  value: 'yo'
                }]
              }]
            }
          }
        }
      })
      done()
    })

    it('should create config from non-repo instance', (done) => {
      const out = Deployment.fromInstance(mockInstances.masterNonRepo)

      expect(out).to.be.instanceof(Deployment)
      expect(out.config).to.equal({
        apiVersion: 'extensions/v1beta1',
        kind: 'Deployment',
        metadata: {
          name: 'rabbitmq'
        },
        spec: {
          replicas: 1,
          template: {
            metadata: {
              labels: {
                app: 'rabbitmq'
              }
            },
            spec: {
              containers: [{
                name: 'rabbitmq',
                image: 'localhost/2335750/58af7da8a2b4a41100146cde:58af7da82b959010000c0d14',
                ports: [{
                  containerPort: 25672
                }, {
                  containerPort: 4369
                }, {
                  containerPort: 5671
                }, {
                  containerPort: 5672
                }]
              }]
            }
          }
        }
      })
      done()
    })
  }) // end fromInstance
}) // end deployment.js unit test

