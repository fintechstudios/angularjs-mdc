require('angular-animate');
require('angular-material/modules/js/core/core.js');

import {MDCDialog} from '@material/dialog';


/**
 * @ngdoc component
 * @name mdcDialog
 * @module mdc.dialog
 */


/**
 * @ngdoc component
 * @name mdcDialogHeader
 * @module mdc.dialog
 */


/**
 * @ngdoc component
 * @name mdcDialogBody
 * @module mdc.dialog
 */


/**
 * @ngdoc component
 * @name mdcDialogFooter
 * @module mdc.dialog
 */


/**
 * @ngdoc service
 * @name $mdcDialog
 * @module mdc.dialog
 */
function $mdcDialogProvider($$interimElementProvider) {
  return $$interimElementProvider('$mdcDialog')
    .setDefaults({
      methods: ['disableParentScroll', 'hasBackdrop', 'clickOutsideToClose', 'escapeToClose',
        'targetEvent', 'closeTo', 'openFrom', 'parent', 'fullscreen', 'multiple'],
      options: defaultDialogOptions,
    })
    .addPreset('alert', {
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'theme', 'css'],
      options: presetDialogOptions,
    })
    .addPreset('confirm', {
      methods: ['title', 'htmlContent', 'textContent', 'content', 'ariaLabel', 'ok', 'cancel', 'theme', 'css'],
      options: presetDialogOptions,
    })
    .addPreset('prompt', {
      methods: ['title', 'htmlContent', 'textContent', 'initialValue', 'content', 'placeholder', 'ariaLabel',
        'ok', 'cancel', 'theme', 'css'],
      options: presetDialogOptions,
    });

  /* @ngInject */
  function presetDialogOptions($mdcDialog) {
    return {
      template: require('raw-loader!./mdc-dialog.html'),
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
  function defaultDialogOptions($mdcDialog, $injector, $document, $window, $rootElement) {
    return {
      hasBackdrop: true,
      isolateScope: true,
      onCompiling: beforeCompile,
      onShow: onShow,
      onShowing: beforeShow,
      onRemove: onRemove,
      clickOutsideToClose: false,
      escapeToClose: true,
      targetEvent: null,
      closeTo: null,
      openFrom: null,
      focusOnOpen: true,
      disableParentScroll: true,
      autoWrap: true,
      fullscreen: false,
      transformTemplate: function(template, options) {
        return validatedTemplate(template);

        /**
         * The specified template should contain a <mdc-dialog> wrapper element....
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
        const mdHtmlContent = controller.htmlContent || options.htmlContent || '';
        const mdTextContent = controller.textContent || options.textContent ||
          controller.content || options.content || '';

        if (mdHtmlContent && !$injector.has('$sanitize')) {
          throw Error('The ngSanitize module must be loaded in order to use htmlContent.');
        }

        if (mdHtmlContent && mdTextContent) {
          throw Error('md-dialog cannot have both `htmlContent` and `textContent`');
        }

        // Only assign the content if nothing throws, otherwise it'll still be compiled.
        controller.mdHtmlContent = mdHtmlContent;
        controller.mdTextContent = mdTextContent;
      }
    }

    function onShow(scope, element, options, controller) {
      options.parent = getDomElement(options.parent, $rootElement);

      options.parent.append(element).append(function() {
        // this doesn't actually append an element, but assures the element is in the DOM before continuing
        options.mdcDialog = new MDCDialog(element[0]);
        addEventListeners(element, options);
        options.mdcDialog.show();
      });
    }

    function addEventListeners(controller, options) {
      options.mdcDialog.listen('MDCDialog:accept', () => $mdcDialog.hide(controller.result));
      options.mdcDialog.listen('MDCDialog:cancel', () => $mdcDialog.cancel());
    }

    function onRemove(scope, element, options) {
      // TODO: remove event listeners and hide dialog before destruction
      options.mdcDialog.destroy();
      // Exposed cleanup function from the $mdCompiler.
      options.cleanupElement();
      // Restores the focus to the origin element if the last interaction upon opening was a keyboard.
      if (!options.$destroy && options.originInteraction === 'keyboard') {
        options.origin.focus();
      }
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
 * @param {Object} options - Either provide an `$mdDialogPreset` returned from `alert()`, and
 *      `confirm()`, or an options object with the following properties:
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
 * @param {DOMClickEvent} [options.targetEvent] - A click's event object. When passed in as an option,
 *     the location of the click will be used as the starting point for the opening animation
 *     of the the dialog.
 * @param {string|Element|Object} [options.openFrom] - The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) from which the Dialog will originate.
 * @param {string|Element|Object} [options.closeTo] - The query selector, DOM element or the Rect object
 *     that is used to determine the bounds (top, left, height, width) to which the Dialog will target.
 * @param {Object} [options.scope] - the scope to link the template / controller to. If none is specified,
 *     it will create a new isolate scope.
 *     This scope will be destroyed when the dialog is removed unless `preserveScope` is set to true.
 * @param {boolean} [options.preserveScope=false] - whether to preserve the scope when the element is removed.
 * @param {boolean} [options.disableParentScroll=true] - Whether to disable scrolling while the dialog is open.
 * @param {boolean} [options.hasBackdrop=true] - Whether there should be an opaque backdrop behind the dialog.
 * @param {boolean} [options.clickOutsideToClose=false] - Whether the user can click outside the dialog to close it.
 * @param {boolean} [options.escapeToClose=true] - Whether the user can press escape to close the dialog.
 * @param {boolean} [options.focusOnOpen=true] - An option to override focus behavior on open. Only disable if
 *     focusing some other way, as focus management is required for dialogs to be accessible.
 * @param {function|string} [options.controller] - The controller to associate with the dialog. The controller
 *     will be injected with the local `$mdDialog`, which passes along a scope for the dialog.
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
 * @param {boolean} [options.fullscreen=false] - Whether the dialog should show in fullscreen.
 * @param {boolean} [options.multiple=false] - Whether this dialog can display over one that's currently open.
 * @returns {promise} A promise that can be resolved with `$mdDialog.hide()` or rejected with `$mdDialog.cancel()`.
 */

angular
  .module('mdc.dialog', ['material.core'])
  .provider('$mdcDialog', $mdcDialogProvider);
