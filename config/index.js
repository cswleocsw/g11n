const dev = require('./dev')
const prod = require('./prod')
const test = require('./test')

function matchEnv(env = 'development') {
  switch (env) {
    case 'production':
      return prod
    case 'test':
      return test
    default:
      return dev
  }
}

module.exports = matchEnv(process.env.NODE_ENV)
