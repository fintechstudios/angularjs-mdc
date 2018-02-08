import {arrayUnion} from '../util/array-union';

import {MDCRipple} from '@material/ripple';


/**
 * Applies a ripple to this.rippleElement and exposes as this.ripple.
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

  /**
   * The element to bind the ripple to. Should have or extend the `mdc-ripple-surface` class
   * @return {JQLite}
   */
  get rippleElement() {
    return this.$element;
  }

  constructor(...args) {
    super(...args);

    this.ripple = {};
    this.rippleElement.ready(() => {
      if (this.ripple.doDestroy) {
        return;
      }
      // if unbounded is assigned before ready, we pass it in
      this.ripple = MDCRipple.attachTo(this.rippleElement[0], {isUnbounded: this.ripple.unbounded});
    });
  }

  $onDestroy() {
    super.$onDestroy();

    if (!this.ripple.destroy) {
      this.ripple.doDestroy = true; // destroyed before element ready
      return;
    }
    // ensure MDCRipple has DOM to attach to so destroy doesn't fail
    if (!this.ripple.root_) {
      this.ripple.root_ = angular.element('<div></div>')[0];
    }
    this.ripple.destroy();
  }
};
