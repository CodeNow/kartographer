'use strict'
const joi = require('joi')

module.exports = class Service {
  constructor (opts) {
    joi.validate(opts, joi.object({
      name: joi.string().required(),
      ports: joi.array().items(joi.number()).required()
    }))

    Object.assign(this, {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: opts.name
      },
      spec: {
        selector: {
          name: opts.name
        },
        ports: (opts.ports || []).map((port) => {
          return {
            containerPort : port
          }
        }),
        type: 'NodePort'
      }
    })
  }

  static fromClusterConfigBuilt (clusterConfig) {
    let opts = {
      name: clusterConfig.name,
      ports: clusterConfig.ports
    }

    return new Service(opts)
  }
}
