'use strict';

describe('lmdc-button', function() {
  let MockButton;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    MockButton = $componentGenerator('mdcButton');
  }));

  ['dense', 'raised', 'compact', 'unelevated', 'stroked'].forEach(function(attr) {
    it('should have the `lmdc-button--' + attr + '` class when ' + attr + '=true', function() {
      const bindings = {};
      bindings[attr] = 'buttonStyle';

      const component = new MockButton(bindings, {buttonStyle: undefined});
      const elem = component.$element;
      expect(elem.hasClass('lmdc-button--' + attr)).to.be.false;

      component.$parent('buttonStyle', true);
      expect(elem.hasClass('lmdc-button--' + attr)).to.be.true;

      component.$parent('buttonStyle', false);
      expect(elem.hasClass('lmdc-button--' + attr)).to.be.false;
    });
  });

  ['accept', 'cancel'].forEach(function(action) {
    it('should have proper classes when dialog=' + action, function() {
      const component = new MockButton({'dialog': '{{ action }}'}, {action: undefined});
      const elem = component.$element;
      expect(elem.hasClass('lmdc-dialog__footer__button'), 'has unnecessary dialog footer class').to.be.false;
      expect(elem.hasClass('lmdc-dialog__footer__button--' + action), 'has unnecessary dialog action class').to.be.false;

      component.$parent('action', action);
      expect(elem.hasClass('lmdc-dialog__footer__button'), 'missing dialog footer class').to.be.true;
      expect(elem.hasClass('lmdc-dialog__footer__button--' + action), 'missing dialog action class').to.be.true;

      component.$parent('action', '');
      expect(elem.hasClass('lmdc-dialog__footer__button'), 'has unnecessary dialog footer class').to.be.false;
      expect(elem.hasClass('lmdc-dialog__footer__button--' + action), 'has unnecessary dialog action class').to.be.false;
    });
  });
});
