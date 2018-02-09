import {BaseComponent} from '../../util/base-component';
import {MDCMenuAnchorController} from '../anchor/directive';

export const MDC_MENU_TOGGLE_EVENT = 'MDCMenu:toggle';


/**
 * @ngdoc directive
 * @name mdcMenuToggle
 * @module mdc.menu
 * @restrict AEC
 * @description Binds a click handler to open mdc-menu.
 * Requires menuId to be given as `mdc-menu-toggle="{{ menuId }}" or that it be used within mdc-menu-anchor
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

  static get require() {
    return {
      mdcMenuAnchorCtrl: `^^?${MDCMenuAnchorController.name}`,
    };
  }

  get menuId() {
    return this[this.constructor.name];
  }

  constructor(...args) {
    super(...args);

    this.$element.on('click', () => {
      if (this.menuId) {
        this.$rootScope.$broadcast(MDC_MENU_TOGGLE_EVENT, {id: this.menuId});
      } else if (this.mdcMenuAnchorCtrl) {
        this.mdcMenuAnchorCtrl.toggleMenu();
      }
    });
  }
}
