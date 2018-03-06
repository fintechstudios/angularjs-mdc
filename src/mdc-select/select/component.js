import {arrayUnion} from '../../util/array-union';
import {MDCComponentNg} from '../../mdc-base/component-ng';
import {MDCRippleMixin} from '../../mdc-ripple/mixin';

import {MDCMenu} from '@material/menu';
import {MDCSelectFoundation} from '@material/select';
import {MDCSelectLabel} from '@material/select/label';

import template from './mdc-select.html';


/**
 * @ngdoc component
 * @name mdcSelect
 * @module mdc.select
 *
 * @param {string} [label] - Text shown if no value has been selected.
 * @param {boolean} [box] - whether to apply box styling
 * @param {string} [ngModel] - Assignable AngularJS expression to data-bind to
 * @param {expression} [ngDisabled] - Enable/Disable based on the expression
 */
export class MDCSelectController extends MDCRippleMixin(MDCComponentNg) {
  static get name() {
    return 'mdcSelect';
  }

  static get transclude() {
    return true;
  }

  static get require() {
    return {
      ngModelCtrl_: '?ngModel',
    };
  }

  static get bindings() {
    return {
      ngDisabled: '<?',
      label: '@?',
      box: '<?',
    };
  }

  static get template() {
    return template;
  }

  static get $inject() {
    return arrayUnion(['$element', '$document', '$window'], super.$inject);
  }

  get rippleElement() {
    return angular.element(this.root_.querySelector(MDCSelectFoundation.strings.SURFACE_SELECTOR));
  }

  constructor(...args) {
    super(...args);

    this.optionCtrls_ = [];
    this.$element.addClass('mdc-select');
    this.$element.attr('role', 'listbox');
  }

  $onChanges(changes) {
    super.$onChanges(changes);

    if (changes.ngDisabled && this.foundationReady) {
      this.disabled = Boolean(this.ngDisabled);
    }

    if (changes.box) {
      this.$element.toggleClass('mdc-select--box', Boolean(this.box));
    }
  }

  $onDestroy() {
    super.$onDestroy();

    if (this.menu_) {
      this.menu_.destroy();
    }
  }

  _addOption(item) {
    this.optionCtrls_.push(item);
  }

  _removeOption(item) {
    const index = this.optionCtrls_.indexOf(item);
    if (index >= 0) {
      this.optionCtrls_.splice(index, 1);
    }
  }

  get value() {
    return this.foundation_.getValue();
  }

  get options() {
    return this.menu_.items;
  }

  get selectedOptions() {
    return this.root_.querySelectorAll('[aria-selected]');
  }

  get selectedIndex() {
    return this.foundation_.getSelectedIndex();
  }

