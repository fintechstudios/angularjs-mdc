import {BaseComponent} from '../../util/base-component';


/**
 * @ngdoc directive
 * @name mdcMenuAnchor
 * @restrict AEC
 * @module mdc.menu
 * @description If this is the parent of mdcMenu, the menu will bind to it.
 */
export class MDCMenuAnchorController extends BaseComponent {
  static get name() {
    return 'mdcMenuAnchor';
  }

  static get $inject() {
    return ['$element'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-menu-anchor');
  }

  getDimensions() {
    return this.$element[0].getBoundingClientRect();
  }

  bindMenu(menu) {
    this.menu = menu;
  }

  toggleMenu() {
    if (this.menu) {
      this.menu.toggle();
    }
  }
}
