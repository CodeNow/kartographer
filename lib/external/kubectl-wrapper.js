'use strict'
const childProcess = require('child_process')
const fs = require('fs')
const Promise = require('bluebird')
const tmpFile = require('tmp-promise')

const logger = require('logger.js')

module.exports = class KubectlWrapper {
  constructor (args) {
    const command = []

    this.log = logger.child({ args })
    this.endpoint = args.endpoint
    this.namespace = args.namespace

    command.push(process.env.KUBECTL_PATH)
    command.push(`--namespace=${args.namespace}`)
    command.push(`--server=${args.endpoint}`)

    this.kubctlCmd = command.join(' ')
  }

  /**
   * Send apply command to k8 with config
   * @param  {K8Config} config
   * @return {Promise}
   */
  apply (config) {
    this.log.trace('apply called')

    return tmpFile.withFile((tempFile) => {
      return this._writeConfigToFile(config, tempFile.path).bind(this)
        .then(this._generateKubeCtlCommand)
        .then(this._runCommand)
    })
  }

  /**
   * @param  {K8Config} config
   * @param  {String} tempFilePath path to tempfile to write config to
   * @return {String} tempFilePath
   */
  _writeConfigToFile (config, configFilePath) {
    this.log.trace('_writeConfigToFile called', {
      configFilePath
    })

    return Promise.fromCallback((cb) => {
      fs.writeFile(configFilePath, JSON.stringify(config), cb)
    })
    .return(configFilePath)
  }

  /**
   * @param  {String} configFilePath
   * @return {String} kube-ctl command to run
   */
  _generateKubeCtlCommand (configFilePath) {
    this.log.trace('_generateKubeCtlCommand called', {
      configFilePath
    })
    return `${this.kubctlCmd} apply -f ${configFilePath} --output=name`
  }

  /**
   * @param  {String} commandToRun
   * @return {Promise}
   * @resolves {String} stdout from command
   * @rejects {KubectlWrapper.CommandError} when command filed
   */
  _runCommand (commandToRun) {
    this.log.trace('_runCommand called', {
      commandToRun
    })
    return Promise.fromCallback((cb) => {
      const stdout = []
      const stderr = []
      const kube = childProcess.spawn('bash', ['-c', commandToRun])

      kube.stdout.on('data', (data) => {
        stdout.push(data.toString())
      })

      kube.stderr.on('data', (data) => {
        stderr.push(data.toString())
      })

      kube.on('close', () => {
        if (!stderr.length) {
          return cb(null, stdout.join(''))
        }

        cb(new KubectlWrapper.CommandError(commandToRun, stderr.join('')))
      })
    })
  }
}

module.exports.CommandError = class CommandError extends Error {
  constructor (cmd, stderr) {
    super(`${cmd} caused error ${stderr}`)
  }
}
