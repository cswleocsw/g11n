// Karma configuration
let path = require('path')

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'test/index.js'
    ],

    exclude: [],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },

      resolve: {
        root: [ path.resolve('./src') ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  })
}
