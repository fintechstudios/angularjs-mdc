
import {getCorrectPropertyName} from '@material/animation';
import {MDCTabBarScrollerFoundation} from '@material/tabs/tab-bar-scroller';

/**
 * @ngdoc component
 * @name mdcTabBarScroller
 * @module mdc.tab
 *
 */
class MdcTabBarScrollerController {
  constructor($element, $window, $timeout) {
    this.window = $window;
    this.elem = $element;
    this.timeout = $timeout;
    this.root_ = this.elem[0];
    this.initDone_ = false;
    this.elemReady = false;
    this.willScrollIndex_ = undefined;

    this.elem.ready(() => {
      this.elemReady = true;
      this.init();
    });
  }

  init() {
    if (!this.initDone_ && this.elemReady && this.tabBar) {
      this.foundation_ = this.getDefaultFoundation();
      this.foundation_.init();
      this.initDone_ = true;
      if (this.willScrollIndex_) {
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
      this.timeout(() => this.foundation_.scrollToTabAtIndex_(index), 1);
    } else {
      this.willScrollIndex_ = index;
    }
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
        this.window.addEventListener('resize', handler),
      deregisterWindowResizeHandler: (handler) =>
        this.window.removeEventListener('resize', handler),
      getNumberOfTabs: () => this.tabBar.tabs.length,
      getComputedWidthForTabAtIndex: (index) => this.tabBar.tabs[index].computedWidth,
      getComputedLeftForTabAtIndex: (index) => this.tabBar.tabs[index].computedLeft,
      getOffsetWidthForScrollFrame: () => this.scrollFrame_.offsetWidth,
      getScrollLeftForScrollFrame: () => this.scrollFrame_.scrollLeft,
      setScrollLeftForScrollFrame: (scrollLeftAmount) => this.scrollFrame_.scrollLeft = scrollLeftAmount,
      getOffsetWidthForTabBar: () => this.tabBarEl_.offsetWidth,
      setTransformStyleForTabBar: (value) => {
        this.tabBarEl_.style.setProperty(getCorrectPropertyName(this.window, 'transform'), value);
      },
      getOffsetLeftForEventTarget: (target) => target.offsetLeft,
      getOffsetWidthForEventTarget: (target) => target.offsetWidth,
    });
  }

  layout() {
    this.foundation_.layout();
  }
}

angular
  .module('mdc.tabs')
  .component('mdcTabBarScroller', {
    controller: MdcTabBarScrollerController,
    transclude: true,
    template: require('raw-loader!./tab-bar-scroller.html'),
  });
