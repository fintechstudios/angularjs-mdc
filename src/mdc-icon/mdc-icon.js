/**
 * @ngdoc component
 * @name mdcIcon
 * @module mdc.icon
 *
 * @param {string=} mdc-font-icon The name of the MD icon to show
 * @param {expression=} ng-bind Bind a variable as the MD icon to show
 *
 */
class MdcIconController {
  constructor($element) {
    this.elem = $element;
  }

  $postLink() {
    this.elem.addClass('material-icons');
    if (this.mdcFontIcon) {
      this.elem.text(this.mdcFontIcon);
    }
  }

  $onChanges(changesObj) {
    if (changesObj.mdcFontIcon) {
      this.elem.text(this.mdcFontIcon);
    }
  };
}


/**
 * @ngdoc module
 * @name mdc.icon
 * @description
 *
 * Material Design Icon
 */
angular
  .module('mdc.icon', [])
  .component('mdcIcon', {
    controller: MdcIconController,
    bindings: {
      mdcFontIcon: '@',
    },
  });
