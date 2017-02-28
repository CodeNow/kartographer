'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const publisher = require('external/publisher.js')
const mockInstances = require('../../fixtures/instances.js')
const Worker = require('workers/instance.updated.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('instance.updated.js functional test', () => {
  const testOrg = mockInstances.masterRepo.owner.github

  beforeEach((done) => {
    sinon.stub(publisher, 'publishTask')
    done()
  })

  afterEach((done) => {
    publisher.publishTask.restore()
    done()
  })

  describe('run', () => {
    it('should return configs for repo container', () => {
      const testInstance = mockInstances.masterRepo
      const worker = new Worker({
        instance: testInstance
      })

      return worker.run(testInstance)
        .then((out) => {
          sinon.assert.calledOnce(publisher.publishTask)
          sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
            namespace: `${testOrg}-master`,
            configs: {
              deployments: {
                kartographer: {
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
                }
              },
              services: {}
            }
          })
        })
    })

    it('should return configs', () => {
      const testInstance = mockInstances.masterNonRepo
      const worker = new Worker({
        instance: testInstance
      })

      return worker.run(testInstance)
        .then((out) => {
          sinon.assert.calledOnce(publisher.publishTask)
          sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
            namespace: `${testOrg}-master`,
            configs: {
              deployments: {
                rabbitmq: {
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
                }
              },
              services: {
                rabbitmq: {
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
                }
              }
            }
          })
        })
    })
  }) // end run
})
