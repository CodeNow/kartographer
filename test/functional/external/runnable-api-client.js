'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const apiClient = require('external/runnable-api-client.js')
const mockInstances = require('../../fixtures/instances.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('runnable-api-client.js unit test', () => {
  const testInstance = mockInstances.masterRepo
  const testInstances = mockInstances.masterCluster
  const testOrg = testInstance.owner.github

  beforeEach((done) => {
    sinon.stub(apiClient.api, 'fetchInstances').yieldsAsync(null, testInstances)
    sinon.stub(apiClient.api, 'fetchInstance').yieldsAsync(null, testInstance)
    done()
  })

  afterEach((done) => {
    apiClient.api.fetchInstance.restore()
    apiClient.api.fetchInstances.restore()
    done()
  })

  describe('getConfigsForInstance', () => {
    it('should return configs', () => {
      return apiClient.getConfigsForInstance(testInstance)
        .then((out) => {
          expect(out).to.equal({
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
  }) // end getConfigsForInstance
})
