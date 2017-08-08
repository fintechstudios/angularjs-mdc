
import {MDCCheckbox} from '@material/checkbox';

/**
 * @ngdoc component
 * @name mdcCheckbox
 * @module mdc.checkbox
 *
 * @param {string} [inputId] The id for the inner input element (use with <label for=>)
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to.
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 */
class MdcCheckboxController {
  constructor($element) {
    this.elem = $element;
    this.root_ = this.elem[0];
    this.mdc = new MDCCheckbox(this.root_);
  }

  $onChanges(changesObj) {
    if (changesObj.ngDisabled) {
      this.elem.toggleClass('mdc-checkbox--disabled', this.ngDisabled);
    }
    if (changesObj.indeterminate) {
      this.mdc.indeterminate = this.indeterminate;
    }
  }

  $onDestroy() {
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
  .component('mdcCheckbox', {
    controller: MdcCheckboxController,
    template: require('raw-loader!./mdc-checkbox.html'),
    bindings: {
      ngModel: '=?',
      ngDisabled: '<?',
      indeterminate: '<?',
      inputId: '@',
    },
  });
