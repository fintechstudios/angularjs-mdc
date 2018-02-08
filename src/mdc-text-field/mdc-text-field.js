import {MDCTextFieldController} from './text-field/component';


/**
 * @ngdoc module
 * @name mdc.text-field
 * @description
 *
 * Material Design TextField
 */
angular
  .module('mdc.text-field', [])
  .component(MDCTextFieldController.name, {
    controller: MDCTextFieldController,
    bindings: MDCTextFieldController.bindings,
    require: MDCTextFieldController.require,
  });
