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
