import {MDCMenuAnchorController} from './anchor/directive';

import {MDCMenuController} from './menu/component';
import {MDCMenuItemController} from './item/component';
import {MDCMenuToggleController} from './toggle/directive';


angular
  .module('mdc.menu', [])
  .directive(MDCMenuAnchorController.name, () => ({
    controller: MDCMenuAnchorController,
  }))
  .component(MDCMenuController.name, {
    controller: MDCMenuController,
    template: MDCMenuController.template,
    require: MDCMenuController.require,
    bindings: MDCMenuController.bindings,
    transclude: MDCMenuController.transclude,
  })
  .directive(MDCMenuToggleController.name, () => ({
    controller: MDCMenuToggleController,
    require: MDCMenuToggleController.require,
    bindToController: MDCMenuToggleController.bindings,
  }))
  .directive(MDCMenuItemController.name, () => ({
    controller: MDCMenuItemController,
    require: MDCMenuItemController.require,
    bindToController: MDCMenuItemController.bindings,
  }));
