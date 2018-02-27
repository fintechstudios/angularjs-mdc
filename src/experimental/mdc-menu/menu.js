import {MDCMenuController} from '../../mdc-menu/menu/component';

export class MDCExperimentalMenuController extends MDCMenuController {
  static get name() {
    return 'mdcMenu';
  }

  static get require() {
    return Object.assign({
      mdcTab: '^^?',
    }, super.require);
  }

  set mdcTab(tab) {
    this.tab = tab;

    if (tab) {
      this.tab.setMDCMenu(this);
    }
  }

  get mdcTab() {
    return this.tab;
  }
}