  set selectedIndex(selectedIndex) {
    this.foundation_.setSelectedIndex(selectedIndex);
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  item(index) {
    return this.options[index] || null;
  }

  nameditem(key) {
    // NOTE: IE11 precludes us from using Array.prototype.find
    for (let i = 0, options = this.options, option; (option = options[i]); i++) {
      if (option.id === key || option.getAttribute('name') === key) {
        return option;
      }
    }
    return null;
  }

  initialize(menuFactory = (el) => new MDCMenu(el), labelFactory = (el) => new MDCSelectLabel(el)) {
    this.surface_ = this.root_.querySelector(MDCSelectFoundation.strings.SURFACE_SELECTOR);
    const labelElement = this.root_.querySelector(MDCSelectFoundation.strings.LABEL_SELECTOR);
    if (labelElement) {
      this.label_ = labelFactory(labelElement);
    }
    this.bottomLine_ = this.root_.querySelector(MDCSelectFoundation.strings.BOTTOM_LINE_SELECTOR);
    this.selectedText_ = this.root_.querySelector(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
    this.menuEl_ = this.root_.querySelector(MDCSelectFoundation.strings.MENU_SELECTOR);
    this.menu_ = menuFactory(this.menuEl_);
  }

  getDefaultFoundation() {
    return new MDCSelectFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      floatLabel: (value) => {
        if (this.label_) {
          this.label_.float(value);
        }
      },
      addClassToBottomLine: (className) => this.bottomLine_.classList.add(className),
      removeClassFromBottomLine: (className) => this.bottomLine_.classList.remove(className),
      setBottomLineAttr: (attr, value) => this.bottomLine_.setAttribute(attr, value),
      setAttr: (attr, value) => this.root_.setAttribute(attr, value),
      rmAttr: (attr, value) => this.root_.removeAttribute(attr, value),
      computeBoundingRect: () => this.surface_.getBoundingClientRect(),
      registerInteractionHandler: (type, handler) => this.surface_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => {
        if (this.surface_) { // DOM might be removed before deregistration
          this.surface_.removeEventListener(type, handler);
        }
      },
      focus: () => this.surface_.focus(),
      makeTabbable: () => {
        this.surface_.tabIndex = 0;
      },
      makeUntabbable: () => {
        this.surface_.tabIndex = -1;
      },
      getComputedStyleValue: (prop) => this.$window.getComputedStyle(this.surface_).getPropertyValue(prop),
      setStyle: (propertyName, value) => this.surface_.style.setProperty(propertyName, value),
      create2dRenderingContext: () => this.$document[0].createElement('canvas').getContext('2d'),
      setMenuElStyle: (propertyName, value) => this.menuEl_.style.setProperty(propertyName, value),
      setMenuElAttr: (attr, value) => this.menuEl_.setAttribute(attr, value),
      rmMenuElAttr: (attr) => this.menuEl_.removeAttribute(attr),
      getMenuElOffsetHeight: () => this.menuEl_.offsetHeight,
      openMenu: (focusIndex) => this.menu_.show({focusIndex}),
      isMenuOpen: () => this.menu_.open,
      setSelectedTextContent: (selectedTextContent) => {
        this.selectedText_.textContent = selectedTextContent;
      },
      getNumberOfOptions: () => this.options.length,
      getTextForOptionAtIndex: (index) => this.options[index].textContent,
      getValueForOptionAtIndex: (index) => {
        let value;
        this.optionCtrls_.forEach((ctrl) => {
          if (ctrl.hasHTMLElement(this.options[index])) {
            value = ctrl.getValue();
          }
        });
        return value;
      },
      setAttrForOptionAtIndex: (index, attr, value) => this.options[index].setAttribute(attr, value),
      rmAttrForOptionAtIndex: (index, attr) => this.options[index].removeAttribute(attr),
      getOffsetTopForOptionAtIndex: (index) => this.options[index].offsetTop,
      registerMenuInteractionHandler: (type, handler) => this.menu_.listen(type, handler),
      deregisterMenuInteractionHandler: (type, handler) => this.menu_.unlisten(type, handler),
      notifyChange: () => {
        this.emit(MDCSelectFoundation.strings.CHANGE_EVENT, this);

        if (this.ngModelCtrl_) {
          this.ngModelCtrl_.$setViewValue(this.value);
        }
      },
      getWindowInnerHeight: () => this.$window.innerHeight,
      addBodyClass: (className) => this.$document[0].body.classList.add(className),
      removeBodyClass: (className) => this.$document[0].body.classList.remove(className),
    });
  }

  initialSyncWithDOM() {
    if (this.ngModelCtrl_) {
      this.ngModelCtrl_.$render = () => {
        let selectedCtrl;
        this.optionCtrls_.map((ctrl) => {
          if (ctrl.getValue() === this.ngModelCtrl_.$viewValue) {
            selectedCtrl = ctrl;
          }
        });

        this.selectedIndex = selectedCtrl ? this.options.indexOf(selectedCtrl.$element[0]) : -1;
      };

      this.ngModelCtrl_.$render();
    }

    if (this.ngDisabled) {
      this.disabled = true;
    }
  }
}
