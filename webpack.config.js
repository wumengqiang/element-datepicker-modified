var path = require('path')
var utils = require('./build/utils')
var vueLoaderConfig = require('./build/vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  context: __dirname,
  entry: {
    index: path.join(__dirname, './src/index.js'),
  },
  devtool: '#source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: utils.assetsPath('[id].js'),
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          fix: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,

      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/element-ui')],
      },
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env': '"production"'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      }),
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].css')
      }),
    ],
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    }
}
