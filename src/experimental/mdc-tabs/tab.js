import {MDCTabController} from '../../mdc-tabs/tab';

import {MDCTabFoundation} from '@material/tabs';
import {MDCMenuFoundation} from '@material/menu';


export class MDCExperimentalTabController extends MDCTabController {
  static get name() {
    return 'mdcTab';
  }

  constructor(...args) {
    super(...args);

    this.$viewChangeHandler = () => {
      const currentValue = this.tabBar.value;
      let active = false;
      if (this.menu) {
        let i;
        for (i = 0; i < this.menu.itemControllers.length; i++) {
          if (this.menu.itemControllers[i].getValue() === currentValue) {
            active = true;
            break;
          }
        }

        if (!active && this.menu.rememberSelection) {
          this.menu.foundation_.setSelectedIndex(-1);
        }
      } else {
        active = this.tabBar.value === this.getValue();
      }

      this.isActive = active;
      if (active) {
        this.tabBar.activateTab(this);
      }
    };
  }

  onSelect_() {
    if (this.menu) {
      this.showMenu_();
    } else {
      super.onSelect_();
    }
  }

  setMDCMenu(menu) {
    this.menu = menu;
    if (menu) {
      this.setupMenu_(menu);
    }
  }

  setupMenu_(menu) {
    this.menuParent_ = this.tabBar.scroller ? this.tabBar.scroller.$element : this.tabBar.$element;
    menu.$element.detach();
    this.menuParent_.after(menu.$element);

    menu.listen(MDCMenuFoundation.strings.SELECTED_EVENT, ({detail: {item}}) => {
      if (this.tabBar.ngModel) {
        this.tabBar.value = item.getValue();
      } else {
        this.tabBar.activateTab(this);
      }
    });
  }

  setMenuElStyle_(propertyName, value) {
    this.menu.root_.style.setProperty(propertyName, value);
  }

  showMenu_() {
    const rootRect = this.root_.getBoundingClientRect();
    const parentRect = this.menuParent_.parent()[0].getBoundingClientRect();
    const top = this.menuParent_[0].offsetTop;
    const left = rootRect.left - parentRect.left;
    this.setMenuElStyle_('left', `${left}px`);
    this.setMenuElStyle_('top', `${top}px`);
    this.setMenuElStyle_('transform-origin', 'center top 0px');
    this.setMenuElStyle_('max-height', `calc(100vh - ${rootRect.y}px)`);
    this.setMenuElStyle_('max-width', `calc(100vw - ${rootRect.x}px)`);

    this.menu.show();
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.menu) {
      this.menu.$element.remove();
    }
  }

  notifyTabbar_() {
    this.tabBar.emit(MDCTabFoundation.strings.SELECTED_EVENT, {tab: this}, true);
  }
}
