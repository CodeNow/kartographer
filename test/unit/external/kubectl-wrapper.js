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

  describe('_convertError', () => {
    it('should return CommandError', (done) => {
      const error = kubectl._convertError('echo', 'baddd')
      expect(error).to.be.instanceof(KubectlWrapper.CommandError)
      done()
    })

    it('should return ValidationError', (done) => {
      const error = kubectl._convertError('echo', 'Error: /usr/local/bin/kubectl --namespace=master --kubeconfig=/Users/anandkumarpatel/.kube/config apply -f /var/folders/q8/_fnbp4yj23g297nlbs2xxrtw0000gn/T/tmp-15878qdWwnhTM7as6.tmp --output=name caused error error: error validating "/var/folders/q8/_fnbp4yj23g297nlbs2xxrtw0000gn/T/tmp-15878qdWwnhTM7as6.tmp": error validating data: couldn\'t get version/kind; json parse error: json: cannot unmarshal string into Go value of type struct { APIVersion string "json:"apiVersion,omitempty""; Kind string "json:"kind,omitempty"" }; if you choose to ignore these errors, turn validation off with --validate=false')
      expect(error).to.be.instanceof(KubectlWrapper.ValidationError)
      done()
    })

    it('should return NotFound', (done) => {
      const error = kubectl._convertError('echo', 'Error from server (NotFound): namespaces "davy-jones-locker" not found')
      expect(error).to.be.instanceof(KubectlWrapper.NotFoundError)
      done()
    })
  }) // end _convertError
})

