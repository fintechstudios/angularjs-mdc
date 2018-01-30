'use strict';

describe('mdc-select', () => {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator) => {
    $mockComponent = $componentGenerator('mdcSelect');
  }));

  function makeComponent(bindings = {}, locals = {}, doCompile = true, htmlContent = undefined) {
    const component = new $mockComponent(bindings, locals, false);

    if (!htmlContent) {
      htmlContent = ['one', 'two', 'three']
        .map((text) => `<mdc-select-item value="${text}"></mdc-select-item>`)
        .join('');
    }
    component.$element.html(htmlContent);

    if (doCompile) {
      component.compile();
    }
    return component;
  }

  it('should toggle between disabled and enabled when ngDisabled changes', () => {
    const component = makeComponent({'ngDisabled': 'isDisabled'}, {'isDisabled': true});
    const elem = component.$element;

    expect(elem.attr('disabled')).to.equal('disabled');
    component.$parent('isDisabled', false);
    expect(elem.attr('disabled')).to.not.exist;
    component.$parent('isDisabled', true);
    expect(elem.attr('disabled')).to.equal('disabled');
  });

  it('should add role="option" to options', () => {
    const component = makeComponent();
    angular.forEach(component.$element.children()[0], (option) => {
      expect(option.getAttribute('role')).to.equal('option');
    });
  });

  it('should add class mdc-list-item to options', () => {
    const component = makeComponent();
    angular.forEach(component.$element.children()[0], (option) => {
      expect(option.hasClass('mdc-list-item')).to.be.true;
    });
  });

  it.skip('should change when ng-model changes', () => {
    const component = makeComponent({'ngModel': 'selected'}, {'selected': ''});
    const option1 = component.$element.children()[0].querySelector('option[value="one"]');

    expect(option1.getAttribute('aria-selected')).to.not.exist;
    component.$parent('selected', 'one');
    expect(option1.getAttribute('aria-selected')).to.equal('true');

    component.$parent('selected', 'two');
    expect(option1.getAttribute('aria-selected')).to.not.exist;
  });

  it.skip('should propagate changes to ng-model when an option is clicked', () => {
    const component = makeComponent({'ngModel': 'selected'}, {'selected': ''});
    const option1 = component.$element.children()[0].querySelector('option[value="one"]');
    const originalChangeHandler = component.$ctrl.changeHandler;
    return new Promise(function(resolve, reject) {
      component.$ctrl.changeHandler = function(e) {
        originalChangeHandler.call(component.$ctrl, e);
        expect(component.$parent('selected')).to.equal('one');
        resolve();
      };

      expect(component.$parent('selected')).to.equal('');
      option1.click();
    });
  });
});
