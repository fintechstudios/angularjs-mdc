import {BaseComponent} from '../util/base-component';
import {replaceMdcClassname} from '../util/replace-mdc-classname';

import {MDCTabController} from './tab';

const BASE_CLASSNAME = replaceMdcClassname('mdc-tab__icon-text');

/**
 * @ngdoc directive
 * @name mdcTabText
 * @restrict AEC
 * @module mdc.tabs
 */
export class MDCTabTextController extends BaseComponent {
  static get name() {
    return 'mdcTabText';
  }

  static get bindings() {
    return true;
  }

  static get require() {
    return {
      tab: `^^${MDCTabController.name}`,
    };
  }

  static get $inject() {
    return ['$element'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(BASE_CLASSNAME);
  }

  $postLink() {
    this.tab.setMDCText(true);
  }

  $onDestroy() {
    this.tab.setMDCText(false);
  }
}
