'use strict';

describe('mdc-icon', function() {
  let $mockComponent;
  const icon1 = 'home';
  const icon2 = 'arrow_back';

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcIcon');
  }));

  it('should have the `material-icons` and `mdc-icon` classes by default', function() {
    const elem = new $mockComponent().$element;

    expect(elem.hasClass('material-icons')).to.be.true;
    expect(elem.hasClass('mdc-icon')).to.be.true;
  });

  it('should use the `mdc-font-icon` attribute as its text contents', function() {
    const elem = new $mockComponent({'mdcFontIcon': icon1}).$element;

    expect(elem.text()).to.equal(icon1);
  });

  it('should update the text contents as `mdc-font-icon` changes', function() {
    const component = new $mockComponent({'mdcFontIcon': '{{ iconName }}'}, {iconName: icon1});
    const elem = component.$element;

    expect(elem.text()).to.equal(icon1);
    component.$parent('iconName', icon2);

    expect(elem.text()).to.equal(icon2);
  });

  it('should add the `mdc-icon--SIZE` class for each of the MDC_ICON_SIZES', inject(function(MDC_ICON_SIZES) {
    const component = new $mockComponent({'mdcFontIcon': icon1, 'size': '{{ iconSize }}'}, {iconSize: ''});
    const elem = component.$element;
    const initialClassSize = elem[0].classList.length;

    MDC_ICON_SIZES.forEach(function(size) {
      component.$parent('iconSize', size);
      expect(elem.hasClass('mdc-icon--' + size));
      expect(elem[0].classList.length).to.equal(initialClassSize + 1);
    });
  }));

  it('should not add any classes if an invalid size is added', function() {
    const component = new $mockComponent({'mdcFontIcon': icon1, 'size': '{{ iconSize }}'}, {iconSize: ''});
    const elem = component.$element;
    const initialClassSize = elem[0].classList.length;
    component.$parent('iconSize', 'aaa');

    expect(elem[0].classList.length).to.equal(initialClassSize);
  });
});
