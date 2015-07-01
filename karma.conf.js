// Karma configuration
var path = require('path');

module.exports = function (config) {
    config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',

            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['mocha'],

            // list of files / patterns to load in the browser
            files: [
                'test/**/*_test.js'
            ],

            // list of files to exclude
            exclude: [],

            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                'test/*_test.js': ['webpack']
            },

            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['mocha', 'coverage'],

            // web server port
            port: 9876,

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            // [PhantomJS, Chrome]
            browsers: ['PhantomJS'],

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: true,

            // optionally, configure the reporter
            coverageReporter: {
                type: 'text'
            },

            webpack: {
                // karma watches the test entry points
                // (you don't need to specify the entry option)
                // webpack watches dependencies

                resolve: {
                    alias: {
                        'g11n': path.join(__dirname, 'src/g11n'),
                        'config': path.join(__dirname, 'src/config')
                    }
                },

                // webpack configuration
                module: {
                    postLoaders: [{ // << add subject as webpack's postloader
                        test: /\.js$/,
                        exclude: /(test|node_modules|bower_components)\//,
                        loader: 'istanbul-instrumenter'
                    }]
                }
            },

            webpackMiddleware: {
                // webpack-dev-middleware configuration
                // i. e.
                noInfo: true
            }
        }
    );
};