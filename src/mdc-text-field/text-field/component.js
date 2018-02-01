import {BaseComponent} from '../../util/base-component';

import {MDCTextField, MDCTextFieldFoundation} from '@material/textfield';


/**
 * @ngdoc component
 * @name mdcTextField
 * @module mdc.text-field
 *
 * @param {string} label - the label for this text field
 * @param {bool} [fullwidth] - whether to display with fullwidth styling
 */
export class MDCTextFieldController extends BaseComponent {
  static get name() {
    return 'mdcTextField';
  }

  static get bindings() {
    return {
      label: '@',
      fullwidth: '<?',
      outlined: '<?',
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
    this.setup_();

    this.$element.ready(() => {
      this.recreate_();
    });
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

    if (this.fullwidth) {
      if (labelElement) { // fullwidth doesn't use the label element - if we have it, delete it
        angular.element(labelElement).remove();
      }

      this.inputElement_.setAttribute('placeholder', this.label || '');
      this.inputElement_.setAttribute('aria-label', this.label || '');
    } else {
      if (!labelElement) { // requires the label element
        labelElement = this.$document[0].createElement('label');
        this.inputElement_.insertAdjacentElement('afterend', labelElement);
      }

      labelElement.classList.add('mdc-text-field__label');
      labelElement.innerText = this.label || '';
      labelElement.setAttribute('for', this.inputElement_.id);

      this.inputElement_.removeAttribute('placeholder');
      this.inputElement_.removeAttribute('aria-label');
    }
  }

  setupOutlined_() {
  }

  recreate_() {
    if (this.mdc) {
      this.mdc.destroy();
    }

    this.mdc = new MDCTextField(this.root_);
  }

  setup_() {
    this.setupInput_();
    this.setupLabelAndFullwidth_();
  }

  $onDestroy() {

  }
}
