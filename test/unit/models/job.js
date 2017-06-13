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
  const softMemoryLimit = '128m'

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

    it('should add labels to envs', (done) => {
      const testLabels = {
        name: '1',
        other_name: '2'
      }
      testDeploy.labels = testLabels

      const out = new Job(testDeploy)

      expect(out.spec.template.spec.containers[0].env).to.equal([{
        name: 'runnable_name',
        value: testLabels.name
      }, {
        name: 'runnable_other_name',
        value: testLabels.other_name
      }])
      done()
    })

    it('should add command and args', (done) => {
      const testCommand = ['bash', '-c']
      const testArgs = ['echo', 'hi']
      testDeploy.command = testCommand.concat(testArgs)

      const out = new Job(testDeploy)

      expect(out.spec.template.spec.containers[0].command).to.equal(testCommand)
      expect(out.spec.template.spec.containers[0].args).to.equal(testArgs)
      done()
    })

    it('should not add envs', (done) => {
      const out = new Job(testDeploy)
      expect(out.spec.template.spec.containers[0].env).to.not.exist()
      done()
    })

    it('should use SOFT_MEMORY_LIMIT', (done) => {
      process.env.SOFT_MEMORY_LIMIT = softMemoryLimit
      const out = new Job(testDeploy)
      expect(out.spec.template.spec.containers[0].resources.requests.memory).to.equal(softMemoryLimit)
      done()
    })

    it('should use softMemoryLimit', (done) => {
      const testLimit = '500g'
      process.env.SOFT_MEMORY_LIMIT = softMemoryLimit
      testDeploy.softMemoryLimit = testLimit
      const out = new Job(testDeploy)
      expect(out.spec.template.spec.containers[0].resources.requests.memory).to.equal(testLimit)
      done()
    })
  }) // end constructor

  describe('fromInstance', () => {
    beforeEach((done) => {
      process.env.SOFT_MEMORY_LIMIT = softMemoryLimit
      done()
    })

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
                resources: {
                  requests: {
                    memory: softMemoryLimit
                  }
                },
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
                resources: {
                  requests: {
                    memory: softMemoryLimit
                  }
                },
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
                resources: {
                  requests: {
                    memory: softMemoryLimit
                  }
                },
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

