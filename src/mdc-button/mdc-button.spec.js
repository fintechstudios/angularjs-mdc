'use strict';

describe('mdc-button', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcButton');
  }));

  ['dense', 'raised', 'compact'].forEach(function(attr) {
    it('should have the `mdc-button--' + attr + '` class when ' + attr + '=true', function() {
      const bindings = {};
      bindings[attr] = 'buttonStyle';

      const component = new $mockComponent(bindings, {buttonStyle: false});
      const elem = component.$element;
      expect(elem.hasClass('mdc-button--' + attr)).to.be.false;

      component.$parent('buttonStyle', true);
      expect(elem.hasClass('mdc-button--' + attr)).to.be.true;

      component.$parent('buttonStyle', false);
      expect(elem.hasClass('mdc-button--' + attr)).to.be.false;
    });
  });

  ['primary', 'accent'].forEach(function(color) {
    it('should have the `mdc-button--' + color + '` class when color=' + color, function() {
      const component = new $mockComponent({'color': '{{ buttonColor }}'}, {buttonColor: ''});
      const elem = component.$element;
      expect(elem.hasClass('mdc-button--' + color)).to.be.false;

      component.$parent('buttonColor', color);
      expect(elem.hasClass('mdc-button--' + color)).to.be.true;

      component.$parent('buttonColor', '');
      expect(elem.hasClass('mdc-button--' + color)).to.be.false;
    });
  });
});
