import {MDCRippleController} from './directive';


/**
 * Ripple
 *
 * @ngdoc module
 * @name mdc.ripple
 */
angular
  .module('mdc.ripple', [])
  .directive(MDCRippleController.name, () => ({
    controller: MDCRippleController,
    priority: Number.MIN_SAFE_INTEGER,
  }));
