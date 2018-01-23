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

  ['accept', 'cancel'].forEach(function(action) {
    it('should have proper classes when dialog=' + action, function() {
      const component = new $mockComponent({'dialog': '{{ action }}'}, {action: undefined});
      const elem = component.$element;
      expect(elem.hasClass('mdc-dialog__footer__button'), 'has unnecessary dialog footer class').to.be.false;
      expect(elem.hasClass('mdc-dialog__footer__button--' + action), 'has unnecessary dialog action class').to.be.false;

      component.$parent('action', action);
      expect(elem.hasClass('mdc-dialog__footer__button'), 'missing dialog footer class').to.be.true;
      expect(elem.hasClass('mdc-dialog__footer__button--' + action), 'missing dialog action class').to.be.true;

      component.$parent('action', '');
      expect(elem.hasClass('mdc-dialog__footer__button'), 'has unnecessary dialog footer class').to.be.false;
      expect(elem.hasClass('mdc-dialog__footer__button--' + action), 'has unnecessary dialog action class').to.be.false;
    });
  });
});
