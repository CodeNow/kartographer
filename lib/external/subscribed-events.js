'use strict'
const joi = require('utils/joi')

module.exports = [{
  name: 'instance.created',
  jobSchema: joi.object({
    instance: joi.object({
      _id: joi.string().required(),
      owner: joi.object({
        github: joi.number().required()
      }).unknown().required()
    }).unknown().required()
  }).unknown().required()
}]
