import {arrayUnion} from '../util/array-union';

import {MDCRipple} from '@material/ripple';


/**
 * Applies a ripple to this.$element and exposes as this.ripple.
 *
 * The element must have or extend the `mdc-ripple-surface` class
 *
 * @mixin MDCRippleMixin
 * @param Base - should extend BaseComponent
 */
export const MDCRippleMixin = (Base) => class extends Base {
  static get $inject() {
    return arrayUnion(['$element'], super.$inject);
  }

  constructor(...args) {
    super(...args);

    this.ripple = {};
    this.$element.ready(() => {
      if (this.ripple.doDestroy) {
        return;
      }
      // if unbounded is assigned before ready, we pass it in
      this.ripple = MDCRipple.attachTo(this.$element[0], {isUnbounded: this.ripple.unbounded});
    });
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.ripple.destroy) {
      this.ripple.destroy();
    } else {
      this.ripple.doDestroy = true;
    }
  }
};
