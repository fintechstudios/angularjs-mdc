import {MDCIconToggleFoundation} from '@material/icon-toggle';

import {MDCRipple, MDCRippleFoundation} from '@material/ripple';
import {directiveNormalize, convertStringsObjToBindingNames} from '../util/normalize';

const BINDINGS = {};
const STRING_BINDINGS = convertStringsObjToBindingNames(MDCIconToggleFoundation.strings, ['CHANGE_EVENT']);
const CHANGE_EVENT = MDCIconToggleFoundation.strings.CHANGE_EVENT;
STRING_BINDINGS.push('iconInnerSelector');

STRING_BINDINGS.forEach(function(a) {
  BINDINGS[a] = '@';
});

BINDINGS['color'] = '@';
BINDINGS['ngDisabled'] = '<?';
BINDINGS['ngModel'] = '<?';


/**
 * @ngdoc component
 * @name mdcIconToggle
 * @module mdc.icon-toggle
 *
 * @description
 * For format of toggleOn and toggleOff, see
 * https://material.io/components/web/catalog/buttons/icon-toggle-buttons/#configuring-the-icon-toggle-states
 *
 * @param {string} toggleOn Config for when the button is on.
 * @param {string} toggleOff Config for when the button is off.
 * @param {string} [ariaPressed=false] True/False whether the button is toggled or not
 * @param {string} [iconInnerSelector] Treat internal element as icon to bind to.
 * @param {string} [color] Color for toggle: "primary", "accent", or nothing
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to.
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 *
 */
class MdcIconToggleController {
  constructor($element) {
    this.elem = $element;
    this.root_ = this.elem[0];
    this.elem.attr('role', 'button');
  }

  get iconEl_() {
    const sel = this.iconInnerSelector;
    return sel ? angular.element(this.elem[0].querySelector(sel)) : this.elem;
  }

  initRipple_() {
    const adapter = Object.assign(MDCRipple.createAdapter(this), {
      isUnbounded: () => true,
      isSurfaceActive: () => this.foundation_.isKeyboardActivated(),
      computeBoundingRect: () => {
        const dim = 48;
        const {left, top} = this.elem[0].getBoundingClientRect();
        return {
          left,
          top,
          width: dim,
          height: dim,
          right: left + dim,
          bottom: left + dim,
        };
      },
    });
    const foundation = new MDCRippleFoundation(adapter);
    return new MDCRipple(this.root_, foundation);
  }

  getDefaultFoundation() {
    return new MDCIconToggleFoundation({
      addClass: (className) => this.iconEl_.addClass(className),
      removeClass: (className) => this.iconEl_.removeClass(className),
      registerInteractionHandler: (type, handler) => this.elem.on(type, handler),
      deregisterInteractionHandler: (type, handler) => this.elem.off(type, handler),
      setText: (text) => this.iconEl_.text(text),
      getTabIndex: () => /* number */ this.elem.attr('tabindex'),
      setTabIndex: (tabIndex) => this.elem.attr('tabindex', tabIndex),
      getAttr: (name, value) => this[directiveNormalize(name)],
      setAttr: (name, value) => {
        this[directiveNormalize(name)] = value;
        this.elem.attr(name, value);
      },
      rmAttr: (name) => {
        this[directiveNormalize(name)] = undefined;
        this.elem.removeAttr(name);
      },
      notifyChange: (evtData) => {
        this.elem.triggerHandler(CHANGE_EVENT, evtData);
        if (this.ngModelCtrl) {
          this.ngModelCtrl.$setViewValue(this.foundation_.isOn(), CHANGE_EVENT);
        }
      },
    });
  }

  $postLink() {
    this.foundation_ = this.getDefaultFoundation();
    this.foundation_.init();
    if (!this.foundation_.toggleOnData_.cssClass && !this.foundation_.toggleOffData_.cssClass) {
      // if no cssClass specified, assume material-icons
      this.elem.addClass('material-icons');
    }
    // this.ripple_ = this.initRipple_(); // this should work, but it's disabled until mdc-ripple is wrapped
    this.foundation_.toggle(this.ngModel === undefined ? this.ariaPressed === 'true' : this.ngModel);
    this.foundation_.setDisabled(this.ngDisabled);
  }

  get on() {
    return this.foundation_.isOn();
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  $onChanges(changesObj) {
    if (this.foundation_) {
      if (changesObj.ngDisabled) {
        this.foundation_.setDisabled(this.ngDisabled);
      }
      if (changesObj.ngModel) {
        this.foundation_.toggle(this.ngModel);
      }
      let notRefreshed = true;
      for (const key in changesObj) {
        // check all the bound string attributes for changes, but only refresh if a single change is found
        if (notRefreshed && changesObj.hasOwnProperty(key) && STRING_BINDINGS.indexOf(key) >= 0) {
          this.foundation_.refreshToggleData();
          this.foundation_.toggle(!!this.ngModel);
          notRefreshed = false;
        }
      }
    }
    if (changesObj.color) {
      if (this.color === 'primary') {
        this.elem.addClass('mdc-icon-toggle--primary');
        this.elem.removeClass('mdc-icon-toggle--accent');
      } else if (this.color === 'accent') {
        this.elem.addClass('mdc-icon-toggle--accent');
        this.elem.removeClass('mdc-icon-toggle--primary');
      } else {
        this.elem.removeClass('mdc-icon-toggle--primary');
        this.elem.removeClass('mdc-icon-toggle--accent');
      }
    }
  }

  $onDestroy() {
    if (this.ripple_) {
      this.ripple_.destroy();
    }
    if (this.foundation_) {
      this.foundation_.destroy();
    }
  }
}

angular
  .module('mdc.icon-toggle', [])
  .component('mdcIconToggle', {
    bindings: BINDINGS,
    require: {ngModelCtrl: '?ngModel'},
    controller: MdcIconToggleController,
  });
