'use strict';

describe('mdc-list', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcList');
  }));

  it('should have the `mdc-list` class by default', function() {
    const elem = new $mockComponent().$element;
    expect(elem.hasClass('mdc-list')).to.be.true;
  });

  ['dense', 'twoLine'].forEach(function(style) {
    it('should add the proper class when ' + style + '=true', inject(function($camelToKebab) {
      const className = 'mdc-list--' + $camelToKebab(style);
      const bindings = {};
      bindings[style] = 'hasStyle';
      const component = new $mockComponent(bindings, {'hasStyle': false});
      const elem = component.$element;
      expect(elem.hasClass(className)).to.be.false;

      component.$parent('hasStyle', true);
      expect(elem.hasClass(className)).to.be.true;

      component.$parent('hasStyle', false);
      expect(elem.hasClass(className)).to.be.false;
    }));
  });

  it('should add the proper class when avatar=true', function() {
    const className = 'mdc-list--avatar-list';
    const component = new $mockComponent({'avatar': 'hasStyle'}, {'hasStyle': false});
    const elem = component.$element;
    expect(elem.hasClass(className)).to.be.false;

    component.$parent('hasStyle', true);
    expect(elem.hasClass(className)).to.be.true;

    component.$parent('hasStyle', false);
    expect(elem.hasClass(className)).to.be.false;
  });
});


describe('mdc-list-item', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcListItem');
  }));

  it('should have the `mdc-list-item` class by default', function() {
    const elem = new $mockComponent().$element;
    expect(elem.hasClass('mdc-list-item')).to.be.true;
  });
});
