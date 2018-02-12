import {MDCFormFieldController} from './component';


/**
 * @ngdoc module
 * @name mdc.form-field
 * @description
 *
 * FormField
 */
angular
  .module('mdc.form-field', [])
  .component(MDCFormFieldController.name, {
    controller: MDCFormFieldController,
    bindings: MDCFormFieldController.bindings,
  });
