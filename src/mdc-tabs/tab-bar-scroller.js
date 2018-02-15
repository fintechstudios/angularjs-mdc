import {BaseComponent} from '../util/base-component';

import {getCorrectPropertyName} from '@material/animation';
import {MDCTabBarScrollerFoundation} from '@material/tabs/tab-bar-scroller';

import template from './tab-bar-scroller.html';


/**
 * @ngdoc component
 * @name mdcTabBarScroller
 * @module mdc.tab
 *
 */
export class MDCTabBarScrollerController extends BaseComponent {
  static get name() {
    return 'mdcTabBarScroller';
  }

  static get $inject() {
    return ['$element', '$window', '$document', '$timeout'];
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
    this.root_ = this.$element[0];
    this.initDone_ = false;
    this.$elementReady = false;
    this.willScrollIndex_ = undefined;

    this.$element.ready(() => {
      this.$elementReady = true;
      this.init();
    });
  }

  init() {
    if (!this.initDone_ && this.$elementReady && this.tabBar) {
      this.foundation_ = this.getDefaultFoundation();
      this.foundation_.init();
      this.initDone_ = true;
      if (this.tabBar.initDone_) {
        this.scrollTo(this.tabBar.activeTabIndex);
      } else if (this.willScrollIndex_) {
        this.scrollTo(this.willScrollIndex_);
      }
    }
  }

  $postLink() {
    this.scrollFrame_ = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.FRAME_SELECTOR);
    this.forwardIndicator_ = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.INDICATOR_FORWARD_SELECTOR);
    this.backIndicator_ = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.INDICATOR_BACK_SELECTOR);

    this.init();
  }

  $onDestroy() {
    if (this.foundation_) {
      this.foundation_.destroy();
    }
  }

  get tabBar() {
    return this.tabBar_;
  }

  setTabBar(tabBar) {
    this.tabBar_ = tabBar;
    this.tabBarEl_ = this.tabBar_.root_;
    this.init();
  }

  removeTabBar() {
    this.foundation_.destroy();
    this.initDone_ = false;
    this.tabBar_ = undefined;
    this.tabBarEl_ = undefined;
  }

  scrollTo(index) {
    if (this.initDone_) {
      this.scrollToTabIfNotVisible_(index);
    } else {
      this.willScrollIndex_ = index;
    }
  }

  scrollToTabIfNotVisible_(index) {
    // This will probably be implemented into the foundation at some point - remove then
    if (!this.isElementInViewport(this.tabBar.tabs[index].root_)) {
      this.$timeout(() => this.foundation_.scrollToTabAtIndex(index), 100);
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (this.$window.innerHeight || this.$document[0].documentElement.clientHeight) &&
      rect.right <= (this.$window.innerWidth || this.$document[0].documentElement.clientWidth)
    );
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
      getOffsetWidthForTabBar: () => this.tabBarEl_.offsetWidth,
      setTransformStyleForTabBar: (value) => {
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
