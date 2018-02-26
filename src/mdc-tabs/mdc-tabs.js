import {MDCTabBarScrollerController} from './tab-bar-scroller';
import {MDCTabBarController} from './tab-bar';
import {MDCTabController} from './tab';
import {MDCTabTextController} from './tab-text';


/**
 * @ngdoc module
 * @name mdc.tabs
 * @description
 *
 * Tabs
 */
angular.module('mdc.tabs', [])
  .component(MDCTabBarScrollerController.name, {
    controller: MDCTabBarScrollerController,
    transclude: MDCTabBarScrollerController.transclude,
    template: MDCTabBarScrollerController.template,
  })
  .component(MDCTabBarController.name, {
    controller: MDCTabBarController,
    require: MDCTabBarController.require,
    bindings: MDCTabBarController.bindings,
  })
  .directive(MDCTabController.name, () => ({
    controller: MDCTabController,
    require: MDCTabController.require,
    bindToController: MDCTabController.bindings,
  }))
  .directive(MDCTabTextController.name, () => ({
    controller: MDCTabTextController,
    require: MDCTabTextController.require,
    bindToController: MDCTabController.bindings,
  }));
