'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const apiClient = require('external/runnable-api-client.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('runnable-api-client.js unit test', () => {
  describe('_getClusterInfoForMasterPod', () => {
    const testInstance = { owner: { github: 'Ashore' } }
    const testInstances = [
      { owner: { github: 'Abeam' } },
      { owner: { github: 'Aloft' } },
      { owner: { github: 'Anchor' } }
    ]

    beforeEach((done) => {
      sinon.stub(apiClient.api, 'fetchInstances')
      done()
    })

    afterEach((done) => {
      apiClient.api.fetchInstances.restore()
      done()
    })

    it('should return cluster info', () => {
      apiClient.api.fetchInstances.yieldsAsync(null, testInstances)

      return apiClient._getClusterInfoForMasterPod(testInstance)
        .then((out) => {
          sinon.assert.calledOnce(apiClient.api.fetchInstances)
          sinon.assert.calledWith(apiClient.api.fetchInstances, {
            owner: { github: 'Ashore' },
            masterPod: true,
            isTesting: false
          })

          expect(out).to.equal({
            instances: testInstances,
            namespace: 'master',
            configId: testInstance.owner.github + '-master'
          })
        })
    })
  }) // end _getClusterInfoForMasterPod
})

