'use strict'
const childProcess = require('child_process')
const fs = require('fs')
const Promise = require('bluebird')
const tmpFile = require('tmp-promise')
const yaml = require('js-yaml')

const logger = require('logger.js')

module.exports = class KubectlWrapper {
  constructor (args) {
    const command = []

    this.log = logger.child({ args })
    this.namespace = args.namespace

    command.push(process.env.KUBECTL_PATH)
    command.push(`--namespace=${args.namespace}`)
    command.push(`--kubeconfig=${process.env.CONFIG_FILE_PATH}`)

    this.kubctlCmd = command.join(' ')
  }

  /**
   * Send apply command to k8 with jsonConfigs
   * @param  {K8Config} jsonConfigs
   * @return {Promise}
   */
  apply (jsonConfigs) {
    this.log.trace('apply called')

    return Promise.try(() => {
      return this._addNamespace(jsonConfigs)
    })
    .then(this._formatJsonConfigToYaml)
    .then((configYml) => {
      this.log.trace('yaml created', { configYml })
      return tmpFile.withFile((tempFile) => {
        return this._writeConfigToFile(configYml, tempFile.path).bind(this)
        .then(this._generateKubeCtlCommand)
        .then(this._runCommand)
      })
    })
  }

  /**
   * add namespace config. Append A because we need this to be first item
   * @param {[type]} jsonConfigs [description]
   */
  _addNamespace (jsonConfigs) {
    return Object.assign({}, jsonConfigs, {
      'Anamespaces': {
        namespace: {
          apiVersion: 'v1',
          kind: 'Namespace',
          metadata: {
            name: this.namespace
          }
        }
      }
    })
  }

  /**
   * Creates yaml file with all configs sorted by kind
   * We sort because we need `Anamespace` to be first item
   * @param  {Object} jsonConfigs An object who's keys are a k8 kind
   * @param  {Array} jsonConfigs.<kind>
   * @return {String} yaml file with all configs
   */
  _formatJsonConfigToYaml (jsonConfigs) {
    const ymalConfig = []
    Object.keys(jsonConfigs).sort().forEach((kind) => {
      Object.keys(jsonConfigs[kind]).forEach((kindName) => {
        ymalConfig.push(yaml.safeDump(jsonConfigs[kind][kindName]))
      })
    })

    return ymalConfig.join('---\n')
  }

  /**
   * @param  {String} ymlConfigs full yml file
   * @param  {String} tempFilePath path to tempfile to write ymlConfigs to
   * @return {Promise}
   * @resolves {String} tempFilePath
   */
  _writeConfigToFile (ymlConfigs, configFilePath) {
    this.log.trace('_writeConfigToFile called', {
      configFilePath
    })

    return Promise.fromCallback((cb) => {
      fs.writeFile(configFilePath, ymlConfigs, cb)
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
          const msg = stdout.join('')
          this.log.trace('command successful', { stdout: msg })
          return cb(null, msg)
        }

        cb(this._convertError(commandToRun, stderr.join('')))
      })
    })
  }

  _convertError (commandToRun, stderr) {
    if (stderr.includes('error validating')) {
      return new KubectlWrapper.ValidationError(commandToRun, stderr)
    }

    return new KubectlWrapper.CommandError(commandToRun, stderr)
  }
}

module.exports.CommandError = class CommandError extends Error {
  constructor (cmd, stderr) {
    super(`${stderr}: cmd: ${cmd}`)
  }
}

module.exports.ValidationError = class ValidationError extends Error {
  constructor (cmd, stderr) {
    super(`${stderr}: cmd: ${cmd}`)
  }
}
