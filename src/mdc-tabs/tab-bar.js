import {BaseComponent} from '../util/base-component';

import {MDCTabBarScrollerController} from './tab-bar-scroller';

import {MDCTabBarFoundation} from '@material/tabs';


/**
 * @ngdoc component
 * @name mdcTabBar
 * @module mdc.tabs
 *
 * @param {string} [variant] Style variant - "icon", ""icons-text", or none for default
 * @param {string} [ngModel] Assignable AngularJS expression to bind selected tab to
 */
export class MDCTabBarController extends BaseComponent {
  static get name() {
    return 'mdcTabBar';
  }

  static get require() {
    return {
      scroller: `^^?${MDCTabBarScrollerController.name}`,
      ngModelCtrl: '?ngModel',
    };
  }

  static get bindings() {
    return {
      variant: '@',
      ngModel: '=?',
    };
  }

  static get $inject() {
    return ['$element', '$window'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-tab-bar');
    this.root_ = this.$element[0];
    this.selected_ = undefined;
    this.initDone_ = false;
    this.$elementReady = false;
    this.needsNotify = false;

    this.indicator_ = angular.element('<span class="mdc-tab-bar__indicator"></span>')[0];
    this.$element.append(this.indicator_);

    this.tabs_ = []; // tabs will automatically add themselves to the list using .addTab()
  }

  init() {
    if (!this.initDone_ && this.$elementReady && this.tabs.length > 0) {
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
    }
    if (this.needsNotify) {
      this.notifyScroller();
    }
  }

  addTab(tab) {
    const htmlIndex = Array.prototype.indexOf.call(this.$element.children(), tab.root_);
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
    } else {
      this.init();
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

    if (this.tabs.length === 1) { // removing the last tab
      this.tabs_ = [];
      return;
    } else {
      this.tabs.splice(indexOfTab, 1);
    }

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
      this.$element.addClass('mdc-tab-bar-scroller__scroll-frame__tabs');
      this.scroller.setTabBar(this);
    }

    this.foundation_ = this.getDefaultFoundation();
    this.init();
    this.$element.ready(() => {
      this.$elementReady = true;
      this.init();
    });
  }

  get ngModel() {
    return this.selected_;
  }

  set ngModel(index) {
    this.selected_ = parseInt(index);
    if (isNaN(this.selected_)) {
      this.selected_ = undefined;
    } else if (this.initDone_) {
      if (this.selected_ < 0 || this.selected_ >= this.tabs.length) {
        this.selected_ = undefined;
      }
      if (this.selected_ !== undefined) {
        this.activeTabIndex = this.selected_;
        this.tabs[this.selected_]._active = true;
      }
    }
  }

  $onChanges(changesObj) {
    if (changesObj.variant) {
      this.$element.toggleClass('mdc-tab-bar--icon-tabs', this.variant === 'icon');
      this.$element.toggleClass('mdc-tab-bar--icons-with-text', this.variant === 'icons-text');
    }
  }

  $onDestroy() {
    this.tabs_ = [];
    if (this.scroller) {
      this.scroller.removeTabBar();
    }
    if (this.foundation_) {
      this.foundation_.destroy();
    }
  }

  get tabs() {
    return this.tabs_;
  }

  get activeTab() {
    const activeIndex = this.foundation_.getActiveTabIndex();
    return this.tabs[activeIndex];
  }

  activate(tab, notifyScroller = false) {
    if (this.initDone_) {
      this.setActiveTab_(tab, notifyScroller);
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
      registerResizeHandler: (handler) => this.$window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => this.$window.removeEventListener('resize', handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      setStyleForIndicator: (propertyName, value) => this.indicator_.style.setProperty(propertyName, value),
      getOffsetWidthForIndicator: () => this.indicator_.offsetWidth,
      notifyChange: ({activeTabIndex}) => this.notifyScroller(activeTabIndex),
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: (index) => this.selected_ === index,
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

  notifyScroller(activeTabIndex = this.foundation_.getActiveTabIndex()) {
    if (this.scroller) {
      if (activeTabIndex >= 0) {
        this.scroller.scrollTo(activeTabIndex);
        this.needsNotify = false;
      }
    }
  }

  layout() {
    this.foundation_.layout();
    if (this.scroller) {
      this.scroller.layout();
    }
  }

  setActiveTab_(activeTab, notifyChange) {
    const indexOfTab = this.tabs.indexOf(activeTab);
    if (indexOfTab < 0) {
      throw new Error('Invalid tab component given as activeTab: Tab not found within this component\'s tab list');
    }
    this.setActiveTabIndex_(indexOfTab, notifyChange);
  }

  setActiveTabIndex_(activeTabIndex, notifyChange) {
    this.needsNotify = notifyChange;
    this.foundation_.switchToTabAtIndex(activeTabIndex, notifyChange);
    if (this.ngModelCtrl) {
      this.ngModelCtrl.$setViewValue(activeTabIndex);
    }
  }
}
