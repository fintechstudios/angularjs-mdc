import {arrayUnion} from '../util/array-union';

import {BaseComponent} from '../util/base-component';
import {IsFormFieldChild} from '../mdc-form-field/child-mixin';


const template = require('raw-loader!./mdc-switch.html');

/**
 * @ngdoc component
 * @name mdcSwitch
 * @module mdc.switch
 *
 * @param {string} [inputId] The id for the inner input element (use with <label for=>)
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to.
 * @param {bool} [ngDisabled] Enable/Disable based on the expression
 */
export class MDCSwitchController extends IsFormFieldChild(BaseComponent) {
  static get name() {
    return 'mdcSwitch';
  }

  static get bindings() {
    return Object.assign({
      inputId: '@?',
      ngDisabled: '<?',
      ngModel: '=?',
    }, super.bindings);
  }

  static get template() {
    return template;
  }

  static get $inject() {
    return arrayUnion(['$element'], super.$inject);
  }

  constructor(...args) {
    super(...args);
    this.$element.addClass('mdc-switch');
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.ngDisabled) {
      this.$element.toggleClass('mdc-switch--disabled', Boolean(this.ngDisabled));
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
  .component(MDCSwitchController.name, {
    controller: MDCSwitchController,
    bindings: MDCSwitchController.bindings,
    template: MDCSwitchController.template,
    require: MDCSwitchController.require,
  });
