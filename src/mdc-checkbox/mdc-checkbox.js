import {arrayUnion} from '../util/array-union';
import {BaseComponent} from '../util/base-component';
import {IsFormFieldChild} from '../mdc-form-field/child-mixin';

import {MDCCheckbox} from '@material/checkbox';

import template from './mdc-checkbox.html';


/**
 * @ngdoc component
 * @name mdcCheckbox
 * @module mdc.checkbox
 *
 * @param {string} [inputId] - The id for the inner input element (use with <label for=>)
 * @param {string} [ngModel] - Assignable AngularJS expression to data-bind to.
 * @param {bool} [indeterminate] - whether the checkbox is in indeterminate state
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 */
export class MDCCheckboxController extends IsFormFieldChild(BaseComponent) {
  static get name() {
    return 'mdcCheckbox';
  }

  static get $inject() {
    return arrayUnion(['$scope', '$element'], super.$inject);
  }

  static get template() {
    return template;
  }

  static get bindings() {
    return Object.assign({
      ngModel: '=?',
      ngDisabled: '<?',
      indeterminate: '<?',
      inputId: '@?',
    }, super.bindings);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-checkbox');
    this.mdc = new MDCCheckbox(this.$element[0]);
  }

  $onChanges(changesObj) {
    super.$onChanges(changesObj);

    // inputId is handled by IsFormFieldChild
    if (changesObj.ngDisabled) {
      this.$element.toggleClass('mdc-checkbox--disabled', Boolean(this.ngDisabled));
    }
    if (changesObj.indeterminate) {
      this.mdc.indeterminate = this.indeterminate;
    }
  }

  $onDestroy() {
    super.$onDestroy();

    this.mdc.destroy();
  }
}


/**
 * @ngdoc module
 * @name mdc.checkbox
 * @description
 *
 * Checkbox
 */
angular
  .module('mdc.checkbox', [])
  .component(MDCCheckboxController.name, {
    controller: MDCCheckboxController,
    template: MDCCheckboxController.template,
    bindings: MDCCheckboxController.bindings,
    require: MDCCheckboxController.require,
  });
