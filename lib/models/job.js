'use strict'
const joi = require('joi')
const keypather = require('keypather')()

module.exports = class Job {
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
    const name = opts.name.toLowerCase()
    // TODO: remove || {}
    const envLabels = Object.keys(opts.labels || {}).map((key) => {
      return {
        name: `runnable_${key}`,
        value: `${opts.labels[key]}`
      }
    })


    let envs = envLabels.concat(opts.env || []).map((item) => {
      return {
        name: item.name.replace(/\./g, '_').replace(/-/g, '_'),
        value: item.value.toLowerCase()
      }
    })

    if (envs.length === 0) {
      envs = null
    }

    Object.assign(this, {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: name
      },
      spec: {
        template: {
          metadata: {
            name: name,
            labels: {
              name: name
            }
          },
          spec: {
            containers: [{
              name: name,
              image: opts.image
            }],
            restartPolicy: 'Never'
          }
        }
      }
    })

    if (opts.ports) {
      this.spec.template.spec.containers[0].ports = opts.ports.map((port) => {
        return { containerPort: port }
      })
    }

    if (envs) {
      this.spec.template.spec.containers[0].env = envs
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

    return new Job(opts)
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

    return new Job(opts)
  }
}
