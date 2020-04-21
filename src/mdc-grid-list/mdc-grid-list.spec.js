'use strict';

describe('mdc-grid-list', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcGridList');
  }));

  ['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'].forEach((aspect) => {
    it(`should apply the lmdc-grid-list--tile-aspect-${aspect} class when aspect=${aspect}`, () => {
      const component = new $mockComponent({'aspect': '{{ tileAspect }}'}, {tileAspect: ''});
      const elem = component.$element;

      expect(elem.hasClass(`lmdc-grid-list--tile-aspect-${aspect}`)).to.be.false;

      component.$parent('tileAspect', aspect);
      expect(elem.hasClass(`lmdc-grid-list--tile-aspect-${aspect}`)).to.be.true;

      component.$parent('tileAspect', '');
      expect(elem.hasClass(`lmdc-grid-list--tile-aspect-${aspect}`)).to.be.false;
    });
  });

  ['start', 'end'].forEach((iconAlign) => {
    it(`should apply the lmdc-grid-list--icon-align-${iconAlign} class when iconAlign=${iconAlign}`, () => {
      const component = new $mockComponent({'iconAlign': '{{ iconAlign }}'}, {iconAlign: ''});
      const elem = component.$element;

      expect(elem.hasClass(`lmdc-grid-list--with-icon-align-${iconAlign}`)).to.be.false;

      component.$parent('iconAlign', iconAlign);
      expect(elem.hasClass(`lmdc-grid-list--with-icon-align-${iconAlign}`)).to.be.true;

      component.$parent('iconAlign', '');
      expect(elem.hasClass(`lmdc-grid-list--with-icon-align-${iconAlign}`)).to.be.false;
    });
  });

  ['1'].forEach((tileGutter) => {
    it(`should apply the lmdc-grid-list--tile-gutter-${tileGutter} class when gutter=${tileGutter}`, () => {
      const component = new $mockComponent({'gutter': '{{ gutter }}'}, {gutter: ''});
      const elem = component.$element;

      expect(elem.hasClass(`lmdc-grid-list--tile-gutter-${tileGutter}`)).to.be.false;

      component.$parent('gutter', tileGutter);
      expect(elem.hasClass(`lmdc-grid-list--tile-gutter-${tileGutter}`)).to.be.true;

      component.$parent('gutter', '');
      expect(elem.hasClass(`lmdc-grid-list--tile-gutter-${tileGutter}`)).to.be.false;
    });
  });
});
