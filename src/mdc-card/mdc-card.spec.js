
describe('mdc-card-title', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcCardTitle');
  }));

  it('should have the `mdc-card__title--large` class when large=true', function() {
    const component = new $mockComponent({large: 'isLarge'}, {isLarge: true});
    const elem = component.$element;
    expect(elem.hasClass('mdc-card__title--large')).to.be.true;

    component.$parent('isLarge', false);
    expect(elem.hasClass('mdc-card__title--large')).to.be.false;
  });
});

describe('mdc-card-actions', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcCardActions');
  }));

  it('should have the `mdc-card__actions--vertical` class when vertical=true', function() {
    const component = new $mockComponent({vertical: 'isVertical'}, {isVertical: true});
    const elem = component.$element;
    expect(elem.hasClass('mdc-card__actions--vertical')).to.be.true;

    component.$parent('isVertical', false);
    expect(elem.hasClass('mdc-card__actions--vertical')).to.be.false;
  });
});
