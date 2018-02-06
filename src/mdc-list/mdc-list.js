import {MDCListController} from './list';

/**
 * @ngdoc component
 * @name mdcListItem
 * @module mdc.list
 */

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
//  .component('mdcListItem', {});
  .component(MDCListController.name, {
    controller: MDCListController,
    bindings: MDCListController.bindings,
  });
