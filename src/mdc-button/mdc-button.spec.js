'use strict';

describe('mdc-button', function() {
  let makeCtrl;

  beforeEach(module('mdc'));
  beforeEach(inject(function($componentController) {
    makeCtrl = function(bindings) {
      const ctrl = $componentController('mdcButton', {
        $element: angular.element('<mdc-button></mdc-button>'),
      }, bindings || {});
      ctrl.$postLink();
      ctrl.$onChanges();
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
      ctrl.$onChanges();
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.false;
      ctrl[attr] = true;
      ctrl.$onChanges();
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.true;
      ctrl[attr] = false;
      ctrl.$onChanges();
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.false;
    });
  });

  ['primary', 'accent'].forEach(function(color) {
    it('should have the `mdc-button--' + color + '` class when color=' + color, function() {
      const ctrl = makeCtrl();
      ctrl['color'] = '';
      ctrl.$onChanges();
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.false;
      ctrl['color'] = color;
      ctrl.$onChanges();
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.true;
      ctrl['color'] = '';
      ctrl.$onChanges();
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.false;
    });
  });
});
