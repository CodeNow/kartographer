'use strict'
const yaml = require('js-yaml')

const logger = require('logger.js')

class Database {
  constructor () {
    this.log = logger
  }

  getClusterConfigYaml () {
    return {
      namespace: 'v1',
      data: yaml.safeDump({
        'kind': 'Service',
        'apiVersion': 'v1',
        'metadata': {
          'name': 'testt'
        },
        'spec': {
          'selector': {
            'app': 'testt'
          },
          'ports': [
            {
              'protocol': 'TCP',
              'port': 80,
              'targetPort': 80
            }
          ],
          'type': 'NodePort'
        }
      })
    }
  }
}

module.exports = new Database()
