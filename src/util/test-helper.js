
import {normalize} from './normalize';

/**
 * Convenience class for using with $onChanges()
 *
 * Usage: `ctrl.$onChanges({item: changesObj('new')});`
 *
 * @param currentValue
 * @param [previousValue=Object]
 * @returns {{currentValue: *, previousValue: (*|{})}}
 */
export function changesObj(currentValue, previousValue={}) {
  return {
    currentValue: currentValue,
    previousValue: previousValue || {},
  };
}

/**
 * Creates a new component with proper bindings
 * @param {Function} $componentController Pass in with inject(function($componentController) {})
 * @param {string} componentName the kebab-case-name of the component
 * @returns {makeCtrl} Component generator
 */
export function getComponentGenerator($componentController, componentName) {
  /**
   * Make a new controller and execute initial lifecycle events   *
   * @param {Object} [bindings={}] Properties to add to the controller before invoking the constructor. This is used
   *                               to simulate the `bindToController` feature and simplify certain kinds of tests.
   * @returns {Object} instance of requested controller
   */
  function makeCtrl(bindings={}) {
    const e = angular.element(`<${componentName}></${componentName}>`);
    const ctrl = $componentController(normalize(componentName), {
      $element: e,
    }, bindings);

    const changes = {};
    for (const key in bindings) {
      if (bindings.hasOwnProperty(key)) {
        changes[key] = changesObj(key, bindings[key]);
      }
    }
    if (ctrl.$onChanges) {
      ctrl.$onChanges(changes);
    }
    if (ctrl.$postLink) {
      ctrl.$postLink();
    }
    return ctrl;
  }
  return makeCtrl;
}
