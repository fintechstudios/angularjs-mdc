'use strict';

import {getComponentGenerator} from '../util/test-helper';

describe('mdc-button', function() {
  let makeCtrl;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(inject(function($componentController) {
    makeCtrl = getComponentGenerator($componentController, 'mdc-button');
  }));

  it('should have only the `mdc-button` class by default', function() {
    const ctrl = makeCtrl();

    expect(ctrl.elem.hasClass('mdc-button')).to.be.true;
    expect(ctrl.elem[0].classList.length).to.equal(1);
  });

  ['dense', 'raised', 'compact'].forEach(function(attr) {
    it('should have the `mdc-button--' + attr + '` class when ' + attr + '=true', function() {
      const ctrl = makeCtrl();
      ctrl._update_(attr, false);
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.false;
      ctrl._update_(attr, true);
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.true;
      ctrl._update_(attr, false);
      expect(ctrl.elem.hasClass('mdc-button--' + attr)).to.be.false;
    });
  });

  ['primary', 'accent'].forEach(function(color) {
    it('should have the `mdc-button--' + color + '` class when color=' + color, function() {
      const ctrl = makeCtrl();
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.false;
      ctrl._update_('color', color);
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.true;
      ctrl._update_('color', '');
      expect(ctrl.elem.hasClass('mdc-button--' + color)).to.be.false;
    });
  });
});
