import {BaseComponent} from '../../util/base-component';
import {replaceMdcClassname} from '../../util/replace-mdc-classname';

const BASE_CLASSNAME = replaceMdcClassname('mdc-list-item');

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

    this.$element.addClass(BASE_CLASSNAME);
    this.$element.attr('role', 'listitem');
  }
}
