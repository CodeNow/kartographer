'use strict'
require('loadenv')()
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const Job = require('../../../lib/models/job.js')
const mockInstances = require('../../fixtures/instances.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('job.js unit test', () => {
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

      const out = new Job(testDeploy)

      expect(out.spec.template.spec.containers[0].ports).to.equal([{
        containerPort: 80
      }, {
        containerPort: 90
      }])
      done()
    })

    it('should not add ports', (done) => {
      const out = new Job(testDeploy)
      expect(out.spec.template.spec.containers[0].ports).to.not.exist()
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

      const out = new Job(testDeploy)

      expect(out.spec.template.spec.containers[0].env).to.equal(testEnvs)
      done()
    })

    it('should not add envs', (done) => {
      const out = new Job(testDeploy)
      expect(out.spec.template.spec.containers[0].env).to.not.exist()
      done()
    })
  }) // end constructor

  describe('fromInstance', () => {
    it('should create config from repo instance', (done) => {
      const out = Job.fromInstance(mockInstances.masterRepo)

      expect(out).to.be.instanceof(Job)
      expect(out).to.equal({
        apiVersion: 'batch/v1',
        kind: 'Job',
        metadata: {
          name: 'kartographer'
        },
        spec: {
          template: {
            metadata: {
              labels: {
                name: 'kartographer'
              }
            },
            spec: {
              restartPolicy: 'Never',
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

    it('should support create without container', (done) => {
      delete mockInstances.masterRepo.container

      const out = Job.fromInstance(mockInstances.masterRepo)

      expect(out).to.be.instanceof(Job)
      expect(out).to.equal({
        apiVersion: 'batch/v1',
        kind: 'Job',
        metadata: {
          name: 'kartographer'
        },
        spec: {
          template: {
            metadata: {
              labels: {
                name: 'kartographer'
              }
            },
            spec: {
              restartPolicy: 'Never',
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
      const out = Job.fromInstance(mockInstances.masterNonRepo)

      expect(out).to.be.instanceof(Job)
      expect(out).to.equal({
        apiVersion: 'batch/v1',
        kind: 'Job',
        metadata: {
          name: 'rabbitmq'
        },
        spec: {
          template: {
            metadata: {
              labels: {
                name: 'rabbitmq'
              }
            },
            spec: {
              restartPolicy: 'Never',
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
}) // end job.js unit test

