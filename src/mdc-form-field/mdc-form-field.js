require('angular-debounce');

import {MDCFormField, MDCFormFieldFoundation} from '@material/form-field';

import {bindLabelId} from '../util/bind-input-and-label';

MDCFormFieldFoundation.strings['LABEL_SELECTOR'] = 'mdc-form-field > label';


/**
 * @ngdoc component
 * @name mdcFormField
 * @module mdc.form-field
 *
 * @param {expression} [alignEnd] T/F align the form element after the label
 */
class MdcFormFieldController {
  constructor($scope, $element, debounce) {
    this.elem = $element;
    this.root_ = this.elem[0];

    this.elem.ready(() => {
      this.mdc = new MDCFormField(this.root_);

      const children = this.elem.children();
      let input;
      let label;
      if (children.length === 2) {
        if (children[0].tagName.toUpperCase() === 'LABEL') {
          label = children[0];
          input = children[1];
        } else {
          label = children[1];
          input = children[0];
        }
        this.mdc.input = input;
        // only certain elements can be labeled
        // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable
        const labelable = input.querySelector('input, textarea, select, button, meter, output, progress, keygen');
        bindLabelId(labelable, label, '--mdc-form-field-' + $scope.$id);
      }
    });

    this.observer = new MutationObserver(debounce(10, () => this.rebuild()));
  }

  rebuild() {
    this.mdc.destroy();
    this.mdc = new MDCFormField(this.root_);
  }

  $onChanges(changesObj) {
    if (changesObj.alignEnd) {
      this.elem.toggleClass('mdc-form-field--align-end', this.alignEnd);
    }
  }

  $postLink() {
    this.observer.observe(this.root_, {childList: true});
  }

  $onDestroy() {
    this.observer.disconnect();
    if (this.mdc) {
      this.mdc.destroy();
    }
  }
}


/**
 * @ngdoc module
 * @name mdc.form-field
 * @description
 *
 * FormField
 */
angular
  .module('mdc.form-field', ['rt.debounce'])
  .component('mdcFormField', {
    controller: MdcFormFieldController,
    bindings: {
      'alignEnd': '<?',
    },
  });
