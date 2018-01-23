/**
 * @ngdoc component
 * @name mdcButton
 * @module mdc.button
 *
 * @param {expression} [dense] Display the button densely
 * @param {expression} [raised] Display the button raised (false -> flat)
 * @param {expression} [compact] Display the button compact
 * @param {expression} [cardAction] Use when within mdc-card to apply proper styles
 * @param {string} [dialog] Set to "accept" or "cancel" when creating buttons in mdc-dialog-footer
 * @param {expression} [ngDisabled] En/Disable based on the expression
 */
class MdcButtonController {
  constructor($element) {
    this.elem = $element;
  }

  $onChanges(changesObj) {
    const e = this.elem;

    ['dense', 'raised', 'compact'].forEach((attr) => {
      if (changesObj[attr]) {
        e.toggleClass('mdc-button--' + attr, this[attr]);
      }
    });
    if (changesObj.cardAction) {
      e.toggleClass('mdc-button--compact mdc-card__action', this.cardAction);
    }
    if (changesObj.dialog) {
      e.toggleClass('mdc-dialog__footer__button', this.dialog === 'cancel' || this.dialog === 'accept');
      e.toggleClass('mdc-dialog__footer__button--cancel', this.dialog === 'cancel');
      e.toggleClass('mdc-dialog__footer__button--accept', this.dialog === 'accept');
    }
  };
}


/**
 * @ngdoc module
 * @name mdc.button
 * @description
 *
 * Button
 */
angular
  .module('mdc.button', [])
  .component('mdcButton', {
    controller: MdcButtonController,
    bindings: {
      dense: '<?',
      raised: '<?',
      compact: '<?',
      cardAction: '<?',
      color: '@',
      dialog: '@',
    },
  });
