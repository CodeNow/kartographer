'use strict'
const fs = require('fs')
const merge = require('deepmerge')
const yaml = require('js-yaml')

const frontendDeploy = yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.frontend.yml'))
const rabbitDeploy = yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.rabbit.yml'))
const frontendService = yaml.safeLoad(fs.readFileSync('./test/fixtures/service.frontend.yml'))

module.exports.deployments1 = {
  frontend: frontendDeploy
}

module.exports.deployments1Dirty = {
  frontend: merge(frontendDeploy, {
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
            volumeMounts: {
              name: 'vol'
            }
          }],
          resources: {
            limits: {
              cpu: '60'
            }
          },
          volumes: {
            name: 'vol'
          }
        }
      }
    }
  })
}

// overrides
// nodeSelector: {
//   disktype: 'ssd'
// }
module.exports.deployments2 = {
  frontend: frontendDeploy,
  rabbit: rabbitDeploy
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
  })
}

module.exports.services2 = {
  frontend: frontendService
  // rabbit: yaml.safeLoadAll(fs.readFileSync('./test/fixtures/service.rabbit.yml'))
}
module.exports.mixed = {
  // redis: yaml.safeLoadAll(fs.readFileSync('./test/fixtures/mixed.redis.yml'))
}
