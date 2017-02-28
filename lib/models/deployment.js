'use strict'
const joi = require('joi')
const keypather = require('keypather')()

module.exports = class Deployment {
  constructor (opts) {
    joi.validate(opts, joi.object({
      name: joi.string().required(),
      image: joi.string().required(),
      env: joi.array().items(joi.object({
        name: joi.string().required(),
        value: joi.string().required()
      })),
      ports: joi.array().items(joi.number())
    }))

    Object.assign(this, {
      apiVersion: 'extensions/v1beta1',
      kind: 'Deployment',
      metadata: {
        name: opts.name
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: opts.name
            }
          },
          spec: {
            containers: [{
              name: opts.name,
              image: opts.image
            }]
          }
        }
      }
    })

    if (opts.ports) {
      this.spec.template.spec.containers[0].ports = opts.ports.map((port) => {
        return { containerPort: port }
      })
    }

    if (opts.env) {
      this.spec.template.spec.containers[0].env = opts.env
    }
  }

  static fromInstance (instance) {
    let opts = {
      name: instance.lowerName,
      image: instance.contextVersion.build.dockerTag
    }

    if (instance.env.length !== 0) {
      opts.env = instance.env.map((envString) => {
        const splitEnv = envString.split('=')
        return {
          name: splitEnv[0],
          value: splitEnv[1]
        }
      })
    }

    const ports = keypather.get(instance, 'container.ports')
    if (ports) {
      opts.ports = Object.keys(ports).map((protoAndPort) => {
        const port = protoAndPort.split('/')[0]
        return parseInt(port, 10)
      })
    }

    return new Deployment(opts)
  }
}
