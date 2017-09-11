const path = require('path')
const webpack = require('webpack')
const WebpackConfig = require('webpack-config')

const config = require('../config')

module.exports = new WebpackConfig.Config().merge({
  context: path.resolve(__dirname, '..', 'src'),
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: [
      path.join(__dirname, '..', 'node_modules'),
      path.resolve(__dirname, '..', 'src')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env
    })
  ]
})
