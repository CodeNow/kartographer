'use strict'
const joi = require('joi')
const Promise = require('bluebird')

const logger = require('logger.js')
const database = require('external/database.js')

class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({ job, queue: 'config.assert' })
  }

  run () {
    return database.getConfigByIdAndNamespace(this.job.configId, this.job.namespace).bind(this)
      // .catch(database.ConfigNotExist, this._returnEmpty)
      // .catch(database.NamespaceNotExist, this._returnParentConfig)
      .then(this._mergeConfigs)
      // .then(_removeUsupportedKeys)
      // .then(_addRequiredKeys)
      .then(database._saveJsonConfig)
      // .then(_publishConfigApply)
  }

  _mergeConfigs (savedConfig) {
    return Object.assign(savedConfig.configs, this.job.configs)
  }

}

module.exports = {
  _Worker: Worker,

  jobSchema: joi.object({
    configId: joi.string().required(),
    namespace: joi.string().required(),
    configs: joi.object().unknown().required()
  }).unknown().required().label('config.assert job data'),

  task: (job) => {
    return new Worker(job).run()
  }
}
