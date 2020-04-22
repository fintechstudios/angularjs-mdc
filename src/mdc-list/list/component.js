import {BaseComponent} from '../../util/base-component';
import {replaceMdcClassname} from '../../util/replace-mdc-classname';

const BASE_CLASSNAME = replaceMdcClassname('mdc-list');
const DENSE_CLASSNAME = `${BASE_CLASSNAME}--dense`;
const AVATAR_LIST_CLASSNAME = `${BASE_CLASSNAME}--avatar-list`;
const TWO_LINE_CLASSNAME = `${BASE_CLASSNAME}--two-line`;
const NON_INTERACTIVE_CLASSNAME = `${BASE_CLASSNAME}--non-interactive`;


/**
 * @ngdoc component
 * @name mdcList
 * @module mdc.list
 *
 * @param {boolean} [dense] - whether to display the list densely
 * @param {boolean} [avatar] - whether to display the list in avatar-style
 * @param {boolean} [twoLine] - whether to display the list in two-line style
 * @param {boolean} [nonInteractive] - whether to disable interaction with list items
 */
export class MDCListController extends BaseComponent {
  static get name() {
    return 'mdcList';
  }

  static get bindings() {
    return {
      dense: '<?',
      avatar: '<?',
      twoLine: '<?',
      nonInteractive: '<?',
    };
  }

  static get $inject() {
    return ['$element'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(BASE_CLASSNAME);
    this.$element.attr('role', 'list');
  }

  $onChanges(changes) {
    if (changes.dense) {
      this.$element.toggleClass(DENSE_CLASSNAME, Boolean(this.dense));
    }
    if (changes.avatar) {
      this.$element.toggleClass(AVATAR_LIST_CLASSNAME, Boolean(this.avatar));
    }
    if (changes.twoLine) {
      this.$element.toggleClass(TWO_LINE_CLASSNAME, Boolean(this.twoLine));
    }
    if (changes.nonInteractive) {
      this.$element.toggleClass(NON_INTERACTIVE_CLASSNAME, Boolean(this.nonInteractive));
    }
  };
}
