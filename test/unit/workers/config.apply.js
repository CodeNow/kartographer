'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const Worker = require('../../../lib/workers/config.apply.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('config.apply unit test', () => {
  const worker = new Worker()

  describe('_stopWorker', () => {
    it('should throw worker stop error', () => {
      const testMsg = 'pirate'
      return Promise.try(() => {
        worker._stopWorker(new Error(testMsg))
      })
      .catch(WorkerStopError, (err) => {
        expect(err.message).to.contain(testMsg)
      })
    })
  }) // end _removeUsupportedKeys
})
