// 'use strict'
// require('loadenv')()
// const Lab = require('lab')

// // const expect = require('chai').expect
// // const keypather = require('keypather')()
// const Promise = require('bluebird')
// const Runnable = require('@runnable/api-client')

// function promisifyClientModel (obj) {
//   const hasProp = {}.hasOwnProperty
//   for (var key in obj) {
//     ((key) => {
//       if (hasProp.call(obj, key + 'Async') !== false) {
//         return
//       }
//       if (typeof obj[key] === 'function') {
//         let myFunc = function () {
//           let results
//           return Promise.fromCallback((cb) => {
//             const args = [].slice.call(arguments)
//             args.push(cb)
//             results = obj[key].apply(obj, args)
//           })
//             .return(results)
//         }
//         obj[key + 'Async'] = myFunc
//       }
//     })(key)
//   }
//   return obj
// }

// let client
// require('sinon-as-promised')(Promise)
// const lab = exports.lab = Lab.script()

// let serviceInstance
// const after = lab.after
// const before = lab.before
// const describe = lab.describe
// const it = lab.it

// // const API_URL = process.env.API_URL
// // const USER_CONTENT_DOMAIN = process.env.USER_CONTENT_DOMAIN
// // const GITHUB_USERNAME = process.env.GITHUB_USERNAME
// // const SERVICE_NAME = process.env.SERVICE_NAME
// // const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME
// // const GITHUB_OAUTH_ID = process.env.GITHUB_OAUTH_ID


// // const API_URL = 'https://api.runnalbe'
// // const USER_CONTENT_DOMAIN = process.env.USER_CONTENT_DOMAIN
// // const GITHUB_USERNAME = process.env.GITHUB_USERNAME
// // const SERVICE_NAME = process.env.SERVICE_NAME
// // const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME
// // const GITHUB_OAUTH_ID = process.env.GITHUB_OAUTH_ID


// describe('integration test', () => {
//   before(() => {
//     client = new Runnable(API_URL, { userContentDomain: USER_CONTENT_DOMAIN })
//     promisifyClientModel(client)
//     return client.githubLoginAsync(process.env.ACCESS_TOKEN)
//   })

//   after((done) => {
//     client.logout(done)
//   })

//   describe('Cleanup', function () {
//     let repoInstances
//     let serviceInstances

//     it('should fetch the instances', () => {
//       return client.fetchInstancesAsync({ githubUsername: GITHUB_USERNAME })
//         .then((instances) => {
//           serviceInstances = instances.models
//             .filter((x) => x.attrs.name.includes(SERVICE_NAME))
//             .map((x) => promisifyClientModel(x))
//           repoInstances = instances.models
//             .filter((x) => x.attrs.name.includes(GITHUB_REPO_NAME))
//             .map((x) => promisifyClientModel(x))
//         })
//     })

//     it('should delete/destroy the non-repo container', () => {
//       if (!serviceInstances.length === 0) return Promise.resolve()
//       return Promise.all(serviceInstances.map((x) => x.destroyAsync()))
//     })

//     it('should delete/destroy the repo container', () => {
//       if (!repoInstances.length === 0) return Promise.resolve()
//       return Promise.all(repoInstances.map((x) => x.destroyAsync()))
//     })
//   })

//   describe('1. New Service Containers', () => {
//     let sourceInstance
//     let contextVersion
//     let build

//     describe('Creating Container', () => {
//       it('should fetch all template containers', () => {
//         return client.fetchInstancesAsync({ githubUsername: 'HelloRunnable' })
//           .then((instances) => {
//             sourceInstance = instances.models.filter((x) => x.attrs.name === SERVICE_NAME)[0]
//             promisifyClientModel(sourceInstance)
//           })
//       })

//       it('should copy the source instance', () => {
//         sourceInstance.contextVersion = Promise.promisifyAll(sourceInstance.contextVersion)
//         return Promise.fromCallback((cb) => {
//           contextVersion = sourceInstance.contextVersion.deepCopy({
//             owner: {
//               github: GITHUB_OAUTH_ID
//             }
//           }, cb)
//         })
//           .then(() => {
//             Promise.promisifyAll(contextVersion)
//             return contextVersion
//               .updateAsync({
//                 advanced: true
//               })
//           })
//       })

//       it('should create the build', () => {
//         return client.createBuildAsync({
//           contextVersions: [contextVersion.id()],
//           owner: {
//             github: GITHUB_OAUTH_ID
//           }
//         })
//           .then((buildResponse) => {
//             build = buildResponse
//             promisifyClientModel(build)
//           })
//       })

//       it('should build the build', () => {
//         return build.buildAsync({
//           message: 'Initial Build'
//         })
//       })

//       it('should create an instance', () => {
//         return client.createInstanceAsync({
//           masterPod: true,
//           name: SERVICE_NAME,
//           env: [
//             'TIME=' + (new Date()).getTime()
//           ],
//           ipWhitelist: {
//             enabled: false
//           },
//           owner: {
//             github: GITHUB_OAUTH_ID
//           },
//           build: build.id()
//         })
//         .tap((instance) => {
//           promisifyClientModel(instance)
//           return instance.updateAsync({
//             shouldNotAutofork: false
//           })
//         })
//         .then((instance) => {
//           serviceInstance = instance
//           promisifyClientModel(serviceInstance)
//           return serviceInstance
//         })
//       })
//     })

//     describe('Working Container', () => {
//       it('should have a dockerContainer', () => {
//       })
//     })
//   })

//   // describe('2. New Repository Containers', () => {
//   //   let githubOrg
//   //   let githubRepo
//   //   let githubBranch
//   //   let sourceContext
//   //   let sourceContextVersion
//   //   let sourceInfraCodeVersion
//   //   let context
//   //   let contextVersion
//   //   let contextVersionDockerfile
//   //   let appCodeVersion

//   //   describe('Create A Container', () => {
//   //     describe('Github', () => {
//   //       it('should create a github org', () => {
//   //         githubOrg = Promise.promisifyAll(client.newGithubOrg(GITHUB_USERNAME))
//   //       })

//   //       it('should fetch a github branch', () => {
//   //         return githubOrg.fetchRepoAsync(GITHUB_REPO_NAME, reqOpts)
//   //           .then((_githubRepo) => {
//   //             githubRepo = Promise.promisifyAll(client.newGithubRepo(_githubRepo))
//   //           })
//   //       })

//   //       it('should fetch a github repo branch', () => {
//   //         return githubRepo.fetchBranchAsync('master', reqOpts)
//   //           .then((_branch) => {
//   //             githubBranch = _branch
//   //           })
//   //       })
//   //     })

//   //     describe('Source Context', () => {
//   //       it('should fetch the source context', () => {
//   //         return client.fetchContextsAsync({ isSource: true })
//   //           .then((sourceContexts) => {
//   //             sourceContext = sourceContexts.models.find((x) => x.attrs.lowerName.match(/nodejs/i))
//   //             promisifyClientModel(sourceContext)
//   //           })
//   //       })

//   //       it('should fetch the source context versions', () => {
//   //         return sourceContext.fetchVersionsAsync({ qs: { sort: '-created' }})
//   //           .then((versions) => {
//   //             sourceContextVersion = versions.models[0]
//   //             promisifyClientModel(sourceContextVersion)
//   //             sourceInfraCodeVersion = sourceContextVersion.attrs.infraCodeVersion
//   //             promisifyClientModel(sourceInfraCodeVersion)
//   //           })
//   //       })
//   //     })

//   //   describe('Working Container', () => {
//   //   })
//   // })
// }) // end integration test
