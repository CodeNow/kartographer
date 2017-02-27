'use strict'
const Promise = require('bluebird')
const RunnableClient = require('@runnable/api-client')

const logger = require('logger.js')

class Client {
  constructor () {
    this.api = new RunnableClient(process.env.RUNNABLE_API_URL)
    this.log = logger.child()
  }

  /**
   * Login into Runnable API Client
   *
   * @resolves {void}
   * @returns {Promise}
   */
  login () {
    return Promise.fromCallback(cb => {
      this.api.githubLogin(process.env.HELLO_RUNNABLE_GITHUB_TOKEN, cb)
    })
  }

  /**
   * @param {String} instanceId
   * @resolves {Array<Object>} instances - All instances part of this cluster
   * @returns {Promise}
   * @resolves {Instance}
   */
  fetchInstanceWithId (instanceId) {
    const log = this.log.child({ instanceId })
    log.info('fetchInstanceWithId called')

    return Promise.fromCallback(cb => {
      this.api.fetchInstance(instanceId, cb)
    })
  }

  /**
   * @param  {Instance} instance
   * @return {Promise}
   * @resolves {Array<Instance>} instances part of cluster
   */
  getInstancesWithMasterPod (instance) {
    this.log.info('getInstancesWithMasterPod called', { instance })

    return Promise.fromCallback(cb => {
      this.api.fetchInstances({
        owner: {
          github: instance.owner.github
        },
        masterPod: true,
        isTesting: false
      }, cb)
    })
  }
}

module.exports = new Client()
