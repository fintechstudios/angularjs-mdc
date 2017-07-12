
import {normalize} from './normalize';


function UNINITIALIZED_VALUE() {}
export const _UNINITIALIZED_VALUE = new UNINITIALIZED_VALUE();

/**
 * From AngularJS - generates keys for use with $onChanges()
 *
 * Usage: `ctrl.$onChanges({item: SimpleChange('new')});`
 *
 * @param current
 * @param [previous=_UNINITIALIZED_VALUE]
 * @returns {{currentValue: *, previousValue: (*|{})}}
 */
export class SimpleChange {
  constructor(current, previous=_UNINITIALIZED_VALUE) {
    this.previousValue = previous;
    this.currentValue = current;
  }

  isFirstChange() {
    return this.previousValue === _UNINITIALIZED_VALUE;
  }
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

    /**
     * Utility function to simulate binding update on controller.
     * @param {string} binding the binding to update
     * @param newValue the new value to update the binding to
     */
    ctrl._update_ = function(binding, newValue) {
      const changes = {};
      changes[binding] = new SimpleChange(newValue, this[binding]);
      this[binding] = newValue;
      if (this.$onChanges) {
        this.$onChanges(changes);
      }
    };

    const changes = {};
    for (const key in bindings) {
      if (bindings.hasOwnProperty(key)) {
        changes[key] = new SimpleChange(bindings[key]);
      }
    }
    if (ctrl.$onChanges) {
      ctrl.$onChanges(changes);
    }
    if (ctrl.$onInit) {
      ctrl.$onInit();
    }
    if (ctrl.$postLink) {
      ctrl.$postLink();
    }
    return ctrl;
  }
  return makeCtrl;
}
