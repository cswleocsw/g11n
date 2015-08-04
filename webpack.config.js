var webpack = require("webpack"),
    path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/g11n'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: process.env.NODE_ENV === 'production' ? 'g11n.min.js' : 'g11n.js',
        libraryTarget: 'umd',
        library: 'G11N'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    loose: 'es6.modules'
                }
            }
        ]
    }
};
