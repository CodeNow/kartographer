module.exports.masterNonRepo = {
  '_id': '58af7dab0243111100cc2d20',
  'build': {
    'buildNumber': 60738,
    'contexts': [
      '58af7da8a2b4a41100146cde'
    ],
    'contextVersions': [
      '58af7da82b959010000c0d14'
    ],
    'created': '2017-02-24T00:26:18.800Z',
    'started': '2017-02-24T00:26:18.955Z',
    'completed': '2017-02-24T00:26:29.085Z',
    'createdBy': {
      'github': 2194285
    },
    'owner': {
      'github': 2335750
    },
    'failed': false,
    '_id': '58af7daa0243111100cc2d1e',
    '__v': 0,
    'duration': 10130,
    'successful': true,
    'id': '58af7daa0243111100cc2d1e'
  },
  'ipWhitelist': {
    'enabled': false
  },
  'name': 'RabbitMQ',
  'owner': {
    'github': 2335750,
    'gravatar': 'https://avatars.githubusercontent.com/u/2335750?v=3',
    'username': 'CodeNow'
  },
  'contextVersion': {
    '_id': '58af7da82b959010000c0d14',
    'context': '58af7da8a2b4a41100146cde',
    'createdBy': {
      'github': 2194285
    },
    'owner': {
      'github': 2335750
    },
    'infraCodeVersion': '58af7da82b959010000c0d11',
    '__v': 0,
    'state': 'build_succeeded',
    'dockerHost': 'http://10.4.146.17:4242',
    'build': {
      'message': 'Initial Build',
      'triggeredBy': {
        'github': 2194285
      },
      'started': '2017-02-24T00:26:18.981Z',
      'hash': '02454d01d969d950f6aa40b7eb15644d',
      'dockerContainer': '0f48b297c5042f77e4df2f63ebae660db65dce89151cf63db30e6f2016172212',
      'dockerTag': 'localhost/2335750/58af7da8a2b4a41100146cde:58af7da82b959010000c0d14',
      'containerStarted': '2017-02-24T00:26:19.801Z',
      'completed': '2017-02-24T00:26:29.063Z',
      'failed': false,
      'triggeredAction': {
        'manual': true,
        'appCodeVersion': {
          'commitLog': []
        }
      },
      '_id': '58af7da82b959010000c0d13',
      'duration': 10082
    },
    'advanced': true,
    'appCodeVersions': [],
    'dockRemoved': false,
    'created': '2017-02-24T00:26:16.808Z',
    'isBuildSuccessful': true,
    'id': '58af7da82b959010000c0d14'
  },
  'createdBy': {
    'github': 2194285,
    'gravatar': 'https://avatars.githubusercontent.com/u/2194285?v=3',
    'username': 'anandkumarpatel'
  },
  'lowerName': 'rabbitmq',
  'shortHash': 'eyxn0z',
  'dependencies': [],
  'autoForked': false,
  'masterPod': true,
  'disableAutoDeletion': false,
  'hasAddedBranches': false,
  'env': [],
  'created': '2017-02-24T00:26:19.886Z',
  'shouldNotAutofork': true,
  'locked': false,
  'public': false,
  '__v': 0,
  'elasticHostname': 'rabbitmq-staging-codenow.runnable.ninja',
  'hostname': 'rabbitmq-staging-codenow.runnable.ninja',
  'container': {
    'dockerContainer': 'cd1fed1425d7515a865effe106b648356ec977112dd15a6b82eebcbb39ea804d',
    'dockerHost': 'http://10.4.146.17:4242',
    'inspect': {
      'Id': 'cd1fed1425d7515a865effe106b648356ec977112dd15a6b82eebcbb39ea804d',
      'Created': '2017-02-24T00:26:29.203702981Z',
      'State': {
        'Status': 'running',
        'Running': true,
        'Paused': false,
        'Restarting': false,
        'OOMKilled': false,
        'Dead': false,
        'ExitCode': 0,
        'Error': '',
        'StartedAt': '2017-02-24T00:26:30.564466994Z',
        'FinishedAt': '0001-01-01T00:00:00Z'
      },
      'Image': 'sha256:a3fc59b63556a66f8385783a03ebdff6d714becd4d254e8c64fbeace3c0f0eec',
      'Name': '/sleepy_curie',
      'HostConfig': {
        'Memory': 4096000000,
        'MemoryReservation': 128000000
      },
      'Config': {
        'Hostname': 'cd1fed1425d7',
        'Env': [
          'RUNNABLE_CONTAINER_ID=eyxn0z',
          'RUNNABLE_CONTAINER_URL=rabbitmq-staging-codenow.runnable.ninja',
          'PATH=/usr/lib/rabbitmq/bin:/root/.rbenv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
          'GOSU_VERSION=1.7',
          'RABBITMQ_LOGS=-',
          'RABBITMQ_SASL_LOGS=-',
          'RABBITMQ_VERSION=3.6.3',
          'RABBITMQ_DEBIAN_VERSION=3.6.3-1',
          'HOME=/var/lib/rabbitmq'
        ],
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
          'type': 'user-container'
        }
      },
      'NetworkSettings': {
        'Ports': {
          '25672/tcp': [
            {
              'HostIp': '0.0.0.0',
              'HostPort': '64576'
            }
          ],
          '4369/tcp': [
            {
              'HostIp': '0.0.0.0',
              'HostPort': '64579'
            }
          ],
          '5671/tcp': [
            {
              'HostIp': '0.0.0.0',
              'HostPort': '64578'
            }
          ],
          '5672/tcp': [
            {
              'HostIp': '0.0.0.0',
              'HostPort': '64577'
            }
          ]
        },
        'IPAddress': '172.17.0.4'
      }
    },
    'ports': {
      '25672/tcp': [
        {
          'HostIp': '0.0.0.0',
          'HostPort': '64576'
        }
      ],
      '4369/tcp': [
        {
          'HostIp': '0.0.0.0',
          'HostPort': '64579'
        }
      ],
      '5671/tcp': [
        {
          'HostIp': '0.0.0.0',
          'HostPort': '64578'
        }
      ],
      '5672/tcp': [
        {
          'HostIp': '0.0.0.0',
          'HostPort': '64577'
        }
      ]
    }
  },
  'network': {
    'hostIp': '10.21.0.1'
  },
  'contextVersions': [
    {
      '_id': '58af7da82b959010000c0d14',
      'context': '58af7da8a2b4a41100146cde',
      'createdBy': {
        'github': 2194285
      },
      'owner': {
        'github': 2335750
      },
      'infraCodeVersion': '58af7da82b959010000c0d11',
      '__v': 0,
      'state': 'build_succeeded',
      'dockerHost': 'http://10.4.146.17:4242',
      'build': {
        'message': 'Initial Build',
        'triggeredBy': {
          'github': 2194285
        },
        'started': '2017-02-24T00:26:18.981Z',
        'hash': '02454d01d969d950f6aa40b7eb15644d',
        'dockerContainer': '0f48b297c5042f77e4df2f63ebae660db65dce89151cf63db30e6f2016172212',
        'dockerTag': 'localhost/2335750/58af7da8a2b4a41100146cde:58af7da82b959010000c0d14',
        'containerStarted': '2017-02-24T00:26:19.801Z',
        'completed': '2017-02-24T00:26:29.063Z',
        'failed': false,
        'triggeredAction': {
          'manual': true,
          'appCodeVersion': {
            'commitLog': []
          }
        },
        '_id': '58af7da82b959010000c0d13',
        'duration': 10082
      },
      'advanced': true,
      'appCodeVersions': [],
      'dockRemoved': false,
      'created': '2017-02-24T00:26:16.808Z',
      'isBuildSuccessful': true,
      'id': '58af7da82b959010000c0d14'
    }
  ],
  'containers': [
    {
      'dockerContainer': 'cd1fed1425d7515a865effe106b648356ec977112dd15a6b82eebcbb39ea804d',
      'dockerHost': 'http://10.4.146.17:4242',
      'inspect': {
        'Id': 'cd1fed1425d7515a865effe106b648356ec977112dd15a6b82eebcbb39ea804d',
        'Created': '2017-02-24T00:26:29.203702981Z',
        'State': {
          'Status': 'running',
          'Running': true,
          'Paused': false,
          'Restarting': false,
          'OOMKilled': false,
          'Dead': false,
          'ExitCode': 0,
          'Error': '',
          'StartedAt': '2017-02-24T00:26:30.564466994Z',
          'FinishedAt': '0001-01-01T00:00:00Z'
        },
        'Image': 'sha256:a3fc59b63556a66f8385783a03ebdff6d714becd4d254e8c64fbeace3c0f0eec',
        'Name': '/sleepy_curie',
        'HostConfig': {
          'Memory': 4096000000,
          'MemoryReservation': 128000000
        },
        'Config': {
          'Hostname': 'cd1fed1425d7',
          'Env': [
            'RUNNABLE_CONTAINER_ID=eyxn0z',
            'RUNNABLE_CONTAINER_URL=rabbitmq-staging-codenow.runnable.ninja',
            'PATH=/usr/lib/rabbitmq/bin:/root/.rbenv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            'GOSU_VERSION=1.7',
            'RABBITMQ_LOGS=-',
            'RABBITMQ_SASL_LOGS=-',
            'RABBITMQ_VERSION=3.6.3',
            'RABBITMQ_DEBIAN_VERSION=3.6.3-1',
            'HOME=/var/lib/rabbitmq'
          ],
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
            'type': 'user-container'
          }
        },
        'NetworkSettings': {
          'Ports': {
            '25672/tcp': [
              {
                'HostIp': '0.0.0.0',
                'HostPort': '64576'
              }
            ],
            '4369/tcp': [
              {
                'HostIp': '0.0.0.0',
                'HostPort': '64579'
              }
            ],
            '5671/tcp': [
              {
                'HostIp': '0.0.0.0',
                'HostPort': '64578'
              }
            ],
            '5672/tcp': [
              {
                'HostIp': '0.0.0.0',
                'HostPort': '64577'
              }
            ]
          },
          'IPAddress': '172.17.0.4'
        }
      },
      'ports': {
        '25672/tcp': [
          {
            'HostIp': '0.0.0.0',
            'HostPort': '64576'
          }
        ],
        '4369/tcp': [
          {
            'HostIp': '0.0.0.0',
            'HostPort': '64579'
          }
        ],
        '5671/tcp': [
          {
            'HostIp': '0.0.0.0',
            'HostPort': '64578'
          }
        ],
        '5672/tcp': [
          {
            'HostIp': '0.0.0.0',
            'HostPort': '64577'
          }
        ]
      }
    }
  ],
  'id': '58af7dab0243111100cc2d20'
}

