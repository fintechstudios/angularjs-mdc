require('../util/angular-material-core-slim');

import {MDCSnackbar, MDCSnackbarFoundation} from '@material/snackbar';


/**
 * @ngdoc component
 * @name mdcSnackbar
 * @module mdc.snackbar
 */


/**
 * @ngdoc service
 * @name $mdcSnackbar
 * @module mdc.snackbar
 */
function $mdcSnackbarProvider($$interimElementSlimProvider) {
  // Differentiate promise resolves: hide timeout (value == true) and hide action clicks (value == ok).
  const ACTION_RESOLVE = 'ok';

  let activeToastContent;

  function updateTextContent(newContent) {
    activeToastContent = newContent;
  }

  return $$interimElementSlimProvider('$mdcSnackbar')
    .setDefaults({
      methods: ['message', 'timeout', 'actionText', 'actionHandler', 'parent', 'multiline', 'actionOnBottom', 'align'],
      options: defaultSnackbarOptions,
    })
    .addPreset('simple', {
      argOption: 'textContent',
      methods: [],
      options: /* @ngInject */ function($mdcSnackbar) {
        return {
          template: require('raw-loader!./mdc-snackbar-service.html'),
          controller: /* @ngInject */ function mdcSnackbarCtrl($scope) {
            $scope.$watch(() => activeToastContent, () => this.content = activeToastContent);

            this.resolve = function() {
              $mdcSnackbar.hide(ACTION_RESOLVE);
            };
          },
          controllerAs: 'snackbar',
          bindToController: true,
        };
      },
    })
    .addMethod('updateTextContent', updateTextContent)
    .addMethod('updateContent', updateTextContent);

  /* @ngInject */
  function defaultSnackbarOptions($mdcSnackbar, $injector, $document, $rootElement, $q, $interval) {
    return {
      isolateScope: true,
      onCompiling: beforeCompile,
      onShow: onShow,
      onShowing: beforeShow,
      onRemove: onRemove,
      autoWrap: true,
      transformTemplate: function(template, options) {
        return validatedTemplate(template);

        /**
         * The specified template should contain a <mdc-snackbar> wrapper element
         */
        function validatedTemplate(template) {
          if (options.autoWrap && !/<\/mdc-snackbar>/g.test(template)) {
            return '<mdc-snackbar>' + (template || '') + '</mdc-snackbar>';
          } else {
            return template || '';
          }
        }
      },
    };

    const activeSnackbars = {};

    function beforeCompile(options) {
      if (activeSnackbars[options.template]) {
        options.skipCompile = true;
      }
    }

    function beforeShow(scope, element, options, controller) {
      options.mdcSnackbar = new MDCSnackbar(element[0]);
    }

    function onShow(scope, element, options, controller) {
      options.parent = getDomElement(options.parent, $rootElement);
      element.ready(() => { // wait for the DOM refresh before trying to show the snackbar
        addEventListeners(controller, options);
        options.mdcSnackbar.show({
          message: options.message,
          timeout: options.timeout,
          actionHandler: options.actionHandler,
          actionText: options.actionText,
          multiline: options.multiline,
          actionOnBottom: options.actionOnBottom,
        });
      });
      options.parent.append(element);
    }

    function onRemove(scope, element, options) {
      return $q(function(resolve, reject) {
        options.mdcSnackbar.close();
        const interval = $interval(function() {
          // wait for close animation to finish before destroying
          if (!element.hasClass(MDCSnackbarFoundation.cssClasses.ANIMATING)) {
            $interval.cancel(interval);
            resolve();
          }
        }, 10);
      }).then(function() {
        options.mdcSnackbar.destroy();
        // Exposed cleanup function from the $mdCompiler.
        options.cleanupElement();
        // Restores the focus to the origin element if the last interaction upon opening was a keyboard.
        if (!options.$destroy && options.originInteraction === 'keyboard') {
          options.origin.focus();
        }
      });
    }

    /**
     * If the specifier is a simple string selector, then query for
     * the DOM element.
     */
    function getDomElement(element, defaultElement) {
      if (angular.isString(element)) {
        element = $document[0].querySelector(element);
      }

      // If we have a reference to a raw dom element, always wrap it in jqLite
      return angular.element(element || defaultElement);
    }
  }
}

