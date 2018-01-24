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

  static get bindings() {
    return {
      size: '@',
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

  get mdcButtonCtrl() {
    return this._mdcButtonCtrl;
  }

  set mdcButtonCtrl(ctrl) {
    this._mdcButtonCtrl = ctrl;
    this.$element.toggleClass('mdc-button__icon', Boolean(ctrl));
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
    require: {
      mdcButtonCtrl: '^^?mdcButton',
    },
  });
