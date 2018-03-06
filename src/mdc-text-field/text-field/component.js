import {BaseComponent} from '../../util/base-component';

import {MDCTextField, MDCTextFieldFoundation, MDCTextFieldHelperTextFoundation} from '@material/textfield';

import outlineTemplate from './outline.html';


/**
 * @ngdoc component
 * @name mdcTextField
 * @module mdc.text-field
 *
 * @param {string} label - the label for this text field
 * @param {boolean} [dense] - whether to apply dense styling
 * @param {boolean} [fullwidth] - whether to apply the fullwidth styling
 * @param {boolean} [box] - whether to apply the box styling
 * @param {boolean} [outlined] - whether to apply the outline styling (supercedes box)
 * @param {string} [helperText] - for providing supplemental information to users, as well for validation messages
 * @param {boolean} [helperTextPersistent] - whether the help text is persistent
 * @param {boolean} [helperTextValidation] - whether the help text is used for validation
 */
export class MDCTextFieldController extends BaseComponent {
  static get name() {
    return 'mdcTextField';
  }

  static get bindings() {
    return {
      label: '@',
      dense: '<?',
      fullwidth: '<?',
      box: '<?',
      outlined: '<?',
      helperText: '@?',
      helperTextPersistent: '<?',
      helperTextValidation: '<?',
    };
  }

