'use strict';

const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const transformMdcToLmdc = require('./scripts/transform-mdc-to-lmdc');


// Used with webpack-dev-server
const PUBLIC_PATH = '/assets/';
const IS_DEV = process.env.MDC_ENV === 'development' || process.env.MDC_ENV === 'test';
const IS_DEMOS = process.env.MDC_ENV === 'demos';
const IS_TEST = process.env.MDC_ENV === 'test';
const IS_PROD = process.env.MDC_ENV === 'production' || process.env.MDC_ENV === 'demos';
const OUT_PATH = IS_DEMOS ? path.resolve('./demos/assets') : path.resolve('./dist');
const PACKAGE_NAME = 'angularjs-mdc';
const packages = fs.readdirSync('./src');
const experimentalPackages = fs.readdirSync('./src/experimental');

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
      plugins: () =>[
        require('autoprefixer')({grid: false}),
        transformMdcToLmdc(),
      ],
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

const DEV_SERVER_CONFIG = {
  disableHostCheck: true,
  contentBase: [path.join(__dirname, 'demos'), path.join(__dirname, 'node_modules')],
};

module.exports = [{
  name: 'js-all',
  entry: path.resolve('./src/mdc.js'),
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: PACKAGE_NAME + '.' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    library: PACKAGE_NAME,
  },
  devServer: DEV_SERVER_CONFIG,
  devtool: (IS_DEV && !IS_TEST) ? 'source-map' : false,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(!@material)/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: IS_PROD,
        },
      }],
    }],
  },
}];

const EXPERIMENTAL_NAME = `${PACKAGE_NAME}-experimental`;
module.exports.push(Object.assign({}, module.exports[0], {
  name: 'experimental',
  entry: path.resolve('./src/experimental/index.js'),
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: EXPERIMENTAL_NAME + '.' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    library: EXPERIMENTAL_NAME,
  },
}));
packages.forEach((packageName) => {
  const jsPath = path.resolve(`./src/${packageName}/${packageName}.js`);
  const hasJs = fs.existsSync(jsPath);
  if (!hasJs) {
    return;
  }

  module.exports.push(Object.assign({}, module.exports[0], {
    name: packageName,
    entry: jsPath,
    output: {
      path: OUT_PATH,
      publicPath: PUBLIC_PATH,
      filename: packageName + '.' + (IS_PROD ? 'min.' : '') + 'js',
      libraryTarget: 'umd',
      library: packageName,
    },
  }));
});
experimentalPackages.forEach((packageName) => {
  const outputName = `${packageName}-experimental`;
  const jsPath = path.resolve(`./src/experimental/${packageName}/index.js`);
  const hasJs = fs.existsSync(jsPath);
  if (!hasJs) {
    return;
  }

  module.exports.push(Object.assign({}, module.exports[0], {
    name: outputName,
    entry: jsPath,
    output: {
      path: OUT_PATH,
      publicPath: PUBLIC_PATH,
      filename: outputName + '.' + (IS_PROD ? 'min.' : '') + 'js',
      libraryTarget: 'umd',
      library: outputName,
    },
  }));
});

const CSS_EXPORT = {
  name: 'scss',
  entry: {},
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: '[name].' + (IS_PROD ? 'min.' : '') + 'css',
  },
  devServer: DEV_SERVER_CONFIG,
  devtool: IS_DEV ? 'source-map' : false,
  module: {
    rules: [{
      test: /\.scss$/,
      use: IS_DEV ? [{loader: 'style-loader'}].concat(CSS_LOADER_CONFIG) : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: CSS_LOADER_CONFIG,
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin('[name].' + (IS_PROD ? 'min.' : '') + 'css'),
  ],
};
CSS_EXPORT['entry'][PACKAGE_NAME] = path.resolve('./src/mdc.scss');
CSS_EXPORT['entry'][EXPERIMENTAL_NAME] = path.resolve('./src/experimental/mdc.scss');
packages.forEach((packageName) => {
  const scssPath = path.resolve(`./src/${packageName}/${packageName}.scss`);
  const hasScss = fs.existsSync(scssPath);
  if (!hasScss) {
    return;
  }
  CSS_EXPORT.entry[packageName] = scssPath;
});
experimentalPackages.forEach((packageName) => {
  const scssPath = path.resolve(`./src/experimental/${packageName}/${packageName}.scss`);
  const hasScss = fs.existsSync(scssPath);
  if (!hasScss) {
    return;
  }
  CSS_EXPORT.entry[`${packageName}-experimental`] = scssPath;
});
module.exports.push(CSS_EXPORT);

const DEMO_CSS_EXPORT = {
  name: 'demo-css',
  entry: {
    'demo-styles': path.resolve('./demos/all.scss'),
  },
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: '[name].css.js',
  },
  devServer: DEV_SERVER_CONFIG,
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{loader: 'style-loader'}].concat(CSS_LOADER_CONFIG),
    }],
  },
};

if (IS_DEMOS) {
  // just build the demo CSS
  module.exports = [DEMO_CSS_EXPORT];
} else if (IS_DEV) {
  module.exports.push(DEMO_CSS_EXPORT);
}
