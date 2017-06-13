'use strict'
const Code = require('code')
const Lab = require('lab')
const merge = require('deepmerge')
const Promise = require('bluebird')

const mockJsonConfigs = require('../../fixtures/json-configs.js')
const Worker = require('../../../lib/workers/config.assert.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.assert unit test', () => {
  const worker = new Worker()

  describe('_removeUsupportedKeys', () => {
    it('should remove keys we dont care about', (done) => {
      const config = worker._removeUsupportedKeys({
        jobs: mockJsonConfigs.jobs1Dirty
      })
      expect(config).to.equal({
        jobs: mockJsonConfigs.jobs1
      })
      done()
    })
  }) // end _removeUsupportedKeys

  describe('_removeUnsupportedKinds', () => {
    it('should remove kinds we dont care about', (done) => {
      const config = worker._removeUnsupportedKinds({
        jobs: mockJsonConfigs.jobs1,
        services: mockJsonConfigs.services1,
        volumes: {},
        secrets: {}
      })

      expect(config).to.equal({
        jobs: mockJsonConfigs.jobs1,
        services: mockJsonConfigs.services1
      })
      done()
    })
  }) // end _removeUnsupportedKinds

  describe('_overrideServices', () => {
    it('should override type to NodePort', (done) => {
      const config = worker._overrideServices({
        services: mockJsonConfigs.services1LoadBalancer
      })

      expect(config).to.equal({
        services: merge(mockJsonConfigs.services1, { frontend: { spec: { type: 'NodePort' } } }, {
          clone: true
        })
      })
      done()
    })

    it('should add type to NodePort', (done) => {
      const config = worker._overrideServices({
        services: mockJsonConfigs.services1
      })

      expect(config).to.equal({
        services: merge(mockJsonConfigs.services1, { frontend: { spec: { type: 'NodePort' } } }, {
          clone: true
        })
      })
      done()
    })
  }) // end _overrideServices
})
