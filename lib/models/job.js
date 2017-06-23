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
      ports: joi.array().items(joi.number()),
      softMemoryLimit: joi.string(),
      command: joi.array().items(joi.string()),
      orgId: joi.number().required() // big poppa
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

    let orgId = opts.orgId
    Object.assign(this, {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: name
      },
      spec: {
        template: {
          metadata: {
            labels: {
              name: name
            }
          },
          spec: {
            nodeSelector: {
              'runnable.org.id': orgId
            },
            containers: [{
              name: name,
              image: opts.image,
              resources: {
                requests: {
                  memory: opts.softMemoryLimit || process.env.SOFT_MEMORY_LIMIT
                }
              }
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

    if (opts.command) {
      this.spec.template.spec.containers[0].command = [opts.command.shift(), opts.command.shift()]
      this.spec.template.spec.containers[0].args = opts.command
    }
  }

  static fromInstance (instance) {
    let opts = {
      name: instance.lowerName,
      image: instance.contextVersion.build.dockerTag,
      // TODO: Replace with the value once it exists
      orgId: instance.owner.github
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
}
