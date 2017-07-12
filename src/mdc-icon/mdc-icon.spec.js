'use strict';

import {getComponentGenerator} from '../util/test-helper';

describe('mdc-icon', function() {
  let makeCtrl;
  const icon1 = 'home';
  const icon2 = 'arrow_back';

  beforeEach(angular.mock.module('mdc'));
  beforeEach(inject(function($componentController) {
    makeCtrl = getComponentGenerator($componentController, 'mdc-icon');
  }));

  it('should have only the `material-icons` and `mdc-icon` classes by default', function() {
    const ctrl = makeCtrl();

    expect(ctrl.elem.hasClass('material-icons')).to.be.true;
    expect(ctrl.elem.hasClass('mdc-icon')).to.be.true;
    expect(ctrl.elem[0].classList.length).to.equal(2);
  });

  it('should use the `mdc-font-icon` attribute as its text contents', function() {
    const ctrl = makeCtrl({'mdcFontIcon': icon1});

    expect(ctrl.elem.text()).to.equal(icon1);
  });

  it('should update the text contents as `mdc-font-icon` changes', function() {
    const ctrl = makeCtrl({'mdcFontIcon': icon1});

    expect(ctrl.elem.text()).to.equal(icon1);
    ctrl._update_('mdcFontIcon', icon2);

    expect(ctrl.elem.text()).to.equal(icon2);
  });

  it('should add the `mdc-icon--SIZE` class for each of the MDC_ICON_SIZES', function() {
    const ctrl = makeCtrl({'mdcFontIcon': icon1});
    ctrl.MDC_ICON_SIZES.forEach(function(size) {
      ctrl._update_('size', size);
      expect(ctrl.elem.hasClass('mdc-icon--' + size));
      expect(ctrl.elem[0].classList.length).to.equal(3);
    });
  });

  it('should not add any classes if an invalid size is added', function() {
    const ctrl = makeCtrl({'mdcFontIcon': icon1, 'size': 55});

    expect(ctrl.elem[0].classList.length).to.equal(2);
  });
});
