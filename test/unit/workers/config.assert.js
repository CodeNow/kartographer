'use strict'
const Code = require('code')
const Lab = require('lab')
const merge = require('deepmerge')
const Promise = require('bluebird')

const mockJsonConfigs = require('../../fixtures/json-configs.js')
const Worker = require('workers/config.assert.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply functional test', () => {
  const worker = new Worker()

  describe('_removeUsupportedKeys', () => {
    it('should remove keys we dont care about', () => {
      return worker._removeUsupportedKeys({
        deployments: mockJsonConfigs.deployments1Dirty
      })
      .then((config) => {
        expect(config).to.equal({
          deployments: mockJsonConfigs.deployments1
        })
      })
    })
  }) // end _removeUsupportedKeys

  describe('_removeUnsupportedKinds', () => {
    it('should remove kinds we dont care about', () => {
      return worker._removeUnsupportedKinds({
        deployments: mockJsonConfigs.deployments1,
        services: mockJsonConfigs.services1,
        volumes: {},
        secrets: {}
      })
      .then((config) => {
        expect(config).to.equal({
          deployments: mockJsonConfigs.deployments1,
          services: mockJsonConfigs.services1
        })
      })
    })
  }) // end _removeUnsupportedKinds

  describe('_overrideServices', () => {
    it('should override type to NodePort', () => {
      return worker._overrideServices({
        services: mockJsonConfigs.services1LoadBalancer
      })
      .then((config) => {
        expect(config).to.equal({
          services: merge(mockJsonConfigs.services1, { frontend: { spec: { type: 'NodePort' } } }, {
            clone: true
          })
        })
      })
    })

    it('should add type to NodePort', () => {
      return worker._overrideServices({
        services: mockJsonConfigs.services1
      })
      .then((config) => {
        expect(config).to.equal({
          services: merge(mockJsonConfigs.services1, { frontend: { spec: { type: 'NodePort' } } }, {
            clone: true
          })
        })
      })
    })
  }) // end _overrideServices
})
