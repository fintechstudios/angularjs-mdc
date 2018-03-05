(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angularjs-mdc-experimental"] = factory();
	else
		root["angularjs-mdc-experimental"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  _createClass(MDCFoundation, [{
    key: "init",
    value: function init() {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }]);

  return MDCFoundation;
}();

exports.default = MDCFoundation;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayUnion = arrayUnion;
/**
 * Returns the union of two arrays.
 *
 * @param {Array} x
 * @param {Array} y
 * @return {Array}
 */
function arrayUnion() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (y.length === 0) {
    return x;
  }

  if (x.length === 0) {
    return y;
  }

  var obj = {};
  var i = void 0;
  for (i = x.length - 1; i >= 0; --i) {
    obj[x[i]] = x[i];
  }
  for (i = y.length - 1; i >= 0; --i) {
    obj[y[i]] = y[i];
  }

  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bindInjections = __webpack_require__(28);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Provides base AngularJS hooks to prevent throwing errors
 *
 * @class BaseComponent
 * @mixes BindInjections
 */
var BaseComponent = exports.BaseComponent = function (_BindInjections) {
  _inherits(BaseComponent, _BindInjections);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
  }

  _createClass(BaseComponent, [{
    key: '$onChanges',
    value: function $onChanges(changes) {}
  }, {
    key: '$onInit',
    value: function $onInit() {}
  }, {
    key: '$postLink',
    value: function $postLink() {}
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {}
  }]);

  return BaseComponent;
}(_bindInjections.BindInjections);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _foundation = __webpack_require__(0);

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @template F
 */
var MDCComponent = function () {
  _createClass(MDCComponent, null, [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!MDCComponent}
     */
    value: function attachTo(root) {
      // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
      // returns an instantiated component with its root set to that element. Also note that in the cases of
      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
      // from getDefaultFoundation().
      return new MDCComponent(root, new _foundation2.default());
    }

    /**
     * @param {!Element} root
     * @param {F=} foundation
     * @param {...?} args
     */

  }]);

  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  _createClass(MDCComponent, [{
    key: 'initialize',
    value: function initialize() /* ...args */{}
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.


    /**
     * @return {!F} foundation
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean=} shouldBubble
     */

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var evt = void 0;
      if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, {
          detail: evtData,
          bubbles: shouldBubble
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
      }

      this.root_.dispatchEvent(evt);
    }
  }]);

  return MDCComponent;
}();

exports.default = MDCComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCComponentNg = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sync MDCComponent functions with AngularJS lifecycle events.
 *
 * Exposes foundationReady for when initialSyncWithDOM is completed.
 *
 * @class MDCComponentNg
 */
var MDCComponentNg = exports.MDCComponentNg = function (_BaseComponent) {
  _inherits(MDCComponentNg, _BaseComponent);

  _createClass(MDCComponentNg, null, [{
    key: '$inject',
    get: function get() {
      return ['$element', '$scope'];
    }
  }]);

  function MDCComponentNg() {
    var _ref;

    _classCallCheck(this, MDCComponentNg);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCComponentNg.__proto__ || Object.getPrototypeOf(MDCComponentNg)).call.apply(_ref, [this].concat(args)));

    _this.unlisteners__ = {};
    _this.root_ = _this.$element[0];
    _this.foundation_ = _this.getDefaultFoundation();
    return _this;
  }

  _createClass(MDCComponentNg, [{
    key: '$onInit',
    value: function $onInit() {
      this.initialize();
    }
  }, {
    key: '$postLink',
    value: function $postLink() {
      var _this2 = this;

      this.$element.ready(function () {
        _this2.onElementReady();
        _this2.foundation_.init();
        _this2.initialSyncWithDOM();
        _this2.foundationReady = true;
      });
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.destroy();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      // Subclasses can override this to do any additional setup work that would be considered part of a
      // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
      // initialized. Any additional arguments besides root and foundation will be passed in here.
    }
  }, {
    key: 'onElementReady',
    value: function onElementReady() {}
    // Executed immediately after element.ready() within $postLink, but before foundation initialization.


    /**
     * @return {!F} foundation
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      if (this.foundationReady) {
        this.foundation_.destroy();
      }
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      if (!this.unlisteners__[evtType]) {
        this.unlisteners__[evtType] = new WeakMap();
      }

      this.unlisteners__[evtType].set(handler, this.$scope.$on(evtType, function (event, data) {
        return handler(data);
      }));
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      if (!this.unlisteners__[evtType]) {
        return;
      }

      if (this.unlisteners__[evtType].has(handler)) {
        this.unlisteners__[evtType].get(handler)();
      }
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean=} shouldBubble
     */

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.$scope.$emit(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    }
  }]);

  return MDCComponentNg;
}(_baseComponent.BaseComponent);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   noPrefix: string,
 *   webkitPrefix: string,
 *   styleProperty: string
 * }}
 */
var VendorPropertyMapType = void 0;

/** @const {Object<string, !VendorPropertyMapType>} */
var eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation'
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation'
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation'
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition'
  }
};

/** @const {Object<string, !VendorPropertyMapType>} */
var cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation'
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform'
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition'
  }
};

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return eventType in eventTypeMap || eventType in cssPropertyMap;
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
  var el = windowObj['document']['createElement']('div');
  var eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  return eventName;
}

// Public functions to access getAnimationName() for JavaScript events or CSS
// property names.

var transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectEventName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

/**
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getCorrectPropertyName(windowObj, eventType) {
  return getAnimationName(windowObj, eventType);
}

exports.transformStyleProperties = transformStyleProperties;
exports.getCorrectEventName = getCorrectEventName;
exports.getCorrectPropertyName = getCorrectPropertyName;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tab = __webpack_require__(13);

Object.defineProperty(exports, 'MDCTabFoundation', {
  enumerable: true,
  get: function get() {
    return _tab.MDCTabFoundation;
  }
});
Object.defineProperty(exports, 'MDCTab', {
  enumerable: true,
  get: function get() {
    return _tab.MDCTab;
  }
});

var _tabBar = __webpack_require__(12);

Object.defineProperty(exports, 'MDCTabBarFoundation', {
  enumerable: true,
  get: function get() {
    return _tabBar.MDCTabBarFoundation;
  }
});
Object.defineProperty(exports, 'MDCTabBar', {
  enumerable: true,
  get: function get() {
    return _tabBar.MDCTabBar;
  }
});

var _tabBarScroller = __webpack_require__(11);

Object.defineProperty(exports, 'MDCTabBarScrollerFoundation', {
  enumerable: true,
  get: function get() {
    return _tabBarScroller.MDCTabBarScrollerFoundation;
  }
});
Object.defineProperty(exports, 'MDCTabBarScroller', {
  enumerable: true,
  get: function get() {
    return _tabBarScroller.MDCTabBarScroller;
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CornerBit = exports.Corner = exports.AnchorMargin = exports.MDCMenu = exports.MDCMenuFoundation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(21);

var _foundation = __webpack_require__(39);

var _constants = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * @extends MDCComponent<!MDCMenuFoundation>
 */
var MDCMenu = function (_MDCComponent) {
  _inherits(MDCMenu, _MDCComponent);

  /** @param {...?} args */
  function MDCMenu() {
    var _ref;

    _classCallCheck(this, MDCMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @private {!Element} */
    var _this = _possibleConstructorReturn(this, (_ref = MDCMenu.__proto__ || Object.getPrototypeOf(MDCMenu)).call.apply(_ref, [this].concat(args)));

    _this.previousFocus_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @return {!MDCMenu}
   */


  _createClass(MDCMenu, [{
    key: 'show',


    /** @param {{focusIndex: ?number}=} options */
    value: function show() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$focusIndex = _ref2.focusIndex,
          focusIndex = _ref2$focusIndex === undefined ? null : _ref2$focusIndex;

      this.foundation_.open({ focusIndex: focusIndex });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.foundation_.close();
    }

    /**
     * @param {Corner} corner Default anchor corner alignment of top-left
     *     menu corner.
     */

  }, {
    key: 'setAnchorCorner',
    value: function setAnchorCorner(corner) {
      this.foundation_.setAnchorCorner(corner);
    }

    /**
     * @param {AnchorMargin} margin
     */

  }, {
    key: 'setAnchorMargin',
    value: function setAnchorMargin(margin) {
      this.foundation_.setAnchorMargin(margin);
    }

    /**
     * Return the item container element inside the component.
     * @return {?Element}
     */

  }, {
    key: 'getOptionByIndex',


    /**
     * Return the item within the menu that is selected.
     * @param {number} index
     * @return {?Element}
     */
    value: function getOptionByIndex(index) {
      var items = this.items;

      if (index < items.length) {
        return this.items[index];
      } else {
        return null;
      }
    }

    /** @param {number} index */

  }, {
    key: 'getDefaultFoundation',


    /** @return {!MDCMenuFoundation} */
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new _foundation.MDCMenuFoundation({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        hasClass: function hasClass(className) {
          return _this2.root_.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this2.itemsContainer_);
        },
        getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
          return target.getAttribute(attributeName);
        },
        getInnerDimensions: function getInnerDimensions() {
          var itemsContainer = _this2.itemsContainer_;

          return { width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight };
        },
        hasAnchor: function hasAnchor() {
          return _this2.root_.parentElement && _this2.root_.parentElement.classList.contains('mdc-menu-anchor');
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return _this2.root_.parentElement.getBoundingClientRect();
        },
        getWindowDimensions: function getWindowDimensions() {
          return { width: window.innerWidth, height: window.innerHeight };
        },
        getNumberOfItems: function getNumberOfItems() {
          return _this2.items.length;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.root_.removeEventListener(type, handler);
        },
        registerBodyClickHandler: function registerBodyClickHandler(handler) {
          return document.body.addEventListener('click', handler);
        },
        deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
          return document.body.removeEventListener('click', handler);
        },
        getIndexForEventTarget: function getIndexForEventTarget(target) {
          return _this2.items.indexOf(target);
        },
        notifySelected: function notifySelected(evtData) {
          return _this2.emit(_foundation.MDCMenuFoundation.strings.SELECTED_EVENT, {
            index: evtData.index,
            item: _this2.items[evtData.index]
          });
        },
        notifyCancel: function notifyCancel() {
          return _this2.emit(_foundation.MDCMenuFoundation.strings.CANCEL_EVENT, {});
        },
        saveFocus: function saveFocus() {
          _this2.previousFocus_ = document.activeElement;
        },
        restoreFocus: function restoreFocus() {
          if (_this2.previousFocus_) {
            _this2.previousFocus_.focus();
          }
        },
        isFocused: function isFocused() {
          return document.activeElement === _this2.root_;
        },
        focus: function focus() {
          return _this2.root_.focus();
        },
        getFocusedItemIndex: function getFocusedItemIndex() {
          return _this2.items.indexOf(document.activeElement);
        },
        focusItemAtIndex: function focusItemAtIndex(index) {
          return _this2.items[index].focus();
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
        },
        setTransformOrigin: function setTransformOrigin(origin) {
          _this2.root_.style[(0, _util.getTransformPropertyName)(window) + '-origin'] = origin;
        },
        setPosition: function setPosition(position) {
          _this2.root_.style.left = 'left' in position ? position.left : null;
          _this2.root_.style.right = 'right' in position ? position.right : null;
          _this2.root_.style.top = 'top' in position ? position.top : null;
          _this2.root_.style.bottom = 'bottom' in position ? position.bottom : null;
        },
        setMaxHeight: function setMaxHeight(height) {
          _this2.root_.style.maxHeight = height;
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
          return _this2.items[index].setAttribute(attr, value);
        },
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
          return _this2.items[index].removeAttribute(attr);
        },
        addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
          return _this2.items[index].classList.add(className);
        },
        rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
          return _this2.items[index].classList.remove(className);
        }
      });
    }
  }, {
    key: 'open',


    /** @return {boolean} */
    get: function get() {
      return this.foundation_.isOpen();
    }

    /** @param {boolean} value */
    ,
    set: function set(value) {
      if (value) {
        this.foundation_.open();
      } else {
        this.foundation_.close();
      }
    }
  }, {
    key: 'itemsContainer_',
    get: function get() {
      return this.root_.querySelector(_foundation.MDCMenuFoundation.strings.ITEMS_SELECTOR);
    }

    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     * @return {!Array<!Element>}
     */

  }, {
    key: 'items',
    get: function get() {
      var itemsContainer = this.itemsContainer_;

      return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
    }
  }, {
    key: 'selectedItemIndex',
    set: function set(index) {
      this.foundation_.setSelectedIndex(index);
    }

    /** @return {number} */
    ,
    get: function get() {
      return this.foundation_.getSelectedIndex();
    }

    /** @param {!boolean} rememberSelection */

  }, {
    key: 'rememberSelection',
    set: function set(rememberSelection) {
      this.foundation_.setRememberSelection(rememberSelection);
    }

    /** @param {boolean} quickOpen */

  }, {
    key: 'quickOpen',
    set: function set(quickOpen) {
      this.foundation_.setQuickOpen(quickOpen);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCMenu(root);
    }
  }]);

  return MDCMenu;
}(_component2.default);

exports.MDCMenuFoundation = _foundation.MDCMenuFoundation;
exports.MDCMenu = MDCMenu;
exports.AnchorMargin = _foundation.AnchorMargin;
exports.Corner = _constants.Corner;
exports.CornerBit = _constants.CornerBit;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCMenuAnchorController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @ngdoc directive
 * @name mdcMenuAnchor
 * @restrict AEC
 * @module mdc.menu
 * @description If this is the parent of mdcMenu, the menu will bind to it.
 */
var MDCMenuAnchorController = exports.MDCMenuAnchorController = function (_BaseComponent) {
  _inherits(MDCMenuAnchorController, _BaseComponent);

  _createClass(MDCMenuAnchorController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcMenuAnchor';
    }
  }, {
    key: '$inject',
    get: function get() {
      return ['$element'];
    }
  }]);

  function MDCMenuAnchorController() {
    var _ref;

    _classCallCheck(this, MDCMenuAnchorController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCMenuAnchorController.__proto__ || Object.getPrototypeOf(MDCMenuAnchorController)).call.apply(_ref, [this].concat(args)));

    _this.$element.addClass('mdc-menu-anchor');
    return _this;
  }

  _createClass(MDCMenuAnchorController, [{
    key: 'getDimensions',
    value: function getDimensions() {
      return this.$element[0].getBoundingClientRect();
    }
  }, {
    key: 'bindMenu',
    value: function bindMenu(menu) {
      this.menu = menu;
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      if (this.menu) {
        this.menu.toggle();
      }
    }
  }]);

  return MDCMenuAnchorController;
}(_baseComponent.BaseComponent);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTabBarScrollerController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _arrayUnion = __webpack_require__(1);

var _componentNg = __webpack_require__(4);

var _animation = __webpack_require__(5);

var _tabBarScroller = __webpack_require__(11);

var _tabBarScroller2 = __webpack_require__(36);

var _tabBarScroller3 = _interopRequireDefault(_tabBarScroller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @ngdoc component
 * @name mdcTabBarScroller
 * @module mdc.tab
 *
 */
var MDCTabBarScrollerController = exports.MDCTabBarScrollerController = function (_MDCComponentNg) {
  _inherits(MDCTabBarScrollerController, _MDCComponentNg);

  _createClass(MDCTabBarScrollerController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcTabBarScroller';
    }
  }, {
    key: '$inject',
    get: function get() {
      return (0, _arrayUnion.arrayUnion)(['$element', '$window', '$timeout'], _get(MDCTabBarScrollerController.__proto__ || Object.getPrototypeOf(MDCTabBarScrollerController), '$inject', this));
    }
  }, {
    key: 'transclude',
    get: function get() {
      return true;
    }
  }, {
    key: 'template',
    get: function get() {
      return _tabBarScroller3.default;
    }
  }]);

  function MDCTabBarScrollerController() {
    var _ref;

    _classCallCheck(this, MDCTabBarScrollerController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCTabBarScrollerController.__proto__ || Object.getPrototypeOf(MDCTabBarScrollerController)).call.apply(_ref, [this].concat(args)));

    _this.$element.addClass('mdc-tab-bar-scroller');
    return _this;
  }

  _createClass(MDCTabBarScrollerController, [{
    key: 'setTabBar',
    value: function setTabBar(tabBar) {
      this.tabBar_ = tabBar;
      this.tabBarEl_ = this.tabBar_.root_;
    }
  }, {
    key: 'gatherTabElements_',
    value: function gatherTabElements_() {
      this.tabElements = this.tabBar.tabElements;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.scrollFrame_ = this.root_.querySelector(_tabBarScroller.MDCTabBarScrollerFoundation.strings.FRAME_SELECTOR);
      this.forwardIndicator_ = this.root_.querySelector(_tabBarScroller.MDCTabBarScrollerFoundation.strings.INDICATOR_FORWARD_SELECTOR);
      this.backIndicator_ = this.root_.querySelector(_tabBarScroller.MDCTabBarScrollerFoundation.strings.INDICATOR_BACK_SELECTOR);
    }
  }, {
    key: 'onElementReady',
    value: function onElementReady() {
      // todo: store measurements instead of accessing live DOM (offsetWidth & offsetWidth cause reflow)
      this.gatherTabElements_();
    }
  }, {
    key: 'scrollToTabIfNotVisible',
    value: function scrollToTabIfNotVisible(tab) {
      var _this2 = this;

      this.$timeout(function () {
        var index = _this2.tabElements.indexOf(tab.root_);
        // This will probably be implemented into the foundation at some point - remove then
        if (index > -1 && !_this2.isTabAtIndexVisible(index)) {
          _this2.foundation_.scrollToTabAtIndex(index);
        }
      }, 100, false);
    }
  }, {
    key: 'isTabAtIndexVisible',
    value: function isTabAtIndexVisible(index) {
      var tabRect = this.tabElements[index].getBoundingClientRect();
      var frameRect = this.scrollFrame_.getBoundingClientRect();

      return tabRect.left >= frameRect.left && tabRect.right <= frameRect.right;
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this3 = this;

      return new _tabBarScroller.MDCTabBarScrollerFoundation({
        addClass: function addClass(className) {
          return _this3.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this3.root_.classList.remove(className);
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        addClassToForwardIndicator: function addClassToForwardIndicator(className) {
          return _this3.forwardIndicator_.classList.add(className);
        },
        removeClassFromForwardIndicator: function removeClassFromForwardIndicator(className) {
          return _this3.forwardIndicator_.classList.remove(className);
        },
        addClassToBackIndicator: function addClassToBackIndicator(className) {
          return _this3.backIndicator_.classList.add(className);
        },
        removeClassFromBackIndicator: function removeClassFromBackIndicator(className) {
          return _this3.backIndicator_.classList.remove(className);
        },
        isRTL: function isRTL() {
          return getComputedStyle(_this3.root_).getPropertyValue('direction') === 'rtl';
        },
        registerBackIndicatorClickHandler: function registerBackIndicatorClickHandler(handler) {
          return _this3.backIndicator_.addEventListener('click', handler);
        },
        deregisterBackIndicatorClickHandler: function deregisterBackIndicatorClickHandler(handler) {
          return _this3.backIndicator_.removeEventListener('click', handler);
        },
        registerForwardIndicatorClickHandler: function registerForwardIndicatorClickHandler(handler) {
          return _this3.forwardIndicator_.addEventListener('click', handler);
        },
        deregisterForwardIndicatorClickHandler: function deregisterForwardIndicatorClickHandler(handler) {
          return _this3.forwardIndicator_.removeEventListener('click', handler);
        },
        registerCapturedInteractionHandler: function registerCapturedInteractionHandler(evt, handler) {
          return _this3.root_.addEventListener(evt, handler, true);
        },
        deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler(evt, handler) {
          return _this3.root_.removeEventListener(evt, handler, true);
        },
        registerWindowResizeHandler: function registerWindowResizeHandler(handler) {
          return _this3.$window.addEventListener('resize', handler);
        },
        deregisterWindowResizeHandler: function deregisterWindowResizeHandler(handler) {
          return _this3.$window.removeEventListener('resize', handler);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this3.tabElements.length;
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this3.tabElements[index].offsetWidth;
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this3.tabElements[index].offsetLeft;
        },
        getOffsetWidthForScrollFrame: function getOffsetWidthForScrollFrame() {
          return _this3.scrollFrame_.offsetWidth;
        },
        getScrollLeftForScrollFrame: function getScrollLeftForScrollFrame() {
          return _this3.scrollFrame_.scrollLeft;
        },
        setScrollLeftForScrollFrame: function setScrollLeftForScrollFrame(scrollLeftAmount) {
          return _this3.scrollFrame_.scrollLeft = scrollLeftAmount;
        },
        getOffsetWidthForTabBar: function getOffsetWidthForTabBar() {
          return _this3.tabBarEl_ && _this3.tabBarEl_.offsetWidth;
        },
        setTransformStyleForTabBar: function setTransformStyleForTabBar(value) {
          if (!_this3.tabBarEl_) {
            return;
          }
          _this3.tabBarEl_.style.setProperty((0, _animation.getCorrectPropertyName)(_this3.$window, 'transform'), value);
        },
        getOffsetLeftForEventTarget: function getOffsetLeftForEventTarget(target) {
          return target.offsetLeft;
        },
        getOffsetWidthForEventTarget: function getOffsetWidthForEventTarget(target) {
          return target.offsetWidth;
        }
      });
    }
  }, {
    key: 'layout',
    value: function layout() {
      if (this.foundationReady) {
        this.gatherTabElements_();
        this.foundation_.layout();
      }
    }
  }, {
    key: 'tabBar',
    get: function get() {
      return this.tabBar_;
    }
  }]);

  return MDCTabBarScrollerController;
}(_componentNg.MDCComponentNg);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var has = exports.has = Object.prototype.hasOwnProperty;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTabBarScroller = exports.MDCTabBarScrollerFoundation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(5);

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _index2 = __webpack_require__(12);

