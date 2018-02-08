'use strict';
module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['browserify', 'mocha', 'chai'],

    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome'],
    autoWatchBatchDelay: 300,

    webpack: require('./webpack.config')[0], // just JS output

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/util/mock-component.js',
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
};
