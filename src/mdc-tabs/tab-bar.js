import {arrayUnion} from '../util/array-union';
import {replaceFoundationConstants} from '../util/replace-foundation-constants';
import {replaceMdcClassname} from '../util/replace-mdc-classname';

import {MDCComponentNg} from '../mdc-base/component-ng';

import {BASE_CLASSNAME as TAB_BASE_CLASSNAME} from './tab';
import {MDCTabBarScrollerController} from './tab-bar-scroller';

import {MDCTabFoundation, MDCTabBarFoundation} from '@material/tabs';

replaceFoundationConstants(MDCTabBarFoundation);
replaceFoundationConstants(MDCTabFoundation);

const BASE_CLASSNAME = replaceMdcClassname('mdc-tab-bar');
const INDICATOR_CLASSNAME = `${BASE_CLASSNAME}__indicator`;
const ICON_TABS_CLASSNAME = `${BASE_CLASSNAME}--icon-tabs`;
const ICONS_WITH_TEXT_CLASSNAME = `${BASE_CLASSNAME}--icons-with-text`;
const SCROLLER_SCROLL_FRAME_TABS_CLASSNAME = `${BASE_CLASSNAME}-scroller__scroll-frame__tabs`;

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
      ngModel: '?',
    };
  }

  static get bindings() {
    return {
      variant: '@',
    };
  }

  static get $inject() {
    return arrayUnion(['$element', '$window', '$timeout'], super.$inject);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(BASE_CLASSNAME);

    this.indicator_ = angular.element(`<span class="${INDICATOR_CLASSNAME}"></span>`)[0];
    this.$element.append(this.indicator_);

    this.tabs_ = []; // tabs will automatically add themselves to the list using .addTab()
  }

  get tabElements() {
    return [].slice.call(this.root_.getElementsByClassName(TAB_BASE_CLASSNAME));
  }

  get value() {
    return this.ngModel && this.ngModel.$viewValue;
  }

  set value(value) {
    if (this.ngModel) {
      this.ngModel.$setViewValue(value);
    }
  }

  get tabs() {
    return this.tabs_;
  }

  initialize() {
    this.tabSelectedHandler_ = ({detail: {tab}}) => this.activateTab(tab, true);
  }

  onElementReady() {
  }

  activateTab(tab) {
    const index = this.tabs.indexOf(tab);

    this.$timeout(() => this.foundation_.switchToTabAtIndex(index, true), 20, false);

    if (this.scroller) {
      this.scroller.scrollToTabIfNotVisible(tab);
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
      isTabActiveAtIndex: (index) => this.tabs[index] && this.tabs[index].isActive,
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

  layout() {
    if (this.foundationReady) {
      this.foundation_.layout();

      if (this.ngModel) {
        this.ngModel.$render();
      }
      if (this.scroller) {
        this.scroller.layout();
      }
    }
  }

  addTab(tab) {
    this.tabs.push(tab);
    if (this.ngModel) {
      this.ngModel.$viewChangeListeners.push(tab.$viewChangeHandler);
    }
    this.layout();
  }

  removeTab(tab) {
    const viewHandlerIndex = this.ngModel ? this.ngModel.$viewChangeListeners.indexOf(tab.$viewChangeHandler) : -1;
    if (viewHandlerIndex >= 0) {
      this.ngModel.$viewChangeListeners.splice(viewHandlerIndex, 1);
    }

    const indexOfTab = this.tabs.indexOf(tab);
    if (indexOfTab >= 0) {
      this.tabs.splice(indexOfTab, 1);
      this.layout();
    }
  }

  $postLink() {
    super.$postLink();

    if (this.scroller) {
      this.$element.addClass(SCROLLER_SCROLL_FRAME_TABS_CLASSNAME);
      this.scroller.setTabBar(this);
    }
  }

  initialSyncWithDOM() {
    if (this.ngModel) {
      this.ngModel.$render = () => this.ngModel.$viewChangeListeners.forEach((listener) => listener());
    } else if (this.tabs.length > 0) { // not using ngModel, so first tab must be active
      this.tabs[0].isActive = true;
    }
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.variant) {
      this.$element.toggleClass(ICON_TABS_CLASSNAME, this.variant === 'icon');
      this.$element.toggleClass(ICONS_WITH_TEXT_CLASSNAME, this.variant === 'icons-text');
    }
  }

  $onDestroy() {
    this.tabs.length = 0; // if $onDestroy is called, all the tabs should already be gone - remove references
    super.$onDestroy();
  }

  get activeIndex() {
    return this.foundation_.getActiveTabIndex();
  }
}
