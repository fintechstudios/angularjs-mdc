import {BaseComponent} from '../util/base-component';

import {MDCTabController} from './tab';


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

    this.$element.addClass('mdc-tab__icon-text');
  }

  $postLink() {
    this.tab.hasMdcText(true);
  }

  $onDestroy() {
    this.tab.hasMdcText(false);
  }
}
