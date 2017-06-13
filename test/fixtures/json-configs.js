'use strict'
const fs = require('fs')
const merge = require('deepmerge')
const yaml = require('js-yaml')

const frontendJob = yaml.safeLoad(fs.readFileSync('./test/fixtures/job.frontend.yml').toString())
const rabbitJob = yaml.safeLoad(fs.readFileSync('./test/fixtures/job.rabbit.yml').toString())
const frontendService = yaml.safeLoad(fs.readFileSync('./test/fixtures/service.frontend.yml').toString())

module.exports.jobs1 = {
  frontend: frontendJob
}

module.exports.jobs1Dirty = {
  frontend: merge(frontendJob, {
    metadata: {
      annotations: {
        'scheduler.alpha.kubernetes.io/affinity': 'like'
      }
    },
    spec: {
      template: {
        metadata: {
          annotations: {
            'scheduler.alpha.kubernetes.io/affinity': 'like'
          }
        },
        spec: {
          containers: [{
            resources: {
              limits: {
                cpu: '60'
              }
            },
            volumeMounts: {
              name: 'vol'
            }
          }],
          volumes: {
            name: 'vol'
          }
        }
      }
    }
  }, {
    clone: true
  })
}

// overrides
// nodeSelector: {
//   disktype: 'ssd'
// }
module.exports.jobs2 = {
  frontend: frontendJob,
  rabbit: rabbitJob
}

// TODO: fix mixed files
module.exports.services1 = {
  frontend: frontendService
}

module.exports.services1LoadBalancer = {
  frontend: merge(frontendService, {
    spec: {
      type: 'LoadBalancer'
    }
  }, {
    clone: true
  })
}

module.exports.services2 = {
  frontend: frontendService
  // rabbit: yaml.safeLoadAll(fs.readFileSync('./test/fixtures/service.rabbit.yml'))
}
module.exports.mixed = {
  // redis: yaml.safeLoadAll(fs.readFileSync('./test/fixtures/mixed.redis.yml'))
}
