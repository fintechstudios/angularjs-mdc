import {BaseComponent} from '../util/base-component';

/**
 * @ngdoc component
 * @name mdcCardTitle
 * @module mdc.card
 *
 * @param {expression} [large] whether to display the title larger
 */
export class MdcCardTitleController extends BaseComponent {
  static get name() {
    return 'mdcCardTitle';
  }

  static get bindings() {
    return {
      large: '<?',
    };
  }

  static get $inject() {
    return ['$element'];
  }

  $onChanges(changes) {
    if (changes.large) {
      this.$element.toggleClass('mdc-card__title--large', this.large);
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
export class MdcCardActionsController extends BaseComponent {
  static get name() {
    return 'mdcCardActions';
  }

  static get bindings() {
    return {
      vertical: '<?',
    };
  }

  static get $inject() {
    return ['$element'];
  }

  $onChanges(changes) {
    if (changes.vertical) {
      this.$element.toggleClass('mdc-card__actions--vertical', this.vertical);
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
  .component(MdcCardTitleController.name, {
    controller: MdcCardTitleController,
    bindings: MdcCardTitleController.bindings,
  })
  .component(MdcCardActionsController.name, {
    controller: MdcCardActionsController,
    bindings: MdcCardActionsController.bindings,
  });
