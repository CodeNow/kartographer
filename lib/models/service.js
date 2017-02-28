'use strict'
const joi = require('joi')

module.exports = class Deployment {
  constructor (opts) {
    joi.validate(opts, joi.object({
      name: joi.string().required(),
      ports: joi.array().items({
        host: joi.number().required(),
        container: joi.number().required()
      }).required()
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
        ports: opts.ports.map((ports) => {
          return {
            protocol: 'TCP',
            port: ports.host,
            targetPort: ports.container
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
        const hostPort = instance.container.ports[key][0].HostPort
        const containerPort = key.split('/')[0]

        return {
          host: parseInt(hostPort, 10),
          container: parseInt(containerPort, 10)
        }
      })
    }

    return new Deployment(opts)
  }
}
