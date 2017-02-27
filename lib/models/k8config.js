'use strict'
const joi = require('joi')

module.exports = class K8Config {
  constructor (opts) {
    joi.assert(opts, joi.object({
      namespace: joi.string().required(),
      configId: joi.string().required(),
      configs: joi.object().required()
    }).required())
    Object.assign(this, opts)
  }
}
