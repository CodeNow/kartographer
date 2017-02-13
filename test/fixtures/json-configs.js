'use strict'
const yaml = require('js-yaml')
const fs = require('fs')

module.exports.deployments1 = {
  frontend: yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.frontend.yml'))
}

module.exports.deployments2 = {
  frontend: yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.frontend.yml')),
  rabbit: yaml.safeLoad(fs.readFileSync('./test/fixtures/deployment.rabbit.yml'))
}

// TODO: fix mixed files
module.exports.services1 = {
  frontend: yaml.safeLoad(fs.readFileSync('./test/fixtures/service.frontend.yml'))
}

module.exports.services2 = {
  frontend: yaml.safeLoad(fs.readFileSync('./test/fixtures/service.frontend.yml'))
  // rabbit: yaml.safeLoadAll(fs.readFileSync('./test/fixtures/service.rabbit.yml'))
}
module.exports.mixed = {
  // redis: yaml.safeLoadAll(fs.readFileSync('./test/fixtures/mixed.redis.yml'))
}
