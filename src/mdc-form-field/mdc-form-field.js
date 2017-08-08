require('angular-debounce');

import {MDCFormField, MDCFormFieldFoundation} from '@material/form-field';

MDCFormFieldFoundation.strings['LABEL_SELECTOR'] = 'mdc-form-field > label';


/**
 * @ngdoc component
 * @name mdcFormField
 * @module mdc.form-field
 *
 * @param {expression} [alignEnd] T/F align the form element after the label
 */
class MdcFormFieldController {
  constructor($element, debounce) {
    this.elem = $element;
    this.root_ = this.elem[0];

    this.elem.ready(() => {
      this.mdc = new MDCFormField(this.root_);

      const children = this.elem.children();
      if (children.length === 2) {
        if (children[0].tagName.toUpperCase() === 'LABEL') {
          this.mdc.input = children[1];
        } else {
          this.mdc.input = children[0];
        }
      } else {
        console.log('fuk');
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
    this.mdc.destroy();
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
