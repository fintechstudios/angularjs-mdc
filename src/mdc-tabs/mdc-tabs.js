import {MDCTabBarController} from './tab-bar';
import {MDCTabController, MDCTabTextController} from './tab';
import {MDCTabBarScrollerController} from './tab-bar-scroller';


/**
 * @ngdoc module
 * @name mdc.tabs
 * @description
 *
 * Tabs
 */
angular.module('mdc.tabs', [])
  .component(MDCTabController.name, {
    controller: MDCTabController,
    require: MDCTabController.require,
    bindings: MDCTabController.bindings,
  })
  .component(MDCTabTextController.name, {
    controller: MDCTabTextController,
    require: MDCTabTextController.require,
  })
  .component(MDCTabBarController.name, {
    controller: MDCTabBarController,
    require: MDCTabBarController.require,
    bindings: MDCTabBarController.bindings,
  })
  .component(MDCTabBarScrollerController.name, {
    controller: MDCTabBarScrollerController,
    transclude: MDCTabBarScrollerController.transclude,
    template: MDCTabBarScrollerController.template,
  });
