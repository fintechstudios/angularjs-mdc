require('../util/angular-material-core-slim');

import {MDCSnackbarFoundation} from '@material/snackbar';
import {cssClasses, numbers} from '@material/snackbar/constants';
import {getCorrectEventName} from '@material/animation';


class WrappedMDCSnackbarFoundation extends MDCSnackbarFoundation {
  showNext_() {
    if (!this.queue_.length) {
      // we need to check when the queue is empty so the temporary element can be moved out of the DOM
      this.adapter_.onLastShown();
      return;
    }
    super.showNext_();
  }

  show(data) {
    /*
     * TODO: replace with super() when issue is fixed
     * Issue: https://github.com/material-components/material-components-web/issues/1083
     * Modified with fix from
     * https://github.com/dpraul/material-components-web/commit/15ecbb4e97638758805ef020a1118c320b4231c7
     */
    if (!data) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (!data.message) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data.actionHandler && !data.actionText) {
      throw new Error('Please provide action text with the handler.');
    }
    if (this.active) {
      this.queue_.push(data);
      return;
    }
    clearTimeout(this.timeoutId_);
    this.snackbarData_ = data;
    this.firstFocus_ = true;
    this.adapter_.registerVisibilityChangeHandler(this.visibilitychangeHandler_);
    this.adapter_.registerCapturedBlurHandler(this.blurHandler_);
    ['touchstart', 'mousedown', 'focus'].forEach((evtType) => {
      this.adapter_.registerCapturedInteractionHandler(evtType, this.interactionHandler_);
    });

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses;

    this.adapter_.setMessageText(this.snackbarData_.message);

    if (this.snackbarData_.multiline) {
      this.adapter_.addClass(MULTILINE);
      if (this.snackbarData_.actionOnBottom) {
        this.adapter_.addClass(ACTION_ON_BOTTOM);
      }
    }

    if (this.snackbarData_.actionHandler) {
      this.adapter_.setActionText(this.snackbarData_.actionText);
      this.actionHandler_ = this.snackbarData_.actionHandler;
      this.setActionHidden_(false);
    } else {
      this.setActionHidden_(true);
      this.actionHandler_ = null;
      this.adapter_.setActionText(null);
    }

    this.active_ = true;
    this.adapter_.addClass(ACTIVE);
    this.adapter_.unsetAriaHidden();

    this.timeoutId_ = setTimeout( // eslint-disable-line angular/timeout-service
      this.cleanup_.bind(this),
      this.snackbarData_.timeout || numbers.MESSAGE_TIMEOUT
    );
    /* End of super() */

    if (data.dismissesOnAction === undefined) {
      data.dismissesOnAction = true;
    }

    this.setDismissOnAction(data.dismissesOnAction);
  }
}

class MDCSnackbarController {
  constructor($element, $window, $scope) {
    this.elem = $element;
    this.root_ = this.elem[0];
    this.window = $window;
    this.document = $window.document;
    this.foundation_ = this.getDefaultFoundation();
    this.onLastShown = undefined;

    this.elemReady = false;
    this.toShow = undefined;

    this.elem.ready(() => {
      this.elemReady = true;
      this.init();
    });

    $scope.$on('$destroy', () => {
      this.destroy();
    });
  }

  init() {
    if (this.elemReady) {
      this.foundation_.init();
      if (this.toShow) {
        this.show(this.toShow);
      }
    }
  }

  getDefaultFoundation() {
    const {TEXT_SELECTOR, ACTION_BUTTON_SELECTOR} = WrappedMDCSnackbarFoundation.strings;
    const textElem = this.root_.querySelector(TEXT_SELECTOR);
    const actionElem = this.root_.querySelector(ACTION_BUTTON_SELECTOR);

    /* eslint brace-style: "off" */
    return new WrappedMDCSnackbarFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      setAriaHidden: () => this.root_.setAttribute('aria-hidden', 'true'),
      unsetAriaHidden: () => this.root_.removeAttribute('aria-hidden'),
      setActionAriaHidden: () => actionElem.setAttribute('aria-hidden', 'true'),
      unsetActionAriaHidden: () => actionElem.removeAttribute('aria-hidden'),
      setActionText: (text) => { actionElem.textContent = text; },
      setMessageText: (text) => { textElem.textContent = text; },
      setFocus: () => actionElem.focus(),
      visibilityIsHidden: () => this.document.hidden,
      registerCapturedBlurHandler: (handler) => actionElem.addEventListener('blur', handler, true),
      deregisterCapturedBlurHandler: (handler) => actionElem.removeEventListener('blur', handler, true),
      registerVisibilityChangeHandler: (handler) => this.document.addEventListener('visibilitychange', handler),
      deregisterVisibilityChangeHandler: (handler) => this.document.removeEventListener('visibilitychange', handler),
      registerCapturedInteractionHandler: (evt, handler) =>
        this.document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        this.document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: (handler) => actionElem.addEventListener('click', handler),
      deregisterActionClickHandler: (handler) => actionElem.removeEventListener('click', handler),
      registerTransitionEndHandler:
        (handler) => this.root_.addEventListener(getCorrectEventName(this.window, 'transitionend'), handler),
      deregisterTransitionEndHandler:
        (handler) => this.root_.removeEventListener(getCorrectEventName(this.window, 'transitionend'), handler),
      onLastShown: () => {
        if (this.onLastShown) {
          this.onLastShown();
        }
      },
    });
  }

  show(data) {
    if (!this.elemReady) {
      this.toShow = data;
      return;
    }
    this.foundation_.show(data);
  }

  destroy() {
    this.foundation_.destroy();
  }
}

