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

  it('should have only the `material-icons` class by default', function() {
    const ctrl = makeCtrl();

    expect(ctrl.elem.hasClass('material-icons')).to.be.true;
    expect(ctrl.elem[0].classList.length).to.equal(1);
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
});
