'use strict';

describe('mdc-select', () => {
  let MockSelect;
  const getMockSelect = (bindings = {}, locals = {}, doCompile = true, htmlContent = undefined) => {
    const component = new MockSelect(bindings, locals, false);

    if (!htmlContent) {
      htmlContent = ['one', 'two', 'three']
        .map((text) => `<mdc-select-item value="${text}"></mdc-select-item>`)
        .join('');
    }
    component.$element[0].innerHTML = htmlContent;

    if (doCompile) {
      component.compile();
    }
    return component;
  };

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator) => {
    MockSelect = $componentGenerator('mdcSelect');
  }));

  it('should have the mdc-select class', () => {
    expect(new MockSelect().$element.hasClass('mdc-select')).to.be.true;
  });

  it('should have attribute role=listbox', () => {
    expect(new MockSelect().$element.attr('role')).to.equal('listbox');
  });

  it('should have class mdc-select--box when box=true', () => {
    const select = new MockSelect({box: true});
    expect(select.$element.hasClass('mdc-select--box')).to.be.true;
  });

  it('should toggle between disabled and enabled when ngDisabled changes', () => {
    const select = getMockSelect({ngDisabled: 'isDisabled'});
    const elem = select.$element;

    return new Promise((resolve) => elem.ready(() => resolve()))
      .then(() => {
        expect(elem.hasClass('mdc-select--disabled')).to.be.false;
        select.$parent('isDisabled', true);
        expect(elem.hasClass('mdc-select--disabled')).to.be.true;
        select.$parent('isDisabled', false);
        expect(elem.hasClass('mdc-select--disabled')).to.be.false;
      });
  });

  it('should change when ngModel changes', () => {
    const select = getMockSelect({ngModel: 'selected'});

    return new Promise((resolve) => select.$element.ready(() => resolve()))
      .then(() => {
        const option = select.$element[0].querySelector('mdc-select-item');

        expect(option.getAttribute('aria-selected')).to.not.exist;

        select.$parent('selected', option.getAttribute('value'));
        expect(option.getAttribute('aria-selected')).to.equal('true');

        select.$parent('selected', 'invalid');
        expect(option.getAttribute('aria-selected')).to.not.exist;
      });
  });
});

describe('mdc-select-item', () => {
  let MockSelectItem;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator) => {
    MockSelectItem = $componentGenerator('mdcSelectItem');
  }));

  it('should have class mdc-list-item', () => {
    const item = new MockSelectItem();
    expect(item.$element.hasClass('mdc-list-item')).to.be.true;
  });

  it('should add role="option"', () => {
    const item = new MockSelectItem();
    expect(item.$element.attr('role')).to.equal('option');
  });

  it('should add tabindex="0" by default', () => {
    const item = new MockSelectItem();
    expect(item.$element.attr('tabindex')).to.equal('0');
  });

  it('should not change tabindex if it is specified', () => {
    const item = new MockSelectItem({tabindex: 2});
    expect(item.$element.attr('tabindex')).to.equal('2');
  });

  it('should set aria-disabled=true if ngDisabled=true', () => {
    const item = new MockSelectItem({ngDisabled: 'isDisabled'});

    expect(item.$element.attr('aria-disabled')).to.equal('false');

    item.$parent('isDisabled', 'true');
    expect(item.$element.attr('aria-disabled')).to.equal('true');
  });

  it('should set tabindex=-1 if ngDisabled=true', () => {
    const item = new MockSelectItem({ngDisabled: 'isDisabled'});

    expect(item.$element.attr('tabindex')).to.equal('0');

    item.$parent('isDisabled', 'true');
    expect(item.$element.attr('tabindex')).to.equal('-1');
  });

  it('should return ngValue || value || id || textContent for getValue()', () => {
    const item = new MockSelectItem({
      ngValue: 'ngValue', value: '{{ value }}', id: '{{ id }}',
    });
    const ctrl = item.$element.controller('mdcSelectItem');
    item.$element.html('inner text');

    expect(ctrl.getValue()).to.equal('inner text');

    ['id', 'value', 'ngValue'].forEach((attr) => {
      item.$parent(attr, `${attr}-value`);
      expect(ctrl.getValue()).to.equal(`${attr}-value`);
    });
  });

  it('hasHTMLElement() should return true only if given the element of the item', () => {
    const item = new MockSelectItem();
    const ctrl = item.$element.controller('mdcSelectItem');

    expect(ctrl.hasHTMLElement(item.$element[0])).to.be.true;
    expect(ctrl.hasHTMLElement(3)).to.be.false;
  });
});
