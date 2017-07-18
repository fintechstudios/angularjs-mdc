'use strict';

describe('mdc-switch', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcSwitch');
  }));

  it('should toggle as ng-model changes', function() {
    const component = new $mockComponent({'ngModel': 'isToggled'}, {'isToggled': false});
    const checkbox = component.$element.find('input')[0];
    expect(checkbox.checked).to.be.false;

    component.$parent('isToggled', true);
    expect(checkbox.checked).to.be.true;

    component.$parent('isToggled', false);
    expect(checkbox.checked).to.be.false;
  });

  it('should propagate changes to ng-model when clicked', function() {
    const component = new $mockComponent({'ngModel': 'isToggled'}, {'isToggled': false});
    const checkbox = component.$element.find('input')[0];

    expect(component.$parent('isToggled')).to.be.false;
    checkbox.click();
    expect(component.$parent('isToggled')).to.be.true;
  });

  function expectComponentToBeDisabled(component) {
    const elem = component.$element;
    const checkbox = angular.element(component.$element.find('input')[0]);

    expect(elem.hasClass('mdc-switch--disabled')).to.be.true;
    expect(checkbox.attr('disabled')).to.equal('disabled');
  }

  function expectComponentToBeEnabled(component) {
    const elem = component.$element;
    const checkbox = angular.element(component.$element.find('input')[0]);

    expect(elem.hasClass('mdc-switch--disabled')).to.be.false;
    expect(checkbox.attr('disabled')).to.not.exist;
  }

  it('should be disabled when ng-disabled=true', function() {
    const component = new $mockComponent({'ngDisabled': true});
    expectComponentToBeDisabled(component);
  });

  it('should be enabled when ng-disabled=false', function() {
    const component = new $mockComponent({'ngDisabled': false});
    expectComponentToBeEnabled(component);
  });

  it('should toggle between disabled and enabled when ngDisabled changes', function() {
    const component = new $mockComponent({'ngDisabled': 'isDisabled'}, {'isDisabled': true});

    expectComponentToBeDisabled(component);
    component.$parent('isDisabled', false);
    expectComponentToBeEnabled(component);
    component.$parent('isDisabled', true);
    expectComponentToBeDisabled(component);
  });

  it('should bind inputId to the internal input id', function() {
    const TEST_ID = 'testId';
    const component = new $mockComponent({'inputId': TEST_ID});
    expect(component.$element.find('input')[0].id).to.equal(TEST_ID);
  });
});
