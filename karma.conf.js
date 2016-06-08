// Karma configuration

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'es6-shim'],

    files: [
      'test/g11n.js'
    ],

    exclude: [],

    preprocessors: {
      'test/g11n.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
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
