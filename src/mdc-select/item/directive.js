import {replaceMdcClassname} from '../../util/replace-mdc-classname';
import {BaseComponent} from '../../util/base-component';

import {MDCSelectController} from '../select/component';


const BASE_CLASSNAME = replaceMdcClassname('mdc-list-item');


/**
 * @ngdoc directive
 * @name mdcSelectItem
 * @module mdc.select
 * @restrict EAC
 *
 * @param {bool} [ngDisabled] - whether this item is disabled
 * @param {expression} [ngValue] - value of the item
 * @param {string} [value] - value of the item, if ng-value not specified
 */
export class MDCSelectItemController extends BaseComponent {
  static get name() {
    return 'mdcSelectItem';
  }

  static get $inject() {
    return ['$element'];
  }

  static get bindings() {
    return {
      ngDisabled: '<?',
      ngValue: '<?',
      value: '@?',
    };
  }

  static get require() {
    return {
      mdcSelectCtrl: `^^?${MDCSelectController.name}`,
    };
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(BASE_CLASSNAME);
    this.$element.attr('role', 'option');

    if (!this.$element.attr('tabindex')) {
      this.$element.attr('tabindex', 0);
    }
  }

  $onChanges(changes) {
    if (changes.ngDisabled) {
      this.$element.attr('aria-disabled', Boolean(this.ngDisabled));
      this.$element.attr('tabindex', Boolean(this.ngDisabled) ? -1 : 0);
    }
  }

  getValue() {
    return this.ngValue || this.value || this.$element[0].id || this.$element[0].textContent;
  }

  set mdcSelectCtrl(ctrl) {
    this._mdcSelectCtrl = ctrl;
    if (ctrl) {
      ctrl._addOption(this);
    }
  }

  get mdcSelectCtrl() {
    return this._mdcSelectCtrl;
  }

  hasHTMLElement(element) {
    return this.$element[0] === element;
  }

  $onDestroy() {
    if (this.mdcSelectCtrl) {
      this.mdcSelectCtrl._removeOption(this);
    }
  }
}
