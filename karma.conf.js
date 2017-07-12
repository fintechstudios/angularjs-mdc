'use strict';
module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['browserify', 'mocha', 'chai'],

    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome'],
    autoWatchBatchDelay: 300,

    webpack: configureWebpack(),

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/mdc.js',
      './src/**/*.spec.js',
    ],

    preprocessors: {
      './src/mdc.js': ['webpack'],
      './src/**/*.spec.js': ['browserify'],
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch',
    },

    browserify: {
      debug: true,
      transform: [['babelify', {'presets': ['es2015']}]],
    },

    browserConsoleLogOptions: {
      level: 'debug',
      format: '%b %T: %m',
      terminal: false,
    },
  });

  function configureWebpack() {
    const webpackConfig = require('./webpack.config');
    webpackConfig.entry = undefined;
    return webpackConfig;
  }
};
