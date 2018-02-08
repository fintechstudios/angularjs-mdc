'use strict';

describe('mdc-radio', () => {
  let MockRadio;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator) => {
    MockRadio = $componentGenerator('mdcRadio');
  }));

  it('should have the mdc-radio class', () => {
    const radio = new MockRadio();

    expect(radio.$element.hasClass('mdc-radio')).to.be.true;
  });

  it('should toggle as ng-model changes', function() {
    const component = new MockRadio({'ngModel': 'val', 'ngValue': 0}, {'val': 1});
    const radio = component.$element.find('input')[0];
    expect(radio.checked).to.be.false;

    component.$parent('val', 0);
    expect(radio.checked).to.be.true;

    component.$parent('val', 1);
    expect(radio.checked).to.be.false;
  });

  it('should propagate changes to ng-model when clicked', function() {
    const component = new MockRadio({'ngModel': 'val', 'ngValue': 0}, {'val': 1});
    const checkbox = component.$element.find('input')[0];

    expect(component.$parent('val')).to.equal(1);
    checkbox.click();
    expect(component.$parent('val')).to.equal(0);
  });

  function expectComponentToBeDisabled(component) {
    const elem = component.$element;
    const checkbox = angular.element(component.$element.find('input')[0]);

    expect(elem.hasClass('mdc-radio--disabled')).to.be.true;
    expect(checkbox.attr('disabled')).to.equal('disabled');
  }

  function expectComponentToBeEnabled(component) {
    const elem = component.$element;
    const checkbox = angular.element(component.$element.find('input')[0]);

    expect(elem.hasClass('mdc-radio--disabled')).to.be.false;
    expect(checkbox.attr('disabled')).to.not.exist;
  }

  it('should be disabled when ng-disabled=true', function() {
    const component = new MockRadio({'ngDisabled': true});
    expectComponentToBeDisabled(component);
  });

  it('should be enabled when ng-disabled=false', function() {
    const component = new MockRadio({'ngDisabled': false});
    expectComponentToBeEnabled(component);
  });

  it('should toggle between disabled and enabled when ngDisabled changes', function() {
    const component = new MockRadio({'ngDisabled': 'isDisabled'}, {'isDisabled': true});

    expectComponentToBeDisabled(component);
    component.$parent('isDisabled', false);
    expectComponentToBeEnabled(component);
    component.$parent('isDisabled', true);
    expectComponentToBeDisabled(component);
  });

  it('should bind inputId to the internal input id', function() {
    const TEST_ID = 'testId';
    const component = new MockRadio({'inputId': TEST_ID});
    expect(component.$element.find('input')[0].id).to.equal(TEST_ID);
  });
});
