/**
 * @ngdoc component
 * @name mdcList
 * @module mdc.list
 *
 * @param {expression} [dense] T/F whether to display the list densely
 * @param {expression} [avatar] T/F whether to display the list in avatar-style
 * @param {expression} [twoLine] T/F whether to display the list in two-line style
 *
 */
class MdcListController {
  constructor($element) {
    this.elem = $element;
  }

  $onChanges(changesObj) {
    if (changesObj.dense) {
      this.elem.toggleClass('mdc-list--dense', this.dense);
    }
    if (changesObj.avatar) {
      this.elem.toggleClass('mdc-list--avatar-list', this.avatar);
    }
    if (changesObj.twoLine) {
      this.elem.toggleClass('mdc-list--two-line', this.twoLine);
    }
  };
}

/**
 * @ngdoc component
 * @name mdcListItem
 * @module mdc.list
 *
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
  .component('mdcList', {
    controller: MdcListController,
    bindings: {
      dense: '<?',
      avatar: '<?',
      twoLine: '<?',
    },
  });