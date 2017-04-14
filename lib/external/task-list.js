'use strict'
const joi = require('joi')

module.exports = [{
  name: 'config.delete',
  jobSchema: joi.object({
    namespace: joi.string().required(),
    configName: joi.string().required()
  }).unknown().required().label('config.apply job data')
}, {
  name: 'config.apply',
  jobSchema: joi.object({
    namespace: joi.string().required()
  }).unknown().required().label('config.apply job data')
}, {
  name: 'config.assert',
  jobSchema: joi.object({
    namespace: joi.string().required(),
    configs: joi.object().unknown().required()
  }).unknown().required().label('config.assert job data')
}]
