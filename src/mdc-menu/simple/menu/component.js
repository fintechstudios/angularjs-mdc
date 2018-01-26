import {BaseComponent} from '../../../util/base-component';
import {MDCMenuAnchorController} from '../../anchor/directive';
import {MDC_SIMPLE_MENU_TOGGLE_EVENT} from '../toggle/directive';

import {MDCSimpleMenuFoundation} from '@material/menu/simple/foundation';
import {getTransformPropertyName} from '@material/menu/util';


const CORNER_PROPERTY_REGEX = /([ -])/;
function convertToCornerProperty(anchorFrom) {
  return anchorFrom.replace(CORNER_PROPERTY_REGEX, '_').toUpperCase();
}


const template = require('raw-loader!./mdc-simple-menu.html');


/**
 * @ngdoc component
 * @name mdcSimpleMenu
 * @module mdc.menu
 *
 * @param {string} id - Specify so that mdcSimpleMenuToggle can be directed to bind to this menu.
 * @param {bool} [open] - Whether the menu is currently opened or closed
 * @param {string} [anchorCorner=TOP_START] - TOP_START, TOP_END, BOTTOM_START, BOTTOM_END
 * @param {AnchorMargin} [anchorMargin] - default {top: 0, right: 0, bottom: 0, left: 0}
 */
export class MDCSimpleMenuController extends BaseComponent {
  static get name() {
    return 'mdcSimpleMenu';
  }

  static get bindings() {
    return {
      id: '@?',
      open: '<?',
      anchorCorner: '@?',
      anchorMargin: '<?',
    };
  }

  static get require() {
    return {
      mdcMenuAnchorCtrl: `^^?${MDCMenuAnchorController.name}`,
    };
  }

  static get transclude() {
    return true;
  }

  static get $inject() {
    return ['$element', '$document', '$scope', '$window', '$rootScope', '$timeout'];
  }

  static get template() {
    return template;
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-simple-menu');
    this.foundation_ = this.getDefaultFoundation();
    this.root_ = this.$element[0];
    this.itemControllers = [];
  }

  $postLink() {
    if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
      this.$element.attr('tabindex', -1);
    }

    this.foundation_.init();

    this.stopListening = this.$rootScope.$on(MDC_SIMPLE_MENU_TOGGLE_EVENT, (event, {id}) => {
      if (id === this.id) {
        this.toggle();
      }
    });
  }

  $onChanges(changesObj) {
    if (changesObj.open) {
      this.open ? this.show() : this.hide();
    }
    if (changesObj.anchorCorner && this.anchorCorner) {
      const asProp = MDCSimpleMenuFoundation.Corner[convertToCornerProperty(this.anchorCorner)];
      if (asProp !== undefined) {
        this.foundation_.setAnchorCorner(asProp);
      }
    }
    if (changesObj.anchorMargin && this.anchorMargin) {
      this.foundation_.setAnchorMargin({
        top: Number(this.anchorMargin.top), bottom: Number(this.anchorMargin.bottom),
        left: Number(this.anchorMargin.left), right: Number(this.anchorMargin.right),
      });
    }
  }

  $onDestroy() {
    if (this.stopListening) {
      this.stopListening();
    }

    if (this.foundation_) {
      this.foundation_.destroy();
    }
  }

  _addItem(itemCtrl) {
    this.itemControllers.push(itemCtrl);
  }

  _removeItem(itemCtrl) {
    const index = this.itemControllers.indexOf(itemCtrl);
    if (index >= 0) {
      this.itemControllers.splice(itemCtrl, 1);
    }
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
    return [].slice.call(itemsContainer.querySelectorAll(`.${MDCSimpleMenuFoundation.cssClasses.LIST_ITEM}`));
  }

  /** @return {!MDCSimpleMenuFoundation} */
  getDefaultFoundation() {
    return new MDCSimpleMenuFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.itemsContainer_),
      getAttributeForEventTarget: (target, attributeName) => target.getAttribute(attributeName),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      getInnerDimensions: () => {
        const {itemsContainer_: itemsContainer} = this;
        return {width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight};
      },
      hasAnchor: () => Boolean(this.mdcMenuAnchorCtrl),
      getAnchorDimensions: () => this.mdcMenuAnchorCtrl.getDimensions(),
      getWindowDimensions: () => {
        return {width: this.$window.innerWidth, height: this.$window.innerHeight};
      },
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      registerBodyClickHandler: (handler) => this.$document[0].body.addEventListener('click', handler),
      deregisterBodyClickHandler: (handler) => this.$document[0].body.removeEventListener('click', handler),
      getIndexForEventTarget: (target) => this.items.indexOf(target),
      notifySelected: (evtData) => {
        this.select({
          index: evtData.index,
          item: this.items[evtData.index],
        });
      },
      notifyCancel: () => this.emit(MDCSimpleMenuFoundation.strings.CANCEL_EVENT, {}),
      saveFocus: () => {
        this.previousFocus_ = this.$document[0].activeElement;
      },
      restoreFocus: () => {
        if (this.previousFocus_) {
          this.previousFocus_.focus();
        }
      },
      isFocused: () => this.$document[0].activeElement === this.root_,
      focus: () => this.root_.focus(),
      getFocusedItemIndex: () => this.items.indexOf(this.$document[0].activeElement),
      focusItemAtIndex: (index) => {
        this.items[index].focus();
      },
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
      setMaxHeight: (height) => {
        this.root_.style.maxHeight = height;
      },
    });
  }

  emit(name, args) {
    this.$scope.$emit(name, args);
  }

  select({item, index}) {
    this.itemControllers.forEach((ctrl) => {
      if (ctrl.hasElement(item)) {
        ctrl.select(index);
      }
    });
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
}
