const path = require('path')

module.exports = {
  env: require('./env'),
  assetBuildPath: path.resolve(__dirname, '..', '..', 'build')
}
