/**
 * @ngdoc component
 * @name mdcIcon
 * @module mdc.icon
 *
 * @param {string=} mdc-font-icon The name of the MD icon to show
 * @param {string=} size Either 48, 32, 24, or 18 (suggested to use 24 per MD spec). Default: 24
 * @param {expression=} ng-bind Bind a variable as the MD icon to show
 *
 */
class MdcIconController {
  constructor($element, MDC_ICON_SIZES) {
    this.elem = $element;
    this.MDC_ICON_SIZES = MDC_ICON_SIZES;
  }

  $postLink() {
    this.elem.addClass('material-icons');
  }

  $onChanges(changesObj) {
    if (changesObj.mdcFontIcon) {
      this.elem.text(this.mdcFontIcon);
    }
    if (changesObj.size) {
      for (let i = 0; i < this.MDC_ICON_SIZES.length; i++) {
        if (this.size === this.MDC_ICON_SIZES[i]) {
          this.elem.addClass('mdc-icon--' + this.MDC_ICON_SIZES[i]);
        } else {
          this.elem.removeClass('mdc-icon--' + this.MDC_ICON_SIZES[i]);
        }
      }
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
  .constant('MDC_ICON_SIZES', ['18', '24', '36', '48'])
  .component('mdcIcon', {
    controller: MdcIconController,
    bindings: {
      mdcFontIcon: '@',
      size: '@',
    },
  });
