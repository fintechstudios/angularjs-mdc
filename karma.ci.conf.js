'use strict';
module.exports = function(config) {
  config.set({
    basePath: '.',

    frameworks: ['browserify', 'mocha', 'chai'],

    autoWatch: false,
    singleRun: true,
    browsers: ['ChromeHeadless'],
    autoWatchBatchDelay: 300,

    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/util/mock-component.js',
      './dist/angularjs-mdc.min.js',
      './src/**/*.spec.js',
    ],

    preprocessors: {
      './src/**/*.spec.js': ['browserify'],
    },

    reporters: ['mocha', 'junit'],

    browserify: {
      debug: true,
      transform: [['babelify', {'presets': ['es2015']}]],
    },

    junitReporter: {
      outputDir: './test/junit',
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
