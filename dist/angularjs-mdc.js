(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angularjs-mdc"] = factory();
	else
		root["angularjs-mdc"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

angular.module('mdc', ['mdc.button']);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(2);

/**
 * @ngdoc component
 * @name mdcButton
 * @module mdc.button
 *
 * @param {expression=} dense Display the button densely
 * @param {expression=} raised Display the button raised (false -> flat)
 * @param {expression=} compact Display the button compact
 * @param {string=} color Color for button: "primary", "accent", or nothing
 * @param {expression=} ng-disabled En/Disable based on the expression
 *
 */

var MdcButtonController = function () {
  MdcButtonController.$inject = ['$element'];

  function MdcButtonController($element) {
    _classCallCheck(this, MdcButtonController);

    this.elem = $element;
  }

  _createClass(MdcButtonController, [{
    key: '$postLink',
    value: function $postLink() {
      this.elem.addClass('mdc-button');
    }
  }, {
    key: '$onChanges',
    value: function $onChanges() {
      var e = this.elem;
      var ctrl = this;
      ['dense', 'raised', 'compact'].forEach(function (attr) {
        if (ctrl[attr]) {
          e.addClass('mdc-button--' + attr);
        } else {
          e.removeClass('mdc-button--' + attr);
        }
      });
      if (ctrl.color === 'primary') {
        e.addClass('mdc-button--primary');
        e.removeClass('mdc-button--accent');
      } else if (ctrl.color === 'accent') {
        e.addClass('mdc-button--accent');
        e.removeClass('mdc-button--primary');
      } else {
        e.removeClass('mdc-button--primary');
        e.removeClass('mdc-button--accent');
      }
    }
  }]);

  return MdcButtonController;
}();

/**
 * @ngdoc module
 * @name mdc.button
 * @description
 *
 * Button
 */


angular.module('mdc.button', []).component('mdcButton', {
  controller: MdcButtonController,
  bindings: {
    dense: '<',
    raised: '<',
    compact: '<',
    color: '@'
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});