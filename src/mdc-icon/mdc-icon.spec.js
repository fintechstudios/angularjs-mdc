'use strict';

describe('mdc-icon', function() {
  let makeCtrl;
  const icon1 = 'home';
  const icon2 = 'arrow_back';

  beforeEach(module('mdc'));
  beforeEach(inject(function($componentController) {
    makeCtrl = function(bindings, changes) {
      const ctrl = $componentController('mdcIcon', {
        $element: angular.element('<mdc-icon></mdc-icon>'),
      }, bindings || {});
      ctrl.$postLink();
      ctrl.$onChanges(changes | {});
      return ctrl;
    };
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
    ctrl.mdcFontIcon = icon2;
    ctrl.$onChanges({'mdcFontIcon': {}});

    expect(ctrl.elem.text()).to.equal(icon2);
  });

  it('should add the `mdc-icon--SIZE` class for each of the MDC_ICON_SIZES', function() {
    const ctrl = makeCtrl({'mdcFontIcon': icon1});
    ctrl.MDC_ICON_SIZES.forEach(function(size) {
      ctrl.size = size;
      ctrl.$onChanges({size: {}});
      expect(ctrl.elem.hasClass('mdc-icon--' + size));
      expect(ctrl.elem[0].classList.length).to.equal(3);
    });
  });

  it('should not add any classes if an invalid size is added', function() {
    const ctrl = makeCtrl({'mdcFontIcon': icon1, 'size': 55});

    expect(ctrl.elem[0].classList.length).to.equal(2);
  });
});
