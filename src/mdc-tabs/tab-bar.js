
import {MDCTabBarFoundation} from '@material/tabs';

/**
 * @ngdoc component
 * @name mdcTabBar
 * @module mdc.tabs
 *
 * @param {string} [indicator] Color of indicator, "primary" or "accent"
 * @param {string} [variant] Style variant - "icon", ""icons-text", or none for default
 * @param {string} [ngModel] Assignable AngularJS expression to bind selected tab to
 */
class MdcTabBarController {
  constructor($element, $window) {
    this.window = $window;
    this.elem = $element;
    this.root_ = this.elem[0];
    this.selected_ = undefined;
    this.initDone_ = false;

    this.indicator_ = angular.element('<span class="mdc-tab-bar__indicator"></span>')[0];
    this.elem.append(this.indicator_);

    this.tabs_ = []; // tabs will automatically add themselves to the list using .addTab()
  }

  addTab(tab) {
    const htmlIndex = Array.prototype.indexOf.call(this.elem.children(), tab.root_);
    let activeTabIndex = -1;
    if (this.initDone_) {
      activeTabIndex = this.activeTabIndex;
    }

    this.tabs.splice(htmlIndex, 0, tab);

    if (this.initDone_) {
      if (htmlIndex <= activeTabIndex) {
        activeTabIndex += 1;
        this.activeTabIndex = activeTabIndex;
      }
      this.layout();
    }
  }

  removeTab(tab) {
    const indexOfTab = this.tabs.indexOf(tab);
    if (indexOfTab < 0) { // tab already removed
      return;
    }
    let activeTabIndex = -1;
    if (this.initDone_) {
      activeTabIndex = this.activeTabIndex;
      if (activeTabIndex === indexOfTab) {
        this.tabs[indexOfTab].active_ = false;
      }
    }

    this.tabs.splice(indexOfTab, 1);

    if (this.initDone_) {
      this.layout();
      if (activeTabIndex === 0) {
        this.foundation_.activeTabIndex_ = -1;
        this.activeTabIndex = 0;
      } else if (indexOfTab <= activeTabIndex) {
        this.activeTabIndex = activeTabIndex - 1;
      }
    }
  }

  $postLink() {
    if (this.scroller) {
      this.elem.addClass('mdc-tab-bar-scroller__scroll-frame__tabs');
      this.scroller.setTabBar(this);
    }

    this.foundation_ = this.getDefaultFoundation();
    this.elem.ready(() => {
      this.foundation_.init();
      this.initDone_ = true;

      if (this.selected_) { // if select is specified
        this.ngModel = this.selected_;
      } else if (this.toActivate) { // if an active tab is specified
        this.setActiveTab_(this.toActivate, true);
      } else { // otherwise select the first one
        this.ngModel = 0;
        this.tabs[0]._active = true;
      }
    });
  }

  get ngModel() {
    return this.selected_;
  }

  set ngModel(index) {
    this.selected_ = parseInt(index);
    if (isNaN(this.selected_)) {
      this.selected_ = undefined;
    }
    if (this.initDone_ && this.selected_ !== undefined) {
      this.activeTabIndex = this.selected_;
    }
  }

  $onChanges(changesObj) {
    if (changesObj.indicator) {
      this.elem.toggleClass('mdc-tab-bar--indicator-primary', this.indicator === 'primary');
      this.elem.toggleClass('mdc-tab-bar--indicator-accent', this.indicator === 'accent');
    }
    if (changesObj.variant) {
      this.elem.toggleClass('mdc-tab-bar--icon-tabs', this.variant === 'icon');
      this.elem.toggleClass('mdc-tab-bar--icons-with-text', this.variant === 'icons-text');
    }
  }

  $onDestroy() {
    if (this.scroller) {
      this.scroller.removeTabBar();
    }
    this.foundation_.destroy();
  }

  get tabs() {
    return this.tabs_;
  }

  get activeTab() {
    const activeIndex = this.foundation_.getActiveTabIndex();
    return this.tabs[activeIndex];
  }

  activate(tab) {
    if (this.initDone_) {
      this.setActiveTab_(tab, false);
    } else { // shelve tab activation while foundation initializes
      this.toActivate = tab;
    }
  }

  get activeTabIndex() {
    return this.foundation_.getActiveTabIndex();
  }

  set activeTabIndex(index) {
    this.setActiveTabIndex_(index, true);
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
      notifyChange: (evtData) => {
        if (this.scroller) {
          this.scroller.scrollTo(this.foundation_.getActiveTabIndex());
        }
      },
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: (index) => this.tabs[index]._active,
      setTabActiveAtIndex: (index, isActive) => {
        if (this.tabs[index]) {
          this.tabs[index]._active = isActive;
        }
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

  setActiveTabIndex_(activeTabIndex, notifyChange) {
    this.foundation_.switchToTabAtIndex(activeTabIndex, notifyChange);
    if (this.ngModelCtrl) {
      this.ngModelCtrl.$setViewValue(activeTabIndex);
    }
  }
}


angular
  .module('mdc.tabs')
  .component('mdcTabBar', {
    controller: MdcTabBarController,
    require: {
      scroller: '^^?mdcTabBarScroller',
      ngModelCtrl: '?ngModel',
    },
    bindings: {
      indicator: '@',
      variant: '@',
      ngModel: '=?',
    },
  });
