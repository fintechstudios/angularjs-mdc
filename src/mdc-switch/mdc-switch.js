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
    this.elem.addClass('mdc-switch');
  }

  $postLink() {
    if (this.ngDisabled) {
      this.elem.addClass('mdc-switch--disabled');
    }
  }

  $onChanges(changesObj) {
    if (changesObj.ngDisabled) {
      if (this.ngDisabled) {
        this.elem.addClass('mdc-switch--disabled');
      } else {
        this.elem.removeClass('mdc-switch--disabled');
      }
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
