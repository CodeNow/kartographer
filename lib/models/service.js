'use strict'
const joi = require('joi')

module.exports = class Deployment {
  constructor (opts) {
    joi.validate(opts, joi.object({
      name: joi.string().required(),
      ports: joi.array().items(joi.number()).required()
    }))

    this.config = {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: opts.name
      },
      spec: {
        selector: {
          app: opts.name
        },
        ports: opts.ports.map((port) => {
          return {
            protocol: 'TCP',
            targetPort: port
          }
        }),
        type: 'NodePort'
      }
    }
  }

  static fromInstance (instance) {
    let opts = {
      name: instance.lowerName,
      ports: Object.keys(instance.container.ports).map((key) => {
        const port = instance.container.ports[key][0].HostPort
        return parseInt(port, 10)
      })
    }

    return new Deployment(opts)
  }
}