module.exports.masterRepo = {
  '_id': '58af7d66a2b4a41100146cd5',
  'build': {
    'buildNumber': 60743,
    'contexts': [
      '58af7d5a1d7ce610001bec73'
    ],
    'contextVersions': [
      '58af7d5ba2b4a41100146cce'
    ],
    'created': '2017-02-24T00:45:14.293Z',
    'started': '2017-02-24T00:45:31.121Z',
    'completed': '2017-02-24T00:45:31.161Z',
    'createdBy': {
      'github': 2194285
    },
    'owner': {
      'github': 2335750
    },
    'failed': false,
    '_id': '58af821a1d7ce610001bec9e',
    '__v': 0,
    'duration': 40,
    'successful': true,
    'id': '58af821a1d7ce610001bec9e'
  },
  'ipWhitelist': {
    'enabled': false
  },
  'isTesting': false,
  'name': 'kartographer',
  'owner': {
    'github': 2335750,
    'gravatar': 'https://avatars.githubusercontent.com/u/2335750?v=3',
    'username': 'CodeNow'
  },
  'contextVersion': {
    '_id': '58af7d5ba2b4a41100146cce',
    'context': '58af7d5a1d7ce610001bec73',
    'createdBy': {
      'github': 2194285
    },
    'owner': {
      'github': 2335750
    },
    'infraCodeVersion': '58af7d5aa2b4a41100146ccb',
    '__v': 0,
    'buildDockerfilePath': '/Dockerfile',
    'state': 'build_succeeded',
    'dockerHost': 'http://10.4.146.17:4242',
    'build': {
      'message': 'Initial Build',
      'triggeredBy': {
        'github': 2194285
      },
      'started': '2017-02-24T00:25:09.544Z',
      'dockerContainer': 'aab0187691a6b5192969871a05fc650cd68a48e3a6cea22af698c8bf15c63968',
      'dockerTag': 'localhost/2335750/58af7d5a1d7ce610001bec73:58af7d5ba2b4a41100146cce',
      'containerStarted': '2017-02-24T00:25:10.335Z',
      'completed': '2017-02-24T00:25:13.909Z',
      'failed': false,
      'triggeredAction': {
        'manual': true,
        'appCodeVersion': {
          'commitLog': []
        }
      },
      '_id': '58af7d5ba2b4a41100146ccd',
      'duration': 4365
    },
    'advanced': true,
    'appCodeVersions': [
      {
        'commit': '1f0902d231e0e07e23b13c44ecdda99aaea04ac4',
        'branch': 'master',
        'lowerBranch': 'master',
        'repo': 'CodeNow/kartographer',
        'lowerRepo': 'codenow/kartographer',
        '_id': '58af7d5f0243111100cc2d13',
        'privateKey': 'CodeNow/kartographer.key',
        'publicKey': 'CodeNow/kartographer.key.pub',
        'defaultBranch': 'master',
        'useLatest': false,
        'transformRules': {
          'rename': [],
          'replace': [],
          'exclude': []
        }
      }
    ],
    'dockRemoved': false,
    'created': '2017-02-24T00:24:59.152Z',
    'isBuildSuccessful': true,
    'id': '58af7d5ba2b4a41100146cce'
  },
  'createdBy': {
    'github': 2194285,
    'gravatar': 'https://avatars.githubusercontent.com/u/2194285?v=3',
    'username': 'anandkumarpatel'
  },
  'lowerName': 'kartographer',
  'shortHash': '2gg6x9',
  'dependencies': [
    {
      'name': 'RabbitMQ',
      'instanceId': '58af7dab0243111100cc2d20',
      'elasticHostname': 'rabbitmq-staging-codenow.runnable.ninja',
      '_id': '58af822c2b959010000c0d24',
      'id': '58af822c2b959010000c0d24'
    }
  ],
  'autoForked': false,
  'masterPod': true,
  'disableAutoDeletion': false,
  'hasAddedBranches': false,
  'env': [
    'RABBITMQ_HOSTNAME=rabbitmq-staging-codenow.runnable.ninja',
    'test=yo'
  ],
  'created': '2017-02-24T00:25:10.283Z',
  'shouldNotAutofork': true,
  'locked': false,
  'public': false,
  '__v': 1,
  'elasticHostname': 'kartographer-staging-codenow.runnable.ninja',
  'hostname': 'kartographer-staging-codenow.runnable.ninja',
  'network': {
    'hostIp': '10.21.0.2'
  },
  'container': {
    'dockerContainer': '30ede3d54dca0e04bd48c435c2f3004ed1e116c7c49f6947aa00aca01d108715',
    'dockerHost': 'http://10.4.146.17:4242',
    'inspect': {
      'Id': '30ede3d54dca0e04bd48c435c2f3004ed1e116c7c49f6947aa00aca01d108715',
      'Created': '2017-02-24T00:45:32.491838464Z',
      'State': {
        'Status': 'exited',
        'Running': false,
        'Paused': false,
        'Restarting': false,
        'OOMKilled': false,
        'Dead': false,
        'ExitCode': 1,
        'Error': '',
        'StartedAt': '2017-02-24T00:45:32.843175601Z',
        'FinishedAt': '2017-02-24T00:45:45.20086412Z'
      },
      'Image': 'sha256:3e869127d766b8475ed6ee43e7bb61168346fcd4fc4a312d0f5a2d0bbf5738ba',
      'Name': '/furious_poitras',
      'HostConfig': {
        'Memory': 4096000000,
        'MemoryReservation': 128000000
      },
      'Config': {
        'Hostname': '30ede3d54dca',
        'Env': [
          'RUNNABLE_CONTAINER_ID=2gg6x9',
          'RUNNABLE_CONTAINER_URL=kartographer-staging-codenow.runnable.ninja',
          '***SANITIZED***',
          '***SANITIZED***',
          '***SANITIZED***',
          '***SANITIZED***'
        ],
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
          'type': 'user-container'
        }
      },
      'NetworkSettings': {
        'Ports': null,
        'IPAddress': ''
      }
    }
  },
  'contextVersions': [
    {
      '_id': '58af7d5ba2b4a41100146cce',
      'context': '58af7d5a1d7ce610001bec73',
      'createdBy': {
        'github': 2194285
      },
      'owner': {
        'github': 2335750
      },
      'infraCodeVersion': '58af7d5aa2b4a41100146ccb',
      '__v': 0,
      'buildDockerfilePath': '/Dockerfile',
      'state': 'build_succeeded',
      'dockerHost': 'http://10.4.146.17:4242',
      'build': {
        'message': 'Initial Build',
        'triggeredBy': {
          'github': 2194285
        },
        'started': '2017-02-24T00:25:09.544Z',
        'dockerContainer': 'aab0187691a6b5192969871a05fc650cd68a48e3a6cea22af698c8bf15c63968',
        'dockerTag': 'localhost/2335750/58af7d5a1d7ce610001bec73:58af7d5ba2b4a41100146cce',
        'containerStarted': '2017-02-24T00:25:10.335Z',
        'completed': '2017-02-24T00:25:13.909Z',
        'failed': false,
        'triggeredAction': {
          'manual': true,
          'appCodeVersion': {
            'commitLog': []
          }
        },
        '_id': '58af7d5ba2b4a41100146ccd',
        'duration': 4365
      },
      'advanced': true,
      'appCodeVersions': [
        {
          'commit': '1f0902d231e0e07e23b13c44ecdda99aaea04ac4',
          'branch': 'master',
          'lowerBranch': 'master',
          'repo': 'CodeNow/kartographer',
          'lowerRepo': 'codenow/kartographer',
          '_id': '58af7d5f0243111100cc2d13',
          'privateKey': 'CodeNow/kartographer.key',
          'publicKey': 'CodeNow/kartographer.key.pub',
          'defaultBranch': 'master',
          'useLatest': false,
          'transformRules': {
            'rename': [],
            'replace': [],
            'exclude': []
          }
        }
      ],
      'dockRemoved': false,
      'created': '2017-02-24T00:24:59.152Z',
      'isBuildSuccessful': true,
      'id': '58af7d5ba2b4a41100146cce'
    }
  ],
  'containers': [
    {
      'dockerContainer': '30ede3d54dca0e04bd48c435c2f3004ed1e116c7c49f6947aa00aca01d108715',
      'dockerHost': 'http://10.4.146.17:4242',
      'inspect': {
        'Id': '30ede3d54dca0e04bd48c435c2f3004ed1e116c7c49f6947aa00aca01d108715',
        'Created': '2017-02-24T00:45:32.491838464Z',
        'State': {
          'Status': 'exited',
          'Running': false,
          'Paused': false,
          'Restarting': false,
          'OOMKilled': false,
          'Dead': false,
          'ExitCode': 1,
          'Error': '',
          'StartedAt': '2017-02-24T00:45:32.843175601Z',
          'FinishedAt': '2017-02-24T00:45:45.20086412Z'
        },
        'Image': 'sha256:3e869127d766b8475ed6ee43e7bb61168346fcd4fc4a312d0f5a2d0bbf5738ba',
        'Name': '/furious_poitras',
        'HostConfig': {
          'Memory': 4096000000,
          'MemoryReservation': 128000000
        },
        'Config': {
          'Hostname': '30ede3d54dca',
          'Env': [
            'RUNNABLE_CONTAINER_ID=2gg6x9',
            'RUNNABLE_CONTAINER_URL=kartographer-staging-codenow.runnable.ninja',
            '***SANITIZED***',
            '***SANITIZED***',
            '***SANITIZED***',
            '***SANITIZED***'
          ],
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
            'type': 'user-container'
          }
        },
        'NetworkSettings': {
          'Ports': null,
          'IPAddress': ''
        }
      }
    }
  ],
  'id': '58af7d66a2b4a41100146cd5'
}

