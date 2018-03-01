import {has} from './has';

/**
 * Exposes getValue() to get the value from ngValue or value bindings.
 *
 * @mixin HasNgValue
 * @param Base
 */
export const HasNgValue = (Base) => class extends Base {
  static get bindings() {
    return Object.assign({ngValue: '<?', value: '@?'}, super.bindings);
  }

  getValue() {
    return has.call(this, 'ngValue') ? this.ngValue : this.value;
  }
};
