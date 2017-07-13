
/**
 * @ngdoc service
 * @name $componentGenerator
 * @description
 * Creates a mock component generator that wraps extra functionality for unit-testing.
 *
 * @param {string} componentName the camelCase name of the component to mock
 * @returns {$mockComponent} Mock component generator
 */
class ComponentGeneratorProvider {
  $get($rootScope, $compile, $camelToKebab) {
    return function $componentGenerator(componentName) {
      /**
       * @name $mockComponent
       * @param {Object} [bindings={}] Properties to add to the component element
       * @param {Object} [locals={}] Properties to add to the $parentScope pre-compile
       * @param {boolean} [doCompile=true] Compile the Controller within `$parentScope`
       */
      class $mockComponent {
        constructor(bindings = {}, locals = {}, doCompile = true) {
          this._name = componentName;
          this._tagName = $camelToKebab(this._name);

          this.$element = angular.element(`<${this.tagName}></${this.tagName}>`);
          for (const attr in bindings) {
            if (bindings.hasOwnProperty(attr)) {
              this.$element.attr($camelToKebab(attr), bindings[attr]);
            }
          }

          this._$parentScope = $rootScope.$new(true);
          for (const variable in locals) {
            if (locals.hasOwnProperty(variable)) {
              this._$parentScope[variable] = locals[variable];
            }
          }

          if (doCompile) {
            this.compile();
          }
        }

        /**
         * Compile the Controller within `$parentScope`
         * @method compile
         */
        compile() {
          $compile(this.$element)(this.$parentScope);
        }

        /**
         * Convenience function to kick off a digestion cycle of $parentScope
         * @method digest
         */
        digest() {
          this.$parentScope.$$childHead.$apply();
        }

        /**
         * Convenience function to update variable in controller's $parentScope
         * @method updateParent
         *
         * @param {string} variable the variable name to update
         * @param {*} newValue the new value to update the binding to
         */
        updateParent(variable, newValue) {
          this.$parentScope[variable] = newValue;

          this.digest();
        }

        /**
         * compile() must be called first or the reference will be undefined
         * @returns {Object} A reference to the instantiated controller
         */
        get $ctrl() {
          return this.$childScope ? this.$childScope.$ctrl : undefined;
        }

        /**
         * @returns {Object} The scope the controller is (or will be) bound to.
         */
        get $childScope() {
          return this.$parentScope.$$childHead;
        }

        /**
         * @returns {Object} The parent scope of the controller.
         */
        get $parentScope() {
          return this._$parentScope;
        }

        /**
         * @returns {string} the camelCase name of the component
         */
        get name() {
          return this._name;
        }

        /**
         * @returns {string} the kebab-case name of the component's element
         */
        get tagName() {
          return this._tagName;
        }
      }
      return $mockComponent;
    };
  };
}

const UPPERCASE_REGEXP = /([A-Z])/g;
function fnKebabCaseReplace(all, letter) {
  return '-' + letter.toLowerCase();
}

/**
 * Converts camelCase word to kebab-case
 * @param {string} name
 */
function camelToKebab(name) {
  return name.replace(UPPERCASE_REGEXP, fnKebabCaseReplace);
}

angular.module('ngMockComponent', ['ngMock'])
  .factory('$camelToKebab', [() => (name) => camelToKebab(name)])
  .provider({
    $componentGenerator: [ComponentGeneratorProvider],
  });
