import {BaseComponent} from '../util/base-component';
import {BASE_CLASSNAME as TEXT_FIELD_BASE_CLASSNAME} from '../mdc-text-field/text-field/component';

const TEXT_FIELD_ICON_CLASSNAME = `${TEXT_FIELD_BASE_CLASSNAME}__icon`;

/**
 * @ngdoc component
 * @name mdcIcon
 * @module mdc.icon
 *
 * @param {string} [size] - Font-size, suggested 48, 32, 24, or 18. Default: 24
 */
export class MDCIconController extends BaseComponent {
  static get name() {
    return 'mdcIcon';
  }

  static get $inject() {
    return ['$element'];
  }

  static get require() {
    return {
      mdcTextFieldCtrl: '^^?mdcTextField',
    };
  }

  static get bindings() {
    return {
      size: '@',
      ngClick: '&?',
    };
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('material-icons');
  }

  $onChanges(changesObj) {
    if (changesObj.size) {
      this.$element[0].style.fontSize = `${this.size}px`;
    }
  }

  $postLink() {
    this.$element.attr('tabindex', this.ngClick ? '0' : '-1');
  }

  get mdcTextFieldCtrl() {
    return this._mdcTextFieldCtrl;
  }

  set mdcTextFieldCtrl(ctrl) {
    this._mdcTextFieldCtrl = ctrl;
    if (ctrl) {
      ctrl.toggleIconCtrl(this, true);
    }

    this.$element.toggleClass(TEXT_FIELD_ICON_CLASSNAME, Boolean(ctrl));
  }

  $onDestroy() {
    if (this.mdcTextFieldCtrl) {
      this.mdcTextFieldCtrl.toggleIconCtrl(this, false);
    }
  }
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
  .component(MDCIconController.name, {
    controller: MDCIconController,
    bindings: MDCIconController.bindings,
    require: MDCIconController.require,
  });
