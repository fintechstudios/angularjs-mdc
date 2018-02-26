import {BaseComponent} from '../../util/base-component';
import {MDCMenuController} from '../menu/component';

import {MDCMenuFoundation} from '@material/menu';


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

    this.selectHandler = ({detail: {index, item}}) => {
      if (item === this.$element[0]) {
        this.select(index);
      }
    };
  }

  $postLink() {
    if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
      this.$element.attr('tabindex', 0);
    }

    this.mdcMenuController.addItem_(this);
    this.mdcMenuController.listen(MDCMenuFoundation.strings.SELECTED_EVENT, this.selectHandler);
  }

  $onDestroy() {
    this.mdcMenuController.unlisten(MDCMenuFoundation.strings.SELECTED_EVENT, this.selectHandler);
    this.mdcMenuController.removeItem_(this);
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
