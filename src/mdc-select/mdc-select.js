import {MDCSelectController} from './select/component';
import {MDCSelectItemController} from './item/directive';


/**
 * @ngdoc module
 * @name mdc.select
 * @description
 *
 * Select
 */
angular
  .module('mdc.select', [])
  .component(MDCSelectController.name, {
    controller: MDCSelectController,
    transclude: MDCSelectController.transclude,
    template: MDCSelectController.template,
    require: MDCSelectController.require,
    bindings: MDCSelectController.bindings,
  })
  .directive(MDCSelectItemController.name, () => ({
    controller: MDCSelectItemController,
    require: MDCSelectItemController.require,
    bindToController: MDCSelectItemController.bindings,
  }));
