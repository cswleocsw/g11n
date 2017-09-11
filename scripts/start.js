import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { sync } from 'rimraf'
import webpackConfig from '../webpack.config'
import config from '../config'

const compiler = webpack(webpackConfig)

sync('build/*')

const server = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  historyApiFallback: true,
  watchOptions: {
    ignored: /node_modules/
  },
  proxy: {
    '/pt/*': {
      target: 'http://localhost:3000',
      secure: false
    }
  }
})

server.listen(config.webpackDevServerPort)
