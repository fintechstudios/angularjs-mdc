import {BindInjections} from '../util/bind-injections';
import {arrayUnion} from '../util/array-union';

import {MDCRippleMixin} from './mixin';


/**
 * @ngdoc directive
 * @name mdcRipple
 * @module mdc.ripple
 * @description Apply a ripple to the given element when clicked.
 *
 * @param {bool} [dataMdcRippleIsUnbounded] - override the unbounded property
 */
export class MDCRippleController extends MDCRippleMixin(BindInjections) {
  static get name() {
    return 'mdcRipple';
  }

  static get $inject() {
    return arrayUnion(super.$inject, ['$element']);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-ripple-surface');
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
    priority: Number.MIN_SAFE_INTEGER,
  }));
