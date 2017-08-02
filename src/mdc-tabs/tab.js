
import {MDCRipple} from '@material/ripple';

import {MDCTabFoundation} from '@material/tabs';


/**
 * @ngdoc component
 * @name mdcTab
 * @module mdc.tabs
 *
 * @param {expression} [active] Whether this is the active class or not.
 */
class MdcTabController {
  constructor($element) {
    this.elem = $element;
    this.root_ = this.elem[0];

    this.foundation_ = this.getDefaultFoundation();

    this.elem.ready(() => {
      this.foundation_.init();
      this.ripple_ = new MDCRipple(this.root_);
      if (this.willBeActive) {
        this._active = true;
      }
    });
  }

  $onInit() {
    if (this.tabBar) {
      this.tabBar.addTab(this);
    }
  }

  $onChanges(changesObj) {
    if (changesObj.active) {
      this._active = changesObj.active.currentValue;
      if (changesObj.active.currentValue) {
        // on initialize, sync active state with tabbar
        this.notifyTabBar(true);
      }
    }
  }

  $onDestroy() {
    if (this.tabBar) {
      this.tabBar.removeTab(this);
    }
    this.ripple_.destroy();
    this.foundation_.destroy();
  }

  hasMdcText(toggle) {
    this.elem.toggleClass('mdc-tab--with-icon-and-text', toggle);
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
class MdcTabTextController {
  $postLink() {
    this.tab.hasMdcText(true);
  }

  $onDestroy() {
    this.tab.hasMdcText(false);
  }
}

angular
  .module('mdc.tabs')
  .component('mdcTab', {
    controller: MdcTabController,
    require: {
      tabBar: '^^?mdcTabBar',
    },
    bindings: {
      active: '<?',
    },
  })
  .component('mdcTabText', {
    controller: MdcTabTextController,
    require: {
      tab: '^^mdcTab',
    },
  });
