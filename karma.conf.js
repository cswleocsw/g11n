// Karma configuration

module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
            'test/**/*.spec.js',
            { pattern: 'test/mocks/*.json', watched: true, served: true, included: false }
        ],

        exclude: [],

        preprocessors: {
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha', 'coverage'],

        //{type: 'text'} || {type: 'html', dir : 'coverage/'}
        coverageReporter: {type: 'text'},

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        // PhantomJS || Chrome
        browsers: ['PhantomJS'],

        singleRun: true,

        // webpack configuration
        webpack: {
            devtool: 'inline-source-map',

            module: {
                preLoaders: [
                    { test: /\.js/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
                    // karma-coverage
                    { test: /\.js/, exclude: /(node_modules|bower_components)/, loader: 'isparta' }
                ]

            }
        },

        webpackServer: {
            noInfo: true
        }

    })
};
