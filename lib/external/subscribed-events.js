'use strict'
const joi = require('joi')

module.exports = [{
  name: 'instance.updated',
  jobSchema: joi.object({
    instance: joi.object({
      lowerName: joi.string().required(),
      env: joi.array().items(joi.string()),
      ports: joi.object().unknown(),
      contextVersion: joi.object({
        build: joi.object({
          dockerTag: joi.string().required()
        }).unknown().required()
      }).unknown().required()
    }).unknown().required()
  }).unknown().required()
}]
