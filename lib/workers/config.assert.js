'use strict'
const keypather = require('keypather')()
const omitDeep = require('omit-deep')
const pick = require('101/pick')
const Promise = require('bluebird')

const logger = require('../logger.js')
const publisher = require('../external/publisher.js')

module.exports = class Worker {
  constructor (job) {
    this.job = job
    this.log = logger.child({
      job,
      queue: 'config.assert'
    })
  }

  run () {
    return Promise.try(() => {
      return this._removeUnsupportedKinds(this.job.configs)
    })
    .then((configs) => {
      return this._removeUsupportedKeys(configs)
    })
    .then((configs) => {
      return this._overrideServices(configs)
    })
    .then((configs) => {
      return this._publishConfigApply(configs)
    })
  }

  _removeUnsupportedKinds (configs) {
    this.log.trace('_removeUnsupportedKinds called', { configs })
    return pick(configs, ['jobs', 'pods', 'replicaSets', 'replicationControllers', 'services'])
  }

  _removeUsupportedKeys (configs) {
    this.log.trace('_removeUsupportedKeys called', { configs })
    return omitDeep(configs, ['annotations', 'volumes', 'volumeMounts'])
  }

  _overrideServices (configs) {
    this.log.trace('_overrideServices called', { configs })
    if (!configs.services) {
      return configs
    }
    const outConfigs = Object.assign({}, configs)

    Object.keys(outConfigs.services).forEach((name) => {
      keypather.set(configs.services[name], 'spec.type', 'NodePort')
    })

    return outConfigs
  }

  _publishConfigApply (configs) {
    this.log.trace('_publishConfigApply called', { configs })
    publisher.publishTask('config.apply', {
      namespace: this.job.namespace,
      configs: configs
    })
  }
}