var _foundation = __webpack_require__(34);

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

exports.MDCTabBarScrollerFoundation = _foundation2.default;

var MDCTabBarScroller = exports.MDCTabBarScroller = function (_MDCComponent) {
  _inherits(MDCTabBarScroller, _MDCComponent);

  function MDCTabBarScroller() {
    _classCallCheck(this, MDCTabBarScroller);

    return _possibleConstructorReturn(this, (MDCTabBarScroller.__proto__ || Object.getPrototypeOf(MDCTabBarScroller)).apply(this, arguments));
  }

  _createClass(MDCTabBarScroller, [{
    key: 'initialize',
    value: function initialize() {
      var tabBarFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (root) {
        return new _index2.MDCTabBar(root);
      };

      this.scrollFrame_ = this.root_.querySelector(_foundation2.default.strings.FRAME_SELECTOR);
      this.tabBarEl_ = this.root_.querySelector(_foundation2.default.strings.TABS_SELECTOR);
      this.forwardIndicator_ = this.root_.querySelector(_foundation2.default.strings.INDICATOR_FORWARD_SELECTOR);
      this.backIndicator_ = this.root_.querySelector(_foundation2.default.strings.INDICATOR_BACK_SELECTOR);
      this.tabBar_ = tabBarFactory(this.tabBarEl_);
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new _foundation2.default({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        addClassToForwardIndicator: function addClassToForwardIndicator(className) {
          return _this2.forwardIndicator_.classList.add(className);
        },
        removeClassFromForwardIndicator: function removeClassFromForwardIndicator(className) {
          return _this2.forwardIndicator_.classList.remove(className);
        },
        addClassToBackIndicator: function addClassToBackIndicator(className) {
          return _this2.backIndicator_.classList.add(className);
        },
        removeClassFromBackIndicator: function removeClassFromBackIndicator(className) {
          return _this2.backIndicator_.classList.remove(className);
        },
        isRTL: function isRTL() {
          return getComputedStyle(_this2.root_).getPropertyValue('direction') === 'rtl';
        },
        registerBackIndicatorClickHandler: function registerBackIndicatorClickHandler(handler) {
          return _this2.backIndicator_.addEventListener('click', handler);
        },
        deregisterBackIndicatorClickHandler: function deregisterBackIndicatorClickHandler(handler) {
          return _this2.backIndicator_.removeEventListener('click', handler);
        },
        registerForwardIndicatorClickHandler: function registerForwardIndicatorClickHandler(handler) {
          return _this2.forwardIndicator_.addEventListener('click', handler);
        },
        deregisterForwardIndicatorClickHandler: function deregisterForwardIndicatorClickHandler(handler) {
          return _this2.forwardIndicator_.removeEventListener('click', handler);
        },
        registerCapturedInteractionHandler: function registerCapturedInteractionHandler(evt, handler) {
          return _this2.root_.addEventListener(evt, handler, true);
        },
        deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler(evt, handler) {
          return _this2.root_.removeEventListener(evt, handler, true);
        },
        registerWindowResizeHandler: function registerWindowResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterWindowResizeHandler: function deregisterWindowResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this2.tabBar.tabs.length;
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this2.tabBar.tabs[index].computedWidth;
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this2.tabBar.tabs[index].computedLeft;
        },
        getOffsetWidthForScrollFrame: function getOffsetWidthForScrollFrame() {
          return _this2.scrollFrame_.offsetWidth;
        },
        getScrollLeftForScrollFrame: function getScrollLeftForScrollFrame() {
          return _this2.scrollFrame_.scrollLeft;
        },
        setScrollLeftForScrollFrame: function setScrollLeftForScrollFrame(scrollLeftAmount) {
          return _this2.scrollFrame_.scrollLeft = scrollLeftAmount;
        },
        getOffsetWidthForTabBar: function getOffsetWidthForTabBar() {
          return _this2.tabBarEl_.offsetWidth;
        },
        setTransformStyleForTabBar: function setTransformStyleForTabBar(value) {
          _this2.tabBarEl_.style.setProperty((0, _index.getCorrectPropertyName)(window, 'transform'), value);
        },
        getOffsetLeftForEventTarget: function getOffsetLeftForEventTarget(target) {
          return target.offsetLeft;
        },
        getOffsetWidthForEventTarget: function getOffsetWidthForEventTarget(target) {
          return target.offsetWidth;
        }
      });
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.foundation_.layout();
    }
  }, {
    key: 'tabBar',
    get: function get() {
      return this.tabBar_;
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCTabBarScroller(root);
    }
  }]);

  return MDCTabBarScroller;
}(_component2.default);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTabBar = exports.MDCTabBarFoundation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(13);

var _foundation = __webpack_require__(32);

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

exports.MDCTabBarFoundation = _foundation2.default;

var MDCTabBar = exports.MDCTabBar = function (_MDCComponent) {
  _inherits(MDCTabBar, _MDCComponent);

  function MDCTabBar() {
    _classCallCheck(this, MDCTabBar);

    return _possibleConstructorReturn(this, (MDCTabBar.__proto__ || Object.getPrototypeOf(MDCTabBar)).apply(this, arguments));
  }

  _createClass(MDCTabBar, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      var tabFactory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (el) {
        return new _index.MDCTab(el);
      };

      this.indicator_ = this.root_.querySelector(_foundation2.default.strings.INDICATOR_SELECTOR);
      this.tabs_ = this.gatherTabs_(tabFactory);
      this.tabSelectedHandler_ = function (_ref) {
        var detail = _ref.detail;
        var tab = detail.tab;

        _this2.setActiveTab_(tab, true);
      };
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this3 = this;

      return new _foundation2.default({
        addClass: function addClass(className) {
          return _this3.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this3.root_.classList.remove(className);
        },
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {
          return _this3.listen(_index.MDCTabFoundation.strings.SELECTED_EVENT, _this3.tabSelectedHandler_);
        },
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {
          return _this3.unlisten(_index.MDCTabFoundation.strings.SELECTED_EVENT, _this3.tabSelectedHandler_);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this3.root_.offsetWidth;
        },
        setStyleForIndicator: function setStyleForIndicator(propertyName, value) {
          return _this3.indicator_.style.setProperty(propertyName, value);
        },
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return _this3.indicator_.offsetWidth;
        },
        notifyChange: function notifyChange(evtData) {
          return _this3.emit(_foundation2.default.strings.CHANGE_EVENT, evtData);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this3.tabs.length;
        },
        isTabActiveAtIndex: function isTabActiveAtIndex(index) {
          return _this3.tabs[index].isActive;
        },
        setTabActiveAtIndex: function setTabActiveAtIndex(index, isActive) {
          _this3.tabs[index].isActive = isActive;
        },
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex(index) {
          return _this3.tabs[index].preventDefaultOnClick;
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick) {
          _this3.tabs[index].preventDefaultOnClick = preventDefaultOnClick;
        },
        measureTabAtIndex: function measureTabAtIndex(index) {
          return _this3.tabs[index].measureSelf();
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this3.tabs[index].computedWidth;
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this3.tabs[index].computedLeft;
        }
      });
    }
  }, {
    key: 'gatherTabs_',
    value: function gatherTabs_(tabFactory) {
      var tabElements = [].slice.call(this.root_.querySelectorAll(_foundation2.default.strings.TAB_SELECTOR));
      return tabElements.map(function (el) {
        return tabFactory(el);
      });
    }
  }, {
    key: 'setActiveTabIndex_',
    value: function setActiveTabIndex_(activeTabIndex, notifyChange) {
      this.foundation_.switchToTabAtIndex(activeTabIndex, notifyChange);
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.foundation_.layout();
    }
  }, {
    key: 'setActiveTab_',
    value: function setActiveTab_(activeTab, notifyChange) {
      var indexOfTab = this.tabs.indexOf(activeTab);
      if (indexOfTab < 0) {
        throw new Error('Invalid tab component given as activeTab: Tab not found within this component\'s tab list');
      }
      this.setActiveTabIndex_(indexOfTab, notifyChange);
    }
  }, {
    key: 'tabs',
    get: function get() {
      return this.tabs_;
    }
  }, {
    key: 'activeTab',
    get: function get() {
      var activeIndex = this.foundation_.getActiveTabIndex();
      return this.tabs[activeIndex];
    },
    set: function set(tab) {
      this.setActiveTab_(tab, false);
    }
  }, {
    key: 'activeTabIndex',
    get: function get() {
      return this.foundation_.getActiveTabIndex();
    },
    set: function set(index) {
      this.setActiveTabIndex_(index, false);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCTabBar(root);
    }
  }]);

  return MDCTabBar;
}(_component2.default);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTab = exports.MDCTabFoundation = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(14);

var _constants = __webpack_require__(17);

var _foundation = __webpack_require__(31);

var _foundation2 = _interopRequireDefault(_foundation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

exports.MDCTabFoundation = _foundation2.default;

var MDCTab = exports.MDCTab = function (_MDCComponent) {
  _inherits(MDCTab, _MDCComponent);

  _createClass(MDCTab, [{
    key: 'computedWidth',
    get: function get() {
      return this.foundation_.getComputedWidth();
    }
  }, {
    key: 'computedLeft',
    get: function get() {
      return this.foundation_.getComputedLeft();
    }
  }, {
    key: 'isActive',
    get: function get() {
      return this.foundation_.isActive();
    },
    set: function set(isActive) {
      this.foundation_.setActive(isActive);
    }
  }, {
    key: 'preventDefaultOnClick',
    get: function get() {
      return this.foundation_.preventsDefaultOnClick();
    },
    set: function set(preventDefaultOnClick) {
      this.foundation_.setPreventDefaultOnClick(preventDefaultOnClick);
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      return new MDCTab(root);
    }
  }]);

  function MDCTab() {
    var _ref;

    _classCallCheck(this, MDCTab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCTab.__proto__ || Object.getPrototypeOf(MDCTab)).call.apply(_ref, [this].concat(args)));

    _this.ripple_ = _index.MDCRipple.attachTo(_this.root_);
    return _this;
  }

  _createClass(MDCTab, [{
    key: 'destroy',
    value: function destroy() {
      this.ripple_.destroy();
      _get(MDCTab.prototype.__proto__ || Object.getPrototypeOf(MDCTab.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new _foundation2.default({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.root_.removeEventListener(type, handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this2.root_.offsetWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
          return _this2.root_.offsetLeft;
        },
        notifySelected: function notifySelected() {
          return _this2.emit(_foundation2.default.strings.SELECTED_EVENT, { tab: _this2 }, true);
        }
      });
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      this.isActive = this.root_.classList.contains(_constants.cssClasses.ACTIVE);
    }
  }, {
    key: 'measureSelf',
    value: function measureSelf() {
      this.foundation_.measureSelf();
    }
  }]);

  return MDCTab;
}(_component2.default);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.util = exports.RippleCapableSurface = exports.MDCRippleFoundation = exports.MDCRipple = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(3);

var _component2 = _interopRequireDefault(_component);

var _adapter = __webpack_require__(15);

var _adapter2 = _interopRequireDefault(_adapter);

var _foundation = __webpack_require__(29);

var _foundation2 = _interopRequireDefault(_foundation);

var _util = __webpack_require__(16);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */
var MDCRipple = function (_MDCComponent) {
  _inherits(MDCRipple, _MDCComponent);

  /** @param {...?} args */
  function MDCRipple() {
    var _ref;

    _classCallCheck(this, MDCRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {boolean} */
    var _this = _possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

    _this.disabled = false;

    /** @private {boolean} */
    _this.unbounded_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  _createClass(MDCRipple, [{
    key: 'setUnbounded_',


    /**
     * Closure Compiler throws an access control error when directly accessing a
     * protected or private property inside a getter/setter, like unbounded above.
     * By accessing the protected property inside a method, we solve that problem.
     * That's why this function exists.
     * @private
     */
    value: function setUnbounded_() {
      this.foundation_.setUnbounded(this.unbounded_);
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.foundation_.activate();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.foundation_.deactivate();
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.foundation_.layout();
    }

    /** @return {!MDCRippleFoundation} */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      return new _foundation2.default(MDCRipple.createAdapter(this));
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
    }
  }, {
    key: 'unbounded',


    /** @return {boolean} */
    get: function get() {
      return this.unbounded_;
    }

    /** @param {boolean} unbounded */
    ,
    set: function set(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    }
  }], [{
    key: 'attachTo',
    value: function attachTo(root) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$isUnbounded = _ref2.isUnbounded,
          isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

      var ripple = new MDCRipple(root);
      // Only override unbounded behavior if option is explicitly specified
      if (isUnbounded !== undefined) {
        ripple.unbounded = /** @type {boolean} */isUnbounded;
      }
      return ripple;
    }

    /**
     * @param {!RippleCapableSurface} instance
     * @return {!MDCRippleAdapter}
     */

  }, {
    key: 'createAdapter',
    value: function createAdapter(instance) {
      var MATCHES = util.getMatchesProperty(HTMLElement.prototype);

      return {
        browserSupportsCssVars: function browserSupportsCssVars() {
          return util.supportsCssVariables(window);
        },
        isUnbounded: function isUnbounded() {
          return instance.unbounded;
        },
        isSurfaceActive: function isSurfaceActive() {
          return instance.root_[MATCHES](':active');
        },
        isSurfaceDisabled: function isSurfaceDisabled() {
          return instance.disabled;
        },
        addClass: function addClass(className) {
          return instance.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return instance.root_.classList.remove(className);
        },
        containsEventTarget: function containsEventTarget(target) {
          return instance.root_.contains(target);
        },
        registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
          return instance.root_.addEventListener(evtType, handler, util.applyPassive());
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
          return instance.root_.removeEventListener(evtType, handler, util.applyPassive());
        },
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.addEventListener(evtType, handler, util.applyPassive());
        },
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
          return document.documentElement.removeEventListener(evtType, handler, util.applyPassive());
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return window.removeEventListener('resize', handler);
        },
        updateCssVariable: function updateCssVariable(varName, value) {
          return instance.root_.style.setProperty(varName, value);
        },
        computeBoundingRect: function computeBoundingRect() {
          return instance.root_.getBoundingClientRect();
        },
        getWindowPageOffset: function getWindowPageOffset() {
          return { x: window.pageXOffset, y: window.pageYOffset };
        }
      };
    }
  }]);

  return MDCRipple;
}(_component2.default);

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


var RippleCapableSurface = function RippleCapableSurface() {
  _classCallCheck(this, RippleCapableSurface);
};

/** @protected {!Element} */


RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;

exports.MDCRipple = MDCRipple;
exports.MDCRippleFoundation = _foundation2.default;
exports.RippleCapableSurface = RippleCapableSurface;
exports.util = util;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    _classCallCheck(this, MDCRippleAdapter);
  }

  _createClass(MDCRippleAdapter, [{
    key: "browserSupportsCssVars",

    /** @return {boolean} */
    value: function browserSupportsCssVars() {}

    /** @return {boolean} */

  }, {
    key: "isUnbounded",
    value: function isUnbounded() {}

    /** @return {boolean} */

  }, {
    key: "isSurfaceActive",
    value: function isSurfaceActive() {}

    /** @return {boolean} */

  }, {
    key: "isSurfaceDisabled",
    value: function isSurfaceDisabled() {}

    /** @param {string} className */

  }, {
    key: "addClass",
    value: function addClass(className) {}

    /** @param {string} className */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /** @param {!EventTarget} target */

  }, {
    key: "containsEventTarget",
    value: function containsEventTarget(target) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(evtType, handler) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(evtType, handler) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "registerDocumentInteractionHandler",
    value: function registerDocumentInteractionHandler(evtType, handler) {}

    /**
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: "deregisterDocumentInteractionHandler",
    value: function deregisterDocumentInteractionHandler(evtType, handler) {}

    /**
     * @param {!Function} handler
     */

  }, {
    key: "registerResizeHandler",
    value: function registerResizeHandler(handler) {}

    /**
     * @param {!Function} handler
     */

  }, {
    key: "deregisterResizeHandler",
    value: function deregisterResizeHandler(handler) {}

    /**
     * @param {string} varName
     * @param {?number|string} value
     */

  }, {
    key: "updateCssVariable",
    value: function updateCssVariable(varName, value) {}

    /** @return {!ClientRect} */

  }, {
    key: "computeBoundingRect",
    value: function computeBoundingRect() {}

    /** @return {{x: number, y: number}} */

  }, {
    key: "getWindowPageOffset",
    value: function getWindowPageOffset() {}
  }]);

  return MDCRippleAdapter;
}();

