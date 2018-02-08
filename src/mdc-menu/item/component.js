import {BaseComponent} from '../../util/base-component';
import {MDCMenuController} from '../menu/component';

/**
 * @callback onSelectCallback
 * @param {Number} index
 * @param {HTMLElement} item
 */

/**
 * @ngdoc directive
 * @name mdcMenuItem
 * @restrict AEC
 * @module mdc.menu
 * @description Used as a child of mdcMenu to create menu items
 * @example
 * mdc-menu-item="expression()"
 * // or
 * <mdc-menu-item on-select="expression()">
 *
 * @param {onSelectCallback} [onSelect] - expression to evaluate if item is selected
 */
export class MDCMenuItemController extends BaseComponent {
  static get name() {
    return 'mdcMenuItem';
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
      mdcMenuController: `^^${MDCMenuController.name}`,
    };
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-list-item');
    this.$element.attr('role', 'menuitem');
  }

  $postLink() {
    if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
      this.$element.attr('tabindex', 0);
    }

    this.mdcMenuController._addItem(this);
  }

  $onDestroy() {
    this.mdcMenuController._removeItem(this);
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
      this.$scope.$apply(() => fn({index, item: this.$element[0]}));
    }
  }
}
