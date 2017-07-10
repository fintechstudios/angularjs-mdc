/**
 * @ngdoc component
 * @name mdcButton
 * @module mdc.button
 *
 * @param {expression=} dense Display the button densely
 * @param {expression=} raised Display the button raised (false -> flat)
 * @param {expression=} compact Display the button compact
 * @param {string=} color Color for button: "primary", "accent", or nothing
 * @param {expression=} ng-disabled En/Disable based on the expression
 *
 */
class MdcButtonController {
  constructor($element) {
    this.elem = $element;
  }

  $postLink() {
    this.elem.addClass('mdc-button');
  }

  $onChanges(changesObj) {
    const e = this.elem;
    const ctrl = this;
    ['dense', 'raised', 'compact'].forEach(function(attr) {
      if (changesObj[attr]) {
        if (ctrl[attr]) {
          e.addClass('mdc-button--' + attr);
        } else {
          e.removeClass('mdc-button--' + attr);
        }
      }
    });
    if (changesObj.color) {
      if (ctrl.color === 'primary') {
        e.addClass('mdc-button--primary');
        e.removeClass('mdc-button--accent');
      } else if (ctrl.color === 'accent') {
        e.addClass('mdc-button--accent');
        e.removeClass('mdc-button--primary');
      } else {
        e.removeClass('mdc-button--primary');
        e.removeClass('mdc-button--accent');
      }
    }
  };
}


/**
 * @ngdoc module
 * @name mdc.button
 * @description
 *
 * Button
 */
angular
  .module('mdc.button', [])
  .component('mdcButton', {
    controller: MdcButtonController,
    bindings: {
      dense: '<',
      raised: '<',
      compact: '<',
      color: '@',
    },
  });