const snackbarParents = new WeakMap();

/**
 * @ngdoc service
 * @name $mdcSnackbar
 * @module mdc.snackbar
 */
class $mdcSnackbar {
  static get parents_() {
    return snackbarParents;
  }

  constructor($q, $rootElement, $mdCompilerSlim, $rootScope) {
    this.$rootScope = $rootScope;
    this.$rootElement = $rootElement;
    this.$mdCompilerSlim = $mdCompilerSlim;
    this.$q = $q;
  }

  get_(parent, {contentElement, templateUrl, template}, locals = {}) {
    return this.$q((resolve, reject) => {
      const key = contentElement || templateUrl || template;
      let controllers;
      let ctrl;

      if ($mdcSnackbar.parents_.has(parent)) {
        controllers = $mdcSnackbar.parents_.get(parent);
        if (key && controllers.has(key)) {
          ctrl = controllers.get(key);
        }
      } else {
        controllers = new Map();
        $mdcSnackbar.parents_.set(parent, controllers);
      }

      if (ctrl) { // controller already built, use it
        resolve(ctrl);
      } else { // controller needs to be compiled
        const options = {
          templateUrl: templateUrl, template: template, locals: locals,
          controller: MDCSnackbarController, controllerAs: 'snackbar',
        };

        this.$mdCompilerSlim.compile(options).then((compileData) => {
          const scope = this.$rootScope.$new(true);
          parent.append(compileData.element);

          compileData.link(scope); // returns compiled element
          const controller = compileData.controller; // this is only available after link()

          controller.onLastShown = () => {
            // clean up the controller when the last snackbar is shown
            controllers.delete(key);
            scope.$destroy();
            compileData.cleanup();
          };

          controllers.set(key, controller);
          resolve(controller);
        }, reject);
      }
    });
  }

  /**
   * @ngdoc method
   * @name $mdcSnackbar#show
   * @description Shows a snackbar
   *
   * @param {object} data - Properties for the displayed snackbar. Only a message is required.
   * @param {string} data.message - The text message to display.
   * @param {number} [data.timeout=2750] - The amount of time in milliseconds to show the snackbar.
   * @param {function} [data.actionHandler] - The function to execute when the action is clicked.
   * @param {string} [data.actionText] - The text to display for the action button - required if actionHandler is set.
   * @param {boolean} [data.multiline=false] - Whether to show the snackbar with space for multiple lines of text
   * @param {boolean} [data.actionOnBottom=false] - Whether to show the action below the multiple lines of text.
   * @param {boolean} [data.dismissesOnAction=true] - Whether to dismiss when actionHandler is triggered.
   * @param {string|Element} [data.parent] - parent container to insert the snackbar inside of
   * @param {string|Element} [data.contentElement] - can be provided instead of a template to reuse a DOM element
   * @param {string} [data.template] - HTML template as a string
   * @param {string} [data.templateUrl] - Path to an HTML template
   */
  show({
    message, timeout = undefined, actionText = undefined, actionHandler = undefined, multiline = undefined,
    actionOnBottom = undefined, dismissesOnAction = undefined, templateUrl = undefined,
    parent = this.$rootElement, contentElement = undefined,
    template = require('raw-loader!./mdc-snackbar-service.html'),
  }) {
    this.get_(parent, {contentElement, templateUrl, template}).then((mdc) => {
      mdc.show({
        message: message, timeout: timeout, actionText: actionText,
        actionHandler: actionHandler, multiline: multiline, actionOnBottom: actionOnBottom,
        dismissesOnAction: dismissesOnAction,
      });
    });
  }

  /**
   * @ngdoc method
   * @name $mdcSnackbar#showStartAligned
   * @description Shows a snackbar that is start-aligned (RTL-aware) on tablet/desktop
   *
   * @param {object} data - Properties for the displayed snackbar. Only a message is required.
   * @param {string} data.message - The text message to display.
   * @param {number} [data.timeout=2750] - The amount of time in milliseconds to show the snackbar.
   * @param {function} [data.actionHandler] - The function to execute when the action is clicked.
   * @param {string} [data.actionText] - The text to display for the action button - required if actionHandler is set.
   * @param {boolean} [data.multiline=false] - Whether to show the snackbar with space for multiple lines of text
   * @param {boolean} [data.actionOnBottom=false] - Whether to show the action below the multiple lines of text.
   * @param {boolean} [data.dismissesOnAction=true] - Whether to dismiss when actionHandler is triggered.
   * @param {string|Element} [data.parent] - parent container to insert the snackbar inside of
   */
  showStartAligned({
    message, timeout = undefined, actionText = undefined, actionHandler = undefined, multiline = undefined,
    actionOnBottom = undefined, dismissesOnAction = undefined, parent = undefined,
  }) {
    this.show({
      template: require('raw-loader!./mdc-snackbar-service-start.html'), parent: parent,
      message: message, timeout: timeout, actionText: actionText,
      actionHandler: actionHandler, multiline: multiline, actionOnBottom: actionOnBottom,
      dismissesOnAction: dismissesOnAction,
    });
  }
}

function $mdcSnackbarFactory($q, $rootElement, $mdCompilerSlim, $rootScope) {
  return new $mdcSnackbar($q, $rootElement, $mdCompilerSlim, $rootScope);
}


/**
 * @ngdoc component
 * @name mdcSnackbar
 * @module mdc.snackbar
 */

angular
  .module('mdc.snackbar', ['material.core.slim'])
  .factory('$mdcSnackbar', $mdcSnackbarFactory);
