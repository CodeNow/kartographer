'use strict'
const joi = require('joi')

module.exports = [{
  name: 'instance.created',
  jobSchema: joi.object({
    instance: joi.object({
      id: joi.string().required()
    }).unknown().required()
  }).unknown().required()
}]
