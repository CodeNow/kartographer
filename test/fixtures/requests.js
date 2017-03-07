module.exports.masterNonRepo = {
  'Env': [],
  'HostConfig': {
    'Memory': 4096000000,
    'MemoryReservation': 128000000,
    'PublishAllPorts': true,
    'CapDrop': [
      'MKNOD',
      'FSETID'
    ]
  },
  'Ports': [ 25672, 4369, 5671, 5672 ],
  'Image': 'localhost/2335750/58af7da8a2b4a41100146cde:58af7da82b959010000c0d14',
  'Labels': {
    'com-docker-swarm-constraints': '[\'org==2335750\',\'node==~ip-10-4-146-17.2335750\']',
    'com-docker-swarm-id': 'f5ec1b0dab11777e1b572f33fd9ca56614c71ac90e3017f6e4dee443a8a66f7d',
    'contextVersionId': '58af7da82b959010000c0d14',
    'githubOrgId': '2335750',
    'instanceId': '58af7dab0243111100cc2d20',
    'instanceName': 'RabbitMQ',
    'instanceShortHash': 'eyxn0z',
    'ownerUsername': 'CodeNow',
    'sessionUserGithubId': '2194285',
    'tid': '8dca989f-c492-4b38-9097-da356d487297',
    'masterPod': true,
    'type': 'user-container'
  }
}

module.exports.masterRepo = {
  'Env': [
    'RABBITMQ_HOSTNAME=rabbitmq-staging-codenow.runnable.ninja',
    'test=yo'
  ],
  'HostConfig': {
    'CapDrop': [
      'MKNOD',
      'FSETID'
    ],
    'Memory': 4096000000,
    'PublishAllPorts': true,
    'MemoryReservation': 128000000
  },
  'Image': 'localhost/2335750/58af7d5a1d7ce610001bec73:58af7d5ba2b4a41100146cce',
  'Labels': {
    'com-docker-swarm-constraints': '[\'org==2335750\',\'node==~ip-10-4-146-17.2335750\']',
    'com-docker-swarm-id': '0510ce3bb98df9adfec67047cf9c32e37003a4964514407f8248da6510452eef',
    'contextVersionId': '58af7d5ba2b4a41100146cce',
    'githubOrgId': '2335750',
    'instanceId': '58af7d66a2b4a41100146cd5',
    'instanceName': 'kartographer',
    'instanceShortHash': '2gg6x9',
    'ownerUsername': 'CodeNow',
    'sessionUserGithubId': '2194285',
    'tid': '74e82c69-0a49-490f-a3dc-f0d5f29f5b3b',
    'masterPod': true,
    'isTesting': false,
    'type': 'user-container'
  }
}

module.exports.isolatedMaster = {
  'Env': [
    'RUNNABLE_CONTAINER_ID=2zym8z',
    'RUNNABLE_CONTAINER_URL=node-starter-staging-codenow.runnable.ninja',
    'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
    'NPM_CONFIG_LOGLEVEL=info',
    'NODE_VERSION=4.7.3'
  ],
  'HostConfig': {
    'CapDrop': [
      'MKNOD',
      'FSETID'
    ],
    'Memory': 4096000000,
    'PublishAllPorts': true,
    'MemoryReservation': 128000000
  },
  'Image': 'localhost/2335750/58b4ee4771486012005542f4:58b4eed23dc48b1100d98577',
  'Ports': [ 3000 ],
  'Labels': {
    'com-docker-swarm-constraints': '[\'org==2335750\',\'node==~ip-10-4-146-17.2335750\']',
    'com-docker-swarm-id': 'c044cf256ef38adbba2862d94e66746bbb50ac0098bfc6103e491ea72f2e40e7',
    'contextVersionId': '58b4eed23dc48b1100d98577',
    'githubOrgId': '2335750',
    'instanceId': '58b4eed33dc48b1100d9857f',
    'instanceName': 'dark-theme-node-starter',
    'instanceShortHash': '2zym8z',
    'ownerUsername': 'CodeNow',
    'sessionUserGithubId': '2194285',
    'tid': 'b626c450-de22-4592-bfef-952a912410c5',
    'masterPod': false,
    'isTesting': false,
    'isolated': '58b5367d535fd51300aa53bc',
    'type': 'user-container'
  }
}

