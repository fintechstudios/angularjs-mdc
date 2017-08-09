require('angular-debounce');

import {MDCSelect, MDCSelectFoundation} from '@material/select';

/**
 * @ngdoc component
 * @name mdcSelect
 * @module mdc.select
 *
 * @param {string} [prompt] Default empty-value option to present to user
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to
 * @param {expression} [noAnimation=false] Enable/Disable the use of JS animation (better on small screens)
 * @param {expression} [autoResize=true] Automatically switch to noAnimation select on small screens.
 * @param {string} [multiple=false] Enable/Disable multiple selection.
 * @param {string} [size] When multiple select is disabled, sets size of select.
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 */
class MdcSelectController {
  constructor($element, $scope, $window, debounce) {
    this.elem = $element;
    this.scope = $scope;
    this.window = angular.element($window);
    this.debounce = debounce;

    this.build = this.debounce(10, () => {
      // the MDCSelect element won't be initialized when noAnimation or multiple because it will never be shown
      if (!this.multiple && !this.noAnimation) {
        if (this.boundResizeHandler) {
          this.window.off('resize', this.boundResizeHandler);
        }
        if (this.boundChangeHandler) {
          this.mdc.unlisten(MDCSelectFoundation.strings.CHANGE_EVENT, this.boundChangeHandler);
        }
        if (this.mdc) {
          this.mdc.destroy();
        }

        const mdcOptions = this.elem.children()[0].querySelectorAll('option');
        angular.forEach(mdcOptions, function(e) {
          e.setAttribute('role', 'option');
          e.className += ' mdc-list-item';
          e.setAttribute('id', e.getAttribute('value'));
        });

        this.mdc = new MDCSelect(this.elem.children()[0]);
        this.boundChangeHandler = (e) => this.changeHandler(e);
        this.mdc.listen(MDCSelectFoundation.strings.CHANGE_EVENT, this.boundChangeHandler);

        // setup resize handler
        this.autoResize = (this.autoResize === undefined && this.noAnimation === undefined) ? true : this.autoResize;
        if (this.autoResize) {
          this.boundResizeHandler = this.debounce(200, () => this.resizeHandler());
          this.window.on('resize', this.boundResizeHandler);
          this.boundResizeHandler();
        }

        // setup ngModelCtrl
        if (this.ngModelCtrl) {
          this.ngModelCtrl.$render = () => {
            let selectedIndex = -1;
            this.mdc.options.forEach((option, i) => {
              if (option.value == this.ngModelCtrl.$viewValue) {
                selectedIndex = i;
                return 0;
              }
            });
            this.mdc.selectedIndex = selectedIndex;
          };
          if (this.ngModel) {
            this.ngModelCtrl.$render();
          }
        }
      }

      if (this.ngDisabled && this.mdc) {
        this.mdc.disabled = this.ngDisabled;
      }
    });
    this.observer = new MutationObserver(() => this.build());
  }

  changeHandler(e) {
    if (this.ngModelCtrl) {
      this.ngModelCtrl.$setViewValue(this.mdc.value, e.type);
    }
    e.stopPropagation();
  }

  resizeHandler() {
    const isSmall = this.window[0].innerWidth < 960;
    if (isSmall !== !!this.noAnimation) { // prevent redraw on first init large screen
      this.noAnimation = isSmall;
    }
  }

  $postLink() {
    this.elem.ready(() => {
      this.build();
      this.observer.observe(this.elem.children()[1], {childList: true, subtree: true});
    });
  }

  $onChanges(changesObj) {
    if (this.mdc) {
      if (changesObj.ngDisabled) {
        this.mdc.disabled = this.ngDisabled;
      }
    }
  };

  $onDestory() {
    this.observer.disconnect();
    if (this.boundResizeHandler) {
      this.window.off('resize', this.boundResizeHandler);
    }
    if (this.boundChangeHandler) {
      this.mdc.unlisten(MDCSelectFoundation.strings.CHANGE_EVENT, this.boundChangeHandler);
    }
    this.mdc.destroy();
  }
}


/**
 * @ngdoc module
 * @name mdc.select
 * @description
 *
 * Select
 */
angular
  .module('mdc.select', ['rt.debounce'])
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
      multiple: '@',
      size: '<?',
      autoResize: '<?',
    },
  });
