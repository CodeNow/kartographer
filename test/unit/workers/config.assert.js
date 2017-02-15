'use strict'
const Code = require('code')
const Lab = require('lab')
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
        console.log('mockJsonConfigs.deployments1', mockJsonConfigs.deployments1)
        console.log('mockJsonConfigs.deployments1Dirty', mockJsonConfigs.deployments1Dirty)
        console.log('config', config)
        expect(config).to.equal({
          deployments: mockJsonConfigs.deployments1
        })
      })
    })
  }) // end _removeUsupportedKeys
})
