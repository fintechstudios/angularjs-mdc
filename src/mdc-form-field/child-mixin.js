import {arrayUnion} from '../util/array-union';

import {name} from './component';


/**
 * Apply to controller of any MDC that can be a child of mdc-form-field
 *
 * Requires this.mdc to be exposed.
 *
 * @param Base
 * @mixin IsFormFieldChild
 */
export const IsFormFieldChild = (Base) => class extends Base {
  static get $inject() {
    return arrayUnion(['$scope'], super.$inject);
  }

  static get bindings() {
    return Object.assign({
      inputId: '@?',
    }, super.bindings);
  }

  static get require() {
    return Object.assign({
      mdcFormFieldCtrl: `^^?${name}`,
    }, super.require);
  }

  get mdcFormFieldCtrl() {
    return this._mdcFormFieldCtrl;
  }

  set mdcFormFieldCtrl(ctrl) {
    this._mdcFormFieldCtrl = ctrl;
    if (ctrl) {
      ctrl.setChildCtrl(this);
      ctrl.setInputId(this.inputId);
    }
  }

  set inputId(id) {
    this._inputId = id;

    if (this._mdcFormFieldCtrl) {
      this._mdcFormFieldCtrl.setInputId(id);
    }
  }

  get inputId() {
    return this._inputId || `--mdc-component-${this.$scope.$id}`;
  }

  $onDestroy() {
    super.$onDestroy();

    if (this._mdcFormFieldCtrl) {
      this._mdcFormFieldCtrl.setChildCtrl(null);
    }
  }
};
