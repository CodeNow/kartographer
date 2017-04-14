'use strict'
const joi = require('joi')

module.exports = class Service {
  constructor (opts) {
    joi.validate(opts, joi.object({
      name: joi.string().required(),
      ports: joi.array().items({
        host: joi.number().required(),
        container: joi.number().required()
      }).required(),
      contextVersionId: joi.string().required()
    }))
    const name = opts.name.toLowerCase()

    Object.assign(this, {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: name,
        labels: {
          name: opts.contextVersionId
        }
      },
      spec: {
        selector: {
          name: opts.contextVersionId
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
    })
  }

  static fromInstance (instance) {
    let opts = {
      name: instance.lowerName,
      ports: Object.keys(instance.container.ports).map((portAndProtocol) => {
        // {String} portAndProtocol: '8080/TCP'
        const hostPort = instance.container.ports[portAndProtocol][0].HostPort
        const containerPort = portAndProtocol.split('/')[0]

        return {
          host: parseInt(hostPort, 10),
          container: parseInt(containerPort, 10)
        }
      })
    }

    return new Service(opts)
  }

  static fromRequest (request) {
    let opts = {
      name: request.Labels.instanceName,
      contextVersionId: request.Labels.contextVersionId,
      ports: request.Ports.map((port) => {
        return {
          host: parseInt(port, 10),
          container: parseInt(port, 10)
        }
      })
    }

    return new Service(opts)
  }
}
