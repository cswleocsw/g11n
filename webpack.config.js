let path = require('path')
let webpack = require('webpack')

const pkg = require('./package.json')

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: process.env.NODE_ENV === 'production' ? `${pkg.name}.min.js` : `${pkg.name}.js`,
    libraryTarget: 'umd',
    library: pkg.name.toUpperCase()
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    root: [ path.resolve('./src') ]
  }
}
