import {BindInjections} from '../util/bind-injections';
import {arrayUnion} from '../util/array-union';

import {MDCRippleMixin} from './mixin';


/**
 * @ngdoc directive
 * @name mdcRipple
 * @module mdc.ripple
 * @description Apply a ripple to the given element when clicked.
 *
 * @param {bool} [mdcRippleIsUnbounded] - override the unbounded property
 */
export class MDCRippleController extends MDCRippleMixin(BindInjections) { /* eslint new-cap: 0 */
  static get name() {
    return 'mdcRipple';
  }

  static get bindings() {
    return {
      mdcRippleIsUnbounded: '<?',
    };
  }

  static get $inject() {
    return arrayUnion(super.$inject, ['$scope']);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-ripple-surface');

    this.$scope.$watch('mdcRippleIsUnbounded', () => {
      if (this.$scope.mdcRippleIsUnbounded !== undefined) {
        this.ripple.unbounded = this.$scope.mdcRippleIsUnbounded;
      }
    });
  }
}


/**
 * Ripple
 *
 * @ngdoc module
 * @name mdc.ripple
 */
angular
  .module('mdc.ripple', [])
  .directive(MDCRippleController.name, () => ({
    controller: MDCRippleController,
    scope: MDCRippleController.bindings,
  }));
