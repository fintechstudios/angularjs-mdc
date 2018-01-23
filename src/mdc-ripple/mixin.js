import {arrayUnion} from '../util/array-union';

import {MDCRipple} from '@material/ripple';


/**
 * Applies a ripple to this.$element and exposes as this.ripple.
 *
 * @mixin HasMDCRipple
 * @param Base - should extend BindInjections or a subclass thereof
 */
export const MDCRippleMixin = (Base) => class extends Base {
  static get $inject() {
    return arrayUnion(super.$inject, ['$element']);
  }

  constructor(...args) {
    super(...args);

    this.ripple = MDCRipple.attachTo(this.$element[0]);
  }

  $onDestroy() {
    if (super.$onDestroy) {
      super.$onDestroy();
    }

    if (this.ripple) {
      this.ripple.destroy();
    }
  }
};
