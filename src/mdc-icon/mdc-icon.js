import {BaseComponent} from '../util/base-component';

/**
 * @ngdoc component
 * @name mdcIcon
 * @module mdc.icon
 *
 * @param {string} [size] - Font-size, suggested 48, 32, 24, or 18. Default: 24
 */
export class MdcIconController extends BaseComponent {
  static get name() {
    return 'mdcIcon';
  }

  static get $inject() {
    return ['$element'];
  }

  static get require() {
    return {
      mdcButtonCtrl: '^^?mdcButton',
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

  get mdcButtonCtrl() {
    return this._mdcButtonCtrl;
  }

  set mdcButtonCtrl(ctrl) {
    this._mdcButtonCtrl = ctrl;
    this.$element.toggleClass('mdc-button__icon', Boolean(ctrl));
  }

  get mdcTextFieldCtrl() {
    return this._mdcTextFieldCtrl;
  }

  set mdcTextFieldCtrl(ctrl) {
    this._mdcTextFieldCtrl = ctrl;
    if (ctrl) {
      ctrl.toggleIconCtrl(this, true);
    }

    this.$element.toggleClass('mdc-text-field__icon', Boolean(ctrl));
  }

  $onDestroy() {
    this.mdcTextFieldCtrl.toggleIconCtrl(this, false);
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
  .component(MdcIconController.name, {
    controller: MdcIconController,
    bindings: MdcIconController.bindings,
    require: MdcIconController.require,
  });