exports.default = MDCRippleAdapter;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
var supportsCssVariables_ = void 0;

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean}
 */
function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}

/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */

function supportsCssVariables(windowObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables_ = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables_ = false;
  }
  return supportsCssVariables_;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}

exports.supportsCssVariables = supportsCssVariables;
exports.applyPassive = applyPassive;
exports.getMatchesProperty = getMatchesProperty;
exports.getNormalizedEventCoords = getNormalizedEventCoords;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = exports.cssClasses = {
  ACTIVE: 'mdc-tab--active'
};

var strings = exports.strings = {
  SELECTED_EVENT: 'MDCTab:selected'
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTabBarController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _arrayUnion = __webpack_require__(1);

var _componentNg = __webpack_require__(4);

var _tabBarScroller = __webpack_require__(9);

var _tabs = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @ngdoc component
 * @name mdcTabBar
 * @module mdc.tabs
 *
 * @param {string} [variant] - Style variant - "icon", ""icons-text", or none for default
 * @param {string} [ngModel] - Assignable AngularJS expression to bind selected tab to
 */
var MDCTabBarController = exports.MDCTabBarController = function (_MDCComponentNg) {
  _inherits(MDCTabBarController, _MDCComponentNg);

  _createClass(MDCTabBarController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcTabBar';
    }
  }, {
    key: 'require',
    get: function get() {
      return {
        scroller: '^^?' + _tabBarScroller.MDCTabBarScrollerController.name,
        ngModel: '?'
      };
    }
  }, {
    key: 'bindings',
    get: function get() {
      return {
        variant: '@'
      };
    }
  }, {
    key: '$inject',
    get: function get() {
      return (0, _arrayUnion.arrayUnion)(['$element', '$window', '$timeout'], _get(MDCTabBarController.__proto__ || Object.getPrototypeOf(MDCTabBarController), '$inject', this));
    }
  }]);

  function MDCTabBarController() {
    var _ref;

    _classCallCheck(this, MDCTabBarController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCTabBarController.__proto__ || Object.getPrototypeOf(MDCTabBarController)).call.apply(_ref, [this].concat(args)));

    _this.$element.addClass('mdc-tab-bar');

    _this.indicator_ = angular.element('<span class="mdc-tab-bar__indicator"></span>')[0];
    _this.$element.append(_this.indicator_);

    _this.tabs_ = []; // tabs will automatically add themselves to the list using .addTab()
    return _this;
  }

  _createClass(MDCTabBarController, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.tabSelectedHandler_ = function (_ref2) {
        var tab = _ref2.detail.tab;
        return _this2.activateTab(tab, true);
      };
    }
  }, {
    key: 'onElementReady',
    value: function onElementReady() {}
  }, {
    key: 'activateTab',
    value: function activateTab(tab) {
      var _this3 = this;

      var index = this.tabs.indexOf(tab);

      this.$timeout(function () {
        return _this3.foundation_.switchToTabAtIndex(index, true);
      }, 20, false);

      if (this.scroller) {
        this.scroller.scrollToTabIfNotVisible(tab);
      }
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this4 = this;

      return new _tabs.MDCTabBarFoundation({
        addClass: function addClass(className) {
          return _this4.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this4.root_.classList.remove(className);
        },
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {
          return _this4.listen(_tabs.MDCTabFoundation.strings.SELECTED_EVENT, _this4.tabSelectedHandler_);
        },
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {
          return _this4.unlisten(_tabs.MDCTabFoundation.strings.SELECTED_EVENT, _this4.tabSelectedHandler_);
        },
        registerResizeHandler: function registerResizeHandler(handler) {
          return _this4.$window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: function deregisterResizeHandler(handler) {
          return _this4.$window.removeEventListener('resize', handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this4.root_.offsetWidth;
        },
        setStyleForIndicator: function setStyleForIndicator(propertyName, value) {
          return _this4.indicator_.style.setProperty(propertyName, value);
        },
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return _this4.indicator_.offsetWidth;
        },
        notifyChange: function notifyChange(evtData) {
          return _this4.emit(_tabs.MDCTabBarFoundation.strings.CHANGE_EVENT, evtData);
        },
        getNumberOfTabs: function getNumberOfTabs() {
          return _this4.tabs.length;
        },
        isTabActiveAtIndex: function isTabActiveAtIndex(index) {
          return _this4.tabs[index] && _this4.tabs[index].isActive;
        },
        setTabActiveAtIndex: function setTabActiveAtIndex(index, isActive) {
          if (_this4.tabs[index]) {
            _this4.tabs[index].isActive = isActive;
          }
        },
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex(index) {
          return _this4.tabs[index].preventDefaultOnClick;
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex(index, preventDefaultOnClick) {
          _this4.tabs[index].preventDefaultOnClick = preventDefaultOnClick;
        },
        measureTabAtIndex: function measureTabAtIndex(index) {
          return _this4.tabs[index] && _this4.tabs[index].measureSelf();
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex(index) {
          return _this4.tabs[index] && _this4.tabs[index].computedWidth;
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex(index) {
          return _this4.tabs[index] && _this4.tabs[index].computedLeft;
        }
      });
    }
  }, {
    key: 'layout',
    value: function layout() {
      if (this.foundationReady) {
        this.foundation_.layout();

        if (this.ngModel) {
          this.ngModel.$render();
        }
        if (this.scroller) {
          this.scroller.layout();
        }
      }
    }
  }, {
    key: 'addTab',
    value: function addTab(tab) {
      this.tabs.push(tab);
      if (this.ngModel) {
        this.ngModel.$viewChangeListeners.push(tab.$viewChangeHandler);
      }
      this.layout();
    }
  }, {
    key: 'removeTab',
    value: function removeTab(tab) {
      var viewHandlerIndex = this.ngModel ? this.ngModel.$viewChangeListeners.indexOf(tab.$viewChangeHandler) : -1;
      if (viewHandlerIndex >= 0) {
        this.ngModel.$viewChangeListeners.splice(viewHandlerIndex, 1);
      }

      var indexOfTab = this.tabs.indexOf(tab);
      if (indexOfTab >= 0) {
        this.tabs.splice(indexOfTab, 1);
        this.layout();
      }
    }
  }, {
    key: '$postLink',
    value: function $postLink() {
      _get(MDCTabBarController.prototype.__proto__ || Object.getPrototypeOf(MDCTabBarController.prototype), '$postLink', this).call(this);

      if (this.scroller) {
        this.$element.addClass('mdc-tab-bar-scroller__scroll-frame__tabs');
        this.scroller.setTabBar(this);
      }
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      var _this5 = this;

      if (this.ngModel) {
        this.ngModel.$render = function () {
          return _this5.ngModel.$viewChangeListeners.forEach(function (listener) {
            return listener();
          });
        };
      } else if (this.tabs.length > 0) {
        // not using ngModel, so first tab must be active
        this.tabs[0].isActive = true;
      }
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(changes) {
      _get(MDCTabBarController.prototype.__proto__ || Object.getPrototypeOf(MDCTabBarController.prototype), '$onChanges', this).call(this, changes);

      if (changes.variant) {
        this.$element.toggleClass('mdc-tab-bar--icon-tabs', this.variant === 'icon');
        this.$element.toggleClass('mdc-tab-bar--icons-with-text', this.variant === 'icons-text');
      }
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.tabs.length = 0; // if $onDestroy is called, all the tabs should already be gone - remove references
      _get(MDCTabBarController.prototype.__proto__ || Object.getPrototypeOf(MDCTabBarController.prototype), '$onDestroy', this).call(this);
    }
  }, {
    key: 'tabElements',
    get: function get() {
      return [].slice.call(this.root_.getElementsByClassName('mdc-tab'));
    }
  }, {
    key: 'value',
    get: function get() {
      return this.ngModel && this.ngModel.$viewValue;
    },
    set: function set(value) {
      if (this.ngModel) {
        this.ngModel.$setViewValue(value);
      }
    }
  }, {
    key: 'tabs',
    get: function get() {
      return this.tabs_;
    }
  }, {
    key: 'activeIndex',
    get: function get() {
      return this.foundation_.getActiveTabIndex();
    }
  }]);

  return MDCTabBarController;
}(_componentNg.MDCComponentNg);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTabController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _arrayUnion = __webpack_require__(1);

var _componentNg = __webpack_require__(4);

var _mixin = __webpack_require__(38);

var _tabBar = __webpack_require__(18);

var _tabs = __webpack_require__(6);

var _hasNgValueMixin = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @ngdoc component
 * @name mdcTab
 * @module mdc.tabs
 *
 * @param {*} [ngValue] - expression to evaluate as
 * @param {string} [value] - string value to use if ngValue isn't specified
 */
var MDCTabController = exports.MDCTabController = function (_HasNgValue) {
  _inherits(MDCTabController, _HasNgValue);

  _createClass(MDCTabController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcTab';
    }
  }, {
    key: 'require',
    get: function get() {
      return {
        tabBar: '^^' + _tabBar.MDCTabBarController.name
      };
    }
  }, {
    key: '$inject',
    get: function get() {
      return (0, _arrayUnion.arrayUnion)(['$element', '$scope'], _get(MDCTabController.__proto__ || Object.getPrototypeOf(MDCTabController), '$inject', this));
    }
  }]);

  function MDCTabController() {
    var _ref;

    _classCallCheck(this, MDCTabController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCTabController.__proto__ || Object.getPrototypeOf(MDCTabController)).call.apply(_ref, [this].concat(args)));

    _this.$element.addClass('mdc-tab');
    if (!_this.$element.attr('href') && !_this.$element.attr('tabindex')) {
      _this.$element.attr('tabindex', 0);
    }

    _this.$viewChangeHandler = function () {
      _this.isActive = _this.tabBar.value === _this.getValue();

      if (_this.isActive) {
        _this.tabBar.activateTab(_this);
      }
    };
    return _this;
  }

  _createClass(MDCTabController, [{
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      this.$viewChangeHandler();
    }
  }, {
    key: 'onSelect_',
    value: function onSelect_() {
      if (this.tabBar.ngModel) {
        this.tabBar.value = this.getValue();
      } else {
        this.tabBar.activateTab(this);
      }
    }
  }, {
    key: 'setMDCText',
    value: function setMDCText(value) {
      this.$element.toggleClass('mdc-tab--with-icon-and-text', Boolean(value));
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      _get(MDCTabController.prototype.__proto__ || Object.getPrototypeOf(MDCTabController.prototype), '$onDestroy', this).call(this);

      if (this.tabBar) {
        this.tabBar.removeTab(this);
      }
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(changes) {
      _get(MDCTabController.prototype.__proto__ || Object.getPrototypeOf(MDCTabController.prototype), '$onChanges', this).call(this, changes);

      if ((changes.value || changes.ngValue) && this.foundationReady) {
        this.$viewChangeHandler();
      }
    }
  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new _tabs.MDCTabFoundation({
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.root_.removeEventListener(type, handler);
        },
        getOffsetWidth: function getOffsetWidth() {
          return _this2.root_.offsetWidth;
        },
        getOffsetLeft: function getOffsetLeft() {
          return _this2.root_.offsetLeft;
        },
        notifySelected: function notifySelected() {
          return _this2.onSelect_();
        }
      });
    }
  }, {
    key: 'measureSelf',
    value: function measureSelf() {
      this.foundation_.measureSelf();
    }
  }, {
    key: 'tabBar',
    set: function set(bar) {
      this.tabBar_ = bar;
      if (bar) {
        bar.addTab(this);
      }
    },
    get: function get() {
      return this.tabBar_;
    }
  }, {
    key: 'computedWidth',
    get: function get() {
      return this.foundation_.getComputedWidth();
    }
  }, {
    key: 'computedLeft',
    get: function get() {
      return this.foundation_.getComputedLeft();
    }
  }, {
    key: 'isActive',
    get: function get() {
      return this.foundation_.isActive();
    },
    set: function set(isActive) {
      this.foundation_.setActive(isActive);
    }
  }, {
    key: 'preventDefaultOnClick',
    get: function get() {
      return this.foundation_.preventsDefaultOnClick();
    },
    set: function set(preventDefaultOnClick) {
      this.foundation_.setPreventDefaultOnClick(preventDefaultOnClick);
    }
  }]);

  return MDCTabController;
}((0, _hasNgValueMixin.HasNgValue)((0, _mixin.MDCRippleMixin)(_componentNg.MDCComponentNg)));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasNgValue = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _has = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Exposes getValue() to get the value from ngValue or value bindings.
 *
 * @mixin HasNgValue
 * @param Base
 */
var HasNgValue = exports.HasNgValue = function HasNgValue(Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getValue',
      value: function getValue() {
        return _has.has.call(this, 'ngValue') ? this.ngValue : this.value;
      }
    }], [{
      key: 'bindings',
      get: function get() {
        return _extends({ ngValue: '<?', value: '@?' }, _get(_class.__proto__ || Object.getPrototypeOf(_class), 'bindings', this));
      }
    }]);

    return _class;
  }(Base);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {string|undefined} */
var storedTransformPropertyName_ = void 0;

/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */
function getTransformPropertyName(globalObj) {
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    var el = globalObj.document.createElement('div');
    var transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

/**
 * Clamps a value between the minimum and the maximum, returning the clamped value.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function clamp(value) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  return Math.min(max, Math.max(min, value));
}

/**
 * Returns the easing value to apply at time t, for a given cubic bezier curve.
 * Control points P0 and P3 are assumed to be (0,0) and (1,1), respectively.
 * Parameters are as follows:
 * - time: The current time in the animation, scaled between 0 and 1.
 * - x1: The x value of control point P1.
 * - y1: The y value of control point P1.
 * - x2: The x value of control point P2.
 * - y2: The y value of control point P2.
 * @param {number} time
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {number}
 */
function bezierProgress(time, x1, y1, x2, y2) {
  return getBezierCoordinate_(solvePositionFromXValue_(time, x1, x2), y1, y2);
}

/**
 * Compute a single coordinate at a position point between 0 and 1.
 * c1 and c2 are the matching coordinate on control points P1 and P2, respectively.
 * Control points P0 and P3 are assumed to be (0,0) and (1,1), respectively.
 * Adapted from https://github.com/google/closure-library/blob/master/closure/goog/math/bezier.js.
 * @param {number} t
 * @param {number} c1
 * @param {number} c2
 * @return {number}
 */
function getBezierCoordinate_(t, c1, c2) {
  // Special case start and end.
  if (t === 0 || t === 1) {
    return t;
  }

  // Step one - from 4 points to 3
  var ic0 = t * c1;
  var ic1 = c1 + t * (c2 - c1);
  var ic2 = c2 + t * (1 - c2);

  // Step two - from 3 points to 2
  ic0 += t * (ic1 - ic0);
  ic1 += t * (ic2 - ic1);

  // Final step - last point
  return ic0 + t * (ic1 - ic0);
}

/**
 * Project a point onto the Bezier curve, from a given X. Calculates the position t along the curve.
 * Adapted from https://github.com/google/closure-library/blob/master/closure/goog/math/bezier.js.
 * @param {number} xVal
 * @param {number} x1
 * @param {number} x2
 * @return {number}
 */
function solvePositionFromXValue_(xVal, x1, x2) {
  var EPSILON = 1e-6;
  var MAX_ITERATIONS = 8;

  if (xVal <= 0) {
    return 0;
  } else if (xVal >= 1) {
    return 1;
  }

  // Initial estimate of t using linear interpolation.
  var t = xVal;

  // Try gradient descent to solve for t. If it works, it is very fast.
  var tMin = 0;
  var tMax = 1;
  var value = 0;
  for (var i = 0; i < MAX_ITERATIONS; i++) {
    value = getBezierCoordinate_(t, x1, x2);
    var derivative = (getBezierCoordinate_(t + EPSILON, x1, x2) - value) / EPSILON;
    if (Math.abs(value - xVal) < EPSILON) {
      return t;
    } else if (Math.abs(derivative) < EPSILON) {
      break;
    } else {
      if (value < xVal) {
        tMin = t;
      } else {
        tMax = t;
      }
      t -= (value - xVal) / derivative;
    }
  }

  // If the gradient descent got stuck in a local minimum, e.g. because
  // the derivative was close to 0, use a Dichotomy refinement instead.
  // We limit the number of interations to 8.
  for (var _i = 0; Math.abs(value - xVal) > EPSILON && _i < MAX_ITERATIONS; _i++) {
    if (value < xVal) {
      tMin = t;
      t = (t + tMax) / 2;
    } else {
      tMax = t;
      t = (t + tMin) / 2;
    }
    value = getBezierCoordinate_(t, x1, x2);
  }
  return t;
}

exports.getTransformPropertyName = getTransformPropertyName;
exports.clamp = clamp;
exports.bezierProgress = bezierProgress;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var cssClasses = {
  ROOT: 'mdc-menu',
  OPEN: 'mdc-menu--open',
  ANIMATING_OPEN: 'mdc-menu--animating-open',
  ANIMATING_CLOSED: 'mdc-menu--animating-closed',
  SELECTED_LIST_ITEM: 'mdc-list-item--selected'
};

/** @enum {string} */
var strings = {
  ITEMS_SELECTOR: '.mdc-menu__items',
  SELECTED_EVENT: 'MDCMenu:selected',
  CANCEL_EVENT: 'MDCMenu:cancel',
  ARIA_DISABLED_ATTR: 'aria-disabled'
};

/** @enum {number} */
var numbers = {
  // Amount of time to wait before triggering a selected event on the menu. Note that this time
  // will most likely be bumped up once interactive lists are supported to allow for the ripple to
  // animate before closing the menu
  SELECTED_TRIGGER_DELAY: 50,
  // Total duration of menu open animation.
  TRANSITION_OPEN_DURATION: 120,
  // Total duration of menu close animation.
  TRANSITION_CLOSE_DURATION: 75,
  // Margin left to the edge of the viewport when menu is at maximum possible height.
  MARGIN_TO_EDGE: 32,
  // Ratio of anchor width to menu width for switching from corner positioning to center positioning.
  ANCHOR_TO_MENU_WIDTH_RATIO: 0.67,
  // Ratio of vertical offset to menu height for switching from corner to mid-way origin positioning.
  OFFSET_TO_MENU_HEIGHT_RATIO: 0.1
};

/**
 * Enum for bits in the {@see Corner) bitmap.
 * @enum {number}
 */
var CornerBit = {
  BOTTOM: 1,
  CENTER: 2,
  RIGHT: 4,
  FLIP_RTL: 8
};

/**
 * Enum for representing an element corner for positioning the menu.
 *
 * The START constants map to LEFT if element directionality is left
 * to right and RIGHT if the directionality is right to left.
 * Likewise END maps to RIGHT or LEFT depending on the directionality.
 *
 * @enum {number}
 */
var Corner = {
  TOP_LEFT: 0,
  TOP_RIGHT: CornerBit.RIGHT,
  BOTTOM_LEFT: CornerBit.BOTTOM,
  BOTTOM_RIGHT: CornerBit.BOTTOM | CornerBit.RIGHT,
  TOP_START: CornerBit.FLIP_RTL,
  TOP_END: CornerBit.FLIP_RTL | CornerBit.RIGHT,
  BOTTOM_START: CornerBit.BOTTOM | CornerBit.FLIP_RTL,
  BOTTOM_END: CornerBit.BOTTOM | CornerBit.RIGHT | CornerBit.FLIP_RTL
};

exports.cssClasses = cssClasses;
exports.strings = strings;
exports.numbers = numbers;
exports.CornerBit = CornerBit;
exports.Corner = Corner;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCMenuToggleController = exports.MDC_MENU_TOGGLE_EVENT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(2);

var _directive = __webpack_require__(8);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MDC_MENU_TOGGLE_EVENT = exports.MDC_MENU_TOGGLE_EVENT = 'MDCMenu:toggle';

/**
 * @ngdoc directive
 * @name mdcMenuToggle
 * @module mdc.menu
 * @restrict AEC
 * @description Binds a click handler to open mdc-menu.
 * Requires menuId to be given as `mdc-menu-toggle="{{ menuId }}" or that it be used within mdc-menu-anchor
 */

var MDCMenuToggleController = exports.MDCMenuToggleController = function (_BaseComponent) {
  _inherits(MDCMenuToggleController, _BaseComponent);

  _createClass(MDCMenuToggleController, [{
    key: 'menuId',
    get: function get() {
      return this[this.constructor.name];
    }
  }], [{
    key: 'name',
    get: function get() {
      return 'mdcMenuToggle';
    }
  }, {
    key: '$inject',
    get: function get() {
      return ['$element', '$rootScope'];
    }
  }, {
    key: 'bindings',
    get: function get() {
      return _defineProperty({}, this.name, '@');
    }
  }, {
    key: 'require',
    get: function get() {
      return {
        mdcMenuAnchorCtrl: '^^?' + _directive.MDCMenuAnchorController.name
      };
    }
  }]);

  function MDCMenuToggleController() {
    var _ref2;

    _classCallCheck(this, MDCMenuToggleController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref2 = MDCMenuToggleController.__proto__ || Object.getPrototypeOf(MDCMenuToggleController)).call.apply(_ref2, [this].concat(args)));

    _this.$element.on('click', function () {
      if (_this.menuId) {
        _this.$rootScope.$broadcast(MDC_MENU_TOGGLE_EVENT, { id: _this.menuId });
      } else if (_this.mdcMenuAnchorCtrl) {
        _this.mdcMenuAnchorCtrl.toggleMenu();
      }
    });
    return _this;
  }

  return MDCMenuToggleController;
}(_baseComponent.BaseComponent);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCMenuController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _arrayUnion = __webpack_require__(1);

