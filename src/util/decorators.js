/* eslint no-invalid-this: 0, prefer-rest-params: 0 */
// snippets from http://me.dt.in.th/page/JavaScript-override/

/**
 * Wrap object.methodName so that the returned promise resolves with the
 * return value of the function the next time it is called. (only resolves once!)
 * @example
 * <pre><code>
 *   var person = new Person({name: 'Dylan'});
 *   var promise = wrapPromise(person, 'getName');
 *
 *   person.getName();
 *
 *   promise.then(function(name) {
 *    console.log(name); // logs 'Dylan'
 *   });
 * </pre></code>
 * @param {Object} object
 * @param {string} methodName
 * @return {Promise<any>}
 */
export function wrapPromise(object, methodName) {
  return new Promise((resolve) => {
    override(object, methodName, compose(function() {
      resolve(...arguments);
    }));
  });
}

/**
 * Decorate a function to execute extraBehavior after the original function.
 * extraBehavior is passed the return value of the original function.
 *
 * @example
 * <pre><code>
 * override(person, 'getName', compose(function(name) {
 *  return name.toUpperCase();
 * }))
 * </pre></code>
 * @param {Function} extraBehavior
 * @return {Function}
 */
export function compose(extraBehavior) {
  return function(original) {
    return function() {
      return extraBehavior.call(this, original.apply(this, arguments));
    };
  };
}

/**
 * Decorate a function to execute extraBehavior after the original function.
 * extraBehavior is passed the original arguments.
 *
 * @example
 * <pre><code>
 *   override(test, 'saveResults', after(function(filepath) {
 *    var planpath = filepath.replace('.xml', '_plan.xml');
 *    console.log('Save test plan to ' + planpath);
 *   }))
 * </pre></code>
 *
 * @param {Function} extraBehavior
 * @return {Function}
 */
export function after(extraBehavior) {
  return function(original) {
    return function() {
      const returnValue = original.apply(this, arguments);
      extraBehavior.apply(this, arguments);
      return returnValue;
    };
  };
}

/**
 * @callback decoratorCallback
 * @param {Function} original
 */

/**
 * Override methodName on object with callback, which will be passed the original function.
 *
 * @example
 * <pre><code>
 * var test = new Tester()
 *
 * override(test, 'saveResults', function(original) {
 *   return function(filepath) {
 *     var returnValue = original.apply(this, arguments);
 *     var planpath = filepath.replace('.xml', '_plan.xml');
 *     console.log('Save test plan to ' + planpath);
 *     return returnValue;
 *   }
 * })
 *
 * test.run()
 * </pre></code>
 * @param {object} object
 * @param {string} methodName
 * @param {decoratorCallback} callback
 */
export function override(object, methodName, callback) {
  object[methodName] = callback(object[methodName]);
}
