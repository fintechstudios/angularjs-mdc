import {BaseComponent} from '../util/base-component';
import {arrayUnion} from '../util/array-union';
import {replaceMdcClassname} from '../util/replace-mdc-classname';
import {BASE_CLASSNAME as DIALOG_BASE_CLASSNAME} from '../mdc-dialog/component/dialog';

import {MDCRippleMixin} from '../mdc-ripple/mixin';

const BASE_CLASSNAME = replaceMdcClassname('mdc-button');

/**
 * @ngdoc directive
 * @name mdcButton
 * @restrict AEC
 * @module mdc.button
 * @description Material-spec aligned button. Use on `button` or `a` element for full support
 *
 * @param {bool} [dense] Display the button densely
 * @param {bool} [raised] Display the button raised (false -> flat)
 * @param {bool} [compact] Display the button compact
 * @param {bool} [unelevated] Display the button unelevated
 * @param {bool} [stroked] Display the button stroked
 * @param {bool} [cardAction] Use when within mdc-card to apply proper styles
 * @param {string} [dialog] Set to 'accept' or 'cancel' when creating buttons in mdc-dialog-footer
 */
export class MDCButtonController extends MDCRippleMixin(BaseComponent) {
  static get $inject() {
    return arrayUnion(['$element', '$scope'], super.$inject);
  }

  static get name() {
    return 'mdcButton';
  }

  static get bindings() {
    return {
      dense: '<?',
      raised: '<?',
      compact: '<?',
      unelevated: '<?',
      stroked: '<?',
      dialog: '@?',
    };
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(BASE_CLASSNAME);
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    ['dense', 'raised', 'compact', 'unelevated', 'stroked'].forEach((attr) => {
      if (changes[attr]) {
        this.$element.toggleClass(`${BASE_CLASSNAME}--${attr}`, Boolean(this[attr]));
      }
    });
    if (changes.dialog) {
      this.$element.toggleClass(
        `${DIALOG_BASE_CLASSNAME}__footer__button`,
        this.dialog === 'cancel' || this.dialog === 'accept'
      );
      this.$element.toggleClass(`${DIALOG_BASE_CLASSNAME}__footer__button--cancel`, this.dialog === 'cancel');
      this.$element.toggleClass(`${DIALOG_BASE_CLASSNAME}__footer__button--accept`, this.dialog === 'accept');
    }
  };
}
