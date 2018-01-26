import {MDCMenuAnchorController} from './anchor/directive';

import {MDCSimpleMenuController} from './simple/menu/component';
import {MDCSimpleMenuItemController} from './simple/item/component';
import {MDCSimpleMenuToggleController} from './simple/toggle/directive';


angular
  .module('mdc.menu', [])
  .directive(MDCMenuAnchorController.name, () => ({
    controller: MDCMenuAnchorController,
  }))
  .component(MDCSimpleMenuController.name, {
    controller: MDCSimpleMenuController,
    template: MDCSimpleMenuController.template,
    require: MDCSimpleMenuController.require,
    bindings: MDCSimpleMenuController.bindings,
    transclude: MDCSimpleMenuController.transclude,
  })
  .directive(MDCSimpleMenuToggleController.name, () => ({
    controller: MDCSimpleMenuToggleController,
    bindToController: MDCSimpleMenuToggleController.bindings,
  }))
  .directive(MDCSimpleMenuItemController.name, () => ({
    controller: MDCSimpleMenuItemController,
    require: MDCSimpleMenuItemController.require,
    bindToController: MDCSimpleMenuItemController.bindings,
  }));
