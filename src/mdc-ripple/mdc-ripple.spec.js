'use strict';

describe('mdc-ripple', () => {
  let MockRipple;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(($componentGenerator) => {
    MockRipple = $componentGenerator('mdcRipple');
  }));

  it('should have the `mdc-ripple-surface` class', () => {
    const component = new MockRipple();
    const elem = component.$element;

    expect(elem.hasClass('mdc-ripple-surface'), 'missing class mdc-ripple-surface').to.be.true;
  });

  it('should have the `mdc-ripple-upgraded--unbounded` class when mdcRippleIsUnbounded=true', () => {
    const component = new MockRipple({mdcRippleIsUnbounded: 'isUnbounded'}, {'isUnbounded': true});
    const elem = component.$element;

    expect(elem.hasClass('mdc-ripple-upgraded--unbounded')).to.be.true;
    component.$parent('isUnbounded', false);
    expect(elem.hasClass('mdc-ripple-upgraded--unbounded')).to.be.false;
    component.$parent('isUnbounded', true);
    expect(elem.hasClass('mdc-ripple-upgraded--unbounded')).to.be.true;
  });
});
