'use strict';

describe('mdc-button', function() {
  let makeCtrl;

  beforeEach(module('mdc'));
  beforeEach(inject(function($componentController) {
    makeCtrl = function(bindings, changes) {
      const ctrl = $componentController('mdcButton', {
        $element: angular.element('<mdc-button></mdc-button>'),
      }, bindings || {});
      ctrl.$postLink();
      ctrl.$onChanges(changes || {});
      return ctrl;
    };
  }));

  it('should have only the `mdc-button` class by default', function() {
    const ctrl = makeCtrl();

    expect(ctrl.elem.hasClass('mdc-button')).to.be.true;
    expect(ctrl.elem[0].classList.length).to.equal(1);
  });

  ['dense', 'raised', 'compact'].forEach(function(attr) {
    it('should have the `mdc-button--' + attr + '` class when ' + attr + '=true', function() {
      const ctrl = makeCtrl();
      ctrl[attr] = false;
      const changes = {};
      changes[attr] = {};
      ctrl.$onChanges(changes);
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.false;
      ctrl[attr] = true;
      ctrl.$onChanges(changes);
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.true;
      ctrl[attr] = false;
      ctrl.$onChanges(changes);
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.false;
    });
  });

  ['primary', 'accent'].forEach(function(color) {
    it('should have the `mdc-button--' + color + '` class when color=' + color, function() {
      const ctrl = makeCtrl();
      const changes = {'color': {}};
      ctrl['color'] = '';
      ctrl.$onChanges(changes);
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.false;
      ctrl['color'] = color;
      ctrl.$onChanges(changes);
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.true;
      ctrl['color'] = '';
      ctrl.$onChanges(changes);
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.false;
    });
  });
});
