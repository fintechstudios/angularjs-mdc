import {MDCMenuAnchorController} from '../../mdc-menu/anchor/directive';
import {MDCMenuToggleController} from '../../mdc-menu/toggle/directive';
import {MDCExperimentalMenuController} from './menu';
import {MDCExperimentalMenuItemController} from './item';

angular
  .module('mdc.menu-experimental', [])
  .directive(MDCMenuAnchorController.name, () => ({
    controller: MDCMenuAnchorController,
  }))
  .component(MDCExperimentalMenuController.name, {
    controller: MDCExperimentalMenuController,
    template: MDCExperimentalMenuController.template,
    require: MDCExperimentalMenuController.require,
    bindings: MDCExperimentalMenuController.bindings,
    transclude: MDCExperimentalMenuController.transclude,
  })
  .directive(MDCMenuToggleController.name, () => ({
    controller: MDCMenuToggleController,
    require: MDCMenuToggleController.require,
    bindToController: MDCMenuToggleController.bindings,
  }))
  .directive(MDCExperimentalMenuItemController.name, () => ({
    controller: MDCExperimentalMenuItemController,
    require: MDCExperimentalMenuItemController.require,
    bindToController: MDCExperimentalMenuItemController.bindings,
  }));
