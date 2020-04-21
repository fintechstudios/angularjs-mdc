import {BaseComponent} from '../../util/base-component';
import {BASE_CLASSNAME as DIALOG_BASE_CLASSNAME} from './dialog';

const SCROLLABLE_BODY_CLASSNAME = `${DIALOG_BASE_CLASSNAME}__body--scrollable`;

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
      this.$element.toggleClass(SCROLLABLE_BODY_CLASSNAME, Boolean(this.scrollable));
    }
  }
}