var _componentNg = __webpack_require__(4);

var _directive = __webpack_require__(8);

var _component = __webpack_require__(25);

var _directive2 = __webpack_require__(23);

var _menu = __webpack_require__(7);

var _util = __webpack_require__(21);

var _mdcMenu = __webpack_require__(44);

var _mdcMenu2 = _interopRequireDefault(_mdcMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CORNER_PROPERTY_REGEX = /([ -])/;
function convertToCornerProperty(anchorFrom) {
  return anchorFrom.replace(CORNER_PROPERTY_REGEX, '_').toUpperCase();
}

/**
 * @ngdoc component
 * @name mdcMenu
 * @module mdc.menu
 *
 * @param {string} [id] - Specify so that mdcSimpleMenuToggle can be directed to bind to this menu.
 * @param {boolean} [open] - Whether the menu is currently opened or closed
 * @param {boolean} [rememberSelection] - whether to remember that an item is selected
 * @param {boolean} [quickOpen] - whether to disable open animation
 * @param {string} [anchorCorner=TOP_START] - TOP_START, TOP_END, BOTTOM_START, BOTTOM_END
 * @param {AnchorMargin} [anchorMargin] - default {top: 0, right: 0, bottom: 0, left: 0}
 */

var MDCMenuController = exports.MDCMenuController = function (_MDCComponentNg) {
  _inherits(MDCMenuController, _MDCComponentNg);

  _createClass(MDCMenuController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcMenu';
    }
  }, {
    key: 'bindings',
    get: function get() {
      return {
        id: '@?',
        open: '<?',
        rememberSelection: '<?',
        quickOpen: '<?',
        anchorCorner: '@?',
        anchorMargin: '<?'
      };
    }
  }, {
    key: 'require',
    get: function get() {
      return {
        mdcMenuAnchorCtrl: '^^?' + _directive.MDCMenuAnchorController.name
      };
    }
  }, {
    key: 'transclude',
    get: function get() {
      return true;
    }
  }, {
    key: '$inject',
    get: function get() {
      return (0, _arrayUnion.arrayUnion)(['$element', '$document', '$window', '$rootScope'], _get(MDCMenuController.__proto__ || Object.getPrototypeOf(MDCMenuController), '$inject', this));
    }
  }, {
    key: 'template',
    get: function get() {
      return _mdcMenu2.default;
    }
  }]);

  function MDCMenuController() {
    var _ref;

    _classCallCheck(this, MDCMenuController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCMenuController.__proto__ || Object.getPrototypeOf(MDCMenuController)).call.apply(_ref, [this].concat(args)));

    _this.$element.addClass('mdc-menu');
    _this.itemControllers = [];
    return _this;
  }

  _createClass(MDCMenuController, [{
    key: '$postLink',
    value: function $postLink() {
      var _this2 = this;

      _get(MDCMenuController.prototype.__proto__ || Object.getPrototypeOf(MDCMenuController.prototype), '$postLink', this).call(this);

      if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
        this.$element.attr('tabindex', -1);
      }

      this.stopListening = this.$rootScope.$on(_directive2.MDC_MENU_TOGGLE_EVENT, function (event, _ref2) {
        var id = _ref2.id;

        if (id === _this2.id) {
          _this2.toggle();
        }
      });
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(changes) {
      _get(MDCMenuController.prototype.__proto__ || Object.getPrototypeOf(MDCMenuController.prototype), '$onChanges', this).call(this, changes);

      if (changes.open) {
        this.open ? this.show() : this.hide();
      }
      if (changes.anchorCorner && this.anchorCorner) {
        var asProp = _menu.MDCMenuFoundation.Corner[convertToCornerProperty(this.anchorCorner)];
        if (asProp !== undefined) {
          this.foundation_.setAnchorCorner(asProp);
        }
      }
      if (changes.anchorMargin && this.anchorMargin) {
        this.foundation_.setAnchorMargin({
          top: Number(this.anchorMargin.top), bottom: Number(this.anchorMargin.bottom),
          left: Number(this.anchorMargin.left), right: Number(this.anchorMargin.right)
        });
      }
      if (changes.rememberSelection) {
        this.foundation_.setRememberSelection(this.rememberSelection);
      }
      if (changes.quickOpen) {
        this.foundation_.setQuickOpen(this.quickOpen);
      }
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      if (this.mdcMenuAnchorCtrl) {
        this.mdcMenuAnchorCtrl.bindMenu(null);
      }

      if (this.stopListening) {
        this.stopListening();
      }
    }
  }, {
    key: 'addItem_',
    value: function addItem_(itemCtrl) {
      this.itemControllers.push(itemCtrl);
    }
  }, {
    key: 'removeItem_',
    value: function removeItem_(itemCtrl) {
      var index = this.itemControllers.indexOf(itemCtrl);
      if (index >= 0) {
        this.itemControllers.splice(itemCtrl, 1);
      }
    }

    /**
     * Return the item container element inside the component.
     * @return {?Element}
     */

  }, {
    key: 'getDefaultFoundation',


    /** @return {!MDCMenuFoundation} */
    value: function getDefaultFoundation() {
      var _this3 = this;

      return new _menu.MDCMenuFoundation({
        addClass: function addClass(className) {
          return _this3.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this3.root_.classList.remove(className);
        },
        hasClass: function hasClass(className) {
          return _this3.root_.classList.contains(className);
        },
        hasNecessaryDom: function hasNecessaryDom() {
          return Boolean(_this3.itemsContainer_);
        },
        getAttributeForEventTarget: function getAttributeForEventTarget(target, attributeName) {
          return target.getAttribute(attributeName);
        },
        eventTargetHasClass: function eventTargetHasClass(target, className) {
          return target.classList.contains(className);
        },
        getInnerDimensions: function getInnerDimensions() {
          var itemsContainer = _this3.itemsContainer_;

          return { width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight };
        },
        hasAnchor: function hasAnchor() {
          return Boolean(_this3.mdcMenuAnchorCtrl);
        },
        getAnchorDimensions: function getAnchorDimensions() {
          return _this3.mdcMenuAnchorCtrl.getDimensions();
        },
        getWindowDimensions: function getWindowDimensions() {
          return { width: _this3.$window.innerWidth, height: _this3.$window.innerHeight };
        },
        getNumberOfItems: function getNumberOfItems() {
          return _this3.items.length;
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this3.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this3.root_.removeEventListener(type, handler);
        },
        registerBodyClickHandler: function registerBodyClickHandler(handler) {
          return _this3.$document[0].body.addEventListener('click', handler);
        },
        deregisterBodyClickHandler: function deregisterBodyClickHandler(handler) {
          return _this3.$document[0].body.removeEventListener('click', handler);
        },
        getIndexForEventTarget: function getIndexForEventTarget(target) {
          return _this3.items.indexOf(target);
        },
        notifySelected: function notifySelected(evtData) {
          return _this3.emit(_menu.MDCMenuFoundation.strings.SELECTED_EVENT, {
            index: evtData.index,
            item: angular.element(_this3.items[evtData.index]).controller(_component.MDCMenuItemController.name)
          });
        },
        notifyCancel: function notifyCancel() {
          return _this3.emit(_menu.MDCMenuFoundation.strings.CANCEL_EVENT, {});
        },
        saveFocus: function saveFocus() {
          _this3.previousFocus_ = _this3.$document[0].activeElement;
        },
        restoreFocus: function restoreFocus() {
          if (_this3.previousFocus_) {
            _this3.previousFocus_.focus();
          }
        },
        isFocused: function isFocused() {
          return _this3.$document[0].activeElement === _this3.root_;
        },
        focus: function focus() {
          return _this3.root_.focus();
        },
        getFocusedItemIndex: function getFocusedItemIndex() {
          return _this3.items.indexOf(_this3.$document[0].activeElement);
        },
        focusItemAtIndex: function focusItemAtIndex(index) {
          _this3.items[index].focus();
        },
        isRtl: function isRtl() {
          return getComputedStyle(_this3.root_).getPropertyValue('direction') === 'rtl';
        },
        setTransformOrigin: function setTransformOrigin(origin) {
          _this3.root_.style[(0, _util.getTransformPropertyName)(window) + '-origin'] = origin;
        },
        setPosition: function setPosition(position) {
          _this3.root_.style.left = 'left' in position ? position.left : null;
          _this3.root_.style.right = 'right' in position ? position.right : null;
          _this3.root_.style.top = 'top' in position ? position.top : null;
          _this3.root_.style.bottom = 'bottom' in position ? position.bottom : null;
        },
        setMaxHeight: function setMaxHeight(height) {
          _this3.root_.style.maxHeight = height;
        },
        setAttrForOptionAtIndex: function setAttrForOptionAtIndex(index, attr, value) {
          return _this3.items[index].setAttribute(attr, value);
        },
        rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex(index, attr) {
          return _this3.items[index].removeAttribute(attr);
        },
        addClassForOptionAtIndex: function addClassForOptionAtIndex(index, className) {
          return _this3.items[index].classList.add(className);
        },
        rmClassForOptionAtIndex: function rmClassForOptionAtIndex(index, className) {
          return _this3.items[index].classList.remove(className);
        }
      });
    }

    /** @param {{focusIndex: ?number}=} options */

  }, {
    key: 'show',
    value: function show() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$focusIndex = _ref3.focusIndex,
          focusIndex = _ref3$focusIndex === undefined ? null : _ref3$focusIndex;

      this.foundation_.open({ focusIndex: focusIndex });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.foundation_.close();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.foundation_.isOpen() ? this.hide() : this.show();
    }
  }, {
    key: 'mdcMenuAnchorCtrl',
    set: function set(anchor) {
      this.mdcMenuAnchorCtrl_ = anchor;
      if (anchor) {
        anchor.bindMenu(this);
      }
    },
    get: function get() {
      return this.mdcMenuAnchorCtrl_;
    }
  }, {
    key: 'itemsContainer_',
    get: function get() {
      return this.root_.querySelector(_menu.MDCMenuFoundation.strings.ITEMS_SELECTOR);
    }

    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     * @return {!Array<!Element>}
     */

  }, {
    key: 'items',
    get: function get() {
      var itemsContainer = this.itemsContainer_;

      return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
    }
  }]);

  return MDCMenuController;
}(_componentNg.MDCComponentNg);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCMenuItemController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(2);

var _component = __webpack_require__(24);

var _menu = __webpack_require__(7);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @callback onSelectCallback
 * @param {Number} index
 * @param {MDCMenuItemController} item
 */

/**
 * @ngdoc directive
 * @name mdcMenuItem
 * @restrict AEC
 * @module mdc.menu
 * @description Used as a child of mdcMenu to create menu items
 * @example
 * mdc-menu-item="expression()"
 * // or
 * <mdc-menu-item on-select="expression()">
 *
 * @param {onSelectCallback} [onSelect] - expression to evaluate if item is selected
 */
var MDCMenuItemController = exports.MDCMenuItemController = function (_BaseComponent) {
  _inherits(MDCMenuItemController, _BaseComponent);

  _createClass(MDCMenuItemController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcMenuItem';
    }
  }, {
    key: '$inject',
    get: function get() {
      return ['$element', '$scope'];
    }
  }, {
    key: 'bindings',
    get: function get() {
      return _defineProperty({
        onSelect: '&?'
      }, this.name, '&?');
    }
  }, {
    key: 'require',
    get: function get() {
      return {
        mdcMenuController: '^^' + _component.MDCMenuController.name
      };
    }
  }]);

  function MDCMenuItemController() {
    var _ref2;

    _classCallCheck(this, MDCMenuItemController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref2 = MDCMenuItemController.__proto__ || Object.getPrototypeOf(MDCMenuItemController)).call.apply(_ref2, [this].concat(args)));

    _this.$element.addClass('mdc-list-item');
    _this.$element.attr('role', 'menuitem');

    _this.selectHandler = function (_ref3) {
      var _ref3$detail = _ref3.detail,
          index = _ref3$detail.index,
          item = _ref3$detail.item;

      if (item === _this) {
        _this.select(index);
      }
    };
    return _this;
  }

  _createClass(MDCMenuItemController, [{
    key: '$postLink',
    value: function $postLink() {
      if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
        this.$element.attr('tabindex', 0);
      }

      this.mdcMenuController.addItem_(this);
      this.mdcMenuController.listen(_menu.MDCMenuFoundation.strings.SELECTED_EVENT, this.selectHandler);
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.mdcMenuController.unlisten(_menu.MDCMenuFoundation.strings.SELECTED_EVENT, this.selectHandler);
      this.mdcMenuController.removeItem_(this);
    }
  }, {
    key: 'select',
    value: function select(index) {
      var _this2 = this;

      var fn = void 0;
      if (this[this.constructor.name]) {
        fn = this[this.constructor.name];
      } else if (this.onSelect) {
        fn = this.onSelect;
      }

      if (fn) {
        this.$scope.$apply(function () {
          return fn({ index: index, item: _this2 });
        });
      }
    }
  }]);

  return MDCMenuItemController;
}(_baseComponent.BaseComponent);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(27);
__webpack_require__(42);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tabBarScroller = __webpack_require__(9);

var _tabBar = __webpack_require__(18);

var _tab = __webpack_require__(37);

var _tabText = __webpack_require__(41);

/**
 * @ngdoc module
 * @name mdc.tabs
 * @description
 *
 * Tabs
 */
