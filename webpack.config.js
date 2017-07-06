'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Used with webpack-dev-server
const PUBLIC_PATH = '/assets/';
const IS_DEV = process.env.MDC_ENV === 'development' || process.env.MDC_ENV === 'test';
const IS_TEST = process.env.MDC_ENV === 'test';
const IS_PROD = process.env.MDC_ENV === 'production';
const OUT_PATH = path.resolve('./dist');
const PACKAGE_NAME = 'angularjs-mdc';

const CSS_LOADER_CONFIG = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: IS_DEV,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: IS_DEV,
      plugins: () =>[require('autoprefixer')({grid: false})],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: IS_DEV,
      includePaths: ['node_modules', 'node_modules/@material/*'],
    },
  },
];

module.exports = [{
  name: 'js-all',
  entry: path.resolve('./src/all.js'),
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: PACKAGE_NAME + '.' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    library: PACKAGE_NAME,
  },
  devServer: {
    disableHostCheck: true,
    contentBase: [path.join(__dirname, 'demos'), path.join(__dirname, 'node_modules')],
  },
  devtool: (IS_DEV && !IS_TEST) ? 'source-map' : false,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    }, {
      test: /\.scss$/,
      use: IS_DEV ? [{loader: 'style-loader'}].concat(CSS_LOADER_CONFIG) : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: CSS_LOADER_CONFIG,
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin(PACKAGE_NAME + '.' + (IS_PROD ? 'min.' : '') + 'css'),
  ],
}];


if (IS_DEV) {
  module.exports.push({
    name: 'demo-css',
    entry: {
      'demo-styles': path.resolve('./demos/demos.scss'),
    },
    output: {
      path: OUT_PATH,
      publicPath: PUBLIC_PATH,
      filename: '[name].css.js',
    },
    devServer: {
      disableHostCheck: true,
    },
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.scss$/,
        use: [{loader: 'style-loader'}].concat(CSS_LOADER_CONFIG),
      }],
    },
  });
}
