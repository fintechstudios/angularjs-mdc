import {MDCTabBarScrollerController} from '../../mdc-tabs/tab-bar-scroller';
import {MDCTabBarController} from '../../mdc-tabs/tab-bar';
import {MDCExperimentalTabController} from './tab';
import {MDCTabTextController} from '../../mdc-tabs/tab-text';


/**
 * @ngdoc module
 * @name mdc.tabs
 * @description
 *
 * Tabs
 */
angular.module('mdc.tabs-experimental', [])
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
  .directive(MDCExperimentalTabController.name, () => ({
    controller: MDCExperimentalTabController,
    require: MDCExperimentalTabController.require,
    bindToController: MDCExperimentalTabController.bindings,
  }))
  .directive(MDCTabTextController.name, () => ({
    controller: MDCTabTextController,
    require: MDCTabTextController.require,
    bindToController: true,
  }));
