import {MDCTabController} from '../../mdc-tabs/tab';

import {MDCTabFoundation} from '@material/tabs';
import {MDCMenuFoundation} from '@material/menu';


export class MDCExperimentalTabController extends MDCTabController {
  static get name() {
    return 'mdcTab';
  }

  constructor(...args) {
    super(...args);

    this.changeHandler_ = ({detail: {activeTabIndex}}) => {
      if (this.tabBar.tabs[activeTabIndex] === this) {
        if (this.onSelect) {
          this.$scope.$apply(() => this.onSelect({index: activeTabIndex}));
        }
      } else if (this.menu && this.menu.rememberSelection) {
        this.menu.foundation_.setSelectedIndex(-1);
      }
    };
  }

  setMDCMenu(menu) {
    this.menu = menu;
    if (menu) {
      this.setupMenu_(menu);
    }
  }

  setupMenu_(menu) {
    menu.listen(MDCMenuFoundation.strings.SELECTED_EVENT, () => this.notifyTabbar_());

    this.menuParent_ = this.tabBar.scroller ? this.tabBar.scroller.$element : this.tabBar.$element;
    menu.$element.detach();
    this.menuParent_.after(menu.$element);
  }

  setMenuElStyle_(propertyName, value) {
    this.menu.root_.style.setProperty(propertyName, value);
  }

  showMenu_() {
    const top = this.menuParent_[0].offsetTop;
    const left = this.root_.getBoundingClientRect().left - this.menuParent_.parent()[0].getBoundingClientRect().left;
    this.setMenuElStyle_('left', `${left}px`);
    this.setMenuElStyle_('top', `${top}px`);
    this.setMenuElStyle_('transform-origin', 'center top 0px');

    this.menu.show();
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.menu) {
      this.menu.$element.remove();
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
      notifySelected: () => {
        if (this.menu) {
          this.showMenu_();
        } else {
          this.notifyTabbar_();
        }
      },
    });
  }

  notifyTabbar_() {
    this.tabBar.emit(MDCTabFoundation.strings.SELECTED_EVENT, {tab: this}, true);
  }
}
