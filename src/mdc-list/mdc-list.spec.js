'use strict';

describe('mdc-list', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcList');
  }));

  ['dense', 'twoLine'].forEach(function(style) {
    it('should add the proper class when ' + style + '=true', inject(function($camelToKebab) {
      const className = 'lmdc-list--' + $camelToKebab(style);
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
    const className = 'lmdc-list--avatar-list';
    const component = new $mockComponent({'avatar': 'hasStyle'}, {'hasStyle': false});
    const elem = component.$element;
    expect(elem.hasClass(className)).to.be.false;

    component.$parent('hasStyle', true);
    expect(elem.hasClass(className)).to.be.true;

    component.$parent('hasStyle', false);
    expect(elem.hasClass(className)).to.be.false;
  });
});
