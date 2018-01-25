import {BaseComponent} from '../../util/base-component';

export const MDC_SIMPLE_MENU_TOGGLE_EVENT = 'MDCSimpleMenu:toggle';


/**
 * @ngdoc directive
 * @name mdcSimpleMenuToggle
 * @module mdc.menu
 * @restrict AEC
 * @description Binds a click handler to open mdc-simple-menu.
 * Requires menuId to be given as `mdc-simple-menu-toggle="{{ menuId }}"
 */
export class MDCSimpleMenuToggleController extends BaseComponent {
  static get name() {
    return 'mdcSimpleMenuToggle';
  }

  static get $inject() {
    return ['$element', '$rootScope'];
  }

  static get bindings() {
    return {
      [this.name]: '@',
    };
  }

  get menuId() {
    return this[this.constructor.name];
  }

  constructor(...args) {
    super(...args);

    this.$element.on('click', () => {
      this.$rootScope.$broadcast(MDC_SIMPLE_MENU_TOGGLE_EVENT, {id: this.menuId});
    });
  }
}