angular.module('mdc.tabs-experimental', []).component(_tabBarScroller.MDCTabBarScrollerController.name, {
  controller: _tabBarScroller.MDCTabBarScrollerController,
  transclude: _tabBarScroller.MDCTabBarScrollerController.transclude,
  template: _tabBarScroller.MDCTabBarScrollerController.template
}).component(_tabBar.MDCTabBarController.name, {
  controller: _tabBar.MDCTabBarController,
  require: _tabBar.MDCTabBarController.require,
  bindings: _tabBar.MDCTabBarController.bindings
}).directive(_tab.MDCExperimentalTabController.name, function () {
  return {
    controller: _tab.MDCExperimentalTabController,
    require: _tab.MDCExperimentalTabController.require,
    bindToController: _tab.MDCExperimentalTabController.bindings
  };
}).directive(_tabText.MDCTabTextController.name, function () {
  return {
    controller: _tabText.MDCTabTextController,
    require: _tabText.MDCTabTextController.require,
    bindToController: true
  };
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindInjections = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _has = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * To use, extend class with BindInjections and define injections in the following form:
 * ```
 *   static get $inject() {
 *     return ['$dep1', 'dep2'];
 *   }
 *
 *   constructor(...args) {
 *     super(...args);
 *
 *    # this.$dep1 and this.dep2 are now accessible here
 *   }
 * ```
 *
 * Alternatively, if subclassing, bind injections using `union`:
 * ```
 *   static get $inject() {
 *     return super.$inject.union(['$dep1', 'dep2']);
 *   }
 * ```
 * @class BindInjections
 */
var BindInjections = exports.BindInjections = function () {
  function BindInjections() {
    var _this = this,
        _arguments = arguments;

    _classCallCheck(this, BindInjections);

    this.constructor.$inject.map(function (name, i) {
      if (!_has.has.call(_this, name)) {
        _this[name] = _arguments[i]; /* eslint prefer-rest-params: 0 */
      }
    });
  }

  _createClass(BindInjections, null, [{
    key: '$inject',
    get: function get() {
      return [];
    }
  }]);

  return BindInjections;
}();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foundation = __webpack_require__(0);

var _foundation2 = _interopRequireDefault(_foundation);

var _adapter = __webpack_require__(15);

var _adapter2 = _interopRequireDefault(_adapter);

var _constants = __webpack_require__(30);

var _util = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * @typedef {!{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
var ActivationStateType = void 0;

/**
 * @typedef {!{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
var ListenerInfoType = void 0;

/**
 * @typedef {!{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
var ListenersType = void 0;

/**
 * @typedef {!{
 *   x: number,
 *   y: number
 * }}
 */
var PointType = void 0;

// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
/** @type {!Array<!EventTarget>} */
var activatedTargets = [];

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  _createClass(MDCRippleFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return _constants.cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return _constants.numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    _classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    /** @private {function(!Event)} */
    _this.deactivateHandler_ = function (e) {
      return _this.deactivate_(e);
    };

    /** @private {function(?Event=)} */
    _this.focusHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {function(?Event=)} */
    _this.blurHandler_ = function () {
      return requestAnimationFrame(function () {
        return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
      });
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {!{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };

    /** @private {?Event} */
    _this.previousActivationEvent_ = null;
    return _this;
  }

  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  _createClass(MDCRippleFoundation, [{
    key: 'isSupported_',
    value: function isSupported_() {
      return this.adapter_.browserSupportsCssVars();
    }

    /**
     * @return {!ActivationStateType}
     */

  }, {
    key: 'defaultActivationState_',
    value: function defaultActivationState_() {
      return {
        isActivated: false,
        hasDeactivationUXRun: false,
        wasActivatedByPointer: false,
        wasElementMadeActive: false,
        activationEvent: null,
        isProgrammatic: false
      };
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (!this.isSupported_()) {
        return;
      }
      this.registerRootHandlers_();

      var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$.ROOT,
          UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

      requestAnimationFrame(function () {
        _this2.adapter_.addClass(ROOT);
        if (_this2.adapter_.isUnbounded()) {
          _this2.adapter_.addClass(UNBOUNDED);
        }
        _this2.layoutInternal_();
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      if (!this.isSupported_()) {
        return;
      }
      this.deregisterRootHandlers_();
      this.deregisterDeactivationHandlers_();

      var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
          ROOT = _MDCRippleFoundation$2.ROOT,
          UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

      requestAnimationFrame(function () {
        _this3.adapter_.removeClass(ROOT);
        _this3.adapter_.removeClass(UNBOUNDED);
        _this3.removeCssVars_();
      });
    }

    /** @private */

  }, {
    key: 'registerRootHandlers_',
    value: function registerRootHandlers_() {
      var _this4 = this;

      ACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
      });
      this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
      this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      this.adapter_.registerResizeHandler(this.resizeHandler_);
    }

    /**
     * @param {!Event} e
     * @private
     */

  }, {
    key: 'registerDeactivationHandlers_',
    value: function registerDeactivationHandlers_(e) {
      var _this5 = this;

      if (e.type === 'keydown') {
        this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
      } else {
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
        });
      }
    }

    /** @private */

  }, {
    key: 'deregisterRootHandlers_',
    value: function deregisterRootHandlers_() {
      var _this6 = this;

      ACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
      });
      this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
      this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }

    /** @private */

  }, {
    key: 'deregisterDeactivationHandlers_',
    value: function deregisterDeactivationHandlers_() {
      var _this7 = this;

      this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
        _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
      });
    }

    /** @private */

  }, {
    key: 'removeCssVars_',
    value: function removeCssVars_() {
      var _this8 = this;

      var strings = MDCRippleFoundation.strings;

      Object.keys(strings).forEach(function (k) {
        if (k.indexOf('VAR_') === 0) {
          _this8.adapter_.updateCssVariable(strings[k], null);
        }
      });
    }

    /**
     * @param {?Event} e
     * @private
     */

  }, {
    key: 'activate_',
    value: function activate_(e) {
      var _this9 = this;

      if (this.adapter_.isSurfaceDisabled()) {
        return;
      }

      var activationState = this.activationState_;
      if (activationState.isActivated) {
        return;
      }

      // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
      var previousActivationEvent = this.previousActivationEvent_;
      var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
      if (isSameInteraction) {
        return;
      }

      activationState.isActivated = true;
      activationState.isProgrammatic = e === null;
      activationState.activationEvent = e;
      activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

      var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
        return _this9.adapter_.containsEventTarget(target);
      });
      if (hasActivatedChild) {
        // Immediately reset activation state, while preserving logic that prevents touch follow-on events
        this.resetActivationState_();
        return;
      }

      if (e) {
        activatedTargets.push( /** @type {!EventTarget} */e.target);
        this.registerDeactivationHandlers_(e);
      }

      requestAnimationFrame(function () {
        // This needs to be wrapped in an rAF call b/c web browsers
        // report active states inconsistently when they're called within
        // event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        activationState.wasElementMadeActive = e && e.type === 'keydown' ? _this9.adapter_.isSurfaceActive() : true;
        if (activationState.wasElementMadeActive) {
          _this9.animateActivation_();
        } else {
          // Reset activation state immediately if element was not made active.
          _this9.activationState_ = _this9.defaultActivationState_();
        }

        // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
        activatedTargets = [];
      });
    }

    /**
     * @param {?Event=} event Optional event containing position information.
     */

  }, {
    key: 'activate',
    value: function activate() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.activate_(event);
    }

    /** @private */

  }, {
    key: 'animateActivation_',
    value: function animateActivation_() {
      var _this10 = this;

      var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
          VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
          VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
      var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
          FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
          FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
      var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


      var translateStart = '';
      var translateEnd = '';

      if (!this.adapter_.isUnbounded()) {
        var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
            startPoint = _getFgTranslationCoor.startPoint,
            endPoint = _getFgTranslationCoor.endPoint;

        translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
        translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
      }

      this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
      this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
      // Cancel any ongoing activation/deactivation animations
      clearTimeout(this.activationTimer_);
      clearTimeout(this.fgDeactivationRemovalTimer_);
      this.rmBoundedActivationClasses_();
      this.adapter_.removeClass(FG_DEACTIVATION);

      // Force layout in order to re-trigger the animation.
      this.adapter_.computeBoundingRect();
      this.adapter_.addClass(FG_ACTIVATION);
      this.activationTimer_ = setTimeout(function () {
        return _this10.activationTimerCallback_();
      }, DEACTIVATION_TIMEOUT_MS);
    }

    /**
     * @private
     * @return {{startPoint: PointType, endPoint: PointType}}
     */

  }, {
    key: 'getFgTranslationCoordinates_',
    value: function getFgTranslationCoordinates_() {
      var _activationState_ = this.activationState_,
          activationEvent = _activationState_.activationEvent,
          wasActivatedByPointer = _activationState_.wasActivatedByPointer;


      var startPoint = void 0;
      if (wasActivatedByPointer) {
        startPoint = (0, _util.getNormalizedEventCoords)(
        /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
      } else {
        startPoint = {
          x: this.frame_.width / 2,
          y: this.frame_.height / 2
        };
      }
      // Center the element around the start point.
      startPoint = {
        x: startPoint.x - this.initialSize_ / 2,
        y: startPoint.y - this.initialSize_ / 2
      };

      var endPoint = {
        x: this.frame_.width / 2 - this.initialSize_ / 2,
        y: this.frame_.height / 2 - this.initialSize_ / 2
      };

      return { startPoint: startPoint, endPoint: endPoint };
    }

    /** @private */

  }, {
    key: 'runDeactivationUXLogicIfReady_',
    value: function runDeactivationUXLogicIfReady_() {
      var _this11 = this;

      // This method is called both when a pointing device is released, and when the activation animation ends.
      // The deactivation animation should only run after both of those occur.
      var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
      var _activationState_2 = this.activationState_,
          hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
          isActivated = _activationState_2.isActivated;

      var activationHasEnded = hasDeactivationUXRun || !isActivated;

      if (activationHasEnded && this.activationAnimationHasEnded_) {
        this.rmBoundedActivationClasses_();
        this.adapter_.addClass(FG_DEACTIVATION);
        this.fgDeactivationRemovalTimer_ = setTimeout(function () {
          _this11.adapter_.removeClass(FG_DEACTIVATION);
        }, _constants.numbers.FG_DEACTIVATION_MS);
      }
    }

    /** @private */

  }, {
    key: 'rmBoundedActivationClasses_',
    value: function rmBoundedActivationClasses_() {
      var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

      this.adapter_.removeClass(FG_ACTIVATION);
      this.activationAnimationHasEnded_ = false;
      this.adapter_.computeBoundingRect();
    }
  }, {
    key: 'resetActivationState_',
    value: function resetActivationState_() {
      var _this12 = this;

      this.previousActivationEvent_ = this.activationState_.activationEvent;
      this.activationState_ = this.defaultActivationState_();
      // Touch devices may fire additional events for the same interaction within a short time.
      // Store the previous event until it's safe to assume that subsequent events are for new interactions.
      setTimeout(function () {
        return _this12.previousActivationEvent_ = null;
      }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    }

    /**
     * @param {?Event} e
     * @private
     */

  }, {
    key: 'deactivate_',
    value: function deactivate_(e) {
      var _this13 = this;

      var activationState = this.activationState_;
      // This can happen in scenarios such as when you have a keyup event that blurs the element.
      if (!activationState.isActivated) {
        return;
      }

      var state = /** @type {!ActivationStateType} */_extends({}, activationState);

      if (activationState.isProgrammatic) {
        var evtObject = null;
        requestAnimationFrame(function () {
          return _this13.animateDeactivation_(evtObject, state);
        });
        this.resetActivationState_();
      } else {
        this.deregisterDeactivationHandlers_();
        requestAnimationFrame(function () {
          _this13.activationState_.hasDeactivationUXRun = true;
          _this13.animateDeactivation_(e, state);
          _this13.resetActivationState_();
        });
      }
    }

    /**
     * @param {?Event=} event Optional event containing position information.
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.deactivate_(event);
    }

    /**
     * @param {Event} e
     * @param {!ActivationStateType} options
     * @private
     */

  }, {
    key: 'animateDeactivation_',
    value: function animateDeactivation_(e, _ref) {
      var wasActivatedByPointer = _ref.wasActivatedByPointer,
          wasElementMadeActive = _ref.wasElementMadeActive;

      if (wasActivatedByPointer || wasElementMadeActive) {
        this.runDeactivationUXLogicIfReady_();
      }
    }
  }, {
    key: 'layout',
    value: function layout() {
      var _this14 = this;

      if (this.layoutFrame_) {
        cancelAnimationFrame(this.layoutFrame_);
      }
      this.layoutFrame_ = requestAnimationFrame(function () {
        _this14.layoutInternal_();
        _this14.layoutFrame_ = 0;
      });
    }

    /** @private */

  }, {
    key: 'layoutInternal_',
    value: function layoutInternal_() {
      var _this15 = this;

      this.frame_ = this.adapter_.computeBoundingRect();
      var maxDim = Math.max(this.frame_.height, this.frame_.width);

      // Surface diameter is treated differently for unbounded vs. bounded ripples.
      // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
      // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
      // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
      // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
      // `overflow: hidden`.
      var getBoundedRadius = function getBoundedRadius() {
        var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
        return hypotenuse + MDCRippleFoundation.numbers.PADDING;
      };

      this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

      // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
      this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
      this.fgScale_ = this.maxRadius_ / this.initialSize_;

      this.updateLayoutCssVars_();
    }

    /** @private */

  }, {
    key: 'updateLayoutCssVars_',
    value: function updateLayoutCssVars_() {
      var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
          VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
          VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
          VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
          VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


      this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
      this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

      if (this.adapter_.isUnbounded()) {
        this.unboundedCoords_ = {
          left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
          top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
        };

        this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
        this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
      }
    }

    /** @param {boolean} unbounded */

  }, {
    key: 'setUnbounded',
    value: function setUnbounded(unbounded) {
      var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

      if (unbounded) {
        this.adapter_.addClass(UNBOUNDED);
      } else {
        this.adapter_.removeClass(UNBOUNDED);
      }
    }
  }]);

  return MDCRippleFoundation;
}(_foundation2.default);

exports.default = MDCRippleFoundation;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
};

exports.cssClasses = cssClasses;
exports.strings = strings;
exports.numbers = numbers;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foundation = __webpack_require__(0);

var _foundation2 = _interopRequireDefault(_foundation);

var _constants = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MDCTabFoundation = function (_MDCFoundation) {
  _inherits(MDCTabFoundation, _MDCFoundation);

  _createClass(MDCTabFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return _constants.cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
        getOffsetWidth: function getOffsetWidth() {
          return (/* number */0
          );
        },
        getOffsetLeft: function getOffsetLeft() {
          return (/* number */0
          );
        },
        notifySelected: function notifySelected() {}
      };
    }
  }]);

  function MDCTabFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCTabFoundation);

    var _this = _possibleConstructorReturn(this, (MDCTabFoundation.__proto__ || Object.getPrototypeOf(MDCTabFoundation)).call(this, _extends(MDCTabFoundation.defaultAdapter, adapter)));

    _this.computedWidth_ = 0;
    _this.computedLeft_ = 0;
    _this.isActive_ = false;
    _this.preventDefaultOnClick_ = false;

    _this.clickHandler_ = function (evt) {
      if (_this.preventDefaultOnClick_) {
        evt.preventDefault();
      }
      _this.adapter_.notifySelected();
    };

    _this.keydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Enter' || evt.keyCode === 13) {
        _this.adapter_.notifySelected();
      }
    };
    return _this;
  }

  _createClass(MDCTabFoundation, [{
    key: 'init',
    value: function init() {
      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    }
  }, {
    key: 'getComputedWidth',
    value: function getComputedWidth() {
      return this.computedWidth_;
    }
  }, {
    key: 'getComputedLeft',
    value: function getComputedLeft() {
      return this.computedLeft_;
    }
  }, {
    key: 'isActive',
    value: function isActive() {
      return this.isActive_;
    }
  }, {
    key: 'setActive',
    value: function setActive(isActive) {
      this.isActive_ = isActive;
      if (this.isActive_) {
        this.adapter_.addClass(_constants.cssClasses.ACTIVE);
      } else {
        this.adapter_.removeClass(_constants.cssClasses.ACTIVE);
      }
    }
  }, {
    key: 'preventsDefaultOnClick',
    value: function preventsDefaultOnClick() {
      return this.preventDefaultOnClick_;
    }
  }, {
    key: 'setPreventDefaultOnClick',
    value: function setPreventDefaultOnClick(preventDefaultOnClick) {
      this.preventDefaultOnClick_ = preventDefaultOnClick;
    }
  }, {
    key: 'measureSelf',
    value: function measureSelf() {
      this.computedWidth_ = this.adapter_.getOffsetWidth();
      this.computedLeft_ = this.adapter_.getOffsetLeft();
    }
  }]);

  return MDCTabFoundation;
}(_foundation2.default);

exports.default = MDCTabFoundation;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foundation = __webpack_require__(0);

var _foundation2 = _interopRequireDefault(_foundation);

var _index = __webpack_require__(5);

var _constants = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MDCTabBarFoundation = function (_MDCFoundation) {
  _inherits(MDCTabBarFoundation, _MDCFoundation);

  _createClass(MDCTabBarFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return _constants.cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        bindOnMDCTabSelectedEvent: function bindOnMDCTabSelectedEvent() {},
        unbindOnMDCTabSelectedEvent: function unbindOnMDCTabSelectedEvent() {},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        getOffsetWidth: function getOffsetWidth() {
          return (/* number */0
          );
        },
        setStyleForIndicator: function setStyleForIndicator() /* propertyName: string, value: string */{},
        getOffsetWidthForIndicator: function getOffsetWidthForIndicator() {
          return (/* number */0
          );
        },
        notifyChange: function notifyChange() /* evtData: {activeTabIndex: number} */{},
        getNumberOfTabs: function getNumberOfTabs() {
          return (/* number */0
          );
        },
        isTabActiveAtIndex: function isTabActiveAtIndex() {
          return (/* index: number */ /* boolean */false
          );
        },
        setTabActiveAtIndex: function setTabActiveAtIndex() /* index: number, isActive: true */{},
        isDefaultPreventedOnClickForTabAtIndex: function isDefaultPreventedOnClickForTabAtIndex() {
          return (/* index: number */ /* boolean */false
          );
        },
        setPreventDefaultOnClickForTabAtIndex: function setPreventDefaultOnClickForTabAtIndex() /* index: number, preventDefaultOnClick: boolean */{},
        measureTabAtIndex: function measureTabAtIndex() /* index: number */{},
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex() {
          return (/* index: number */ /* number */0
          );
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex() {
          return (/* index: number */ /* number */0
          );
        }
      };
    }
  }]);

  function MDCTabBarFoundation(adapter) {
    _classCallCheck(this, MDCTabBarFoundation);

    var _this = _possibleConstructorReturn(this, (MDCTabBarFoundation.__proto__ || Object.getPrototypeOf(MDCTabBarFoundation)).call(this, _extends(MDCTabBarFoundation.defaultAdapter, adapter)));

    _this.isIndicatorShown_ = false;
    _this.computedWidth_ = 0;
    _this.computedLeft_ = 0;
    _this.activeTabIndex_ = 0;
    _this.layoutFrame_ = 0;
    _this.resizeHandler_ = function () {
      return _this.layout();
    };
    return _this;
  }

  _createClass(MDCTabBarFoundation, [{
    key: 'init',
    value: function init() {
      this.adapter_.addClass(_constants.cssClasses.UPGRADED);
      this.adapter_.bindOnMDCTabSelectedEvent();
      this.adapter_.registerResizeHandler(this.resizeHandler_);
      var activeTabIndex = this.findActiveTabIndex_();
      if (activeTabIndex >= 0) {
        this.activeTabIndex_ = activeTabIndex;
      }
      this.layout();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.removeClass(_constants.cssClasses.UPGRADED);
      this.adapter_.unbindOnMDCTabSelectedEvent();
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }, {
    key: 'layoutInternal_',
    value: function layoutInternal_() {
      var _this2 = this;

      this.forEachTabIndex_(function (index) {
        return _this2.adapter_.measureTabAtIndex(index);
      });
      this.computedWidth_ = this.adapter_.getOffsetWidth();
      this.layoutIndicator_();
    }
  }, {
    key: 'layoutIndicator_',
    value: function layoutIndicator_() {
      var isIndicatorFirstRender = !this.isIndicatorShown_;

      // Ensure that indicator appears in the right position immediately for correct first render.
      if (isIndicatorFirstRender) {
        this.adapter_.setStyleForIndicator('transition', 'none');
      }

      var translateAmtForActiveTabLeft = this.adapter_.getComputedLeftForTabAtIndex(this.activeTabIndex_);
      var scaleAmtForActiveTabWidth = this.adapter_.getComputedWidthForTabAtIndex(this.activeTabIndex_) / this.adapter_.getOffsetWidth();

      var transformValue = 'translateX(' + translateAmtForActiveTabLeft + 'px) scale(' + scaleAmtForActiveTabWidth + ', 1)';
      this.adapter_.setStyleForIndicator((0, _index.getCorrectPropertyName)(window, 'transform'), transformValue);

      if (isIndicatorFirstRender) {
        // Force layout so that transform styles to take effect.
        this.adapter_.getOffsetWidthForIndicator();
        this.adapter_.setStyleForIndicator('transition', '');
        this.adapter_.setStyleForIndicator('visibility', 'visible');
        this.isIndicatorShown_ = true;
      }
    }
  }, {
    key: 'findActiveTabIndex_',
    value: function findActiveTabIndex_() {
      var _this3 = this;

      var activeTabIndex = -1;
      this.forEachTabIndex_(function (index) {
        if (_this3.adapter_.isTabActiveAtIndex(index)) {
          activeTabIndex = index;
          return true;
        }
      });
      return activeTabIndex;
    }
  }, {
    key: 'forEachTabIndex_',
    value: function forEachTabIndex_(iterator) {
      var numTabs = this.adapter_.getNumberOfTabs();
      for (var index = 0; index < numTabs; index++) {
        var shouldBreak = iterator(index);
        if (shouldBreak) {
          break;
        }
      }
    }
  }, {
    key: 'layout',
    value: function layout() {
      var _this4 = this;

      if (this.layoutFrame_) {
        cancelAnimationFrame(this.layoutFrame_);
      }

      this.layoutFrame_ = requestAnimationFrame(function () {
        _this4.layoutInternal_();
        _this4.layoutFrame_ = 0;
      });
    }
  }, {
    key: 'switchToTabAtIndex',
    value: function switchToTabAtIndex(index, shouldNotify) {
      var _this5 = this;

      if (index === this.activeTabIndex_) {
        return;
      }

      if (index < 0 || index >= this.adapter_.getNumberOfTabs()) {
        throw new Error('Out of bounds index specified for tab: ' + index);
      }

      var prevActiveTabIndex = this.activeTabIndex_;
      this.activeTabIndex_ = index;
      requestAnimationFrame(function () {
        if (prevActiveTabIndex >= 0) {
          _this5.adapter_.setTabActiveAtIndex(prevActiveTabIndex, false);
        }
        _this5.adapter_.setTabActiveAtIndex(_this5.activeTabIndex_, true);
        _this5.layoutIndicator_();
        if (shouldNotify) {
          _this5.adapter_.notifyChange({ activeTabIndex: _this5.activeTabIndex_ });
        }
      });
    }
  }, {
    key: 'getActiveTabIndex',
    value: function getActiveTabIndex() {
      return this.findActiveTabIndex_();
    }
  }]);

  return MDCTabBarFoundation;
}(_foundation2.default);

