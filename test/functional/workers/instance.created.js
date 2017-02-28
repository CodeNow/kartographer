'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const apiClient = require('external/runnable-api-client.js')
const publisher = require('external/publisher.js')
const mockInstances = require('../../fixtures/instances.js')
const Worker = require('workers/instance.created.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('instance.created.js functional test', () => {
  const testInstance = mockInstances.masterRepo
  const testInstances = mockInstances.masterCluster
  const testOrg = testInstance.owner.github

  beforeEach((done) => {
    sinon.stub(apiClient.api, 'fetchInstances').yieldsAsync(new Error('wrong instance'))
    sinon.stub(apiClient.api, 'fetchInstance').yieldsAsync(new Error('wrong query'))
    sinon.stub(publisher, 'publishTask')
    done()
  })

  afterEach((done) => {
    publisher.publishTask.restore()
    apiClient.api.fetchInstance.restore()
    apiClient.api.fetchInstances.restore()
    done()
  })

  describe('run', () => {
    it('should return configs', () => {
      apiClient.api.fetchInstance
        .withArgs(testInstance.id)
        .yieldsAsync(null, testInstance)

      apiClient.api.fetchInstances
        .withArgs({
          owner: {
            github: testOrg
          },
          masterPod: true,
          isTesting: false
        })
        .yieldsAsync(null, testInstances)

      const worker = new Worker({
        instance: {
          id: testInstance.id
        }
      })
      return worker.run(testInstance)
        .then((out) => {
          sinon.assert.calledOnce(publisher.publishTask)
          sinon.assert.calledWith(publisher.publishTask, 'config.assert', {
            namespace: 'master',
            configId: `${testOrg}-master`,
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
                },
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
                }
              }
            }
          })
        })
    })
  }) // end run
})
