import {MdcFormFieldController} from './component';

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
  .component(MdcFormFieldController.name, {
    controller: MdcFormFieldController,
    bindings: MdcFormFieldController.bindings,
  });
