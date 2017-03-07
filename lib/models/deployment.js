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
      labels: joi.object().required(),
      ports: joi.array().items(joi.number())
    }))

    // TODO: remove || {}
    const labels = Object.keys(opts.labels || {}).reduce((out, key) => {
      out[`runnable.${key}`] = opts.labels[key]
      return out
    }, {
      app: opts.name
    })

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
            labels: labels
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
      opts.ports = Object.keys(ports).map((portAndProtocol) => {
        // {String} portAndProtocol: '8080/TCP'
        const port = portAndProtocol.split('/')[0]
        return parseInt(port, 10)
      })
    }

    return new Deployment(opts)
  }

  static fromRequest (request) {
    let opts = {
      name: request.Labels.instanceName,
      image: request.Image,
      labels: request.Labels
    }

    if (request.Env.length !== 0) {
      opts.env = request.Env.map((envString) => {
        const splitEnv = envString.split('=')
        return {
          name: splitEnv[0],
          value: splitEnv[1]
        }
      })
    }

    const ports = request.Ports
    if (ports) {
      opts.ports = ports.map((port) => {
        return parseInt(port, 10)
      })
    }

    return new Deployment(opts)
  }
}
