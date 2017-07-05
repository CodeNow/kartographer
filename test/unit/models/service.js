'use strict'
require('loadenv')()
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const Service = require('../../../lib/models/service.js')
const mockClusterConfig = require('../../fixtures/clusterConfig.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('service.js unit test', () => {
  describe('constructor', () => {
    let testService

    beforeEach((done) => {
      testService = {
        name: 'test',
        ports: [90,  60]
      }
      done()
    })

    it('should add ports', (done) => {
      const out = new Service(testService)

      expect(out.spec.ports).to.equal([
        {containerPort: 90},
        {containerPort : 60}])

      done()
    })
  }) // end constructor

  describe('fromClusterConfigBuilt', () => {
    it('should create config from repo instance', (done) => {
      const out = Service.fromClusterConfigBuilt(mockClusterConfig.master)

      expect(out).to.be.instanceof(Service)
      expect(out).to.equal({
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: mockClusterConfig.master.name
        },
        spec: {
          selector: {
            name: mockClusterConfig.master.name
          },
          ports: [{containerPort: 1},{containerPort: 2},{containerPort: 3}],
          type: 'NodePort'
        }
      })
      done()
    })
  }) // end fromInstance
}) // end service.js unit test

