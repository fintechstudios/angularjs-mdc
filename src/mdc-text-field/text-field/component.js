import {BaseComponent} from '../../util/base-component';

import {MDCTextField, MDCTextFieldFoundation} from '@material/textfield';

const outlineTemplate = require('raw-loader!./outline.html');


/**
 * @ngdoc component
 * @name mdcTextField
 * @module mdc.text-field
 *
 * @param {string} label - the label for this text field
 * @param {bool} [dense] - whether to apply dense styling
 * @param {bool} [fullwidth] - whether to apply the fullwidth styling
 * @param {bool} [box] - whether to apply the box styling
 * @param {bool} [outlined] - whether to apply the outline styling (supercedes box)
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
      box: '<?',
      dense: '<?',
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

    this.$element.ready(() => {
      this.recreate_();
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

      labelElement.classList.add('mdc-text-field__label');
      labelElement.innerText = this.label || '';
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
    const bottomLineElement = this.root_.getElementsByClassName('mdc-text-field__bottom-line')[0];

    this.$element.toggleClass('mdc-text-field--outlined', Boolean(this.outlined));
    this.$element.toggleClass('mdc-text-field--box', !Boolean(this.outlined) && Boolean(this.box));

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
      this.$element.append('<div class="mdc-text-field__bottom-line"></div>');
    } else if (!wantsBottomLine && bottomLineElement) {
      bottomLineElement.remove();
    }
  }

  setupDense_() {
    this.$element.toggleClass('mdc-text-field--dense', !this.isTextArea && Boolean(this.dense));
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
    if (this.mdc) {
      this.mdc.destroy();
    }
  }
}
