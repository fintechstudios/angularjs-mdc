import {BaseComponent} from '../../util/base-component';

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

    this.$element.addClass('mdc-list');
    this.$element.attr('role', 'list');
  }

  $onChanges(changes) {
    if (changes.dense) {
      this.$element.toggleClass('mdc-list--dense', Boolean(this.dense));
    }
    if (changes.avatar) {
      this.$element.toggleClass('mdc-list--avatar-list', Boolean(this.avatar));
    }
    if (changes.twoLine) {
      this.$element.toggleClass('mdc-list--two-line', Boolean(this.twoLine));
    }
    if (changes.nonInteractive) {
      this.$element.toggleClass('mdc-list--non-interactive', Boolean(this.nonInteractive));
    }
  };
}
