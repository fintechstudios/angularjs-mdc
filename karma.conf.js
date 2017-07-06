'use strict';
module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['mocha', 'chai'],

    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome'],
    autoWatchBatchDelay: 300,

    webpack: configureWebpack(),

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/all.js',
      './src/**/*.spec.js',
    ],

    preprocessors: {
      './src/all.js': ['webpack'],
      './src/**/*.spec.js': ['babel'],
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch',
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
