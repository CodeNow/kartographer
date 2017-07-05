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
      runnableOrgId: joi.number().required()
    }))

    const name = opts.name.toLowerCase()
    // console.log('passed opts: ', opts)
    // TODO: remove || {}
    const envLabels = Object.keys(opts.labels || {}).map((key) => {
      return {
        name: `runnable_${key}`,
        value: `${opts.labels[key]}`
      }
    })

    // console.log('env labels', envLabels)

    let envs = envLabels.concat(opts.env || []).map((item) => {
      return {
        name: item.name.replace(/\./g, '_').replace(/-/g, '_'),
        value: item.value.toLowerCase()
      }
    })

    if (envs.length === 0) {
      envs = null
    }

    let runnableOrgId = opts.runnableOrgId
    // shallow clone
    let commands = keypather.get(opts, 'command.slice(0)')

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
              'runnable.org.id': runnableOrgId
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

    if (commands) {
      this.spec.template.spec.containers[0].command = [commands.shift(), commands.shift()]
      this.spec.template.spec.containers[0].args = commands
    }
  }

  static fromClusterConfigBuilt(config) {
    // console.log('the config', config)

    let opts = {
      name: config.name,
      image: config.image,
      // TODO: Replace with the value once it exists
      runnableOrgId: config.orgId, // Does not exist yet
      env: config.env || [],
      ports: config.ports || [],
      softMemoryLimit: config.softMemoryLimit,
      command: config.command || [],
      labels: config.labels
    }

    return new Job(opts)
  }
}