module.exports.isolatedMaster = {
  '_id': '58b4eed33dc48b1100d9857f',
  'build': {
    'buildNumber': 61012,
    'contexts': [
      '58b4ee4771486012005542f4'
    ],
    'contextVersions': [
      '58b4eed23dc48b1100d98577'
    ],
    'created': '2017-02-28T03:30:26.990Z',
    'started': '2017-02-28T03:30:27.026Z',
    'completed': '2017-02-28T03:30:31.957Z',
    'createdBy': {
      'github': 2194285
    },
    'owner': {
      'github': 2335750
    },
    'failed': false,
    '_id': '58b4eed23dc48b1100d9857b',
    '__v': 0,
    'duration': 4931,
    'successful': true,
    'id': '58b4eed23dc48b1100d9857b'
  },
  'isTesting': false,
  'name': 'dark-theme-node-starter',
  'owner': {
    'github': 2335750,
    'gravatar': 'https://avatars.githubusercontent.com/u/2335750?v=3',
    'username': 'CodeNow'
  },
  'parent': '26kdj0',
  'contextVersion': {
    '_id': '58b4eed23dc48b1100d98577',
    'infraCodeVersion': '58b4ee473dc48b1100d98562',
    'createdBy': {
      'github': 2194285
    },
    'prevDockerHost': 'http://10.4.146.17:4242',
    'buildDockerfilePath': '/Dockerfile',
    'context': '58b4ee4771486012005542f4',
    'owner': {
      'github': 2335750
    },
    '__v': 0,
    'state': 'build_succeeded',
    'dockerHost': 'http://10.4.146.17:4242',
    'build': {
      'message': 'manual',
      'triggeredBy': {
        'github': 2194285
      },
      'started': '2017-02-28T03:30:27.109Z',
      'dockerContainer': 'd4c8a3022a949525119ea4b35ae12b35560bb8d3ebf74f07a42ceb811d282837',
      'dockerTag': 'localhost/2335750/58b4ee4771486012005542f4:58b4eed23dc48b1100d98577',
      'containerStarted': '2017-02-28T03:30:28.068Z',
      'completed': '2017-02-28T03:30:31.936Z',
      'failed': false,
      'triggeredAction': {
        'manual': false,
        'appCodeVersion': {
          'commit': '3c25fa37739222b6158283a7268aaf2121bb0c3d',
          'branch': 'dark-theme',
          'repo': 'CodeNow/node-starter',
          'commitLog': []
        }
      },
      '_id': '58b4eed23dc48b1100d98576',
      'duration': 4827
    },
    'advanced': true,
    'appCodeVersions': [
      {
        'defaultBranch': 'redirectTest',
        'publicKey': 'CodeNow/node-starter.key.pub',
        'privateKey': 'CodeNow/node-starter.key',
        '_id': '58b4ee4b3dc48b1100d98568',
        'repo': 'CodeNow/node-starter',
        'lowerRepo': 'codenow/node-starter',
        'branch': 'dark-theme',
        'lowerBranch': 'dark-theme',
        'commit': '3c25fa37739222b6158283a7268aaf2121bb0c3d',
        'useLatest': false,
        'transformRules': {
          'rename': [],
          'replace': [],
          'exclude': []
        }
      }
    ],
    'dockRemoved': false,
    'created': '2017-02-28T03:30:26.949Z',
    'isBuildSuccessful': true,
    'id': '58b4eed23dc48b1100d98577'
  },
  'createdBy': {
    'github': 2194285,
    'gravatar': 'https://avatars.githubusercontent.com/u/2194285?v=3',
    'username': 'anandkumarpatel'
  },
  'lowerName': 'dark-theme-node-starter',
  'shortHash': '2zym8z',
  'dependencies': [],
  'autoForked': true,
  'masterPod': false,
  'disableAutoDeletion': false,
  'hasAddedBranches': false,
  'env': [],
  'created': '2017-02-28T03:30:27.597Z',
  'shouldNotAutofork': true,
  'locked': false,
  'public': false,
  '__v': 0,
  'elasticHostname': 'node-starter-staging-codenow.runnable.ninja',
  'hostname': 'node-starter-staging-codenow.runnable.ninja',
  'network': {
    'hostIp': '10.21.0.4'
  },
  'isIsolationGroupMaster': true,
  'isolated': '58b5367d535fd51300aa53bc',
  'container': {
    'dockerContainer': '42a3651804555c7dee671a040882c87b1b68965ec4cee63a161a5917d97df60d',
    'dockerHost': 'http://10.4.146.17:4242',
    'inspect': {
      'Id': '42a3651804555c7dee671a040882c87b1b68965ec4cee63a161a5917d97df60d',
      'Created': '2017-02-28T08:36:14.205523969Z',
      'State': {
        'Status': 'running',
        'Running': true,
        'Paused': false,
        'Restarting': false,
        'OOMKilled': false,
        'Dead': false,
        'ExitCode': 0,
        'Error': '',
        'StartedAt': '2017-02-28T08:36:14.672292396Z',
        'FinishedAt': '0001-01-01T00:00:00Z'
      },
      'Image': 'sha256:aa620caf40dda38c5b456581494437c06d639db1a19117c62c9b64b953beb9ea',
      'Name': '/gigantic_mahavira',
      'HostConfig': {
        'Memory': 4096000000,
        'MemoryReservation': 128000000
      },
      'Mounts': [],
      'Config': {
        'Hostname': '42a365180455',
        'Env': [
          'RUNNABLE_CONTAINER_ID=2zym8z',
          'RUNNABLE_CONTAINER_URL=node-starter-staging-codenow.runnable.ninja',
          'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
          'NPM_CONFIG_LOGLEVEL=info',
          'NODE_VERSION=4.7.3'
        ],
        'Image': 'localhost/2335750/58b4ee4771486012005542f4:58b4eed23dc48b1100d98577',
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
          'type': 'user-container'
        }
      },
      'NetworkSettings': {
        'Ports': {
          '3000/tcp': [
            {
              'HostIp': '0.0.0.0',
              'HostPort': '64596'
            }
          ]
        },
        'IPAddress': '172.17.0.7'
      }
    },
    'ports': {
      '3000/tcp': [
        {
          'HostIp': '0.0.0.0',
          'HostPort': '64596'
        }
      ]
    }
  },
  'contextVersions': [
    {
      '_id': '58b4eed23dc48b1100d98577',
      'infraCodeVersion': '58b4ee473dc48b1100d98562',
      'createdBy': {
        'github': 2194285
      },
      'prevDockerHost': 'http://10.4.146.17:4242',
      'buildDockerfilePath': '/Dockerfile',
      'context': '58b4ee4771486012005542f4',
      'owner': {
        'github': 2335750
      },
      '__v': 0,
      'state': 'build_succeeded',
      'dockerHost': 'http://10.4.146.17:4242',
      'build': {
        'message': 'manual',
        'triggeredBy': {
          'github': 2194285
        },
        'started': '2017-02-28T03:30:27.109Z',
        'dockerContainer': 'd4c8a3022a949525119ea4b35ae12b35560bb8d3ebf74f07a42ceb811d282837',
        'dockerTag': 'localhost/2335750/58b4ee4771486012005542f4:58b4eed23dc48b1100d98577',
        'containerStarted': '2017-02-28T03:30:28.068Z',
        'completed': '2017-02-28T03:30:31.936Z',
        'failed': false,
        'triggeredAction': {
          'manual': false,
          'appCodeVersion': {
            'commit': '3c25fa37739222b6158283a7268aaf2121bb0c3d',
            'branch': 'dark-theme',
            'repo': 'CodeNow/node-starter',
            'commitLog': []
          }
        },
        '_id': '58b4eed23dc48b1100d98576',
        'duration': 4827
      },
      'advanced': true,
      'appCodeVersions': [
        {
          'defaultBranch': 'redirectTest',
          'publicKey': 'CodeNow/node-starter.key.pub',
          'privateKey': 'CodeNow/node-starter.key',
          '_id': '58b4ee4b3dc48b1100d98568',
          'repo': 'CodeNow/node-starter',
          'lowerRepo': 'codenow/node-starter',
          'branch': 'dark-theme',
          'lowerBranch': 'dark-theme',
          'commit': '3c25fa37739222b6158283a7268aaf2121bb0c3d',
          'useLatest': false,
          'transformRules': {
            'rename': [],
            'replace': [],
            'exclude': []
          }
        }
      ],
      'dockRemoved': false,
      'created': '2017-02-28T03:30:26.949Z',
      'isBuildSuccessful': true,
      'id': '58b4eed23dc48b1100d98577'
    }
  ],
  'containers': [
    {
      'dockerContainer': '42a3651804555c7dee671a040882c87b1b68965ec4cee63a161a5917d97df60d',
      'dockerHost': 'http://10.4.146.17:4242',
      'inspect': {
        'Id': '42a3651804555c7dee671a040882c87b1b68965ec4cee63a161a5917d97df60d',
        'Created': '2017-02-28T08:36:14.205523969Z',
        'State': {
          'Status': 'running',
          'Running': true,
          'Paused': false,
          'Restarting': false,
          'OOMKilled': false,
          'Dead': false,
          'ExitCode': 0,
          'Error': '',
          'StartedAt': '2017-02-28T08:36:14.672292396Z',
          'FinishedAt': '0001-01-01T00:00:00Z'
        },
        'Image': 'sha256:aa620caf40dda38c5b456581494437c06d639db1a19117c62c9b64b953beb9ea',
        'Name': '/gigantic_mahavira',
        'HostConfig': {
          'Memory': 4096000000,
          'MemoryReservation': 128000000
        },
        'Mounts': [],
        'Config': {
          'Hostname': '42a365180455',
          'Env': [
            'RUNNABLE_CONTAINER_ID=2zym8z',
            'RUNNABLE_CONTAINER_URL=node-starter-staging-codenow.runnable.ninja',
            'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            'NPM_CONFIG_LOGLEVEL=info',
            'NODE_VERSION=4.7.3'
          ],
          'Image': 'localhost/2335750/58b4ee4771486012005542f4:58b4eed23dc48b1100d98577',
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
            'type': 'user-container'
          }
        },
        'NetworkSettings': {
          'Ports': {
            '3000/tcp': [
              {
                'HostIp': '0.0.0.0',
                'HostPort': '64596'
              }
            ]
          },
          'IPAddress': '172.17.0.7'
        }
      },
      'ports': {
        '3000/tcp': [
          {
            'HostIp': '0.0.0.0',
            'HostPort': '64596'
          }
        ]
      }
    }
  ],
  'id': '58b4eed33dc48b1100d9857f'
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
          app: 'kartographer'
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
    name: 'rabbitmq'
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: 'rabbitmq'
        }
      },
      spec: {
        containers: [{
          name: 'rabbitmq',
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
    name: 'rabbitmq'
  },
  spec: {
    selector: {
      app: 'rabbitmq'
    },
    ports: [{
      protocol: 'TCP',
      targetPort: 25672,
      port: 64576
    }, {
      protocol: 'TCP',
      targetPort: 4369,
      port: 64579
    }, {
      protocol: 'TCP',
      targetPort: 5671,
      port: 64578
    }, {
      protocol: 'TCP',
      targetPort: 5672,
      port: 64577
    }],
    type: 'NodePort'
  }
}
