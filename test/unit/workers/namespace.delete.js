'use strict'
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')
const WorkerStopError = require('error-cat/errors/worker-stop-error')

const Worker = require('../../../lib/workers/namespace.delete.js')
const KubectlWrapper = require('../../../lib/external/kubectl-wrapper.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('namespace.delete unit test', () => {
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
  }) // end _stopWorker

  describe('run', () => {
    beforeEach((done) => {
      sinon.stub(worker, '_deleteKubernetesNamespace')
      done()
    })

    afterEach((done) => {
      worker._deleteKubernetesNamespace.restore()
      done()
    })

    it('should throw worker stop error', () => {
      const testCmd = 'run'
      const testStderr = 'failed'
      worker._deleteKubernetesNamespace.rejects(new KubectlWrapper.ValidationError(testCmd, testStderr))

      return worker.run()
      .catch(WorkerStopError, (err) => {
        expect(err.message).to.contain(testCmd)
        expect(err.message).to.contain(testStderr)
      })
    })

    it('should throw worker stop error', () => {
      const testCmd = 'run'
      const testStderr = 'failed'
      worker._deleteKubernetesNamespace.rejects(new KubectlWrapper.NotFoundError(testCmd, testStderr))

      return worker.run()
      .catch(WorkerStopError, (err) => {
        expect(err.message).to.contain(testCmd)
        expect(err.message).to.contain(testStderr)
      })
    })

    it('should throw not worker stop error', () => {
      const testMsg = 'what what'
      worker._deleteKubernetesNamespace.rejects(new Error(testMsg))

      return worker.run()
      .catch(WorkerStopError, (err) => {
        throw new Error('should not be called')
      })
      .catch((err) => {
        expect(err.message).to.include(testMsg)
      })
    })
  })
})
