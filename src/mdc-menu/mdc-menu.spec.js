'use strict';

describe('mdc-simple-menu', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcSimpleMenu');
  }));

  context('should set the proper class for the `openFrom` property', function() {
    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(function(value) {
      it('should set the class for openFrom=' + value, inject(function($camelToKebab) {
        const className = 'mdc-simple-menu--open-from-' + $camelToKebab(value);
        const component = new $mockComponent({'openFrom': '{{ from }}'}, {'from': value});
        const elem = component.$element;
        expect(elem.hasClass(className)).to.be.true;

        component.$parent('from', '');
        expect(elem.hasClass(className)).to.be.false;

        component.$parent('from', value);
        expect(elem.hasClass(className)).to.be.true;
      }));
    });
  });

  it('should respond to the toggle event', inject(function(MDC_SIMPLE_MENU_TOGGLE_EVENT) {
    const component = new $mockComponent();
    const elem = component.$element;

    expect(elem.hasClass('mdc-simple-menu--animating')).to.be.false;
    elem.triggerHandler(MDC_SIMPLE_MENU_TOGGLE_EVENT);
    component.digest();
    expect(elem.hasClass('mdc-simple-menu--animating') || elem.hasClass('mdc-simple-menu--open')).to.be.true;
  }));

  it('should be open when open=true', function() {
    const component = new $mockComponent({'open': 'isOpen'}, {'isOpen': true});
    const elem = component.$element;

    component.$parent('isOpen', true);
    expect(elem.hasClass('mdc-simple-menu--animating') || elem.hasClass('mdc-simple-menu--open')).to.be.true;
  });
});
