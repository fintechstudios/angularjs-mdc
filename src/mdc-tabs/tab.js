import {arrayUnion} from '../util/array-union';

import {MDCComponentNg} from '../mdc-base/component-ng';
import {MDCRippleMixin} from '../mdc-ripple/mixin';
import {MDCTabBarController} from './tab-bar';

import {MDCTabFoundation} from '@material/tabs';


/**
 * @ngdoc component
 * @name mdcTab
 * @module mdc.tabs
 *
 * @param {boolean} [active] - Sets whether this is the active tab or not (one-way, to tab-bar)
 */
export class MDCTabController extends MDCRippleMixin(MDCComponentNg) {
  static get name() {
    return 'mdcTab';
  }

  static get bindings() {
    return {
      active: '<?',
      onSelect: '&?',
    };
  }

  static get require() {
    return {
      tabBar: `^^?${MDCTabBarController.name}`,
    };
  }

  static get $inject() {
    return arrayUnion(['$element'], super.$inject);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-tab');
    if (!this.$element.attr('href') && !this.$element.attr('tabindex')) {
      this.$element.attr('tabindex', 0);
    }
  }

  $postLink() {
    super.$postLink();

    if (this.tabBar) {
      this.tabBar.addTab(this);
    }
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.tabBar) {
      this.tabBar.removeTab(this);
    }
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.active && this.foundationReady && this.active) {
      // act as a click
      this.foundation_.adapter_.notifySelected();
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
      notifySelected: () => this.tabBar.emit(MDCTabFoundation.strings.SELECTED_EVENT, {tab: this}, true),
    });
  }

  initialSyncWithDOM() {
    this.isActive = this.active;
  }

  measureSelf() {
    this.foundation_.measureSelf();
  }
}

