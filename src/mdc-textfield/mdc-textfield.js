import {MDCTextfield, MDCTextfieldFoundation} from '@material/textfield';

import {MDCRipple} from '@material/ripple';

class WrappedMDCTextField extends MDCTextfield {
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
    if (this.root_.classList.contains(MDCTextfieldFoundation.cssClasses.BOX)) {
      this.ripple = rippleFactory(this.root_);
    }
  }
}


/**
 * @ngdoc component
 * @name mdcTextfield
 * @module mdc.textfield
 *
 * @param {expression} [dense] - T/F display the textfield densely
 * @param {expression} [box] - T/F display the textfield with box styling
 * @param {expression} [fullwidth] - T/F display the textfield fullwidth
 */
class MdcTextfieldController {
  constructor($element, $scope) {
    this.elem = $element;
    this.scope = $scope;
    this.root_ = this.elem[0];
    this.boxBottomLineElem = undefined;
    this.elem.ready(() => {
      this.rebuild();
    });

    // changes in the inner DOM will require the MDCTextField to be rebuilt as it hooks onto DOM items
    this.domObserver = new MutationObserver(() => this.rebuild());
    // only way to detect inner input being disabled is through mutations
    this.disabledObserver = new MutationObserver((mutations) => this.onDisableMutation(mutations));
  }

  onDisableMutation(mutations) {
    this.elem.toggleClass('mdc-textfield--disabled', mutations[0].target.getAttribute('disabled') !== null);
  }

  rebuild() {
    if (this.mdc) {
      this.mdc.destroy();
    }
    this.elem.toggleClass('mdc-textfield--multiline', this.root_.getElementsByTagName('textarea').length > 0);
    this.mdc = new WrappedMDCTextField(this.root_);
    this.disabledObserver.disconnect(); // don't continue observing lost DOM
    this.disabledObserver.observe(this.mdc.input_, {attributes: true, attributeFilter: ['disabled']});
  }

  $postLink() {
    // DOM observer isn't activated until $postLink so that $onChanges can apply first
    this.domObserver.observe(this.root_, {childList: true, subtree: true});
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
    this.mdc.destroy();
  }
}


/**
 * @ngdoc module
 * @name mdc.textfield
 * @description
 *
 * Material Design Textfield
 */
angular
  .module('mdc.textfield', [])
  .component('mdcTextfield', {
    controller: MdcTextfieldController,
    bindings: {
      dense: '<?',
      box: '<?',
      fullwidth: '<?',
    },
  });