  static get $inject() {
    return ['$element', '$scope', '$document'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass(MDCTextFieldFoundation.cssClasses.ROOT);

    this.root_ = this.$element[0];
    this.setupInput_();
  }

  $postLink() {
    this.setupLabelAndFullwidth_();
    this.setupOutlinedAndBox_();
    this.setupDense_();
    this.setupHelperText_();

    this.$element.ready(() => {
      this.recreate_();
      this.setupNgModel_();
      this.setupNgDisabled_();
    });
  }

  $onChanges(changes) {
    if (!this.mdc) {
      return; // not initialized yet
    }
    let doRebuild;

    if (changes.label || changes.fullwidth) {
      this.setupLabelAndFullwidth_();
    }
    if (changes.fullwidth) {
      // changes to label are just text changes, don't need rebuild
      doRebuild = true;
    }

    if (changes.outlined || changes.box) {
      this.setupOutlinedAndBox_();
    }
    if (changes.outlined) {
      doRebuild = true;
    }

    if (changes.dense) {
      this.setupDense_();
    }

    if (changes.helperText || changes.helperTextPersistent || changes.helperTextValidation) {
      this.setupHelperText_();
      doRebuild = true;
    }

    if (doRebuild) {
      this.recreate_();
    }
  }

  get isTextArea() {
    return this.inputElement_.tagName === 'TEXTAREA';
  }

  setupInput_() {
    this.inputElement_ = this.root_.querySelector('input,textarea');

    if (this.inputElement_.tagName === 'TEXTAREA') {
      this.root_.classList.add('mdc-text-field--textarea');
    } else {
      this.root_.classList.remove('mdc-text-field--textarea');
    }

    this.inputElement_.classList.add('mdc-text-field__input');

    if (!this.inputElement_.id) {
      this.inputElement_.id = `--mdc-form-field-${this.$scope.$id}`;
    }
  }

  setupLabelAndFullwidth_() {
    this.$element.toggleClass('mdc-text-field--fullwidth', Boolean(this.fullwidth));

    let labelElement = this.root_.getElementsByTagName('label')[0];

    const wantsLabelElement = this.isTextArea || !Boolean(this.fullwidth);

    if (wantsLabelElement) {
      if (!labelElement) { // requires the label element
        labelElement = this.$document[0].createElement('label');
        this.inputElement_.insertAdjacentElement('afterend', labelElement);
      }

      labelElement.classList.add('mdc-floating-label');
      if (this.label) {
        labelElement.innerText = this.label;
      }
      labelElement.setAttribute('for', this.inputElement_.id);

      this.inputElement_.removeAttribute('placeholder');
      this.inputElement_.removeAttribute('aria-label');
    } else {
      if (labelElement) {
        angular.element(labelElement).remove();
      }

      this.inputElement_.setAttribute('placeholder', this.label || '');
      this.inputElement_.setAttribute('aria-label', this.label || '');
    }
  }

  setupOutlinedAndBox_() {
    const outlineElement = this.root_.getElementsByClassName('mdc-text-field__outline')[0];
    const idleOutlineElement = this.root_.getElementsByClassName('mdc-text-field__idle-outline')[0];
    const bottomLineElement = this.root_.getElementsByClassName('mdc-line-ripple')[0];

    this.$element.toggleClass(MDCTextFieldFoundation.cssClasses.OUTLINED, Boolean(this.outlined) && !this.isTextArea);
    this.$element.toggleClass(MDCTextFieldFoundation.cssClasses.BOX, !Boolean(this.outlined) && Boolean(this.box));

    const wantsOutline = this.outlined && !this.isTextArea;
    const wantsBottomLine = !this.outlined && !this.isTextArea;

    if (wantsOutline && !outlineElement) {
      if (!outlineElement) {
        this.$element.append(outlineTemplate);
      }
    } else if (!wantsOutline) {
      if (outlineElement) {
        outlineElement.remove();
      }
      if (idleOutlineElement) {
        idleOutlineElement.remove();
      }
    }

    if (wantsBottomLine && !bottomLineElement) {
      this.$element.append('<div class="mdc-line-ripple"></div>');
    } else if (!wantsBottomLine && bottomLineElement) {
      bottomLineElement.remove();
    }
  }

  setupDense_() {
    this.$element.toggleClass(MDCTextFieldFoundation.cssClasses.DENSE, !this.isTextArea && Boolean(this.dense));
  }

  setupNgModel_() {
    const ngModel = angular.element(this.inputElement_).controller('ngModel');

    if (ngModel) {
      ngModel.$render = () => {
        this.mdc.value = ngModel.$viewValue;
      };
    }
  }

  setupHelperText_() {
    const wantsHelpText = Boolean(this.helperText);

    if (wantsHelpText) {
      if (!this.helperTextElement_) {
        this.helperTextElement_ = this.$document[0].createElement('p');
        this.helperTextElement_.className = 'mdc-text-field-helper-text';
        this.helperTextElement_.id = `${this.inputElement_.id}--help`;

        this.inputElement_.setAttribute('aria-controls', this.helperTextElement_.id);
        this.root_.insertAdjacentElement('afterend', this.helperTextElement_);
      }

      this.helperTextElement_.textContent = this.helperText;

      if (this.helperTextPersistent) {
        this.helperTextElement_.classList.add(
          MDCTextFieldHelperTextFoundation.cssClasses.HELPER_TEXT_PERSISTENT
        );
      } else {
        this.helperTextElement_.classList.remove(
          MDCTextFieldHelperTextFoundation.cssClasses.HELPER_TEXT_PERSISTENT
        );
      }

      if (this.helperTextValidation) {
        this.helperTextElement_.classList.add(
          MDCTextFieldHelperTextFoundation.cssClasses.HELPER_TEXT_VALIDATION_MSG
        );
      } else {
        this.helperTextElement_.classList.remove(
          MDCTextFieldHelperTextFoundation.cssClasses.HELPER_TEXT_VALIDATION_MSG
        );
      }
    } else if (!wantsHelpText && this.helperTextElement_) {
      this.helperTextElement_.remove();
      delete this.helperTextElement_;
      this.inputElement_.removeAttribute('aria-controls');
    }
  }

  applyDisabled_() {
    // if we do mdc.disabled directly, it applies to the native element, thus re-firing the observer
    this.mdc.foundation_.styleDisabled_(this.inputElement_.disabled);
  }

  setupNgDisabled_() {
    this.inputObserver = new MutationObserver(() => this.applyDisabled_());

    this.inputObserver.observe(this.inputElement_, {
      attributes: true, attributeFilter: ['disabled'],
    });

    this.applyDisabled_(); // run once at init
  }

  toggleIconCtrl(iconCtrl, enabled) {
    const isLeading = iconCtrl.$element[0] === this.$element.children()[0];

    if (isLeading) {
      this.$element.toggleClass('mdc-text-field--with-leading-icon', enabled);
    } else {
      this.$element.toggleClass('mdc-text-field--with-trailing-icon', enabled);
    }
  }

  recreate_() {
    if (this.mdc) {
      this.mdc.destroy();
    }

    this.mdc = new MDCTextField(this.root_);
  }

  $onDestroy() {
    if (this.inputObserver) {
      this.inputObserver.disconnect();
    }

    if (this.mdc) {
      this.mdc.destroy();
    }

    if (this.helperTextElement_) {
      this.helperTextElement_.remove();
    }
  }
}