exports.default = MDCTabBarFoundation;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = exports.cssClasses = {
  UPGRADED: 'mdc-tab-bar-upgraded'
};

var strings = exports.strings = {
  TAB_SELECTOR: '.mdc-tab',
  INDICATOR_SELECTOR: '.mdc-tab-bar__indicator',
  CHANGE_EVENT: 'MDCTabBar:change'
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foundation = __webpack_require__(0);

var _foundation2 = _interopRequireDefault(_foundation);

var _constants = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *      http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MDCTabBarScrollerFoundation = function (_MDCFoundation) {
  _inherits(MDCTabBarScrollerFoundation, _MDCFoundation);

  _createClass(MDCTabBarScrollerFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return _constants.cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        eventTargetHasClass: function eventTargetHasClass() {
          return (/* target: EventTarget, className: string */ /* boolean */false
          );
        },
        addClassToForwardIndicator: function addClassToForwardIndicator() /* className: string */{},
        removeClassFromForwardIndicator: function removeClassFromForwardIndicator() /* className: string */{},
        addClassToBackIndicator: function addClassToBackIndicator() /* className: string */{},
        removeClassFromBackIndicator: function removeClassFromBackIndicator() /* className: string */{},
        isRTL: function isRTL() {
          return (/* boolean */false
          );
        },
        registerBackIndicatorClickHandler: function registerBackIndicatorClickHandler() /* handler: EventListener */{},
        deregisterBackIndicatorClickHandler: function deregisterBackIndicatorClickHandler() /* handler: EventListener */{},
        registerForwardIndicatorClickHandler: function registerForwardIndicatorClickHandler() /* handler: EventListener */{},
        deregisterForwardIndicatorClickHandler: function deregisterForwardIndicatorClickHandler() /* handler: EventListener */{},
        registerCapturedInteractionHandler: function registerCapturedInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterCapturedInteractionHandler: function deregisterCapturedInteractionHandler() /* evt: string, handler: EventListener */{},
        registerWindowResizeHandler: function registerWindowResizeHandler() /* handler: EventListener */{},
        deregisterWindowResizeHandler: function deregisterWindowResizeHandler() /* handler: EventListener */{},
        getNumberOfTabs: function getNumberOfTabs() {
          return (/* number */0
          );
        },
        getComputedWidthForTabAtIndex: function getComputedWidthForTabAtIndex() {
          return (/* number */0
          );
        },
        getComputedLeftForTabAtIndex: function getComputedLeftForTabAtIndex() {
          return (/* number */0
          );
        },
        getOffsetWidthForScrollFrame: function getOffsetWidthForScrollFrame() {
          return (/* number */0
          );
        },
        getScrollLeftForScrollFrame: function getScrollLeftForScrollFrame() {
          return (/* number */0
          );
        },
        setScrollLeftForScrollFrame: function setScrollLeftForScrollFrame() /* scrollLeftAmount: number */{},
        getOffsetWidthForTabBar: function getOffsetWidthForTabBar() {
          return (/* number */0
          );
        },
        setTransformStyleForTabBar: function setTransformStyleForTabBar() /* value: string */{},
        getOffsetLeftForEventTarget: function getOffsetLeftForEventTarget() {
          return (/* target: EventTarget */ /* number */0
          );
        },
        getOffsetWidthForEventTarget: function getOffsetWidthForEventTarget() {
          return (/* target: EventTarget */ /* number */0
          );
        }
      };
    }
  }]);

  function MDCTabBarScrollerFoundation(adapter) {
    _classCallCheck(this, MDCTabBarScrollerFoundation);

    var _this = _possibleConstructorReturn(this, (MDCTabBarScrollerFoundation.__proto__ || Object.getPrototypeOf(MDCTabBarScrollerFoundation)).call(this, _extends(MDCTabBarScrollerFoundation.defaultAdapter, adapter)));

    _this.pointerDownRecognized_ = false;
    _this.currentTranslateOffset_ = 0;
    _this.focusedTarget_ = null;
    _this.layoutFrame_ = 0;
    _this.scrollFrameScrollLeft_ = 0;
    _this.forwardIndicatorClickHandler_ = function (evt) {
      return _this.scrollForward(evt);
    };
    _this.backIndicatorClickHandler_ = function (evt) {
      return _this.scrollBack(evt);
    };
    _this.resizeHandler_ = function () {
      return _this.layout();
    };
    _this.interactionHandler_ = function (evt) {
      if (evt.type == 'touchstart' || evt.type == 'mousedown') {
        _this.pointerDownRecognized_ = true;
      }
      _this.handlePossibleTabKeyboardFocus_(evt);

      if (evt.type == 'focus') {
        _this.pointerDownRecognized_ = false;
      }
    };
    return _this;
  }

  _createClass(MDCTabBarScrollerFoundation, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.adapter_.registerBackIndicatorClickHandler(this.backIndicatorClickHandler_);
      this.adapter_.registerForwardIndicatorClickHandler(this.forwardIndicatorClickHandler_);
      this.adapter_.registerWindowResizeHandler(this.resizeHandler_);
      ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
        _this2.adapter_.registerCapturedInteractionHandler(evtType, _this2.interactionHandler_);
      });
      this.layout();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      this.adapter_.deregisterBackIndicatorClickHandler(this.backIndicatorClickHandler_);
      this.adapter_.deregisterForwardIndicatorClickHandler(this.forwardIndicatorClickHandler_);
      this.adapter_.deregisterWindowResizeHandler(this.resizeHandler_);
      ['touchstart', 'mousedown', 'focus'].forEach(function (evtType) {
        _this3.adapter_.deregisterCapturedInteractionHandler(evtType, _this3.interactionHandler_);
      });
    }
  }, {
    key: 'scrollBack',
    value: function scrollBack() {
      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (evt) {
        evt.preventDefault();
      }

      var tabWidthAccumulator = 0;
      var scrollTargetIndex = 0;

      for (var i = this.adapter_.getNumberOfTabs() - 1; i > 0; i--) {
        var tabOffsetLeft = this.adapter_.getComputedLeftForTabAtIndex(i);
        var tabBarWidthLessTabOffsetLeft = this.adapter_.getOffsetWidthForTabBar() - tabOffsetLeft;

        var tabIsNotOccluded = tabOffsetLeft > this.currentTranslateOffset_;
        if (this.isRTL_()) {
          tabIsNotOccluded = tabBarWidthLessTabOffsetLeft > this.currentTranslateOffset_;
        }

        if (tabIsNotOccluded) {
          continue;
        }

        tabWidthAccumulator += this.adapter_.getComputedWidthForTabAtIndex(i);

        var scrollTargetDetermined = tabWidthAccumulator > this.adapter_.getOffsetWidthForScrollFrame();
        if (scrollTargetDetermined) {
          scrollTargetIndex = this.isRTL_() ? i + 1 : i;
          break;
        }
      }

      this.scrollToTabAtIndex(scrollTargetIndex);
    }
  }, {
    key: 'scrollForward',
    value: function scrollForward() {
      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (evt) {
        evt.preventDefault();
      }

      var scrollFrameOffsetWidth = this.adapter_.getOffsetWidthForScrollFrame() + this.currentTranslateOffset_;
      var scrollTargetIndex = 0;

      for (var i = 0; i < this.adapter_.getNumberOfTabs(); i++) {
        var tabOffsetLeftAndWidth = this.adapter_.getComputedLeftForTabAtIndex(i) + this.adapter_.getComputedWidthForTabAtIndex(i);
        var scrollTargetDetermined = tabOffsetLeftAndWidth > scrollFrameOffsetWidth;

        if (this.isRTL_()) {
          var frameOffsetAndTabWidth = scrollFrameOffsetWidth - this.adapter_.getComputedWidthForTabAtIndex(i);
          var _tabOffsetLeftAndWidth = this.adapter_.getComputedLeftForTabAtIndex(i) + this.adapter_.getComputedWidthForTabAtIndex(i);
          var tabRightOffset = this.adapter_.getOffsetWidthForTabBar() - _tabOffsetLeftAndWidth;

          scrollTargetDetermined = tabRightOffset > frameOffsetAndTabWidth;
        }

        if (scrollTargetDetermined) {
          scrollTargetIndex = i;
          break;
        }
      }

      this.scrollToTabAtIndex(scrollTargetIndex);
    }
  }, {
    key: 'layout',
    value: function layout() {
      var _this4 = this;

      cancelAnimationFrame(this.layoutFrame_);
      this.scrollFrameScrollLeft_ = this.adapter_.getScrollLeftForScrollFrame();
      this.layoutFrame_ = requestAnimationFrame(function () {
        return _this4.layout_();
      });
    }
  }, {
    key: 'isRTL_',
    value: function isRTL_() {
      return this.adapter_.isRTL();
    }
  }, {
    key: 'handlePossibleTabKeyboardFocus_',
    value: function handlePossibleTabKeyboardFocus_(evt) {
      if (!this.adapter_.eventTargetHasClass(evt.target, _constants.cssClasses.TAB) || this.pointerDownRecognized_) {
        return;
      }

      var resetAmt = this.isRTL_() ? this.scrollFrameScrollLeft_ : 0;
      this.adapter_.setScrollLeftForScrollFrame(resetAmt);

      this.focusedTarget_ = evt.target;
      var scrollFrameWidth = this.adapter_.getOffsetWidthForScrollFrame();
      var tabBarWidth = this.adapter_.getOffsetWidthForTabBar();
      var leftEdge = this.adapter_.getOffsetLeftForEventTarget(this.focusedTarget_);
      var rightEdge = leftEdge + this.adapter_.getOffsetWidthForEventTarget(this.focusedTarget_);

      var shouldScrollBack = rightEdge <= this.currentTranslateOffset_;
      var shouldScrollForward = rightEdge > this.currentTranslateOffset_ + scrollFrameWidth;

      if (this.isRTL_()) {
        var normalizedLeftOffset = tabBarWidth - leftEdge;
        shouldScrollBack = leftEdge >= tabBarWidth - this.currentTranslateOffset_;
        shouldScrollForward = normalizedLeftOffset > scrollFrameWidth + this.currentTranslateOffset_;
      }

      if (shouldScrollForward) {
        this.scrollForward();
      } else if (shouldScrollBack) {
        this.scrollBack();
      }

      this.pointerDownRecognized_ = false;
    }
  }, {
    key: 'layout_',
    value: function layout_() {
      var frameWidth = this.adapter_.getOffsetWidthForScrollFrame();
      var isOverflowing = this.adapter_.getOffsetWidthForTabBar() > frameWidth;

      if (!isOverflowing) {
        this.currentTranslateOffset_ = 0;
      }

      this.shiftFrame_();
      this.updateIndicatorEnabledStates_();
    }
  }, {
    key: 'scrollToTabAtIndex',
    value: function scrollToTabAtIndex(index) {
      var _this5 = this;

      var scrollTargetOffsetLeft = this.adapter_.getComputedLeftForTabAtIndex(index);
      var scrollTargetOffsetWidth = this.adapter_.getComputedWidthForTabAtIndex(index);

      this.currentTranslateOffset_ = this.normalizeForRTL_(scrollTargetOffsetLeft, scrollTargetOffsetWidth);

      requestAnimationFrame(function () {
        return _this5.shiftFrame_();
      });
    }
  }, {
    key: 'normalizeForRTL_',
    value: function normalizeForRTL_(left, width) {
      return this.isRTL_() ? this.adapter_.getOffsetWidthForTabBar() - (left + width) : left;
    }
  }, {
    key: 'shiftFrame_',
    value: function shiftFrame_() {
      var shiftAmount = this.isRTL_() ? this.currentTranslateOffset_ : -this.currentTranslateOffset_;

      this.adapter_.setTransformStyleForTabBar('translateX(' + shiftAmount + 'px)');
      this.updateIndicatorEnabledStates_();
    }
  }, {
    key: 'updateIndicatorEnabledStates_',
    value: function updateIndicatorEnabledStates_() {
      var INDICATOR_ENABLED = _constants.cssClasses.INDICATOR_ENABLED;

      if (this.currentTranslateOffset_ === 0) {
        this.adapter_.removeClassFromBackIndicator(INDICATOR_ENABLED);
      } else {
        this.adapter_.addClassToBackIndicator(INDICATOR_ENABLED);
      }

      var remainingTabBarWidth = this.adapter_.getOffsetWidthForTabBar() - this.currentTranslateOffset_;
      if (remainingTabBarWidth > this.adapter_.getOffsetWidthForScrollFrame()) {
        this.adapter_.addClassToForwardIndicator(INDICATOR_ENABLED);
      } else {
        this.adapter_.removeClassFromForwardIndicator(INDICATOR_ENABLED);
      }
    }
  }]);

  return MDCTabBarScrollerFoundation;
}(_foundation2.default);

exports.default = MDCTabBarScrollerFoundation;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = exports.cssClasses = {
  INDICATOR_FORWARD: 'mdc-tab-bar-scroller__indicator--forward',
  INDICATOR_BACK: 'mdc-tab-bar-scroller__indicator--back',
  INDICATOR_ENABLED: 'mdc-tab-bar-scroller__indicator--enabled',
  TAB: 'mdc-tab'
};

var strings = exports.strings = {
  FRAME_SELECTOR: '.mdc-tab-bar-scroller__scroll-frame',
  TABS_SELECTOR: '.mdc-tab-bar-scroller__scroll-frame__tabs',
  TAB_SELECTOR: '.mdc-tab',
  INDICATOR_FORWARD_SELECTOR: '.mdc-tab-bar-scroller__indicator--forward',
  INDICATOR_BACK_SELECTOR: '.mdc-tab-bar-scroller__indicator--back'
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "<div class=\"mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--back\">\n  <a class=\"mdc-tab-bar-scroller__indicator__inner material-icons\" href=\"javascript:void(0)\" aria-label=\"scroll back button\">\n    navigate_before\n  </a>\n</div>\n<div class=\"mdc-tab-bar-scroller__scroll-frame\" ng-transclude></div>\n<div class=\"mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--forward\">\n  <a class=\"mdc-tab-bar-scroller__indicator__inner material-icons\" href=\"javascript:void(0)\" aria-label=\"scroll forward button\">\n    navigate_next\n  </a>\n</div>";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCExperimentalTabController = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tab = __webpack_require__(19);

var _tabs = __webpack_require__(6);

var _menu = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MDCExperimentalTabController = exports.MDCExperimentalTabController = function (_MDCTabController) {
  _inherits(MDCExperimentalTabController, _MDCTabController);

  _createClass(MDCExperimentalTabController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcTab';
    }
  }]);

  function MDCExperimentalTabController() {
    var _ref;

    _classCallCheck(this, MDCExperimentalTabController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCExperimentalTabController.__proto__ || Object.getPrototypeOf(MDCExperimentalTabController)).call.apply(_ref, [this].concat(args)));

    _this.$viewChangeHandler = function () {
      var currentValue = _this.tabBar.value;
      var active = false;
      if (_this.menu) {
        var i = void 0;
        for (i = 0; i < _this.menu.itemControllers.length; i++) {
          if (_this.menu.itemControllers[i].getValue() === currentValue) {
            active = true;
            break;
          }
        }

        if (!active && _this.menu.rememberSelection) {
          _this.menu.foundation_.setSelectedIndex(-1);
        }
      } else {
        active = _this.tabBar.value === _this.getValue();
      }

      _this.isActive = active;
      if (active) {
        _this.tabBar.activateTab(_this);
      }
    };
    return _this;
  }

  _createClass(MDCExperimentalTabController, [{
    key: 'onSelect_',
    value: function onSelect_() {
      if (this.menu) {
        this.showMenu_();
      } else {
        _get(MDCExperimentalTabController.prototype.__proto__ || Object.getPrototypeOf(MDCExperimentalTabController.prototype), 'onSelect_', this).call(this);
      }
    }
  }, {
    key: 'setMDCMenu',
    value: function setMDCMenu(menu) {
      this.menu = menu;
      if (menu) {
        this.setupMenu_(menu);
      }
    }
  }, {
    key: 'setupMenu_',
    value: function setupMenu_(menu) {
      var _this2 = this;

      this.menuParent_ = this.tabBar.scroller ? this.tabBar.scroller.$element : this.tabBar.$element;
      menu.$element.detach();
      this.menuParent_.after(menu.$element);

      menu.listen(_menu.MDCMenuFoundation.strings.SELECTED_EVENT, function (_ref2) {
        var item = _ref2.detail.item;

        if (_this2.tabBar.ngModel) {
          _this2.tabBar.value = item.getValue();
        } else {
          _this2.tabBar.activateTab(_this2);
        }
      });
    }
  }, {
    key: 'setMenuElStyle_',
    value: function setMenuElStyle_(propertyName, value) {
      this.menu.root_.style.setProperty(propertyName, value);
    }
  }, {
    key: 'showMenu_',
    value: function showMenu_() {
      var top = this.menuParent_[0].offsetTop;
      var left = this.root_.getBoundingClientRect().left - this.menuParent_.parent()[0].getBoundingClientRect().left;
      this.setMenuElStyle_('left', left + 'px');
      this.setMenuElStyle_('top', top + 'px');
      this.setMenuElStyle_('transform-origin', 'center top 0px');

      this.menu.show();
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      _get(MDCExperimentalTabController.prototype.__proto__ || Object.getPrototypeOf(MDCExperimentalTabController.prototype), '$onDestroy', this).call(this);

      if (this.menu) {
        this.menu.$element.remove();
      }
    }
  }, {
    key: 'notifyTabbar_',
    value: function notifyTabbar_() {
      this.tabBar.emit(_tabs.MDCTabFoundation.strings.SELECTED_EVENT, { tab: this }, true);
    }
  }]);

  return MDCExperimentalTabController;
}(_tab.MDCTabController);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCRippleMixin = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _arrayUnion = __webpack_require__(1);

