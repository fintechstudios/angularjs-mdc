'use strict';

describe('mdc-button', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcButton');
  }));

  ['dense', 'raised', 'compact'].forEach(function(attr) {
    it('should have the `mdc-button--' + attr + '` class when ' + attr + '=true', function() {
      const bindings = {};
      bindings[attr] = 'buttonStyle';

      const component = new $mockComponent(bindings, {buttonStyle: false});
      const elem = component.$element;
      expect(elem.hasClass('mdc-button--' + attr)).to.be.false;

      component.$parent('buttonStyle', true);
      expect(elem.hasClass('mdc-button--' + attr)).to.be.true;

      component.$parent('buttonStyle', false);
      expect(elem.hasClass('mdc-button--' + attr)).to.be.false;
    });
  });

  it('should have the `mdc-button--compact` and `mdc-card__action` classes when cardAction=true', function() {
    const component = new $mockComponent({'cardAction': 'isAction'}, {isAction: true});
    const elem = component.$element;

    expect(elem.hasClass('mdc-button--compact')).to.be.true;
    expect(elem.hasClass('mdc-card__action')).to.be.true;

    component.$parent('isAction', false);

    expect(elem.hasClass('mdc-button--compact')).to.be.false;
    expect(elem.hasClass('mdc-card__action')).to.be.false;
  });

  ['primary', 'accent'].forEach(function(color) {
    it('should have the `mdc-button--' + color + '` class when color=' + color, function() {
      const component = new $mockComponent({'color': '{{ buttonColor }}'}, {buttonColor: ''});
      const elem = component.$element;
      expect(elem.hasClass('mdc-button--' + color)).to.be.false;

      component.$parent('buttonColor', color);
      expect(elem.hasClass('mdc-button--' + color)).to.be.true;

      component.$parent('buttonColor', '');
      expect(elem.hasClass('mdc-button--' + color)).to.be.false;
    });
  });

  ['accept', 'cancel'].forEach(function(action) {
    it('should have proper classes when dialog=' + action, function() {
      const component = new $mockComponent({'dialog': '{{ action }}'}, {action: ''});
      const elem = component.$element;
      expect(elem.hasClass('mdc-dialog__footer__button')).to.be.false;
      expect(elem.hasClass('mdc-dialog__footer__button--' + action)).to.be.false;

      component.$parent('action', action);
      expect(elem.hasClass('mdc-dialog__footer__button')).to.be.true;
      expect(elem.hasClass('mdc-dialog__footer__button--' + action)).to.be.true;

      component.$parent('action', '');
      expect(elem.hasClass('mdc-dialog__footer__button')).to.be.false;
      expect(elem.hasClass('mdc-dialog__footer__button--' + action)).to.be.false;
    });
  });
});
