import {has} from './has';

/**
 * To use, extend class with BindInjections and define injections in the following form:
 * ```
 *   static get $inject() {
 *     return ['$dep1', 'dep2'];
 *   }
 *
 *   constructor(...args) {
 *     super(...args);
 *
 *    # this.$dep1 and this.dep2 are now accessible here
 *   }
 * ```
 *
 * Alternatively, if subclassing, bind injections using `union`:
 * ```
 *   static get $inject() {
 *     return super.$inject.union(['$dep1', 'dep2']);
 *   }
 * ```
 * @class BindInjections
 */
export class BindInjections {
  constructor() {
    this.constructor.$inject.map((name, i) => {
      if (!has.call(this, name)) {
        this[name] = arguments[i]; /* eslint prefer-rest-params: 0 */
      }
    });
  }

  static get $inject() {
    return [];
  }
}
