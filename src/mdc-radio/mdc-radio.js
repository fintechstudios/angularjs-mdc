
import {MDCRadio} from '@material/radio';

/**
 * @ngdoc component
 * @name mdcRadio
 * @module mdc.radio
 *
 * @param {string} [inputId] The id for the inner input element (use with <label for=>)
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to.
 * @param {expression} [ngValue] AngularJS expression to which ngModel will be be set when
 *        the radio is selected.
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 *
 */
class MdcRadioController {
  constructor($element) {
    this.elem = $element;
    this.mdc = new MDCRadio(this.elem[0]);
  }

  $onChanges(changesObj) {
    if (changesObj.ngDisabled) {
      this.mdc.disabled = this.ngDisabled;
    }
  };

  $onDestroy() {
    this.mdc.destroy();
  }
}

/**
 * @ngdoc module
 * @name mdc.radio
 * @description
 *
 * Radio
 */
angular
  .module('mdc.radio', [])
  .component('mdcRadio', {
    controller: MdcRadioController,
    bindings: {
      inputId: '@',
      ngDisabled: '<?',
      ngModel: '=?',
      ngValue: '<?',
    },
    template: require('raw-loader!./mdc-radio.html'),
  });
