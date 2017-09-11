const webpack = require('webpack')
const WebpackConfig = require('webpack-config')
const config = require('../config')

module.exports = new WebpackConfig.Config().extend('webpack/base.config.js').merge({
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin()
  ]
})
