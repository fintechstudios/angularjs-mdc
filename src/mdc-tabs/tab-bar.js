import {arrayUnion} from '../util/array-union';

import {MDCComponentNg} from '../mdc-base/component-ng';

import {MDCTabBarScrollerController} from './tab-bar-scroller';

import {MDCTabFoundation, MDCTabBarFoundation} from '@material/tabs';


/**
 * @ngdoc component
 * @name mdcTabBar
 * @module mdc.tabs
 *
 * @param {string} [variant] - Style variant - "icon", ""icons-text", or none for default
 * @param {string} [ngModel] - Assignable AngularJS expression to bind selected tab to
 */
export class MDCTabBarController extends MDCComponentNg {
  static get name() {
    return 'mdcTabBar';
  }

  static get require() {
    return {
      scroller: `^^?${MDCTabBarScrollerController.name}`,
      ngModelCtrl_: '?ngModel',
    };
  }

  static get bindings() {
    return {
      variant: '@',
    };
  }

  static get $inject() {
    return arrayUnion(['$element', '$window'], super.$inject);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-tab-bar');

    this.indicator_ = angular.element('<span class="mdc-tab-bar__indicator"></span>')[0];
    this.$element.append(this.indicator_);

    this.tabs_ = []; // tabs will automatically add themselves to the list using .addTab()
  }

  get tabs() {
    return this.tabs_;
  }

  get activeTab() {
    const activeIndex = this.foundation_.getActiveTabIndex();
    return this.tabs[activeIndex];
  }

  set activeTab(tab) {
    this.setActiveTab_(tab, false);
  }

  get activeTabIndex() {
    return this.foundation_.getActiveTabIndex();
  }

  set activeTabIndex(index) {
    this.setActiveTabIndex_(index, false);
  }

  initialize() {
    this.tabSelectedHandler_ = ({detail}) => {
      const {tab} = detail;
      this.setActiveTab_(tab, true);
    };
  }

  initialSyncWithDOM() {
    if (this.ngModelCtrl_) {
      this.ngModelCtrl_.$formatters.push((viewValue) => Number(viewValue));
      this.ngModelCtrl_.$render = () => {
        const index = this.ngModelCtrl_.$viewValue;

        if (isNaN(index) || index < 0 || index >= this.tabs.length) {
          return;
        }

        this.activeTabIndex = index;
        if (this.scroller) { // outside changes trigger scroller if it exists
          this.scroller.scrollToTabAtIndexIfNotVisible(index);
        }
      };

      this.foundation_.activeTabIndex_ = -1; // init correctly
      this.ngModelCtrl_.$render();
    } else if (this.activeTabIndex < 0) {
      // only trigger if ngModel isn't attached to the tabBar
      this.tabs[0].isActive = true;
    }
  }

  addTab(tab) {
    const activeIndex = this.activeTabIndex;
    const htmlIndex = Array.prototype.indexOf.call(this.$element.children(), tab.root_);

    this.tabs.splice(htmlIndex, 0, tab);

    if (!this.foundationReady) {
      return;
    }

    if (activeIndex === -1) {
      this.foundation_.activeTabIndex_ = -1;
      this.setActiveTabIndex_(0, true);
    } else if (htmlIndex <= activeIndex) {
      this.setActiveTabIndex_(activeIndex + 1, true);
    }

    this.layout();
  }

  removeTab(tab) {
    const activeIndex = this.activeTabIndex;
    const indexOfTab = this.tabs.indexOf(tab);
    if (indexOfTab < 0) { // tab already removed
      return;
    }

    if (this.tabs.length === 1) {
      // if it's the last one, we can short-circuit any extra processing
      this.tabs.length = 0;
      return;
    }

    this.tabs.splice(indexOfTab, 1);

    if (!this.foundationReady) {
      return;
    }

    if (activeIndex === indexOfTab) {
      this.foundation_.activeTabIndex_ = -1; // old tab is gone, reset foundation_ value
      this.setActiveTabIndex_(0, true);
    } else if (activeIndex > indexOfTab) {
      this.setActiveTabIndex_(activeIndex - 1, true);
    }

    this.layout();
  }

  $postLink() {
    super.$postLink();

    if (this.scroller) {
      this.$element.addClass('mdc-tab-bar-scroller__scroll-frame__tabs');
      this.scroller.setTabBar(this);
    }
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.variant) {
      this.$element.toggleClass('mdc-tab-bar--icon-tabs', this.variant === 'icon');
      this.$element.toggleClass('mdc-tab-bar--icons-with-text', this.variant === 'icons-text');
    }
  }

  $onDestroy() {
    this.tabs.length = 0; // if $onDestroy is called, all the tabs should already be gone - remove references
    super.$onDestroy();
  }

  getDefaultFoundation() {
    return new MDCTabBarFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      bindOnMDCTabSelectedEvent: () => this.listen(
        MDCTabFoundation.strings.SELECTED_EVENT, this.tabSelectedHandler_),
      unbindOnMDCTabSelectedEvent: () => this.unlisten(
        MDCTabFoundation.strings.SELECTED_EVENT, this.tabSelectedHandler_),
      registerResizeHandler: (handler) => this.$window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => this.$window.removeEventListener('resize', handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      setStyleForIndicator: (propertyName, value) => this.indicator_.style.setProperty(propertyName, value),
      getOffsetWidthForIndicator: () => this.indicator_.offsetWidth,
      notifyChange: (evtData) => this.emit(MDCTabBarFoundation.strings.CHANGE_EVENT, evtData),
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: (index) => this.tabs[index].isActive,
      setTabActiveAtIndex: (index, isActive) => {
        if (this.tabs[index]) {
          this.tabs[index].isActive = isActive;
        }
      },
      isDefaultPreventedOnClickForTabAtIndex: (index) => this.tabs[index].preventDefaultOnClick,
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) => {
        this.tabs[index].preventDefaultOnClick = preventDefaultOnClick;
      },
      measureTabAtIndex: (index) => this.tabs[index] && this.tabs[index].measureSelf(),
      getComputedWidthForTabAtIndex: (index) => this.tabs[index] && this.tabs[index].computedWidth,
      getComputedLeftForTabAtIndex: (index) => this.tabs[index] && this.tabs[index].computedLeft,
    });
  }

  setActiveTabIndex_(activeTabIndex, notifyChange) {
    this.foundation_.switchToTabAtIndex(activeTabIndex, notifyChange);

    if (notifyChange && this.ngModelCtrl_ && this.foundationReady) {
      this.ngModelCtrl_.$setViewValue(activeTabIndex);
    }
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
