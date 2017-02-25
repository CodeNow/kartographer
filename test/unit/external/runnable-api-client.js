'use strict'
const Lab = require('lab')
const Promise = require('bluebird')
const sinon = require('sinon')

const apiClient = require('external/runnable-api-client.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const afterEach = lab.afterEach
const beforeEach = lab.beforeEach
const describe = lab.describe
const it = lab.it

describe('runnable-api-client.js unit test', () => {
  describe('login', () => {
    beforeEach((done) => {
      sinon.stub(apiClient.api, 'githubLogin')
      done()
    })

    afterEach((done) => {
      apiClient.api.githubLogin.restore()
      done()
    })

    it('should login to api', () => {
      apiClient.api.githubLogin.yieldsAsync()

      return apiClient.login()
        .then(() => {
          sinon.assert.calledOnce(apiClient.api.githubLogin)
          sinon.assert.calledWith(apiClient.api.githubLogin, process.env.HELLO_RUNNABLE_GITHUB_TOKEN)
        })
    })
  }) // end login
})

