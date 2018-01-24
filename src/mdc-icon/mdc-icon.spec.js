'use strict';

describe('mdc-icon', function() {
  let MockIcon;
  let MockButton;
  const icon1 = 'home';

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(($componentGenerator) => {
    MockIcon = $componentGenerator('mdcIcon');
    MockButton = $componentGenerator('mdcButton');
  }));

  it('should have the `material-icons` class by default', () => {
    const elem = new MockIcon().$element;

    expect(elem.hasClass('material-icons')).to.be.true;
  });

  it('should set the font-size to whatever is given in size', () => {
    const component = new MockIcon({'ng-bind': icon1, 'size': 42});
    expect(component.$element[0].style.fontSize).to.equal('42px');
  });

  it('should add mdc-button__icon class if inside a button', () => {
    const button = new MockButton(undefined, undefined, false);
    const icon = new MockIcon(undefined, undefined, false);
    button.$element.append(icon.$element);

    button.compile(); // will compile icon

    expect(icon.$element.hasClass('mdc-button__icon')).to.be.true;
  });
});
