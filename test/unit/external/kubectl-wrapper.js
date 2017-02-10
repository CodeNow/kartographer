'use strict'
const childProcess = require('child_process')
const Code = require('code')
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const KubectlWrapper = require('external/kubectl-wrapper.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const expect = Code.expect
const it = lab.it

describe('kubectl-wrapper.js unit test', () => {
  let kubectl
  let spawnMock

  beforeEach((done) => {
    kubectl = new KubectlWrapper({
      endpoint: 'end',
      namespace: 'point'
    })

    spawnMock = {
      stdout: {
        on: sinon.stub()
      },
      stderr: {
        on: sinon.stub()
      },
      on: sinon.stub()
    }
    sinon.stub(childProcess, 'spawn').returns(spawnMock)
    done()
  })

  afterEach((done) => {
    childProcess.spawn.restore()
    done()
  })

  describe('_runCommand', () => {
    it('should return stdout contents', () => {
      const testStdout = 'mizzen'

      spawnMock.stdout.on.yields(testStdout)
      spawnMock.on.yieldsAsync()
      return kubectl._runCommand('bash')
        .then((out) => {
          expect(out).to.equal(testStdout)
        })
    })

    it('should return stderr contents', () => {
      const testStdout = 'mizzen'

      spawnMock.stderr.on.yields(testStdout)
      spawnMock.on.yieldsAsync()
      return kubectl._runCommand('bash')
        .catch((out) => {
          expect(out).to.be.an.instanceof(KubectlWrapper.CommandError)
        })
    })
  }) // end _runCommand
})
