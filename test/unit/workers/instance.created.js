'use strict'
const Lab = require('lab')
const Promise = require('bluebird')

const Worker = require('workers/instance.created.js')

require('sinon-as-promised')(Promise)
const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it

describe('instance.created unit test', () => {
  const worker = new Worker()

  describe('run', () => {
    it('should not error', () => {
      return Promise.try(() => {
        worker.run()
      })
    })
  }) // end run
})
