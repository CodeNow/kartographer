'use strict'
const joi = require('joi')

module.exports = [{
  name: 'config.apply',
  jobSchema: joi.object({
    id: joi.string()
  })
}, {
  name: 'container.network.attached',
  jobSchema: joi.object().unknown()
}]
