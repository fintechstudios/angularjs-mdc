import {BaseComponent} from '../util/base-component';

import {MDCFormField} from '@material/form-field';


/**
 * @ngdoc component
 * @name mdcFormField
 * @module mdc.form-field
 *
 * @param {boolean} [alignEnd] - whether to align the form element after the label
 */
export class MDCFormFieldController extends BaseComponent {
  static get name() {
    return 'mdcFormField';
  }

  static get bindings() {
    return {
      alignEnd: '<?',
    };
  }

  static get $inject() {
    return ['$scope', '$element'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-form-field');
  }

  $onChanges(changesObj) {
    if (changesObj.alignEnd) {
      this.$element.toggleClass('mdc-form-field--align-end', Boolean(this.alignEnd));
    }
  }

  $postLink() {
    this.syncIdToLabel();
  }

  $onDestroy() {
    if (this.mdc) {
      this.mdc.destroy();
    }
  }

  setChildCtrl(ctrl) {
    if (this.mdc) {
      this.mdc.destroy();
    }

    if (ctrl && ctrl.mdc) {
      this.mdc = new MDCFormField(this.$element[0]);
      this.mdc.input = ctrl.mdc;
    }
  }

  setInputId(id) {
    this.inputId = id;
    this.syncIdToLabel();
  }

  syncIdToLabel() {
    if (this.inputId) {
      const label = this.$element.find('label');
      if (label[0]) {
        label[0].setAttribute('for', this.inputId);
      }
    }
  }
}
