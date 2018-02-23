import {arrayUnion} from '../util/array-union';

import {MDCComponentNg} from '../mdc-base/component-ng';

import {MDCTabBarScrollerController} from './tab-bar-scroller';

import {MDCTabFoundation, MDCTabBarFoundation} from '@material/tabs';


/**
 * @ngdoc component
 * @name mdcTabBar
 * @module mdc.tabs
 *
 * @param {string} [variant] Style variant - "icon", ""icons-text", or none for default
 * @param {string} [ngModel] Assignable AngularJS expression to bind selected tab to
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
        const value = this.ngModelCtrl_.$viewValue;

        if (isNaN(value) || value < 0 || value >= this.tabs.length) {
          return;
        }

        this.activeTabIndex = value;
      };

      this.ngModelCtrl_.$render();
    }

    if (this.activeTabIndex < 0 || (this.ngModelCtrl_ && this.ngModelCtrl_.$viewValue)) {
      // todo verify this initialization logic is correct
      this.tabs[0].isActive = true;

      if (this.ngModelCtrl_) {
        this.ngModelCtrl_.$setViewValue(0);
      }
    }
  }

  addTab(tab) {
    const activeIndex = this.activeTabIndex;
    const htmlIndex = Array.prototype.indexOf.call(this.$element.children(), tab.root_);

    this.tabs.splice(htmlIndex, 0, tab);

    if (!this.foundationReady) {
      return;
    }

    if (htmlIndex <= activeIndex) {
      this.activeTabIndex = activeIndex + 1;
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
      this.tabs.length = 0;
      return;
    } else {
      this.tabs.splice(indexOfTab, 1);
    }


    if (!this.foundationReady) {
      return;
    }

    // todo handle activeIndex correctly on tab removal

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
        this.tabs[index].isActive = isActive;
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