module.exports.masterRepoK8Deployment = {
  apiVersion: 'extensions/v1beta1',
  kind: 'Deployment',
  metadata: {
    name: 'kartographer'
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          'app': 'kartographer',
          'runnable.com-docker-swarm-constraints': '[\'org==2335750\',\'node==~ip-10-4-146-17.2335750\']',
          'runnable.com-docker-swarm-id': '0510ce3bb98df9adfec67047cf9c32e37003a4964514407f8248da6510452eef',
          'runnable.contextVersionId': '58af7d5ba2b4a41100146cce',
          'runnable.githubOrgId': '2335750',
          'runnable.instanceId': '58af7d66a2b4a41100146cd5',
          'runnable.instanceName': 'kartographer',
          'runnable.instanceShortHash': '2gg6x9',
          'runnable.ownerUsername': 'CodeNow',
          'runnable.sessionUserGithubId': '2194285',
          'runnable.tid': '74e82c69-0a49-490f-a3dc-f0d5f29f5b3b',
          'runnable.masterPod': true,
          'runnable.isTesting': false,
          'runnable.type': 'user-container'
        }
      },
      spec: {
        containers: [{
          name: 'kartographer',
          image: 'localhost/2335750/58af7d5a1d7ce610001bec73:58af7d5ba2b4a41100146cce',
          env: [{
            name: 'RABBITMQ_HOSTNAME',
            value: 'rabbitmq-staging-codenow.runnable.ninja'
          }, {
            name: 'test',
            value: 'yo'
          }]
        }]
      }
    }
  }
}

module.exports.masterNonRepoK8Deployment = {
  apiVersion: 'extensions/v1beta1',
  kind: 'Deployment',
  metadata: {
    name: 'RabbitMQ'
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          'app': 'RabbitMQ',
          'runnable.com-docker-swarm-constraints': '[\'org==2335750\',\'node==~ip-10-4-146-17.2335750\']',
          'runnable.com-docker-swarm-id': 'f5ec1b0dab11777e1b572f33fd9ca56614c71ac90e3017f6e4dee443a8a66f7d',
          'runnable.contextVersionId': '58af7da82b959010000c0d14',
          'runnable.githubOrgId': '2335750',
          'runnable.instanceId': '58af7dab0243111100cc2d20',
          'runnable.instanceName': 'RabbitMQ',
          'runnable.instanceShortHash': 'eyxn0z',
          'runnable.ownerUsername': 'CodeNow',
          'runnable.sessionUserGithubId': '2194285',
          'runnable.tid': '8dca989f-c492-4b38-9097-da356d487297',
          'runnable.masterPod': true,
          'runnable.type': 'user-container'
        }
      },
      spec: {
        containers: [{
          name: 'RabbitMQ',
          image: 'localhost/2335750/58af7da8a2b4a41100146cde:58af7da82b959010000c0d14',
          ports: [{
            containerPort: 25672
          }, {
            containerPort: 4369
          }, {
            containerPort: 5671
          }, {
            containerPort: 5672
          }]
        }]
      }
    }
  }
}

module.exports.masterNonRepoK8Service = {
  apiVersion: 'v1',
  kind: 'Service',
  metadata: {
    name: 'RabbitMQ'
  },
  spec: {
    selector: {
      app: 'RabbitMQ'
    },
    ports: [{
      protocol: 'TCP',
      targetPort: 25672,
      port: 25672
    }, {
      protocol: 'TCP',
      targetPort: 4369,
      port: 4369
    }, {
      protocol: 'TCP',
      targetPort: 5671,
      port: 5671
    }, {
      protocol: 'TCP',
      targetPort: 5672,
      port: 5672
    }],
    type: 'NodePort'
  }
}
