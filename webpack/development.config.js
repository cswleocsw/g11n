const webpack = require('webpack')
const WebpackConfig = require('webpack-config')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const browserSyncConfig = require('./browserSync.config')

module.exports = new WebpackConfig.Config().extend('webpack/base.config.js').merge({
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new BrowserSyncPlugin(
      browserSyncConfig,
      {
        reload: false
      }
    )
  ]
})
