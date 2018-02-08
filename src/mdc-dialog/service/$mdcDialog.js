import {MDCDialog, MDCDialogFoundation} from '@material/dialog';

import defaultTemplate from './default-template.html';


/**
 * @ngdoc service
 * @name $mdcDialog
 * @module mdc.dialog
 */
/* @ngInject */
export function $mdcDialogProvider($$interimElementSlimProvider) {
  return $$interimElementSlimProvider('$mdcDialog')
    .setDefaults({
      methods: ['parent'],
      options: defaultDialogOptions,
    })
    .addPreset('alert', {
      methods: ['title', 'htmlContent', 'textContent', 'ok', 'css', 'scrollable'],
      options: presetDialogOptions,
    })
    .addPreset('confirm', {
      methods: ['title', 'htmlContent', 'textContent', 'ok', 'cancel', 'css', 'scrollable'],
      options: presetDialogOptions,
    })
    .addPreset('prompt', {
      methods: ['title', 'htmlContent', 'textContent', 'initialValue', 'placeholder',
        'ok', 'cancel', 'css', 'scrollable'],
      options: presetDialogOptions,
    });

  /* @ngInject */
  function presetDialogOptions($mdcDialog) {
    return {
      template: defaultTemplate,
      controller: function mdcDialogCtrl() {
        const isPrompt = this.$type === 'prompt';

        if (isPrompt && this.initialValue) {
          this.result = this.initialValue;
        }

        this.keypress = function($event) {
          if ($event.keyCode === 13) {
            $mdcDialog.hide(this.result);
          }
        };
      },
      controllerAs: 'dialog',
      bindToController: true,
    };
  }

  /* @ngInject */
  function defaultDialogOptions($mdcDialog, $injector, $document, $rootElement, $q, $interval) {
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
         * The specified template should contain a <mdc-dialog> wrapper element
         */
        function validatedTemplate(template) {
          if (options.autoWrap && !/<\/mdc-dialog>/g.test(template)) {
            return '<mdc-dialog>' + (template || '') + '</mdc-dialog>';
          } else {
            return template || '';
          }
        }
      },
    };

    function beforeCompile(options) {
    }

    function beforeShow(scope, element, options, controller) {
      if (controller) {
        const mdcHtmlContent = controller.htmlContent || options.htmlContent || '';
        const mdcTextContent = controller.textContent || options.textContent ||
          controller.content || options.content || '';

        if (mdcHtmlContent && !$injector.has('$sanitize')) {
          throw Error('The ngSanitize module must be loaded in order to use htmlContent.');
        }

        if (mdcHtmlContent && mdcTextContent) {
          throw Error('mdc-dialog cannot have both `htmlContent` and `textContent`');
        }

        // Only assign the content if nothing throws, otherwise it'll still be compiled.
        controller.mdcHtmlContent = mdcHtmlContent;
        controller.mdcTextContent = mdcTextContent;
      }
      options.mdcDialog = new MDCDialog(element[0]);
    }

    function onShow(scope, element, options, controller) {
      options.parent = getDomElement(options.parent, $rootElement);
      element.ready(() => { // wait for the DOM refresh before trying to show the dialog
        addEventListeners(controller, options);
        options.mdcDialog.show();
      });
      options.parent.append(element);
    }

    function onRemove(scope, element, options) {
      return $q(function(resolve, reject) {
        removeEventListeners(options);
        options.mdcDialog.close();
        const interval = $interval(function() {
          // wait for close animation to finish before destroying
          if (!element.hasClass(MDCDialogFoundation.cssClasses.ANIMATING)) {
            $interval.cancel(interval);
            resolve();
          }
        }, 10);
      }).then(function() {
        options.mdcDialog.destroy();
        // Exposed cleanup function from the $mdCompiler.
        options.cleanupElement();
        // Restores the focus to the origin element if the last interaction upon opening was a keyboard.
        if (!options.$destroy && options.originInteraction === 'keyboard') {
          options.origin.focus();
        }
      });
    }

    function addEventListeners(controller, options) {
      options.onAcceptHandler = (e) => {
        e.stopPropagation();
        $mdcDialog.hide(controller ? controller.result : undefined);
      };
      options.onCancelHandler = (e) => {
        e.stopPropagation();
        $mdcDialog.cancel();
      };

      options.mdcDialog.listen(MDCDialogFoundation.strings.ACCEPT_EVENT, options.onAcceptHandler);
      options.mdcDialog.listen(MDCDialogFoundation.strings.CANCEL_EVENT, options.onCancelHandler);
    }

    function removeEventListeners(options) {
      options.mdcDialog.unlisten(MDCDialogFoundation.strings.ACCEPT_EVENT, options.onAcceptHandler);
      options.mdcDialog.unlisten(MDCDialogFoundation.strings.CANCEL_EVENT, options.onCancelHandler);
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
 * @ngdoc method
 * @name $mdcDialog#show
 *
 * @description Show a dialog with the specified options.
 *
 * @param {Object} options - Either provide an `$mdcDialogPreset` or an options object with the following properties:
 * @param {string} [options.templateUrl] - The url of a template that will be used as the content
 *      of the dialog.
 * @param {string} [options.template] - HTML template to show in the dialog. This **must** be trusted HTML
 *      with respect to Angular's [$sce service](https://docs.angularjs.org/api/ng/service/$sce).
 *      This template should **never** be constructed with any kind of user input or user data.
 * @param {string|Element} [options.contentElement] - Instead of using a template, which will be compiled each time a
 *     dialog opens, you can also use a DOM element.
 *     When specifying an element, which is present on the DOM, `$mdcDialog` will temporary fetch the element into
 *     the dialog and restores it at the old DOM position upon close.
 *     When specifying a string, the string be used as a CSS selector, to lookup for the element in the DOM.
 * @param {boolean} [options.autoWrap] - Whether or not to automatically wrap the template with a
 *     `<mdc-dialog>` tag if one is not provided. Defaults to true. Can be disabled if you provide a
 *     custom dialog directive.
 * @param {Object} [options.scope] - the scope to link the template / controller to. If none is specified,
 *     it will create a new isolate scope.
 *     This scope will be destroyed when the dialog is removed unless `preserveScope` is set to true.
 * @param {boolean} [options.preserveScope=false] - whether to preserve the scope when the element is removed.
 * @param {function|string} [options.controller] - The controller to associate with the dialog. The controller
 *     will be injected with the local `$mdcDialog`, which passes along a scope for the dialog.
 * @param {Object} [options.locals] - An object containing key/value pairs. The keys will be used as names
 *     of values to inject into the controller. For example, `locals: {three: 3}` would inject
 *     `three` into the controller, with the value 3. If `bindToController` is true, they will be
 *     copied to the controller instead.
 * @param {boolean} options.bindToController - bind the locals to the controller, instead of passing them in.
 * @param {Object} [options.resolve] - Similar to locals, except it takes promises as values, and the
 *     dialog will not open until all of the promises resolve.
 * @param {string} [options.controllerAs] - An alias to assign the controller to on the scope.
 * @param {Element} [options.parent] - The element to append the dialog to. Defaults to appending
 *     to the root element of the application.
 * @param {function} [options.onShowing] - Callback function used to announce the show() action is
 *     starting.
 * @param {function} [options.onComplete] - Callback function used to announce when the show() action is
 *     finished.
 * @param {function} [options.onRemoving] - Callback function used to announce the
 *      close/hide() action is starting. This allows developers to run custom animations
 *      in parallel the close animations.
 * @returns {promise} A promise that can be resolved with `$mdcDialog.hide()` or rejected with `$mdcDialog.cancel()`.
 */


/**
 * @ngdoc method
 * @name $mdcDialog#alert
 *
 * @description
 * Builds a preconfigured dialog with the specified message.
 *
 * @returns {Object} an `$mdcDialogPreset` with the chainable configuration methods:
 *
 * - $mdcDialogPreset#title(string) - Sets the alert title.
 * - $mdcDialogPreset#textContent(string) - Sets the alert message.
 * - $mdcDialogPreset#htmlContent(string) - Sets the alert message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdcDialogPreset#ok(string) - Sets the alert "Okay" button text.
 * - $mdcDialogPreset#css(string) - Custom classes to apply to mdc-dialog using ng-class
 * - $mdcDialogPreset#scrollable(boolean) - Whether the body of the element has a vertical scrollbar
 *
 */


/**
 * @ngdoc method
 * @name $mdcDialog#confirm
 *
 * @description
 * Builds a preconfigured dialog with the specified message. You can call show and the promise returned
 * will be resolved only if the user clicks the confirm action on the dialog.
 *
 * @returns {Object} an `$mdcDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdcDialogPreset#title(string) - Sets the confirm title.
 * - $mdcDialogPreset#textContent(string) - Sets the confirm message.
 * - $mdcDialogPreset#htmlContent(string) - Sets the confirm message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdcDialogPreset#ok(string) - Sets the confirm "Okay" button text.
 * - $mdcDialogPreset#cancel(string) - Sets the confirm "Cancel" button text.
 * - $mdcDialogPreset#css(string) - Custom classes to apply to mdc-dialog using ng-class
 * - $mdcDialogPreset#scrollable(boolean) - Whether the body of the element has a vertical scrollbar
 *
 */


/**
 * @ngdoc method
 * @name $mdcDialog#prompt
 *
 * @description
 * Builds a preconfigured dialog with the specified message and input box. You can call show and the promise returned
 * will be resolved only if the user clicks the prompt action on the dialog, passing the input value
 * as the first argument.
 *
 * @returns {Object} an `$mdcDialogPreset` with the chainable configuration methods:
 *
 * Additionally, it supports the following methods:
 *
 * - $mdcDialogPreset#title(string) - Sets the prompt title.
 * - $mdcDialogPreset#textContent(string) - Sets the prompt message.
 * - $mdcDialogPreset#htmlContent(string) - Sets the prompt message as HTML. Requires ngSanitize
 *     module to be loaded. HTML is not run through Angular's compiler.
 * - $mdcDialogPreset#placeholder(string) - Sets the placeholder text for the input.
 * - $mdcDialogPreset#initialValue(string) - Sets the initial value for the prompt input.
 * - $mdcDialogPreset#ok(string) - Sets the prompt "Okay" button text.
 * - $mdcDialogPreset#cancel(string) - Sets the prompt "Cancel" button text.
 * - $mdcDialogPreset#css(string) - Custom classes to apply to mdc-dialog using ng-class
 * - $mdcDialogPreset#scrollable(boolean) - Whether the body of the element has a vertical scrollbar
 *
 */


/**
 * @ngdoc method
 * @name $mdcDialog#hide
 *
 * @description Hide an existing dialog and resolve the promise returned from `$mdcDialog.show()`.
 *
 * @param {*=} response An argument for the resolved promise.
 *
 * @returns {promise} A promise that is resolved when the dialog has been closed.
 */


/**
 * @ngdoc method
 * @name $mdcDialog#cancel
 *
 * @description Hide an existing dialog and reject the promise returned from `$mdcDialog.show()`.
 *
 * @param {*=} response An argument for the rejected promise.
 *
 * @returns {promise} A promise that is resolved when the dialog has been closed.
 */
