require('angular-debounce');

import {MDCTextField, MDCTextFieldFoundation} from '@material/textfield';
import {MDCRipple} from '@material/ripple';

import {bindLabelId} from '../util/bind-input-and-label';


class WrappedMDCTextField extends MDCTextField {
  initialize(rippleFactory = (el) => new MDCRipple(el)) {
    this.input_ = this.root_.querySelector('input, textarea');
    this.label_ = this.root_.querySelector('label');
    this.helptextElement = null;
    this.ripple = null;
    if (this.input_.hasAttribute('aria-controls')) {
      this.helptextElement = document.getElementById( // eslint-disable-line angular/document-service
        this.input_.getAttribute('aria-controls')
      );
    }
    if (this.root_.classList.contains(MDCTextFieldFoundation.cssClasses.BOX)) {
      this.ripple = rippleFactory(this.root_);
    }
  }
}


/**
 * @ngdoc component
 * @name mdcTextField
 * @module mdc.textfield
 *
 * @param {expression} [dense] - T/F display the textfield densely
 * @param {expression} [box] - T/F display the textfield with box styling
 * @param {expression} [fullwidth] - T/F display the textfield fullwidth
 */
class MdcTextFieldController {
  constructor($element, $scope, debounce) {
    this.elem = $element;
    this.scope = $scope;
    this.root_ = this.elem[0];
    this.isPostLink = false;
    this.boxBottomLineElem = undefined;
    this.elem.ready(() => {
      this.rebuild();
    });

    // changes in the inner DOM will require the MDCTextField to be rebuilt as it hooks onto DOM items
    this.domObserver = new MutationObserver(debounce(10, () => this.rebuild()));
    // only way to detect inner input being disabled is through mutations
    this.disabledObserver = new MutationObserver((mutations) => this.onDisableMutation(mutations));
  }

  onInputModelRender() {
    this.mdc.input_.value = this.inputModelCtrl.$viewValue;

    if (this.inputModelCtrl.$viewValue) {
      this.mdc.input_.dispatchEvent(new Event('input'));
    } else {
      this.mdc.input_.dispatchEvent(new Event('blur'));
    }
  }

  onDisableMutation(mutations) {
    this.elem.toggleClass('mdc-textfield--disabled', mutations[0].target.getAttribute('disabled') !== null);
  }

  observeDom() {
    this.domObserver.disconnect(); // make sure we're not observing twice
    this.domObserver.observe(this.root_, {childList: true, subtree: true});
  }

  rebuild() {
    this.domObserver.disconnect();
    this.disabledObserver.disconnect();

    if (this.mdc) {
      this.mdc.destroy();
    }
    this.elem.toggleClass('mdc-textfield--multiline', this.root_.getElementsByTagName('textarea').length > 0);
    this.mdc = new WrappedMDCTextField(this.root_);
    if (this.mdc.input_) { // if rebuilding during destruction,
      if (this.mdc.label_) { // not all  mdc-textfield types have a label
        bindLabelId(this.mdc.input_, this.mdc.label_, '--mdc-textfield-' + this.scope.$id);
      }
      this.disabledObserver.observe(this.mdc.input_, {attributes: true, attributeFilter: ['disabled']});
      this.observeDom();
      // if ng-model is on the input, it will modify the classlist but not fire native events - we will manually trigger
      if (this.mdc.input_.hasAttribute('ng-model')) {
        this.inputModelCtrl = angular.element(this.mdc.input_).controller('ngModel');
        if (this.inputModelCtrl) {
          this.inputModelCtrl.$render = () => this.onInputModelRender();
        }
      }
    }
  }

  $postLink() {
    // DOM observer isn't activated until $postLink so that $onChanges can apply first
    this.observeDom();
    this.isPostLink = true;
  }

  $onChanges(changesObj) {
    if (changesObj.fullwidth) {
      this.elem.toggleClass('mdc-textfield--fullwidth', this.fullwidth);
      if (!changesObj.fullwidth.isFirstChange()) {
        this.rebuild();
      }
    }
    if (changesObj.box) {
      this.elem.toggleClass('mdc-textfield--box', this.box);
      if (this.box && !this.boxBottomLineElem) {
        this.boxBottomLineElem = angular.element('<div class="mdc-textfield__bottom-line"></div>');
        this.elem.append(this.boxBottomLineElem);
      } else if (!this.box && this.boxBottomLineElem) {
        this.boxBottomLineElem.remove();
        this.boxBottomLineElem = undefined;
      }
    }
    if (changesObj.dense) {
      this.elem.toggleClass('mdc-textfield--dense', this.dense);
    }
  }

  $onDestroy() {
    this.disabledObserver.disconnect();
    this.domObserver.disconnect();
    if (this.mdc) {
      this.mdc.destroy();
    }
  }
}


/**
 * @ngdoc module
 * @name mdc.textfield
 * @description
 *
 * Material Design TextField
 */
angular
  .module('mdc.textfield', ['rt.debounce'])
  .component('mdcTextField', {
    controller: MdcTextFieldController,
    bindings: {
      dense: '<?',
      box: '<?',
      fullwidth: '<?',
    },
  });
