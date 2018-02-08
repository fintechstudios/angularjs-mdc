import {BaseComponent} from '../../util/base-component';

/**
 * @ngdoc component
 * @name mdcDialogBody
 * @module mdc.dialog
 *
 * @param {boolean} [scrollable] whether the element has a vertical scrollbar
 */
export class MDCDialogBodyController extends BaseComponent {
  static get name() {
    return 'mdcDialogBody';
  }

  static get $inject() {
    return ['$element'];
  }

  static get bindings() {
    return {
      scrollable: '<?',
    };
  }

  $onChanges(changes) {
    if (changes.scrollable) {
      this.$element.toggleClass('mdc-dialog__body--scrollable', Boolean(this.scrollable));
    }
  }
}
