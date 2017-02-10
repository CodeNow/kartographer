const K = require('./lib/external/kubectl-wrapper.js')

const man = {
  'a': {
  'kind': 'Service',
  'apiVersion': 'v1',
  'metadata': {
    'name': 'testt'
  },
  'spec': {
    'selector': {
      'app': 'testt'
    },
    'ports': [
      {
        'protocol': 'TCP',
        'port': 80,
        'targetPort': 80
      }
    ],
    'type': 'NodePort'
  }
},
'b':  {
  'kind': 'Service',
  'apiVersion': 'v1',
  'metadata': {
    'name': '2222222'
  },
  'spec': {
    'selector': {
      'app': '2222222'
    },
    'ports': [
      {
        'protocol': 'TCP',
        'port': 80,
        'targetPort': 80
      }
    ],
    'type': 'NodePort'
  }
}
}
const k = new K({
  endpoint: 'https://api.kubernetes.runnable-gamma.com',
  namespace: 'v1',
  binary: '/usr/local/bin/kubectl'
})
k.apply(man)
.then((out) => {
  console.log('out', out)
})
.catch((err) => {
  console.log('XXX err', err)
})
