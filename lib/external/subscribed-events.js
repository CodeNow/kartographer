'use strict'
const joi = require('joi')

module.exports = [{
  name: 'instance.created',
  jobSchema: joi.object({
    instance: joi.object({
      _id: joi.string().required(),
      owner: joi.object({
        github: joi.number().required()
      }).unknown().required(),
      env: joi.array().required(),
      shouldNotAutofork: joi.boolean(),
      isTesting: joi.boolean()
    }).unknown().required()
  }).unknown().required()
}]
