import {MDCTabBarController} from './tab-bar';
import {MDCTabController} from './tab';
import {MDCTabTextController} from './tab-text';
import {MDCTabBarScrollerController} from './tab-bar-scroller';


/**
 * @ngdoc module
 * @name mdc.tabs
 * @description
 *
 * Tabs
 */
angular.module('mdc.tabs', [])
  .directive(MDCTabController.name, () => ({
    controller: MDCTabController,
    require: MDCTabController.require,
    bindToController: MDCTabController.bindings,
  }))
  // .directive(MDCTabTextController.name, () => ({
  //   controller: MDCTabTextController,
  //   require: MDCTabTextController.require,
  // }))
  .component(MDCTabBarController.name, {
    controller: MDCTabBarController,
    require: MDCTabBarController.require,
    bindings: MDCTabBarController.bindings,
  })
  // .component(MDCTabBarScrollerController.name, {
  //   controller: MDCTabBarScrollerController,
  //   transclude: MDCTabBarScrollerController.transclude,
  //   template: MDCTabBarScrollerController.template,
  // });
