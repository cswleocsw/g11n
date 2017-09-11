const path = require('path')
const webpack = require('webpack')
const WebpackConfig = require('webpack-config')

const config = require('../config')

module.exports = new WebpackConfig.Config().merge({
  context: path.resolve(__dirname, '..', 'src'),

  entry: './g11n.js',

  output: {
    filename: 'g11n.js',
    publicPath: '',
    path: config.assetBuildPath,
    library: 'G11N',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      'node_modules',
       path.resolve(__dirname, '..', 'src', 'js')
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: 'babel-loader',
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
