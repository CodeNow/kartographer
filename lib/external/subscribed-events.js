'use strict'
const joi = require('joi')

module.exports = [{
  name: 'application.container.requested',
  jobSchema: joi.object().unknown().required()
}, {
  name: 'container.life-cycle.started',
  jobSchema: joi.object().unknown().required()
}, {
  name: 'kart.kill',
  jobSchema: joi.object().unknown().required()
}]