/**
 * @ngdoc service
 * @name $mdcSnackbar
 * @module mdc.snackbar
 *
 * @description
 * `$mdcSnackbar` is a service to build a toast notification on any position
 * on the screen with an optional duration, and provides a simple promise API.
 *
 * The toast will be always positioned at the `bottom`, when the screen size is
 * between `600px` and `959px` (`sm` breakpoint)
 *
 * ## Restrictions on custom toasts
 * - The toast's template must have an outer `<mdc-snackbar>` element.
 * - For a toast action, use element with class `mdc-action`.
 * - Add the class `md-capsule` for curved corners.
 *
 * ### Custom Presets
 * Developers are also able to create their own preset, which can be easily used without repeating
 * their options each time.
 *
 * <hljs lang="js">
 *   $mdcSnackbarProvider.addPreset('testPreset', {
  *     options: function() {
  *       return {
  *         template:
  *           '<md-toast>' +
  *             '<div class="md-toast-content">' +
  *               'This is a custom preset' +
  *             '</div>' +
  *           '</md-toast>',
  *         controllerAs: 'toast',
  *         bindToController: true
  *       };
  *     }
  *   });
 * </hljs>
 *
 * After you created your preset at config phase, you can easily access it.
 *
 * <hljs lang="js">
 *   $mdcSnackbar.show(
 *     $mdcSnackbar.testPreset()
 *   );
 * </hljs>
 *
 * ## Parent container notes
 *
 * The toast is positioned using absolute positioning relative to its first non-static parent
 * container. Thus, if the requested parent container uses static positioning, we will temporarily
 * set its positioning to `relative` while the toast is visible and reset it when the toast is
 * hidden.
 *
 * Because of this, it is usually best to ensure that the parent container has a fixed height and
 * prevents scrolling by setting the `overflow: hidden;` style. Since the position is based off of
 * the parent's height, the toast may be mispositioned if you allow the parent to scroll.
 *
 * You can, however, have a scrollable element inside of the container; just make sure the
 * container itself does not scroll.
 *
 * <hljs lang="html">
 * <div layout-fill id="toast-container">
 *   <md-content>
 *     I can have lots of content and scroll!
 *   </md-content>
 * </div>
 * </hljs>
 *
 * @usage
 * <hljs lang="html">
 * <div ng-controller="MyController">
 *   <md-button ng-click="openToast()">
 *     Open a Toast!
 *   </md-button>
 * </div>
 * </hljs>
 *
 * <hljs lang="js">
 * var app = angular.module('app', ['ngMaterial']);
 * app.controller('MyController', function($scope, $mdcSnackbar) {
  *   $scope.openToast = function($event) {
  *     $mdcSnackbar.show($mdcSnackbar.simple().textContent('Hello!'));
  *     // Could also do $mdcSnackbar.showSimple('Hello');
  *   };
  * });
 * </hljs>
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#showSimple
 *
 * @param {string} message The message to display inside the toast
 * @description
 * Convenience method which builds and shows a simple toast.
 *
 * @returns {promise} A promise that can be resolved with `$mdcSnackbar.hide()` or
 * rejected with `$mdcSnackbar.cancel()`.
 *
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#simple
 *
 * @description
 * Builds a preconfigured toast.
 *
 * @returns {object} a `$mdcSnackbarPreset` with the following chainable configuration methods.
 *
 * _**Note:** These configuration methods are provided in addition to the methods provided by
 * the `build()` and `show()` methods below._
 *
 * <table class="md-api-table methods">
 *    <thead>
 *      <tr>
 *        <th>Method</th>
 *        <th>Description</th>
 *      </tr>
 *    </thead>
 *    <tbody>
 *      <tr>
 *        <td>`.textContent(string)`</td>
 *        <td>Sets the toast content to the specified string</td>
 *      </tr>
 *      <tr>
 *        <td>`.action(string)`</td>
 *        <td>
 *          Adds an action button. <br/>
 *          If clicked, the promise (returned from `show()`)
 *          will resolve with the value `'ok'`; otherwise, it is resolved with `true` after a `hideDelay`
 *          timeout
 *        </td>
 *      </tr>
 *      <tr>
 *        <td>`.highlightAction(boolean)`</td>
 *        <td>
 *          Whether or not the action button will have an additional highlight class.<br/>
 *          By default the `accent` color will be applied to the action button.
 *        </td>
 *      </tr>
 *      <tr>
 *        <td>`.highlightClass(string)`</td>
 *        <td>
 *          If set, the given class will be applied to the highlighted action button.<br/>
 *          This allows you to specify the highlight color easily. Highlight classes are `md-primary`, `md-warn`
 *          and `md-accent`
 *        </td>
 *      </tr>
 *      <tr>
 *        <td>`.capsule(boolean)`</td>
 *        <td>Whether or not to add the `md-capsule` class to the toast to provide rounded corners</td>
 *      </tr>
 *      <tr>
 *        <td>`.theme(string)`</td>
 *        <td>Sets the theme on the toast to the requested theme. Default is `$mdThemingProvider`'s default.</td>
 *      </tr>
 *      <tr>
 *        <td>`.toastClass(string)`</td>
 *        <td>Sets a class on the toast element</td>
 *      </tr>
 *    </tbody>
 * </table>
 *
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#updateTextContent
 *
 * @description
 * Updates the content of an existing toast. Useful for updating things like counts, etc.
 *
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#build
 *
 * @description
 * Creates a custom `$mdcSnackbarPreset` that you can configure.
 *
 * @returns {object} a `$mdcSnackbarPreset` with the chainable configuration methods for shows' options (see below).
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#show
 *
 * @description Shows the toast.
 *
 * @param {object} optionsOrPreset Either provide an `$mdcSnackbarPreset` returned from `simple()`
 * and `build()`, or an options object with the following properties:
 *
 *   - `templateUrl` - `{string=}`: The url of an html template file that will
 *     be used as the content of the toast. Restrictions: the template must
 *     have an outer `md-toast` element.
 *   - `template` - `{string=}`: Same as templateUrl, except this is an actual
 *     template string.
 *   - `autoWrap` - `{boolean=}`: Whether or not to automatically wrap the template content with a
 *     `<div class="md-toast-content">` if one is not provided. Defaults to true. Can be disabled if you provide a
 *     custom toast directive.
 *   - `scope` - `{object=}`: the scope to link the template / controller to. If none is specified, it will create
 *      a new child scope.
 *     This scope will be destroyed when the toast is removed unless `preserveScope` is set to true.
 *   - `preserveScope` - `{boolean=}`: whether to preserve the scope when the element is removed. Default is false
 *   - `hideDelay` - `{number=}`: How many milliseconds the toast should stay
 *     active before automatically closing.  Set to 0 or false to have the toast stay open until
 *     closed manually. Default: 3000.
 *   - `position` - `{string=}`: Sets the position of the toast. <br/>
 *     Available: any combination of `'bottom'`, `'left'`, `'top'`, `'right'`, `'end'` and `'start'`.
 *     The properties `'end'` and `'start'` are dynamic and can be used for RTL support.<br/>
 *     Default combination: `'bottom left'`.
 *   - `toastClass` - `{string=}`: A class to set on the toast element.
 *   - `controller` - `{string=}`: The controller to associate with this toast.
 *     The controller will be injected the local `$mdcSnackbar.hide( )`, which is a function
 *     used to hide the toast.
 *   - `locals` - `{string=}`: An object containing key/value pairs. The keys will
 *     be used as names of values to inject into the controller. For example,
 *     `locals: {three: 3}` would inject `three` into the controller with the value
 *     of 3.
 *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
 *   - `resolve` - `{object=}`: Similar to locals, except it takes promises as values
 *     and the toast will not open until the promises resolve.
 *   - `controllerAs` - `{string=}`: An alias to assign the controller to on the scope.
 *   - `parent` - `{element=}`: The element to append the toast to. Defaults to appending
 *     to the root element of the application.
 *
 * @returns {promise} A promise that can be resolved with `$mdcSnackbar.hide()` or
 * rejected with `$mdcSnackbar.cancel()`. `$mdcSnackbar.hide()` will resolve either with a Boolean
 * value == 'true' or the value passed as an argument to `$mdcSnackbar.hide()`.
 * And `$mdcSnackbar.cancel()` will resolve the promise with a Boolean value == 'false'
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#hide
 *
 * @description
 * Hide an existing toast and resolve the promise returned from `$mdcSnackbar.show()`.
 *
 * @param {*=} response An argument for the resolved promise.
 *
 * @returns {promise} a promise that is called when the existing element is removed from the DOM.
 * The promise is resolved with either a Boolean value == 'true' or the value passed as the
 * argument to `.hide()`.
 *
 */

/**
 * @ngdoc method
 * @name $mdcSnackbar#cancel
 *
 * @description
 * `DEPRECATED` - The promise returned from opening a toast is used only to notify about the closing of the toast.
 * As such, there isn't any reason to also allow that promise to be rejected,
 * since it's not clear what the difference between resolve and reject would be.
 *
 * Hide the existing toast and reject the promise returned from
 * `$mdcSnackbar.show()`.
 *
 * @param {*=} response An argument for the rejected promise.
 *
 * @returns {promise} a promise that is called when the existing element is removed from the DOM
 * The promise is resolved with a Boolean value == 'false'.
 *
 */


angular
  .module('mdc.snackbar', ['material.core.slim'])
  .provider('$mdcSnackbar', $mdcSnackbarProvider);
