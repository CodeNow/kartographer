'use strict'
const joi = require('joi')

module.exports = [{
  name: 'application.container.requested',
  jobSchema: joi.object().unknown().required()
}]