var _ripple = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Applies a ripple to this.rippleElement and exposes as this.ripple.
 *
 * The element must have or extend the `mdc-ripple-surface` class
 *
 * @mixin MDCRippleMixin
 * @param Base - should extend BaseComponent
 */
var MDCRippleMixin = exports.MDCRippleMixin = function MDCRippleMixin(Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    _createClass(_class, [{
      key: 'rippleElement',


      /**
       * The element to bind the ripple to. Should have or extend the `mdc-ripple-surface` class
       * @return {JQLite}
       */
      get: function get() {
        return this.$element;
      }
    }], [{
      key: '$inject',
      get: function get() {
        return (0, _arrayUnion.arrayUnion)(['$element'], _get(_class.__proto__ || Object.getPrototypeOf(_class), '$inject', this));
      }
    }]);

    function _class() {
      var _ref;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      _this.ripple = {};
      _this.rippleElement.ready(function () {
        if (_this.ripple.doDestroy) {
          return;
        }
        // if unbounded is assigned before ready, we pass it in
        _this.ripple = _ripple.MDCRipple.attachTo(_this.rippleElement[0], { isUnbounded: _this.ripple.unbounded });
      });
      return _this;
    }

    _createClass(_class, [{
      key: '$onDestroy',
      value: function $onDestroy() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), '$onDestroy', this).call(this);

        if (!this.ripple.destroy) {
          this.ripple.doDestroy = true; // destroyed before element ready
          return;
        }
        // ensure MDCRipple has DOM to attach to so destroy doesn't fail
        if (!this.ripple.root_) {
          this.ripple.root_ = angular.element('<div></div>')[0];
        }
        this.ripple.destroy();
      }
    }]);

    return _class;
  }(Base);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnchorMargin = exports.MDCMenuFoundation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _foundation = __webpack_require__(0);

var _foundation2 = _interopRequireDefault(_foundation);

var _adapter = __webpack_require__(40);

var _constants = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @typedef {{
 *   top: number,
 *   right: number,
 *   bottom: number,
 *   left: number
 * }}
 */
var AnchorMargin = void 0;

/* eslint-disable no-unused-vars */
/**
 * @typedef {{
 *   viewport: { width: number, height: number },
 *   viewportDistance: {top: number, right: number, bottom: number, left: number},
 *   anchorHeight: number,
 *   anchorWidth: number,
 *   menuHeight: number,
 *   menuWidth: number,
 * }}
 */
var AutoLayoutMeasurements = void 0;
/* eslint-enable no-unused-vars */

/**
 * @extends {MDCFoundation<!MDCMenuAdapter>}
 */
var MDCMenuFoundation = function (_MDCFoundation) {
  _inherits(MDCMenuFoundation, _MDCFoundation);

  _createClass(MDCMenuFoundation, null, [{
    key: 'cssClasses',

    /** @return enum{cssClasses} */
    get: function get() {
      return _constants.cssClasses;
    }

    /** @return enum{strings} */

  }, {
    key: 'strings',
    get: function get() {
      return _constants.strings;
    }

    /** @return enum{numbers} */

  }, {
    key: 'numbers',
    get: function get() {
      return _constants.numbers;
    }

    /** @return enum{number} */

  }, {
    key: 'Corner',
    get: function get() {
      return _constants.Corner;
    }

    /**
     * {@see MDCMenuAdapter} for typing information on parameters and return
     * types.
     * @return {!MDCMenuAdapter}
     */

  }, {
    key: 'defaultAdapter',
    get: function get() {
      return (/** @type {!MDCMenuAdapter} */{
          addClass: function addClass() {},
          removeClass: function removeClass() {},
          hasClass: function hasClass() {
            return false;
          },
          hasNecessaryDom: function hasNecessaryDom() {
            return false;
          },
          getAttributeForEventTarget: function getAttributeForEventTarget() {},
          getInnerDimensions: function getInnerDimensions() {
            return {};
          },
          hasAnchor: function hasAnchor() {
            return false;
          },
          getAnchorDimensions: function getAnchorDimensions() {
            return {};
          },
          getWindowDimensions: function getWindowDimensions() {
            return {};
          },
          getNumberOfItems: function getNumberOfItems() {
            return 0;
          },
          registerInteractionHandler: function registerInteractionHandler() {},
          deregisterInteractionHandler: function deregisterInteractionHandler() {},
          registerBodyClickHandler: function registerBodyClickHandler() {},
          deregisterBodyClickHandler: function deregisterBodyClickHandler() {},
          getIndexForEventTarget: function getIndexForEventTarget() {
            return 0;
          },
          notifySelected: function notifySelected() {},
          notifyCancel: function notifyCancel() {},
          saveFocus: function saveFocus() {},
          restoreFocus: function restoreFocus() {},
          isFocused: function isFocused() {
            return false;
          },
          focus: function focus() {},
          getFocusedItemIndex: function getFocusedItemIndex() {
            return -1;
          },
          focusItemAtIndex: function focusItemAtIndex() {},
          isRtl: function isRtl() {
            return false;
          },
          setTransformOrigin: function setTransformOrigin() {},
          setPosition: function setPosition() {},
          setMaxHeight: function setMaxHeight() {},
          setAttrForOptionAtIndex: function setAttrForOptionAtIndex() {},
          rmAttrForOptionAtIndex: function rmAttrForOptionAtIndex() {},
          addClassForOptionAtIndex: function addClassForOptionAtIndex() {},
          rmClassForOptionAtIndex: function rmClassForOptionAtIndex() {}
        }
      );
    }

    /** @param {!MDCMenuAdapter} adapter */

  }]);

  function MDCMenuFoundation(adapter) {
    _classCallCheck(this, MDCMenuFoundation);

    /** @private {function(!Event)} */
    var _this = _possibleConstructorReturn(this, (MDCMenuFoundation.__proto__ || Object.getPrototypeOf(MDCMenuFoundation)).call(this, _extends(MDCMenuFoundation.defaultAdapter, adapter)));

    _this.clickHandler_ = function (evt) {
      return _this.handlePossibleSelected_(evt);
    };
    /** @private {function(!Event)} */
    _this.keydownHandler_ = function (evt) {
      return _this.handleKeyboardDown_(evt);
    };
    /** @private {function(!Event)} */
    _this.keyupHandler_ = function (evt) {
      return _this.handleKeyboardUp_(evt);
    };
    /** @private {function(!Event)} */
    _this.documentClickHandler_ = function (evt) {
      return _this.handleDocumentClick_(evt);
    };
    /** @private {boolean} */
    _this.isOpen_ = false;
    /** @private {number} */
    _this.openAnimationEndTimerId_ = 0;
    /** @private {number} */
    _this.closeAnimationEndTimerId_ = 0;
    /** @private {number} */
    _this.selectedTriggerTimerId_ = 0;
    /** @private {number} */
    _this.animationRequestId_ = 0;
    /** @private {!{ width: number, height: number }} */
    _this.dimensions_;
    /** @private {number} */
    _this.itemHeight_;
    /** @private {Corner} */
    _this.anchorCorner_ = _constants.Corner.TOP_START;
    /** @private {AnchorMargin} */
    _this.anchorMargin_ = { top: 0, right: 0, bottom: 0, left: 0 };
    /** @private {?AutoLayoutMeasurements} */
    _this.measures_ = null;
    /** @private {number} */
    _this.selectedIndex_ = -1;
    /** @private {boolean} */
    _this.rememberSelection_ = false;
    /** @private {boolean} */
    _this.quickOpen_ = false;

    // A keyup event on the menu needs to have a corresponding keydown
    // event on the menu. If the user opens the menu with a keydown event on a
    // button, the menu will only get the key up event causing buggy behavior with selected elements.
    /** @private {boolean} */
    _this.keyDownWithinMenu_ = false;
    return _this;
  }

  _createClass(MDCMenuFoundation, [{
    key: 'init',
    value: function init() {
      var _MDCMenuFoundation$cs = MDCMenuFoundation.cssClasses,
          ROOT = _MDCMenuFoundation$cs.ROOT,
          OPEN = _MDCMenuFoundation$cs.OPEN;


      if (!this.adapter_.hasClass(ROOT)) {
        throw new Error(ROOT + ' class required in root element.');
      }

      if (!this.adapter_.hasNecessaryDom()) {
        throw new Error('Required DOM nodes missing in ' + ROOT + ' component.');
      }

      if (this.adapter_.hasClass(OPEN)) {
        this.isOpen_ = true;
      }

      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
      this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearTimeout(this.selectedTriggerTimerId_);
      clearTimeout(this.openAnimationEndTimerId_);
      clearTimeout(this.closeAnimationEndTimerId_);
      // Cancel any currently running animations.
      cancelAnimationFrame(this.animationRequestId_);
      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
      this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
      this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);
    }

    /**
     * @param {!Corner} corner Default anchor corner alignment of top-left menu corner.
     */

  }, {
    key: 'setAnchorCorner',
    value: function setAnchorCorner(corner) {
      this.anchorCorner_ = corner;
    }

    /**
     * @param {!AnchorMargin} margin 4-plet of margins from anchor.
     */

  }, {
    key: 'setAnchorMargin',
    value: function setAnchorMargin(margin) {
      this.anchorMargin_.top = typeof margin.top === 'number' ? margin.top : 0;
      this.anchorMargin_.right = typeof margin.right === 'number' ? margin.right : 0;
      this.anchorMargin_.bottom = typeof margin.bottom === 'number' ? margin.bottom : 0;
      this.anchorMargin_.left = typeof margin.left === 'number' ? margin.left : 0;
    }

    /** @param {boolean} rememberSelection */

  }, {
    key: 'setRememberSelection',
    value: function setRememberSelection(rememberSelection) {
      this.rememberSelection_ = rememberSelection;
      this.setSelectedIndex(-1);
    }

    /** @param {boolean} quickOpen */

  }, {
    key: 'setQuickOpen',
    value: function setQuickOpen(quickOpen) {
      this.quickOpen_ = quickOpen;
    }

    /**
     * @param {?number} focusIndex
     * @private
     */

  }, {
    key: 'focusOnOpen_',
    value: function focusOnOpen_(focusIndex) {
      if (focusIndex === null) {
        // If this instance of MDCMenu remembers selections, and the user has
        // made a selection, then focus the last selected item
        if (this.rememberSelection_ && this.selectedIndex_ >= 0) {
          this.adapter_.focusItemAtIndex(this.selectedIndex_);
          return;
        }

        this.adapter_.focus();
        // If that doesn't work, focus first item instead.
        if (!this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(0);
        }
      } else {
        this.adapter_.focusItemAtIndex(focusIndex);
      }
    }

    /**
     * Handle clicks and cancel the menu if not a child list-item
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handleDocumentClick_',
    value: function handleDocumentClick_(evt) {
      var el = evt.target;

      while (el && el !== document.documentElement) {
        if (this.adapter_.getIndexForEventTarget(el) !== -1) {
          return;
        }
        el = el.parentNode;
      }

      this.adapter_.notifyCancel();
      this.close(evt);
    }
  }, {
    key: 'handleKeyboardDown_',


    /**
     * Handle keys that we want to repeat on hold (tab and arrows).
     * @param {!Event} evt
     * @return {boolean}
     * @private
     */
    value: function handleKeyboardDown_(evt) {
      // Do nothing if Alt, Ctrl or Meta are pressed.
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        return true;
      }

      var keyCode = evt.keyCode,
          key = evt.key,
          shiftKey = evt.shiftKey;

      var isTab = key === 'Tab' || keyCode === 9;
      var isArrowUp = key === 'ArrowUp' || keyCode === 38;
      var isArrowDown = key === 'ArrowDown' || keyCode === 40;
      var isSpace = key === 'Space' || keyCode === 32;
      var isEnter = key === 'Enter' || keyCode === 13;
      // The menu needs to know if the keydown event was triggered on the menu
      this.keyDownWithinMenu_ = isEnter || isSpace;

      var focusedItemIndex = this.adapter_.getFocusedItemIndex();
      var lastItemIndex = this.adapter_.getNumberOfItems() - 1;

      if (shiftKey && isTab && focusedItemIndex === 0) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
        evt.preventDefault();
        return false;
      }

      if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
        this.adapter_.focusItemAtIndex(0);
        evt.preventDefault();
        return false;
      }

      // Ensure Arrow{Up,Down} and space do not cause inadvertent scrolling
      if (isArrowUp || isArrowDown || isSpace) {
        evt.preventDefault();
      }

      if (isArrowUp) {
        if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(lastItemIndex);
        } else {
          this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
        }
      } else if (isArrowDown) {
        if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
          this.adapter_.focusItemAtIndex(0);
        } else {
          this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
        }
      }

      return true;
    }

    /**
     * Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
     * @param {!Event} evt
     * @return {boolean}
     * @private
     */

  }, {
    key: 'handleKeyboardUp_',
    value: function handleKeyboardUp_(evt) {
      // Do nothing if Alt, Ctrl or Meta are pressed.
      if (evt.altKey || evt.ctrlKey || evt.metaKey) {
        return true;
      }

      var keyCode = evt.keyCode,
          key = evt.key;

      var isEnter = key === 'Enter' || keyCode === 13;
      var isSpace = key === 'Space' || keyCode === 32;
      var isEscape = key === 'Escape' || keyCode === 27;

      if (isEnter || isSpace) {
        // If the keydown event didn't occur on the menu, then it should
        // disregard the possible selected event.
        if (this.keyDownWithinMenu_) {
          this.handlePossibleSelected_(evt);
        }
        this.keyDownWithinMenu_ = false;
      }

      if (isEscape) {
        this.adapter_.notifyCancel();
        this.close();
      }

      return true;
    }

    /**
     * @param {!Event} evt
     * @private
     */

  }, {
    key: 'handlePossibleSelected_',
    value: function handlePossibleSelected_(evt) {
      var _this2 = this;

      if (this.adapter_.getAttributeForEventTarget(evt.target, _constants.strings.ARIA_DISABLED_ATTR) === 'true') {
        return;
      }
      var targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
      if (targetIndex < 0) {
        return;
      }
      // Debounce multiple selections
      if (this.selectedTriggerTimerId_) {
        return;
      }
      this.selectedTriggerTimerId_ = setTimeout(function () {
        _this2.selectedTriggerTimerId_ = 0;
        _this2.close();
        if (_this2.rememberSelection_) {
          _this2.setSelectedIndex(targetIndex);
        }
        _this2.adapter_.notifySelected({ index: targetIndex });
      }, _constants.numbers.SELECTED_TRIGGER_DELAY);
    }

    /**
     * @return {AutoLayoutMeasurements} Measurements used to position menu popup.
     */

  }, {
    key: 'getAutoLayoutMeasurements_',
    value: function getAutoLayoutMeasurements_() {
      var anchorRect = this.adapter_.getAnchorDimensions();
      var viewport = this.adapter_.getWindowDimensions();

      return {
        viewport: viewport,
        viewportDistance: {
          top: anchorRect.top,
          right: viewport.width - anchorRect.right,
          left: anchorRect.left,
          bottom: viewport.height - anchorRect.bottom
        },
        anchorHeight: anchorRect.height,
        anchorWidth: anchorRect.width,
        menuHeight: this.dimensions_.height,
        menuWidth: this.dimensions_.width
      };
    }

    /**
     * Computes the corner of the anchor from which to animate and position the menu.
     * @return {Corner}
     * @private
     */

  }, {
    key: 'getOriginCorner_',
    value: function getOriginCorner_() {
      // Defaults: open from the top left.
      var corner = _constants.Corner.TOP_LEFT;

      var _measures_ = this.measures_,
          viewportDistance = _measures_.viewportDistance,
          anchorHeight = _measures_.anchorHeight,
          anchorWidth = _measures_.anchorWidth,
          menuHeight = _measures_.menuHeight,
          menuWidth = _measures_.menuWidth;

      var isBottomAligned = Boolean(this.anchorCorner_ & _constants.CornerBit.BOTTOM);
      var availableTop = isBottomAligned ? viewportDistance.top + anchorHeight + this.anchorMargin_.bottom : viewportDistance.top + this.anchorMargin_.top;
      var availableBottom = isBottomAligned ? viewportDistance.bottom - this.anchorMargin_.bottom : viewportDistance.bottom + anchorHeight - this.anchorMargin_.top;

      var topOverflow = menuHeight - availableTop;
      var bottomOverflow = menuHeight - availableBottom;
      if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
        corner |= _constants.CornerBit.BOTTOM;
      }

      var isRtl = this.adapter_.isRtl();
      var isFlipRtl = Boolean(this.anchorCorner_ & _constants.CornerBit.FLIP_RTL);
      var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & _constants.CornerBit.RIGHT);
      var isAlignedRight = avoidHorizontalOverlap && !isRtl || !avoidHorizontalOverlap && isFlipRtl && isRtl;
      var availableLeft = isAlignedRight ? viewportDistance.left + anchorWidth + this.anchorMargin_.right : viewportDistance.left + this.anchorMargin_.left;
      var availableRight = isAlignedRight ? viewportDistance.right - this.anchorMargin_.right : viewportDistance.right + anchorWidth - this.anchorMargin_.left;

      var leftOverflow = menuWidth - availableLeft;
      var rightOverflow = menuWidth - availableRight;

      if (leftOverflow < 0 && isAlignedRight && isRtl || avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0 || rightOverflow > 0 && leftOverflow < rightOverflow) {
        corner |= _constants.CornerBit.RIGHT;
      }

      return corner;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Horizontal offset of menu origin corner from corresponding anchor corner.
     * @private
     */

  }, {
    key: 'getHorizontalOriginOffset_',
    value: function getHorizontalOriginOffset_(corner) {
      var anchorWidth = this.measures_.anchorWidth;

      var isRightAligned = Boolean(corner & _constants.CornerBit.RIGHT);
      var avoidHorizontalOverlap = Boolean(this.anchorCorner_ & _constants.CornerBit.RIGHT);
      var x = 0;
      if (isRightAligned) {
        var rightOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.left : this.anchorMargin_.right;
        x = rightOffset;
      } else {
        var leftOffset = avoidHorizontalOverlap ? anchorWidth - this.anchorMargin_.right : this.anchorMargin_.left;
        x = leftOffset;
      }
      return x;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Vertical offset of menu origin corner from corresponding anchor corner.
     * @private
     */

  }, {
    key: 'getVerticalOriginOffset_',
    value: function getVerticalOriginOffset_(corner) {
      var _measures_2 = this.measures_,
          viewport = _measures_2.viewport,
          viewportDistance = _measures_2.viewportDistance,
          anchorHeight = _measures_2.anchorHeight,
          menuHeight = _measures_2.menuHeight;

      var isBottomAligned = Boolean(corner & _constants.CornerBit.BOTTOM);
      var MARGIN_TO_EDGE = MDCMenuFoundation.numbers.MARGIN_TO_EDGE;

      var avoidVerticalOverlap = Boolean(this.anchorCorner_ & _constants.CornerBit.BOTTOM);
      var canOverlapVertically = !avoidVerticalOverlap;
      var y = 0;

      if (isBottomAligned) {
        y = avoidVerticalOverlap ? anchorHeight - this.anchorMargin_.top : -this.anchorMargin_.bottom;
        // adjust for when menu can overlap anchor, but too tall to be aligned to bottom
        // anchor corner. Bottom margin is ignored in such cases.
        if (canOverlapVertically && menuHeight > viewportDistance.top + anchorHeight) {
          y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.top + anchorHeight));
        }
      } else {
        y = avoidVerticalOverlap ? anchorHeight + this.anchorMargin_.bottom : this.anchorMargin_.top;
        // adjust for when menu can overlap anchor, but too tall to be aligned to top
        // anchor corners. Top margin is ignored in that case.
        if (canOverlapVertically && menuHeight > viewportDistance.bottom + anchorHeight) {
          y = -(Math.min(menuHeight, viewport.height - MARGIN_TO_EDGE) - (viewportDistance.bottom + anchorHeight));
        }
      }
      return y;
    }

    /**
     * @param {Corner} corner Origin corner of the menu.
     * @return {number} Maximum height of the menu, based on available space. 0 indicates should not be set.
     * @private
     */

  }, {
    key: 'getMenuMaxHeight_',
    value: function getMenuMaxHeight_(corner) {
      var maxHeight = 0;
      var viewportDistance = this.measures_.viewportDistance;

      var isBottomAligned = Boolean(corner & _constants.CornerBit.BOTTOM);

      // When maximum height is not specified, it is handled from css.
      if (this.anchorCorner_ & _constants.CornerBit.BOTTOM) {
        if (isBottomAligned) {
          maxHeight = viewportDistance.top + this.anchorMargin_.top;
        } else {
          maxHeight = viewportDistance.bottom - this.anchorMargin_.bottom;
        }
      }

      return maxHeight;
    }

    /** @private */

  }, {
    key: 'autoPosition_',
    value: function autoPosition_() {
      var _position;

      if (!this.adapter_.hasAnchor()) {
        return;
      }

      // Compute measurements for autoposition methods reuse.
      this.measures_ = this.getAutoLayoutMeasurements_();

      var corner = this.getOriginCorner_();
      var maxMenuHeight = this.getMenuMaxHeight_(corner);
      var verticalAlignment = corner & _constants.CornerBit.BOTTOM ? 'bottom' : 'top';
      var horizontalAlignment = corner & _constants.CornerBit.RIGHT ? 'right' : 'left';
      var horizontalOffset = this.getHorizontalOriginOffset_(corner);
      var verticalOffset = this.getVerticalOriginOffset_(corner);
      var position = (_position = {}, _defineProperty(_position, horizontalAlignment, horizontalOffset ? horizontalOffset + 'px' : '0'), _defineProperty(_position, verticalAlignment, verticalOffset ? verticalOffset + 'px' : '0'), _position);
      var _measures_3 = this.measures_,
          anchorWidth = _measures_3.anchorWidth,
          menuHeight = _measures_3.menuHeight,
          menuWidth = _measures_3.menuWidth;
      // Center align when anchor width is comparable or greater than menu, otherwise keep corner.

      if (anchorWidth / menuWidth > _constants.numbers.ANCHOR_TO_MENU_WIDTH_RATIO) {
        horizontalAlignment = 'center';
      }

      // Adjust vertical origin when menu is positioned with significant offset from anchor. This is done so that
      // scale animation is "anchored" on the anchor.
      if (!(this.anchorCorner_ & _constants.CornerBit.BOTTOM) && Math.abs(verticalOffset / menuHeight) > _constants.numbers.OFFSET_TO_MENU_HEIGHT_RATIO) {
        var verticalOffsetPercent = Math.abs(verticalOffset / menuHeight) * 100;
        var originPercent = corner & _constants.CornerBit.BOTTOM ? 100 - verticalOffsetPercent : verticalOffsetPercent;
        verticalAlignment = Math.round(originPercent * 100) / 100 + '%';
      }

      this.adapter_.setTransformOrigin(horizontalAlignment + ' ' + verticalAlignment);
      this.adapter_.setPosition(position);
      this.adapter_.setMaxHeight(maxMenuHeight ? maxMenuHeight + 'px' : '');

      // Clear measures after positioning is complete.
      this.measures_ = null;
    }

    /**
     * Open the menu.
     * @param {{focusIndex: ?number}=} options
     */

  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$focusIndex = _ref.focusIndex,
          focusIndex = _ref$focusIndex === undefined ? null : _ref$focusIndex;

      this.adapter_.saveFocus();

      if (!this.quickOpen_) {
        this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
      }

      this.animationRequestId_ = requestAnimationFrame(function () {
        _this3.dimensions_ = _this3.adapter_.getInnerDimensions();
        _this3.autoPosition_();
        _this3.adapter_.addClass(MDCMenuFoundation.cssClasses.OPEN);
        _this3.focusOnOpen_(focusIndex);
        _this3.adapter_.registerBodyClickHandler(_this3.documentClickHandler_);
        if (!_this3.quickOpen_) {
          _this3.openAnimationEndTimerId_ = setTimeout(function () {
            _this3.openAnimationEndTimerId_ = 0;
            _this3.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_OPEN);
          }, _constants.numbers.TRANSITION_OPEN_DURATION);
        }
      });
      this.isOpen_ = true;
    }

    /**
     * Closes the menu.
     * @param {Event=} evt
     */

  }, {
    key: 'close',
    value: function close() {
      var _this4 = this;

      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var targetIsDisabled = evt ? this.adapter_.getAttributeForEventTarget(evt.target, _constants.strings.ARIA_DISABLED_ATTR) === 'true' : false;

      if (targetIsDisabled) {
        return;
      }

      this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_);

      if (!this.quickOpen_) {
        this.adapter_.addClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
      }

      requestAnimationFrame(function () {
        _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.OPEN);
        if (!_this4.quickOpen_) {
          _this4.closeAnimationEndTimerId_ = setTimeout(function () {
            _this4.closeAnimationEndTimerId_ = 0;
            _this4.adapter_.removeClass(MDCMenuFoundation.cssClasses.ANIMATING_CLOSED);
          }, _constants.numbers.TRANSITION_CLOSE_DURATION);
        }
      });
      this.isOpen_ = false;
      this.adapter_.restoreFocus();
    }

    /** @return {boolean} */

  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isOpen_;
    }

    /** @return {number} */

  }, {
    key: 'getSelectedIndex',
    value: function getSelectedIndex() {
      return this.selectedIndex_;
    }

    /**
     * @param {number} index Index of the item to set as selected.
     */

  }, {
    key: 'setSelectedIndex',
    value: function setSelectedIndex(index) {
      if (index === this.selectedIndex_) {
        return;
      }

      var prevSelectedIndex = this.selectedIndex_;
      if (prevSelectedIndex >= 0) {
        this.adapter_.rmAttrForOptionAtIndex(prevSelectedIndex, 'aria-selected');
        this.adapter_.rmClassForOptionAtIndex(prevSelectedIndex, _constants.cssClasses.SELECTED_LIST_ITEM);
      }

      this.selectedIndex_ = index >= 0 && index < this.adapter_.getNumberOfItems() ? index : -1;
      if (this.selectedIndex_ >= 0) {
        this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, 'aria-selected', 'true');
        this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, _constants.cssClasses.SELECTED_LIST_ITEM);
      }
    }
  }]);

  return MDCMenuFoundation;
}(_foundation2.default);

