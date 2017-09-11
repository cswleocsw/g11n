// Karma configuration
// Generated on Mon Jun 05 2017 18:14:41 GMT+0800 (CST)

const webpackConfig = require('./webpack/test.config')

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      '__tests__/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
      'node_modules'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '__tests__/**/*.spec.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'lcovonly' }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: process.env.KARMA_ENV === 'development' ? config.LOG_DEBUG : config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // possible values: 'PhantomJS', 'Chrome', 'Firefox'
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // webpack configuration
    webpack: webpackConfig,

    // webpack-dev-middleware configuration
    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-sinon',
      'karma-coverage'
    ]
  })
}
