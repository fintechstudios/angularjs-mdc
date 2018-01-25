import {MDCSimpleMenuController} from './simple/component';
import {MDCSimpleMenuItemController} from './simple-menu-item/component';
import {MDCMenuAnchorController} from './anchor/directive';
import {MDCSimpleMenuToggleController} from './toggle/directive';

angular
  .module('mdc.menu', [])
  .component(MDCSimpleMenuController.name, {
    controller: MDCSimpleMenuController,
    template: MDCSimpleMenuController.template,
    require: MDCSimpleMenuController.require,
    bindings: MDCSimpleMenuController.bindings,
    transclude: MDCSimpleMenuController.transclude,
  })
  .directive(MDCMenuAnchorController.name, () => ({
    controller: MDCMenuAnchorController,
  }))
  .directive(MDCSimpleMenuToggleController.name, () => ({
    controller: MDCSimpleMenuToggleController,
    bindToController: MDCSimpleMenuToggleController.bindings,
  }))
  .directive(MDCSimpleMenuItemController.name, () => ({
    controller: MDCSimpleMenuItemController,
    require: MDCSimpleMenuItemController.require,
    bindToController: MDCSimpleMenuItemController.bindings,
  }));
