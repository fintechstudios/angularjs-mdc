import {BindInjections} from '../util/bind-injections';
import {replaceFoundationConstants} from '../util/replace-foundation-constants';

import {MDCSnackbar, MDCSnackbarFoundation} from '@material/snackbar';
import {numbers} from '@material/snackbar/constants';

import defaultTemplate from './snackbar.html';
import startAlignedTemplate from './snackbar--align-start.html';


const TEMPLATE_TO_SNACKBAR_MAP = new Map();

function getParentMap(template) {
  if (!TEMPLATE_TO_SNACKBAR_MAP.has(template)) {
    TEMPLATE_TO_SNACKBAR_MAP.set(template, new WeakMap());
  }
  return TEMPLATE_TO_SNACKBAR_MAP.get(template);
}

replaceFoundationConstants(MDCSnackbarFoundation);


/**
 * @ngdoc service
 * @name $mdcSnackbar
 * @description Show a temporary message via a snackbar. Use $mdcSnackbar.show or $mdcSnackbar.showStartAligned
 */
export class MDCSnackbarService extends BindInjections {
  static get name() {
    return '$mdcSnackbar';
  }

  static get $inject() {
    return ['$q', '$rootElement', '$timeout'];
  }

  /**
   * Get or create the MDCSnackbar component inside the given parent element
   *
   * @param {Object<JQLite>|HTMLElement} parent - parent element to append snackbar DOM
   * @param {string|HTMLElement} template - template to check for, or to use if creating new element
   * @return {Object<MDCSnackbar>}
   * @private
   */
  getMDCSnackbar_(parent, template) {
    const parentMDCMap = getParentMap(template);
    const parentEl = parent[0] || parent;

    if (!parentMDCMap.has(parentEl)) {
      const $element = angular.element(template);

      parentEl.appendChild($element[0]);

      const snackbar = new MDCSnackbar($element[0]);
      parentMDCMap.set(parentEl, snackbar);

      $element.on('$destroy', () => {
        parentMDCMap.delete(parentEl);
        snackbar.destroy();
      });
    }

    return parentMDCMap.get(parentEl);
  }


  /**
   * Show the snackbar with given configuration.
   *
   * @param {Object<MDCSnackbar>} snackbar - instance of MDCSnackbar to queue the message at
   * @param {object} options - Properties for the displayed snackbar. Only a message is required.
   * @param {string} options.message - The text message to display.
   * @param {number} [options.timeout=2750] - The amount of time in milliseconds to show the snackbar.
   * @param {string} [options.actionText] - The text to display for the action button - required for actionHandler
   * @param {function} [options.actionHandler] - The function to execute when the action is clicked.
   * @param {boolean} [options.multiline=false] - Whether to show the snackbar with space for multiple lines of text
   * @param {boolean} [options.actionOnBottom=false] - Whether to show the action below the multiple lines of text
   * @param {boolean} [options.dismissesOnAction=true] - Whether to dismiss when actionHandler is triggered.
   * @private
   */
  show_(snackbar, {message, timeout, actionText, actionHandler, multiline, actionOnBottom, dismissesOnAction}) {
    snackbar.dismissesOnAction = dismissesOnAction;

    this.$timeout(() => { // ensures DOM is ready
      snackbar.show({message, timeout, actionText, actionHandler, multiline, actionOnBottom});
    }, 1);
  }


  /**
   * @ngdoc method
   * @name $mdcSnackbar#show
   * @description Shows a snackbar
   *
   * @param {object} options - Properties for the displayed snackbar. Only a message is required.
   * @param {string} options.message - The text message to display.
   * @param {number} [options.timeout=2750] - The amount of time in milliseconds to show the snackbar.
   * @param {string|undefined} [options.actionText] - The text to display for the action button
   * @param {function|undefined} [options.actionHandler] - The function to execute when the action is clicked.
   * @param {boolean} [options.multiline=false] - Whether to show the snackbar with space for multiple lines of text
   * @param {boolean} [options.actionOnBottom=false] - Whether to show the action below the multiple lines of text
   * @param {boolean} [options.dismissesOnAction=true] - Whether to dismiss when actionHandler is triggered.
   * @param {Object<JQLite>|HTMLElement} [options.parent=$rootElement] - container to put snackbar in
   *
   * @return {Object<MDCSnackbar>}
   */
  show({
    message, timeout = numbers.MESSAGE_TIMEOUT, actionText = undefined, actionHandler = undefined,
    multiline = false, actionOnBottom = false, dismissesOnAction = true,
    parent = this.$rootElement,
  }) {
    const snackbar = this.getMDCSnackbar_(parent, defaultTemplate);

    this.show_(snackbar, {message, timeout, actionText, actionHandler, multiline, actionOnBottom, dismissesOnAction});

    return snackbar;
  }


  /**
   * @ngdoc method
   * @name $mdcSnackbar#showStartAligned
   * @description Shows a snackbar aligned with the start of the display (rtl-aware)
   *
   * @param {object} options - Properties for the displayed snackbar. Only a message is required.
   * @param {string} options.message - The text message to display.
   * @param {number} [options.timeout=2750] - The amount of time in milliseconds to show the snackbar.
   * @param {string|undefined} [options.actionText] - The text to display for the action button
   * @param {function|undefined} [options.actionHandler] - The function to execute when the action is clicked.
   * @param {boolean} [options.multiline=false] - Whether to show the snackbar with space for multiple lines of text
   * @param {boolean} [options.actionOnBottom=false] - Whether to show the action below the multiple lines of text
   * @param {boolean} [options.dismissesOnAction=true] - Whether to dismiss when actionHandler is triggered.
   * @param {Object<JQLite>|HTMLElement} [options.parent=$rootElement] - container to put snackbar in
   *
   * @return {Object<MDCSnackbar>}
   */
  showStartAligned({
    message, timeout = numbers.MESSAGE_TIMEOUT, actionText = undefined, actionHandler = undefined,
    multiline = false, actionOnBottom = false, dismissesOnAction = true,
    parent = this.$rootElement,
  }) {
    const snackbar = this.getMDCSnackbar_(parent, startAlignedTemplate);

    this.show_(snackbar, {message, timeout, actionText, actionHandler, multiline, actionOnBottom, dismissesOnAction});

    return snackbar;
  }
}
