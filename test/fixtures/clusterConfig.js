'use strict'

module.exports.master = {
  name: 'kartographer',
  image: 'sha256:3e869127d766b8475ed6ee43e7bb61168346fcd4fc4a312d0f5a2d0bbf5738ba',
    env: [{
      name: 'RABBITMQ_HOSTNAME',
      value: 'rabbitmq-staging-codenow.runnable.ninja'
    }, {
      name: 'test',
      value: 'yo'
    }],
  labels: {
    'com-docker-swarm-constraints': '[\'org==2335750\',\'node==~ip-10-4-146-17.2335750\']',
    'com-docker-swarm-id': '0510ce3bb98df9adfec67047cf9c32e37003a4964514407f8248da6510452eef',
    contextVersionId: '58af7d5ba2b4a41100146cce',
    githubOrgId: '2335750',
    instanceId: '58af7d66a2b4a41100146cd5',
    instanceName: 'kartographer',
    instanceShortHash: '2gg6x9',
    ownerUsername: 'CodeNow',
    sessionUserGithubId: '2194285',
    tid: '74e82c69-0a49-490f-a3dc-f0d5f29f5b3b',
    type: 'user-container'
  },
  ports: [1,2,3],
  softMemoryLimit: 123,
  command: ['rock','it'],
  orgId: '123'
}
