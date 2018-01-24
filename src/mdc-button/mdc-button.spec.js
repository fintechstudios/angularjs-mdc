'use strict';

describe('mdc-button', function() {
  let MockButton;
  let MockCardActions;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    MockButton = $componentGenerator('mdcButton');
    MockCardActions = $componentGenerator('mdcCardActions');
  }));

  ['dense', 'raised', 'compact', 'unelevated', 'stroked'].forEach(function(attr) {
    it('should have the `mdc-button--' + attr + '` class when ' + attr + '=true', function() {
      const bindings = {};
      bindings[attr] = 'buttonStyle';

      const component = new MockButton(bindings, {buttonStyle: undefined});
      const elem = component.$element;
      expect(elem.hasClass('mdc-button--' + attr)).to.be.false;

      component.$parent('buttonStyle', true);
      expect(elem.hasClass('mdc-button--' + attr)).to.be.true;

      component.$parent('buttonStyle', false);
      expect(elem.hasClass('mdc-button--' + attr)).to.be.false;
    });
  });

  ['accept', 'cancel'].forEach(function(action) {
    it('should have proper classes when dialog=' + action, function() {
      const component = new MockButton({'dialog': '{{ action }}'}, {action: undefined});
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

  it('should add `mdc-button--compact` and `mdc-card__action` classes if inside a card-actions', () => {
    const cardActions = new MockCardActions(undefined, undefined, false);
    const button = new MockButton(undefined, undefined, false);
    cardActions.$element.append(button.$element);

    cardActions.compile(); // will compile button

    expect(button.$element.hasClass('mdc-button--compact')).to.be.true;
    expect(button.$element.hasClass('mdc-card__action')).to.be.true;
  });
});
