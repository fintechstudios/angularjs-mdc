import {MDCButtonController} from './directive';

/**
 * @ngdoc module
 * @name mdc.button
 * @description
 *
 * Button
 */
angular
  .module('mdc.button', [])
  .directive(MDCButtonController.name, () => ({
    controller: MDCButtonController,
    bindToController: MDCButtonController.bindings,
  }));
