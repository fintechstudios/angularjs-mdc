/**
 * @ngdoc component
 * @name mdcCardTitle
 * @module mdc.card
 *
 * @param {expression} [large] whether to display the title larger
 */
class MdcCardTitleController {
  constructor($element) {
    this.elem = $element;
  }

  $onChanges(changesObj) {
    if (changesObj.large) {
      this.elem.toggleClass('mdc-card__title--large', this.large);
    }
  }
}

/**
 * @ngdoc component
 * @name mdcCardActions
 * @module mdc.card
 *
 * @param {expression} [vertical] T/F show the actions vertically
 */
class MdcCardActionsController {
  constructor($element) {
    this.elem = $element;
  }

  $onChanges(changesObj) {
    if (changesObj.vertical) {
      this.elem.toggleClass('mdc-card__actions--vertical', this.vertical);
    }
  }
}


/**
 * @ngdoc component
 * @name mdcCard
 * @module mdc.card
 *
 */


/**
 * @ngdoc component
 * @name mdcCardPrimary
 * @module mdc.card
 *
 */


/**
 * @ngdoc component
 * @name mdcCardHorizontalBlock
 * @module mdc.card
 *
 */


/**
 * @ngdoc component
 * @name mdcCardMedia
 * @module mdc.card
 *
 */


/**
 * @ngdoc component
 * @name mdcCardSupportingText
 * @module mdc.card
 *
 */


/**
 * @ngdoc component
 * @name mdcCardSubtitle
 * @module mdc.card
 *
 */


/**
 * @ngdoc module
 * @name mdc.card
 * @description
 *
 * Card
 *
 * Largely for convenience. It is just as easy to use the classes.
 */
angular
  .module('mdc.card', [])
//  .component('mdcCard', {})
//  .component('mdcCardPrimary', {})
//  .component('mdcCardHorizontalBlock', {})
//  .component('mdcCardSubtitle', {})
//  .component('mdcCardSupportingText', {});
//  .component('mdcCardMedia', {})
  .component('mdcCardTitle', {
    controller: MdcCardTitleController,
    bindings: {
      large: '<?',
    },
  })
  .component('mdcCardActions', {
    controller: MdcCardActionsController,
    bindings: {
      vertical: '<?',
    },
  });
