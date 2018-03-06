import {arrayUnion} from '../util/array-union';

import {MDCComponentNg} from '../mdc-base/component-ng';
import {MDCRippleMixin} from '../mdc-ripple/mixin';
import {MDCTabBarController} from './tab-bar';

import {MDCTabFoundation} from '@material/tabs';
import {HasNgValue} from '../util/has-ng-value-mixin';


/**
 * @ngdoc component
 * @name mdcTab
 * @module mdc.tabs
 *
 * @param {*} [ngValue] - expression to evaluate as
 * @param {string} [value] - string value to use if ngValue isn't specified
 */
export class MDCTabController extends HasNgValue(MDCRippleMixin(MDCComponentNg)) {
  static get name() {
    return 'mdcTab';
  }

  static get require() {
    return {
      tabBar: `^^${MDCTabBarController.name}`,
    };
  }

  static get $inject() {
    return arrayUnion(['$element', '$scope'], super.$inject);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-tab');
    if (!this.$element.attr('href') && !this.$element.attr('tabindex')) {
      this.$element.attr('tabindex', 0);
    }

    this.$viewChangeHandler = () => {
      this.isActive = this.tabBar.value === this.getValue();

      if (this.isActive) {
        this.tabBar.activateTab(this);
      }
    };
  }

  initialSyncWithDOM() {
    this.$viewChangeHandler();
  }

  onSelect_() {
    if (this.tabBar.ngModel) {
      this.tabBar.value = this.getValue();
    } else {
      this.tabBar.activateTab(this);
    }
  }

  setMDCText(value) {
    this.$element.toggleClass('mdc-tab--with-icon-and-text', Boolean(value));
  }

  set tabBar(bar) {
    this.tabBar_ = bar;
    if (bar) {
      bar.addTab(this);
    }
  }

  get tabBar() {
    return this.tabBar_;
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.tabBar) {
      this.tabBar.removeTab(this);
    }
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if ((changes.value || changes.ngValue) && this.foundationReady) {
      this.$viewChangeHandler();
    }
  }

  get computedWidth() {
    return this.foundation_.getComputedWidth();
  }

  get computedLeft() {
    return this.foundation_.getComputedLeft();
  }

  get isActive() {
    return this.foundation_.isActive();
  }

  set isActive(isActive) {
    this.foundation_.setActive(isActive);
  }

  get preventDefaultOnClick() {
    return this.foundation_.preventsDefaultOnClick();
  }

  set preventDefaultOnClick(preventDefaultOnClick) {
    this.foundation_.setPreventDefaultOnClick(preventDefaultOnClick);
  }

  getDefaultFoundation() {
    return new MDCTabFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      getOffsetLeft: () => this.root_.offsetLeft,
      notifySelected: () => this.onSelect_(),
    });
  }

  measureSelf() {
    this.foundation_.measureSelf();
  }
}

