import {BaseComponent} from '../../util/base-component';
import {MDCSimpleMenuController} from '../simple/component';

import {cssClasses} from '@material/menu/simple/constants';

/**
 * @ngdoc directive
 * @name mdcSimpleMenuItem
 * @restrict AEC
 * @module mdc.menu
 * @description Used as a child of mdcMenu to create menu items
 *
 * @param {function($index)} [onSelect] - expression to evaluate if item is selected
 */
export class MDCSimpleMenuItemController extends BaseComponent {
  static get name() {
    return 'mdcSimpleMenuItem';
  }

  static get $inject() {
    return ['$element', '$scope'];
  }

  static get bindings() {
    return {
      onSelect: '&?',
      [this.name]: '&?',
    };
  }

  static get require() {
    return {
      mdcSimpleMenuController: `^^${MDCSimpleMenuController.name}`,
    };
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(cssClasses.LIST_ITEM);
    this.$element.attr('role', 'menuitem');
  }

  $postLink() {
    if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
      this.$element.attr('tabindex', 0);
    }

    this.mdcSimpleMenuController._addItem(this);
  }

  $onDestroy() {
    this.mdcSimpleMenuController._removeItem(this);
  }

  hasElement(htmlElement) {
    return this.$element[0] === htmlElement;
  }

  select(index) {
    let fn;
    if (this[this.constructor.name]) {
      fn = this[this.constructor.name];
    } else if (this.onSelect) {
      fn = this.onSelect;
    }

    if (fn) {
      this.$scope.$apply(() => fn({index}));
    }
  }
}
