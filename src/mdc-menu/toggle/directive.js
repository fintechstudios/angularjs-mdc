import {BaseComponent} from '../../util/base-component';

export const MDC_MENU_TOGGLE_EVENT = 'MDCMenu:toggle';


/**
 * @ngdoc directive
 * @name mdcMenuToggle
 * @module mdc.menu
 * @restrict AEC
 * @description Binds a click handler to open mdc-simple-menu.
 * Requires menuId to be given as `mdc-simple-menu-toggle="{{ menuId }}"
 */
export class MDCMenuToggleController extends BaseComponent {
  static get name() {
    return 'mdcMenuToggle';
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
      this.$rootScope.$broadcast(MDC_MENU_TOGGLE_EVENT, {id: this.menuId});
    });
  }
}
