var webpack = require("webpack"),
    path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/g11n'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'g11n.min.js',
        libraryTarget: 'umd',
        library: 'G11N'
    },

    plugins: [],

    resolve: {
        alias: {
            'config': path.join(__dirname, 'src/config'),
            'tools': path.join(__dirname, 'src/tools')
        }
    },

    module: {
        noParse: [],
        preLoaders: [],
        loaders: []
    }
};
