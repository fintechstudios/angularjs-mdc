import {arrayUnion} from '../util/array-union';
import {BaseComponent} from '../util/base-component';

import {MDCRippleMixin} from '../mdc-ripple/mixin';
import {MDCTabBarController} from './tab-bar';

import {MDCTabFoundation} from '@material/tabs';


/**
 * @ngdoc component
 * @name mdcTab
 * @module mdc.tabs
 *
 * @param {expression} [active] Whether this is the active class or not.
 */
export class MDCTabController extends MDCRippleMixin(BaseComponent) {
  static get name() {
    return 'mdcTab';
  }

  static get bindings() {
    return {
      active: '<?',
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

    this.root_ = this.$element[0];
    this.added = false;

    this.foundation_ = this.getDefaultFoundation();

    this.$element.ready(() => {
      this.addToTabBar();
      this.foundation_.init();
      this.initDone_ = true;
      if (this.willBeActive) {
        this._active = true;
      }
    });
  }

  addToTabBar() {
    if (!this.added && this.tabBar) {
      this.tabBar.addTab(this);
      this.added = true;
    }
  }

  $onInit() {
    super.$onInit();
    this.addToTabBar();
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.active) {
      this.addToTabBar(); // if active, this may happen before $onInit
      this._active = changes.active.currentValue;
      if (changes.active.currentValue) {
        // on initialize, sync active state with tabbar
        this.notifyTabBar(true);
      }
    }
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.tabBar) {
      this.tabBar.removeTab(this);
    }
    this.foundation_.destroy();
  }

  hasMdcText(toggle) {
    this.$element.toggleClass('mdc-tab--with-icon-and-text', toggle);
  }

  get computedWidth() {
    return this.foundation_.getComputedWidth();
  }

  get computedLeft() {
    return this.foundation_.getComputedLeft();
  }

  get _active() {
    return this.foundation_ ? this.foundation_.isActive() : this.willBeActive;
  }

  set _active(isActive) {
    if (this.foundation_) {
      this.foundation_.setActive(isActive);
    } else {
      this.willBeActive = isActive;
    }
  }

  get preventDefaultOnClick() {
    return this.foundation_.preventsDefaultOnClick();
  }

  set preventDefaultOnClick(preventDefaultOnClick) {
    this.foundation_.setPreventDefaultOnClick(preventDefaultOnClick);
  }

  handleClick() {
    this._active = true;
    this.notifyTabBar();
  }

  notifyTabBar(notifyScroller = false) {
    if (this.tabBar) {
      this.tabBar.activate(this, notifyScroller);
    }
  }

  getDefaultFoundation() {
    return new MDCTabFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      getOffsetWidth: () => this.root_.offsetWidth,
      getOffsetLeft: () => this.root_.offsetLeft,
      notifySelected: () => this.handleClick(),
    });
  }

  measureSelf() {
    this.foundation_.measureSelf();
  }
}


/**
 * @ngdoc component
 * @name mdcTabText
 * @module mdc.tabs
 */
export class MDCTabTextController {
  static get name() {
    return 'mdcTabText';
  }

  static get require() {
    return {
      tab: `^^${MDCTabController.name}`,
    };
  }

  $postLink() {
    this.tab.hasMdcText(true);
  }

  $onDestroy() {
    this.tab.hasMdcText(false);
  }
}
