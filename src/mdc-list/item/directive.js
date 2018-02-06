import {BaseComponent} from '../../util/base-component';

/**
 * @ngdoc directive
 * @name mdcListItem
 * @module mdc.list
 * @restrict EA
 */
export class MDCListItemController extends BaseComponent {
  static get name() {
    return 'mdcListItem';
  }

  static get $inject() {
    return ['$element'];
  }

  static get restrict() {
    return 'EA';
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-list-item');
    this.$element.attr('role', 'listitem');
  }
}
