import {MDCListController} from './list/component';
import {MDCListItemController} from './item/directive';

/**
 * @ngdoc component
 * @name mdcDivider
 * @module mdc.list
 * @description Divider used for lists
 */


/**
 * @ngdoc component
 * @name mdcDividerInset
 * @module mdc.list
 * @description Divider used for lists with inset styling
 */

/**
 * @ngdoc module
 * @name mdc.list
 * @description
 *
 * List
 */
angular
  .module('mdc.list', [])
  .component(MDCListController.name, {
    controller: MDCListController,
    bindings: MDCListController.bindings,
  })
  .directive(MDCListItemController.name, () => ({
    controller: MDCListItemController,
    restrict: MDCListItemController.restrict,
  }));
