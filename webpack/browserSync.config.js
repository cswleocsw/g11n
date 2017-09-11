const config = require('../config')

module.exports = {
  host: 'localhost',
  port: config.browserSyncPort,
  open: false,
  proxy: {
    target: `http://localhost:${config.webpackDevServerPort}/`,
    ws: true
  }
}
