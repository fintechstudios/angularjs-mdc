import {arrayUnion} from '../util/array-union';

import {MDCComponentNg} from '../mdc-base/component-ng';

import {getCorrectPropertyName} from '@material/animation';

import {MDCTabBarScrollerFoundation} from '@material/tabs/tab-bar-scroller';

import template from './tab-bar-scroller.html';


/**
 * @ngdoc component
 * @name mdcTabBarScroller
 * @module mdc.tab
 *
 */
export class MDCTabBarScrollerController extends MDCComponentNg {
  static get name() {
    return 'mdcTabBarScroller';
  }

  static get $inject() {
    return arrayUnion(['$element', '$window', '$timeout'], super.$inject);
  }

  static get transclude() {
    return true;
  }

  static get template() {
    return template;
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-tab-bar-scroller');
  }

  get tabBar() {
    return this.tabBar_;
  }

  setTabBar(tabBar) {
    this.tabBar_ = tabBar;
    this.tabBarEl_ = this.tabBar_.root_;
  }

  initialize() {
    this.scrollFrame_ = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.FRAME_SELECTOR);
    this.forwardIndicator_ = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.INDICATOR_FORWARD_SELECTOR);
    this.backIndicator_ = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.INDICATOR_BACK_SELECTOR);
  }

  scrollToTabAtIndexIfNotVisible(index) {
    // This will probably be implemented into the foundation at some point - remove then
    if (!this.isTabVisible(index)) {
      this.$timeout(() => this.foundation_.scrollToTabAtIndex(index), 100);
    }
  }

  isTabVisible(index) {
    const tabRect = this.tabBar.tabs[index].root_.getBoundingClientRect();
    const frameRect = this.scrollFrame_.getBoundingClientRect();

    return (tabRect.left >= frameRect.left) && (tabRect.right <= frameRect.right);
  }

  getDefaultFoundation() {
    return new MDCTabBarScrollerFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addClassToForwardIndicator: (className) => this.forwardIndicator_.classList.add(className),
      removeClassFromForwardIndicator: (className) => this.forwardIndicator_.classList.remove(className),
      addClassToBackIndicator: (className) => this.backIndicator_.classList.add(className),
      removeClassFromBackIndicator: (className) => this.backIndicator_.classList.remove(className),
      isRTL: () =>
        getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      registerBackIndicatorClickHandler: (handler) =>
        this.backIndicator_.addEventListener('click', handler),
      deregisterBackIndicatorClickHandler: (handler) =>
        this.backIndicator_.removeEventListener('click', handler),
      registerForwardIndicatorClickHandler: (handler) =>
        this.forwardIndicator_.addEventListener('click', handler),
      deregisterForwardIndicatorClickHandler: (handler) =>
        this.forwardIndicator_.removeEventListener('click', handler),
      registerCapturedInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(evt, handler, true),
      registerWindowResizeHandler: (handler) =>
        this.$window.addEventListener('resize', handler),
      deregisterWindowResizeHandler: (handler) =>
        this.$window.removeEventListener('resize', handler),
      getNumberOfTabs: () => this.tabBar.tabs.length,
      getComputedWidthForTabAtIndex: (index) => this.tabBar.tabs[index].computedWidth,
      getComputedLeftForTabAtIndex: (index) => this.tabBar.tabs[index].computedLeft,
      getOffsetWidthForScrollFrame: () => this.scrollFrame_.offsetWidth,
      getScrollLeftForScrollFrame: () => this.scrollFrame_.scrollLeft,
      setScrollLeftForScrollFrame: (scrollLeftAmount) => this.scrollFrame_.scrollLeft = scrollLeftAmount,
      getOffsetWidthForTabBar: () => this.tabBarEl_ && this.tabBarEl_.offsetWidth,
      setTransformStyleForTabBar: (value) => {
        if (!this.tabBarEl_) {
          return;
        }
        this.tabBarEl_.style.setProperty(getCorrectPropertyName(this.$window, 'transform'), value);
      },
      getOffsetLeftForEventTarget: (target) => target.offsetLeft,
      getOffsetWidthForEventTarget: (target) => target.offsetWidth,
    });
  }

  layout() {
    this.foundation_.layout();
  }
}
