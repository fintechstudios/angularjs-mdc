'use strict';
module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['mocha', 'chai'],

    autoWatch: false,
    singleRun: true,
    browsers: ['ChromeHeadless'],
    autoWatchBatchDelay: 300,

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './dist/angularjs-mdc.min.js',
      './src/**/*.spec.js',
    ],

    preprocessors: {
      './src/**/*.spec.js': ['babel'],
    },

    reporters: ['mocha', 'junit'],

    junitReporter: {
      outputDir: './test',
      outputFile: 'junit.xml',
      suite: 'karma-angularjs-mdc',
      useBrowserName: false,
    },

    browserConsoleLogOptions: {
      level: 'debug',
      format: '%b %T: %m',
      terminal: false,
    },
  });
};