exports.MDCMenuFoundation = MDCMenuFoundation;
exports.AnchorMargin = AnchorMargin;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Menu. Provides an interface for managing
 * - classes
 * - dom
 * - focus
 * - position
 * - dimensions
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCMenuAdapter = function () {
  function MDCMenuAdapter() {
    _classCallCheck(this, MDCMenuAdapter);
  }

  _createClass(MDCMenuAdapter, [{
    key: "addClass",

    /** @param {string} className */
    value: function addClass(className) {}

    /** @param {string} className */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /**
     * @param {string} className
     * @return {boolean}
     */

  }, {
    key: "hasClass",
    value: function hasClass(className) {}

    /** @return {boolean} */

  }, {
    key: "hasNecessaryDom",
    value: function hasNecessaryDom() {}

    /**
     * @param {EventTarget} target
     * @param {string} attributeName
     * @return {string}
     */

  }, {
    key: "getAttributeForEventTarget",
    value: function getAttributeForEventTarget(target, attributeName) {}

    /** @return {{ width: number, height: number }} */

  }, {
    key: "getInnerDimensions",
    value: function getInnerDimensions() {}

    /** @return {boolean} */

  }, {
    key: "hasAnchor",
    value: function hasAnchor() {}

    /** @return {{width: number, height: number, top: number, right: number, bottom: number, left: number}} */

  }, {
    key: "getAnchorDimensions",
    value: function getAnchorDimensions() {}

    /** @return {{ width: number, height: number }} */

  }, {
    key: "getWindowDimensions",
    value: function getWindowDimensions() {}

    /** @return {number} */

  }, {
    key: "getNumberOfItems",
    value: function getNumberOfItems() {}

    /**
     * @param {string} type
     * @param {function(!Event)} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(type, handler) {}

    /**
     * @param {string} type
     * @param {function(!Event)} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(type, handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: "registerBodyClickHandler",
    value: function registerBodyClickHandler(handler) {}

    /** @param {function(!Event)} handler */

  }, {
    key: "deregisterBodyClickHandler",
    value: function deregisterBodyClickHandler(handler) {}

    /**
     * @param {EventTarget} target
     * @return {number}
     */

  }, {
    key: "getIndexForEventTarget",
    value: function getIndexForEventTarget(target) {}

    /** @param {{index: number}} evtData */

  }, {
    key: "notifySelected",
    value: function notifySelected(evtData) {}
  }, {
    key: "notifyCancel",
    value: function notifyCancel() {}
  }, {
    key: "saveFocus",
    value: function saveFocus() {}
  }, {
    key: "restoreFocus",
    value: function restoreFocus() {}

    /** @return {boolean} */

  }, {
    key: "isFocused",
    value: function isFocused() {}
  }, {
    key: "focus",
    value: function focus() {}

    /** @return {number} */

  }, {
    key: "getFocusedItemIndex",
    value: function getFocusedItemIndex() /* number */{}

    /** @param {number} index */

  }, {
    key: "focusItemAtIndex",
    value: function focusItemAtIndex(index) {}

    /** @return {boolean} */

  }, {
    key: "isRtl",
    value: function isRtl() {}

    /** @param {string} origin */

  }, {
    key: "setTransformOrigin",
    value: function setTransformOrigin(origin) {}

    /** @param {{
    *   top: (string|undefined),
    *   right: (string|undefined),
    *   bottom: (string|undefined),
    *   left: (string|undefined)
    * }} position */

  }, {
    key: "setPosition",
    value: function setPosition(position) {}

    /** @param {string} height */

  }, {
    key: "setMaxHeight",
    value: function setMaxHeight(height) {}

    /**
     * @param {number} index
     * @param {string} attr
     * @param {string} value
     */

  }, {
    key: "setAttrForOptionAtIndex",
    value: function setAttrForOptionAtIndex(index, attr, value) {}

    /**
     * @param {number} index
     * @param {string} attr
     */

  }, {
    key: "rmAttrForOptionAtIndex",
    value: function rmAttrForOptionAtIndex(index, attr) {}

    /**
     * @param {number} index
     * @param {string} className
     */

  }, {
    key: "addClassForOptionAtIndex",
    value: function addClassForOptionAtIndex(index, className) {}

    /**
     * @param {number} index
     * @param {string} className
     */

  }, {
    key: "rmClassForOptionAtIndex",
    value: function rmClassForOptionAtIndex(index, className) {}
  }]);

  return MDCMenuAdapter;
}();

exports.MDCMenuAdapter = MDCMenuAdapter;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCTabTextController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseComponent = __webpack_require__(2);

var _tab = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @ngdoc directive
 * @name mdcTabText
 * @restrict AEC
 * @module mdc.tabs
 */
var MDCTabTextController = exports.MDCTabTextController = function (_BaseComponent) {
  _inherits(MDCTabTextController, _BaseComponent);

  _createClass(MDCTabTextController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcTabText';
    }
  }, {
    key: 'bindings',
    get: function get() {
      return true;
    }
  }, {
    key: 'require',
    get: function get() {
      return {
        tab: '^^' + _tab.MDCTabController.name
      };
    }
  }, {
    key: '$inject',
    get: function get() {
      return ['$element'];
    }
  }]);

  function MDCTabTextController() {
    var _ref;

    _classCallCheck(this, MDCTabTextController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MDCTabTextController.__proto__ || Object.getPrototypeOf(MDCTabTextController)).call.apply(_ref, [this].concat(args)));

    _this.$element.addClass('mdc-tab__icon-text');
    return _this;
  }

  _createClass(MDCTabTextController, [{
    key: '$postLink',
    value: function $postLink() {
      this.tab.setMDCText(true);
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.tab.setMDCText(false);
    }
  }]);

  return MDCTabTextController;
}(_baseComponent.BaseComponent);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _directive = __webpack_require__(8);

var _directive2 = __webpack_require__(23);

var _menu = __webpack_require__(43);

var _item = __webpack_require__(45);

angular.module('mdc.menu-experimental', []).directive(_directive.MDCMenuAnchorController.name, function () {
  return {
    controller: _directive.MDCMenuAnchorController
  };
}).component(_menu.MDCExperimentalMenuController.name, {
  controller: _menu.MDCExperimentalMenuController,
  template: _menu.MDCExperimentalMenuController.template,
  require: _menu.MDCExperimentalMenuController.require,
  bindings: _menu.MDCExperimentalMenuController.bindings,
  transclude: _menu.MDCExperimentalMenuController.transclude
}).directive(_directive2.MDCMenuToggleController.name, function () {
  return {
    controller: _directive2.MDCMenuToggleController,
    require: _directive2.MDCMenuToggleController.require,
    bindToController: _directive2.MDCMenuToggleController.bindings
  };
}).directive(_item.MDCExperimentalMenuItemController.name, function () {
  return {
    controller: _item.MDCExperimentalMenuItemController,
    require: _item.MDCExperimentalMenuItemController.require,
    bindToController: _item.MDCExperimentalMenuItemController.bindings
  };
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCExperimentalMenuController = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = __webpack_require__(24);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MDCExperimentalMenuController = exports.MDCExperimentalMenuController = function (_MDCMenuController) {
  _inherits(MDCExperimentalMenuController, _MDCMenuController);

  function MDCExperimentalMenuController() {
    _classCallCheck(this, MDCExperimentalMenuController);

    return _possibleConstructorReturn(this, (MDCExperimentalMenuController.__proto__ || Object.getPrototypeOf(MDCExperimentalMenuController)).apply(this, arguments));
  }

  _createClass(MDCExperimentalMenuController, [{
    key: 'mdcTab',
    set: function set(tab) {
      this.tab = tab;

      if (tab) {
        this.tab.setMDCMenu(this);
      }
    },
    get: function get() {
      return this.tab;
    }
  }], [{
    key: 'name',
    get: function get() {
      return 'mdcMenu';
    }
  }, {
    key: 'require',
    get: function get() {
      return _extends({
        mdcTab: '^^?'
      }, _get(MDCExperimentalMenuController.__proto__ || Object.getPrototypeOf(MDCExperimentalMenuController), 'require', this));
    }
  }]);

  return MDCExperimentalMenuController;
}(_component.MDCMenuController);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<div class=\"mdc-menu__items mdc-list\" role=\"menu\" aria-hidden=\"true\" ng-transclude></div>\n";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MDCExperimentalMenuItemController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(25);

var _hasNgValueMixin = __webpack_require__(20);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MDCExperimentalMenuItemController = exports.MDCExperimentalMenuItemController = function (_HasNgValue) {
  _inherits(MDCExperimentalMenuItemController, _HasNgValue);

  function MDCExperimentalMenuItemController() {
    _classCallCheck(this, MDCExperimentalMenuItemController);

    return _possibleConstructorReturn(this, (MDCExperimentalMenuItemController.__proto__ || Object.getPrototypeOf(MDCExperimentalMenuItemController)).apply(this, arguments));
  }

  _createClass(MDCExperimentalMenuItemController, null, [{
    key: 'name',
    get: function get() {
      return 'mdcMenuItem';
    }
  }]);

  return MDCExperimentalMenuItemController;
}((0, _hasNgValueMixin.HasNgValue)(_component.MDCMenuItemController));

/***/ })
/******/ ]);
});