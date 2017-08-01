
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
    });
  }

  $onInit() {
    if (this.tabBar) {
      this.tabBar.addTab(this);
    }
  }

  $postLink() {
    if (this.active) {
      this.tabBar.activeTab = this;
    }
  }

  $onChanges(changesObj) {
    if (changesObj.active && !changesObj.active.isFirstChange()) {
      if (changesObj.active.currentValue) {
        this.tabBar.activeTab = this;
      }
    }
  }

  $onDestroy() {
    this.ripple_.destroy();
    this.foundation_.destroy();
  }

  hasMdcText(toggle) {
    this.elem.toggleClass('mdc-tab--with-icon-and-text', toggle);
  }

  notifySelected() {
    if (this.tabBar) {
      this.tabBar.activeTab = this;
    }
  }

  get computedWidth() {
    return this.foundation_.getComputedWidth();
  }

  get computedLeft() {
    return this.foundation_.getComputedLeft();
  }

  get active() {
    return this.foundation_.isActive();
  }

  set active(isActive) {
    if (this.foundation_) {
      if (this.tabBar && isActive && !this.active) {
        this.tabBar.activeTab = this;
      }
      this.activate(isActive);
    }
  }

  activate(isActive) {
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
      notifySelected: () => this.notifySelected(),
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
}

angular
  .module('mdc.tabs')
  .component('mdcTab', {
    controller: MdcTabController,
    require: {
      tabBar: '^^?mdcTabBar',
    },
    bindings: {
      active: '=?',
    },
  })
  .component('mdcTabText', {
    controller: MdcTabTextController,
    require: {
      tab: '^^mdcTab',
    },
  });
