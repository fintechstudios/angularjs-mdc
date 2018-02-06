import {directiveNormalize, convertStringsObjToBindingNames} from '../util/normalize';
import {BaseComponent} from '../util/base-component';

import {MDCIconToggleFoundation} from '@material/icon-toggle';
import {MDCRipple, MDCRippleFoundation} from '@material/ripple';


const bindings = {};
const STRING_BINDINGS = convertStringsObjToBindingNames(MDCIconToggleFoundation.strings, ['CHANGE_EVENT']);
const CHANGE_EVENT = MDCIconToggleFoundation.strings.CHANGE_EVENT;
STRING_BINDINGS.push('iconInnerSelector');

STRING_BINDINGS.forEach(function(a) {
  bindings[a] = '@';
});

bindings['ngDisabled'] = '<?';
bindings['ngModel'] = '<?';


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
 * @param {string} [ngModel] Assignable AngularJS expression to data-bind to.
 * @param {expression} [ngDisabled] Enable/Disable based on the expression
 *
 */
export class MdcIconToggleController extends BaseComponent {
  static get require() {
    return {
      ngModelCtrl: '?ngModel',
    };
  }

  static get bindings() {
    return bindings;
  }

  static get name() {
    return 'mdcIconToggle';
  }

  static get $inject() {
    return ['$element'];
  }

  constructor(...args) {
    super(...args);

    this.$element.addClass('mdc-icon-toggle');
    this.$element.attr('tabindex', 0);
    this.$element.ready(() => {
      this.ripple_ = this.initRipple_();
    });
  }

  get iconEl_() {
    const sel = this.iconInnerSelector;
    return sel ? angular.element(this.$element[0].querySelector(sel)) : this.$element;
  }

  initRipple_() {
    this.root_ = this.$element[0];
    const adapter = Object.assign(MDCRipple.createAdapter(this), {
      isUnbounded: () => true,
      isSurfaceActive: () => this.foundation_.isKeyboardActivated(),
      computeBoundingRect: () => {
        const dim = 48;
        const {left, top} = this.$element[0].getBoundingClientRect();
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
    return new MDCRipple(this.$element[0], foundation);
  }

  getDefaultFoundation() {
    return new MDCIconToggleFoundation({
      addClass: (className) => this.iconEl_.addClass(className),
      removeClass: (className) => this.iconEl_.removeClass(className),
      registerInteractionHandler: (type, handler) => this.$element.on(type, handler),
      deregisterInteractionHandler: (type, handler) => this.$element.off(type, handler),
      setText: (text) => this.iconEl_.text(text),
      getTabIndex: () => /* number */ this.$element.attr('tabindex'),
      setTabIndex: (tabIndex) => this.$element.attr('tabindex', tabIndex),
      getAttr: (name, value) => this[directiveNormalize(name)],
      setAttr: (name, value) => {
        this[directiveNormalize(name)] = value;
        this.$element.attr(name, value);
      },
      rmAttr: (name) => {
        this[directiveNormalize(name)] = undefined;
        this.$element.removeAttr(name);
      },
      notifyChange: (evtData) => {
        this.$element.triggerHandler(CHANGE_EVENT, evtData);
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
      this.$element.addClass('material-icons');
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
  .component(MdcIconToggleController.name, {
    bindings: MdcIconToggleController.bindings,
    require: MdcIconToggleController.require,
    controller: MdcIconToggleController,
  });
