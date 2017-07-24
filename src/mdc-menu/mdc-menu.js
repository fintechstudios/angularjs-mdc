import MDCSimpleMenuFoundation from '@material/menu/simple/foundation';
import {getTransformPropertyName} from '@material/menu/util';

/**
 * @ngdoc component
 * @name mdcSimpleMenu
 * @module mdc.menu
 *
 * @param {expression} [open] Whether the menu is opened or closed at start
 * @param {string} [openFrom=topLeft] topLeft, topRight, bottomLeft, or bottomRight
 * @param {string} [id] Specify so that mdcSimpleMenuToggle can be directed to bind to this menu.
 */
class MdcSimpleMenuController {
  constructor($element, $scope, $window, MDC_SIMPLE_MENU_TOGGLE_EVENT) {
    this.window = $window;
    this.document = this.window.document;
    this.elem = $element;
    this.root_ = this.elem[0];
    this.scope = $scope;
    this.foundation_ = this.getDefaultFoundation();
    this.TOGGLE_EVENT = MDC_SIMPLE_MENU_TOGGLE_EVENT;
  }

  /**
   * Return the item container element inside the component.
   * @return {?Element}
   */
  get itemsContainer_() {
    return this.root_.querySelector(MDCSimpleMenuFoundation.strings.ITEMS_SELECTOR);
  }

  /**
   * Return the items within the menu. Note that this only contains the set of elements within
   * the items container that are proper list items, and not supplemental / presentational DOM
   * elements.
   * @return {!Array<!Element>}
   */
  get items() {
    const {itemsContainer_: itemsContainer} = this;
    return [].slice.call(itemsContainer.querySelectorAll('mdc-simple-menu-item'));
  }

  /** @return {!MDCSimpleMenuFoundation} */
  getDefaultFoundation() {
    return new MDCSimpleMenuFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.itemsContainer_),
      getAttributeForEventTarget: (target, attributeName) => target.getAttribute(attributeName),
      getInnerDimensions: () => {
        const {itemsContainer_: itemsContainer} = this;
        return {width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight};
      },
      hasAnchor: () => this.root_.parentElement && (
        this.root_.parentElement.classList.contains('mdc-menu-anchor') ||
        this.root_.parentElement.tagName.toLowerCase() === 'mdc-menu-anchor'
      ),
      getAnchorDimensions: () => this.root_.parentElement.getBoundingClientRect(),
      getWindowDimensions: () => {
        return {width: this.window.innerWidth, height: this.window.innerHeight};
      },
      setScale: (x, y) => {
        this.root_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      setInnerScale: (x, y) => {
        this.itemsContainer_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      registerBodyClickHandler: (handler) => this.document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: (handler) => this.document.body.removeEventListener('click', handler),
      getYParamsForItemAtIndex: (index) => {
        const {offsetTop: top, offsetHeight: height} = this.items[index];
        return {top, height};
      },
      setTransitionDelayForItemAtIndex: (index, value) =>
        this.items[index].style.setProperty('transition-delay', value),
      getIndexForEventTarget: (target) => this.items.indexOf(target),
      notifySelected: (evtData) => {
        this.emit(MDCSimpleMenuFoundation.strings.SELECTED_EVENT, {
          index: evtData.index,
          item: this.items[evtData.index],
        });
      },
      notifyCancel: () => this.emit(MDCSimpleMenuFoundation.strings.CANCEL_EVENT, {}),
      saveFocus: () => {
        this.previousFocus_ = this.document.activeElement;
      },
      restoreFocus: () => {
        if (this.previousFocus_) {
          this.previousFocus_.focus();
        }
      },
      isFocused: () => this.document.activeElement === this.root_,
      focus: () => this.root_.focus(),
      getFocusedItemIndex: () => this.items.indexOf(this.document.activeElement),
      focusItemAtIndex: (index) => this.items[index].focus(),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: (origin) => {
        this.root_.style[`${getTransformPropertyName(window)}-origin`] = origin;
      },
      setPosition: (position) => {
        this.root_.style.left = 'left' in position ? position.left : null;
        this.root_.style.right = 'right' in position ? position.right : null;
        this.root_.style.top = 'top' in position ? position.top : null;
        this.root_.style.bottom = 'bottom' in position ? position.bottom : null;
      },
      getAccurateTime: () => this.window.performance.now(),
    });
  }

  emit(name, args) {
    this.scope.$emit(name.replace(name, this.id), args);
  }

  show() {
    this.foundation_.open();
  }

  hide() {
    this.foundation_.close();
  }

  toggle() {
    this.foundation_.isOpen() ? this.hide() : this.show();
  }

  $postLink() {
    this.toggleHandler = () => this.toggle();
    this.elem.on(this.TOGGLE_EVENT, this.toggleHandler);
  }

  $onChanges(changesObj) {
    if (changesObj.open) {
      this.open ? this.show() : this.hide();
    }
    if (changesObj.openFrom) {
      this.elem.toggleClass('mdc-simple-menu--open-from-top-left', this.openFrom === 'topLeft');
      this.elem.toggleClass('mdc-simple-menu--open-from-top-right', this.openFrom === 'topRight');
      this.elem.toggleClass('mdc-simple-menu--open-from-bottom-left', this.openFrom === 'bottomLeft');
      this.elem.toggleClass('mdc-simple-menu--open-from-bottom-right', this.openFrom === 'bottomRight');
    }
  }

  $onDestroy() {
    this.elem.off(this.TOGGLE_EVENT, this.toggleHandler);
    this.foundation_.destroy();
  }
}


/**
 * @ngdoc component
 * @name mdcSimpleMenuItem
 * @module mdc.menu
 * @description Used as a child of mdcMenu to create menu items
 *
 */


/**
 * @ngdoc component
 * @name mdcMenuAnchor
 * @module mdc.menu
 * @description If this is the parent of mdcMenu, the menu will bind to it
 *
 */


/**
 * @ngdoc directive
 * @name mdcSimpleMenuToggle
 * @module mdc.menu
 * @restrict A
 * @description Binds a click handler to open the closest mdcSimpleMenu, unless an `id` is given as a value
 *
 */
function MdcSimpleMenuToggleController($document, MDC_SIMPLE_MENU_TOGGLE_EVENT) {
  return {
    restrict: 'A',
    link: (scope, element) => {
      let menus;
      const menuId = element.attr('mdc-simple-menu-toggle');

      if (menuId) {
        menus = [$document[0].getElementById(menuId)];
      } else {
        menus = element.parent()[0].querySelectorAll('mdc-simple-menu');
      }

      if (menus.length === 1) {
        const menuCtrl = angular.element(menus[0]);
        const openHandler = () => menuCtrl.triggerHandler(MDC_SIMPLE_MENU_TOGGLE_EVENT);
        element.on('click', openHandler);
        element.on('$destroy', function() {
          element.off('click', openHandler);
        });
      }
    },
  };
}


angular
  .module('mdc.menu', [])
  .constant('MDC_SIMPLE_MENU_TOGGLE_EVENT', 'MDCSimpleMenu:toggle')
  .component('mdcSimpleMenu', {
    controller: MdcSimpleMenuController,
    template: require('raw-loader!./mdc-simple-menu.html'),
    bindings: {
      id: '@',
      open: '<?',
      openFrom: '@',
    },
    transclude: true,
  })
  .directive('mdcSimpleMenuToggle', MdcSimpleMenuToggleController);
