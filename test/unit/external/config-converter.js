'use strict'
require('loadenv')()
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')

const configConverter = require('../../../lib/external/config-converter.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('service.js unit test', () => {
  describe('_getNamespace', () => {
    it('should return master', (done) => {
      const out = configConverter._getNamespace({
        masterPod: true,
        isTesting: false
      })
      expect(out).to.equal('master')
      done()
    })

    it('should return master testing', (done) => {
      const out = configConverter._getNamespace({
        masterPod: true,
        isTesting: true
      })
      expect(out).to.equal('master-testing')
      done()
    })

    it('should return isolation id', (done) => {
      const testIsolationId = 'ahoy'
      const out = configConverter._getNamespace({
        masterPod: false,
        isTesting: true,
        isolated: testIsolationId
      })
      expect(out).to.equal(testIsolationId)
      done()
    })

    it('should return isolation id', (done) => {
      const testIsolationId = 'deck'
      const out = configConverter._getNamespace({
        masterPod: false,
        isTesting: false,
        isolated: testIsolationId
      })
      expect(out).to.equal(testIsolationId)
      done()
    })

    it('should return short hash', (done) => {
      const testShortHash = 'mate'
      const out = configConverter._getNamespace({
        masterPod: false,
        shortHash: testShortHash
      })
      expect(out).to.equal(testShortHash)
      done()
    })
  }) // end _getNamespace
}) // end service.js unit test

