import {MDCFormFieldController} from './component';

require('angular-debounce');


/**
 * @ngdoc module
 * @name mdc.form-field
 * @description
 *
 * FormField
 */
angular
  .module('mdc.form-field', ['rt.debounce'])
  .component(MDCFormFieldController.name, {
    controller: MDCFormFieldController,
    bindings: MDCFormFieldController.bindings,
  });
