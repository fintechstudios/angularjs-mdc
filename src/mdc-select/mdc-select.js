
import {MDCSelect, MDCSelectFoundation} from '@material/select';

/**
 * @ngdoc component
 * @name mdcSelect
 * @module mdc.select
 *
 * @param {expression} [dense] Display the select densely
 */
class MdcSelectController {
  constructor($element, $scope) {
    this.elem = $element;
    this.scope = $scope;
  }

  changeHandler(e) {
    if (this.ngModelCtrl) {
      this.ngModelCtrl.$setViewValue(this.mdc.getValue(), e.type);
    }
    e.stopPropagation();
  }

  $postLink() {
    if (this.multiple) {
      this.root_ = this.elem.children()[2];
    } else if (this.noAnimation) {
      this.root_ = this.elem.children()[1];
    } else {
      this.root_ = this.elem.children()[0];
    }
    console.log(this.root_);
    this.mdc = new MDCSelect(this.root_);
    if (!this.multiple && this.noAnimation) {
      this.mdc.listen(MDCSelectFoundation.strings.CHANGE_EVENT, this.changeHandler);
    }
  }

  $onChanges(changesObj) {
    if (changesObj.ngDisabled) {
      this.mdc.disabled = this.ngDisabled;
    }
  };

  $onDestory() {
    this.mdc.unlisten(MDCSelectFoundation.strings.CHANGE_EVENT, this.changeHandler);
    this.mdc.destroy();
  }
}


/**
 * @ngdoc directive
 * @name mdcOption
 * @module mdc.option
 * @restrict E
 * @description Binds a click handler to open the closest mdcSimpleMenu, unless an `id` is given as a value
 *
 */
function MdcOptionController() {
  return {
    require: {
      selectCtrl: '^^mdcSelect',
    },
    scope: {
      value: '@',
      ngDisabled: '=?',
      ngSelected: '=?',
    },
    restrict: 'E',
    replace: true,
    template: require('raw-loader!./mdc-option.html'),
    // link: (scope, element) => {},
  };
}


/**
 * @ngdoc module
 * @name mdc.select
 * @description
 *
 * Select
 */
angular
  .module('mdc.select', ['material.core.slim'])
  .component('mdcSelect', {
    controller: MdcSelectController,
    transclude: true,
    template: require('raw-loader!./mdc-select.html'),
    require: {ngModelCtrl: '?ngModel'},
    bindings: {
      ngModel: '=?',
      ngDisabled: '<?',
      noAnimation: '<?',
      prompt: '@',
      multiple: '<?',
    },
  })
  .directive('mdcOption', MdcOptionController);
