import {BaseComponent} from '../util/base-component';
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
export class MDCRippleController extends MDCRippleMixin(BaseComponent) {
  static get name() {
    return 'mdcRipple';
  }

  static get $inject() {
    return arrayUnion(['$element'], super.$inject);
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-ripple-surface');
  }
}
