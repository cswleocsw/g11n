var path, webpack, config;

path = require('path');

webpack = require("webpack");

config = {
    entry: "./src/g11n",
    output: {
        path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
        filename: process.env.NODE_ENV === 'production' ? 'g11n.min.js' : 'g11n.js',
        libraryTarget: 'umd',
        library: 'G11N'
    },
    plugins: [],
    resolve: { alias: {} },
    module: {
        noParse: [],
        preLoaders: [],
        loaders: []
    }
};

module.exports = config;
