import {arrayUnion} from '../../util/array-union';

import {MDCComponentNg} from '../../mdc-base/component-ng';

import {MDCMenuAnchorController} from '../anchor/directive';
import {MDCMenuItemController} from '../item/component';
import {MDC_MENU_TOGGLE_EVENT} from '../toggle/directive';

import {MDCMenuFoundation} from '@material/menu';
import {getTransformPropertyName} from '@material/menu/util';

import template from './mdc-menu.html';


const CORNER_PROPERTY_REGEX = /([ -])/;
function convertToCornerProperty(anchorFrom) {
  return anchorFrom.replace(CORNER_PROPERTY_REGEX, '_').toUpperCase();
}


/**
 * @ngdoc component
 * @name mdcMenu
 * @module mdc.menu
 *
 * @param {string} [id] - Specify so that mdcSimpleMenuToggle can be directed to bind to this menu.
 * @param {boolean} [open] - Whether the menu is currently opened or closed
 * @param {boolean} [rememberSelection] - whether to remember that an item is selected
 * @param {boolean} [quickOpen] - whether to disable open animation
 * @param {string} [anchorCorner=TOP_START] - TOP_START, TOP_END, BOTTOM_START, BOTTOM_END
 * @param {AnchorMargin} [anchorMargin] - default {top: 0, right: 0, bottom: 0, left: 0}
 */
export class MDCMenuController extends MDCComponentNg {
  static get name() {
    return 'mdcMenu';
  }

  static get bindings() {
    return {
      id: '@?',
      open: '<?',
      rememberSelection: '<?',
      quickOpen: '<?',
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
    return arrayUnion(['$element', '$document', '$window', '$rootScope'], super.$inject);
  }

  static get template() {
    return template;
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-menu');
    this.itemControllers = [];
  }

  set mdcMenuAnchorCtrl(anchor) {
    this.mdcMenuAnchorCtrl_ = anchor;
    if (anchor) {
      anchor.bindMenu(this);
    }
  }

  get mdcMenuAnchorCtrl() {
    return this.mdcMenuAnchorCtrl_;
  }

  $postLink() {
    super.$postLink();

    if (!this.$element.attr('tabindex') && Number(this.$element.attr('tabindex')) !== 0) {
      this.$element.attr('tabindex', -1);
    }

    this.stopListening = this.$rootScope.$on(MDC_MENU_TOGGLE_EVENT, (event, {id}) => {
      if (id === this.id) {
        this.toggle();
      }
    });
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.open) {
      this.open ? this.show() : this.hide();
    }
    if (changes.anchorCorner && this.anchorCorner) {
      const asProp = MDCMenuFoundation.Corner[convertToCornerProperty(this.anchorCorner)];
      if (asProp !== undefined) {
        this.foundation_.setAnchorCorner(asProp);
      }
    }
    if (changes.anchorMargin && this.anchorMargin) {
      this.foundation_.setAnchorMargin({
        top: Number(this.anchorMargin.top), bottom: Number(this.anchorMargin.bottom),
        left: Number(this.anchorMargin.left), right: Number(this.anchorMargin.right),
      });
    }
    if (changes.rememberSelection) {
      this.foundation_.setRememberSelection(this.rememberSelection);
    }
    if (changes.quickOpen) {
      this.foundation_.setQuickOpen(this.quickOpen);
    }
  }

  $onDestroy() {
    if (this.mdcMenuAnchorCtrl) {
      this.mdcMenuAnchorCtrl.bindMenu(null);
    }

    if (this.stopListening) {
      this.stopListening();
    }
  }

  addItem_(itemCtrl) {
    this.itemControllers.push(itemCtrl);
  }

  removeItem_(itemCtrl) {
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
    return this.root_.querySelector(MDCMenuFoundation.strings.ITEMS_SELECTOR);
  }

  /**
   * Return the items within the menu. Note that this only contains the set of elements within
   * the items container that are proper list items, and not supplemental / presentational DOM
   * elements.
   * @return {!Array<!Element>}
   */
  get items() {
    const {itemsContainer_: itemsContainer} = this;
    return [].slice.call(itemsContainer.querySelectorAll('.mdc-list-item[role]'));
  }

  /** @return {!MDCMenuFoundation} */
  getDefaultFoundation() {
    return new MDCMenuFoundation({
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
      notifySelected: (evtData) => this.emit(MDCMenuFoundation.strings.SELECTED_EVENT, {
        index: evtData.index,
        item: angular.element(this.items[evtData.index]).controller(MDCMenuItemController.name),
      }),
      notifyCancel: () => this.emit(MDCMenuFoundation.strings.CANCEL_EVENT, {}),
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
      setAttrForOptionAtIndex: (index, attr, value) => this.items[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => this.items[index].removeAttribute(attr),
      addClassForOptionAtIndex: (index, className) => this.items[index].classList.add(className),
      rmClassForOptionAtIndex: (index, className) => this.items[index].classList.remove(className),
    });
  }

  /** @param {{focusIndex: ?number}=} options */
  show({focusIndex = null} = {}) {
    this.foundation_.open({focusIndex: focusIndex});
  }

  hide() {
    this.foundation_.close();
  }

  toggle() {
    this.foundation_.isOpen() ? this.hide() : this.show();
  }
}
