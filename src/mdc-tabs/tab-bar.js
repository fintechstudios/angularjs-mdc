
import {MDCTabBarFoundation} from '@material/tabs';

/**
 * @ngdoc component
 * @name mdcTabBar
 * @module mdc.tabs
 *
 * @param {string} [indicator] Color of indicator, "primary" or "accent"
 */
class MdcTabBarController {
  constructor($element, $window) {
    this.activations = 0;
    this.window = $window;
    this.elem = $element;
    this.root_ = this.elem[0];
    this.isInitialized = false;

    this.indicator_ = angular.element('<span class="mdc-tab-bar__indicator"></span>')[0];
    this.elem.append(this.indicator_);

    this.tabs_ = []; // tabs will automatically add themselves to the list using .addTab()
  }

  addTab(tab) {
    this.tabs_.push(tab);
  }

  $postLink() {
    if (this.scroller) {
      this.elem.addClass('mdc-tab-bar-scroller__scroll-frame__tabs');
      this.scroller.setTabBar(this);
    }

    this.foundation_ = this.getDefaultFoundation();
    this.elem.ready(() => {
      this.foundation_.init();
      this.isInitialized = true;
      if (this.toActivate) {
        this.setActiveTab_(this.toActivate, false);
      } else {
        this.tabs[0].activate(true);
      }
    });
  }

  $onChanges(changesObj) {
    if (changesObj.indicator) {
      this.elem.toggleClass('mdc-tab-bar--indicator-primary', this.indicator === 'primary');
      this.elem.toggleClass('mdc-tab-bar--indicator-accent', this.indicator === 'accent');
    }
  }

  $onDestroy() {
    this.foundation_.destroy();
  }

  get tabs() {
    return this.tabs_;
  }

  get activeTab() {
    const activeIndex = this.foundation_.getActiveTabIndex();
    return this.tabs[activeIndex];
  }

  set activeTab(tab) {
    if (this.isInitialized) {
      this.setActiveTab_(tab, false);
    } else { // shelve tab activation while foundation initializes
      this.toActivate = tab;
    }
  }

  get activeTabIndex() {
    return this.foundation_.getActiveTabIndex();
  }

  set activeTabIndex(index) {
    this.setActiveTabIndex_(index, false);
  }

  getDefaultFoundation() {
    return new MDCTabBarFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      bindOnMDCTabSelectedEvent: () => {},
      unbindOnMDCTabSelectedEvent: () => {},
      registerResizeHandler: (handler) => this.window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => this.window.removeEventListener('resize', handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      setStyleForIndicator: (propertyName, value) => this.indicator_.style.setProperty(propertyName, value),
      getOffsetWidthForIndicator: () => this.indicator_.offsetWidth,
      notifyChange: (evtData) => this.emit(MDCTabBarFoundation.strings.CHANGE_EVENT, evtData),
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: (index) => this.tabs[index].active,
      setTabActiveAtIndex: (index, isActive) => {
        this.tabs[index].activate(isActive);
      },
      isDefaultPreventedOnClickForTabAtIndex: (index) => this.tabs[index].preventDefaultOnClick,
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) => {
        this.tabs[index].preventDefaultOnClick = preventDefaultOnClick;
      },
      measureTabAtIndex: (index) => this.tabs[index].measureSelf(),
      getComputedWidthForTabAtIndex: (index) => this.tabs[index].computedWidth,
      getComputedLeftForTabAtIndex: (index) => this.tabs[index].computedLeft,
    });
  }

  setActiveTabIndex_(activeTabIndex, notifyChange) {
    this.foundation_.switchToTabAtIndex(activeTabIndex, notifyChange);
  }

  layout() {
    this.foundation_.layout();
  }

  setActiveTab_(activeTab, notifyChange) {
    const indexOfTab = this.tabs.indexOf(activeTab);
    if (indexOfTab < 0) {
      throw new Error('Invalid tab component given as activeTab: Tab not found within this component\'s tab list');
    }
    this.setActiveTabIndex_(indexOfTab, notifyChange);
  }
}


angular
  .module('mdc.tabs')
  .component('mdcTabBar', {
    controller: MdcTabBarController,
    require: {
      scroller: '^^?mdcTabBarScroller',
    },
    bindings: {
      indicator: '@',
    },
  });
