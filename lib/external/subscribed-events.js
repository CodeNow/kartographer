'use strict'
const joi = require('joi')

module.exports = [{
  name: 'cluster-config.built',
  jobSchema: joi.object({
    config: joi.object({
      name: joi.string().required(),
      image: joi.string().required(),
      env: joi.array().items(
        joi.object({
          name: joi.string().required(),
          value: joi.string().required()
        })
      ),
      labels: joi.object().required(),
      ports: joi.array().items(joi.number()),
      softMemoryLimit: joi.string(),
      command: joi.array().items(joi.string()),
      orgId: joi.number()
    }).unknown().required()
  }).unknown().required()
}]
