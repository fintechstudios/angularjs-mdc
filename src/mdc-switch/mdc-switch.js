/**
 * @ngdoc component
 * @name mdcSwitch
 * @module mdc.switch
 *
 * @param {string} [inputId] The id for the inner input element (use with <label for=>)
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to.
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 *
 */
class MdcSwitchController {
  constructor($element) {
    this.elem = $element;
  }

  $onChanges(changesObj) {
    if (changesObj.ngDisabled) {
      this.elem.toggleClass('mdc-switch--disabled', this.ngDisabled);
    }
  };
}

/**
 * @ngdoc module
 * @name mdc.switch
 * @description
 *
 * Switch
 */
angular
  .module('mdc.switch', [])
  .component('mdcSwitch', {
    controller: MdcSwitchController,
    bindings: {
      inputId: '@',
      ngDisabled: '<?',
      ngModel: '=?',
    },
    template: require('raw-loader!./mdc-switch.html'),
  });
