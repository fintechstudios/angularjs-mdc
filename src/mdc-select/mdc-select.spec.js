'use strict';

describe('mdc-select', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcSelect');
  }));

  function makeComponent(bindings = {}, locals = {}, doCompile = true, htmlContent = undefined) {
    if (!htmlContent) {
      htmlContent = '<option value="one"></option><option value="two"></option><option value="three"></option>';
    }
    const component = new $mockComponent(bindings, locals, false);
    component.$element.html(htmlContent);
    if (doCompile) {
      component.compile();
    }
    return component;
  }

  context('fully-featured component', function() {
    it('should show only the fully-featured component by default', function() {
      const component = makeComponent();
      const children = component.$element.children();
      expect(angular.element(children[0]).hasClass('ng-hide')).to.be.false;
      expect(angular.element(children[1]).hasClass('ng-hide')).to.be.true;
      expect(angular.element(children[2]).hasClass('ng-hide')).to.be.true;
    });

    it('should show only the fully-featured component when noAnimation=false', function() {
      const component = makeComponent({noAnimation: false});
      const children = component.$element.children();
      expect(angular.element(children[0]).hasClass('ng-hide')).to.be.false;
      expect(angular.element(children[1]).hasClass('ng-hide')).to.be.true;
      expect(angular.element(children[2]).hasClass('ng-hide')).to.be.true;
    });

    it('should toggle between disabled and enabled when ngDisabled changes', function() {
      const component = makeComponent({'ngDisabled': 'isDisabled'}, {'isDisabled': true});
      const elem = component.$element;

      expect(elem.attr('disabled')).to.equal('disabled');
      component.$parent('isDisabled', false);
      expect(elem.attr('disabled')).to.not.exist;
      component.$parent('isDisabled', true);
      expect(elem.attr('disabled')).to.equal('disabled');
    });

    it('should add role="option" to options', function() {
      const component = makeComponent();
      angular.forEach(component.$element.children()[0], function(option) {
        expect(option.getAttribute('role')).to.equal('option');
      });
    });

    it('should add class mdc-list-item to options', function() {
      const component = makeComponent();
      angular.forEach(component.$element.children()[0], function(option) {
        expect(option.hasClass('mdc-list-item')).to.be.true;
      });
    });

    it.skip('should change when ng-model changes', function() {
      const component = makeComponent({'ngModel': 'selected'}, {'selected': ''});
      const option1 = component.$element.children()[0].querySelector('option[value="one"]');

      expect(option1.getAttribute('aria-selected')).to.not.exist;
      component.$parent('selected', 'one');
      expect(option1.getAttribute('aria-selected')).to.equal('true');

      component.$parent('selected', 'two');
      expect(option1.getAttribute('aria-selected')).to.not.exist;
    });

    it.skip('should propagate changes to ng-model when an option is clicked', function() {
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

    it('should show the css select when the screen size is small', inject(function($window) {
      const component = makeComponent({noAnimation: true});
      let children = component.$element.children();
      expect(angular.element(children[0]).hasClass('ng-hide')).to.be.true;
      expect(angular.element(children[1]).hasClass('ng-hide')).to.be.false;
      expect(angular.element(children[2]).hasClass('ng-hide')).to.be.true;

      $window.innerWidth = 600;
      angular.element($window).triggerHandler('resize');
      component.digest();

      children = component.$element.children();
      expect(angular.element(children[0]).hasClass('ng-hide')).to.be.true;
      expect(angular.element(children[1]).hasClass('ng-hide')).to.be.false;
      expect(angular.element(children[2]).hasClass('ng-hide')).to.be.true;

      $window.innerWidth = 1000;
      angular.element($window).triggerHandler('resize');
      component.digest();

      children = component.$element.children();
      expect(angular.element(children[0]).hasClass('ng-hide')).to.be.true;
      expect(angular.element(children[1]).hasClass('ng-hide')).to.be.false;
      expect(angular.element(children[2]).hasClass('ng-hide')).to.be.true;
    }));
  });

  it('should show only the css select when noAnimation=true', function() {
    const component = makeComponent({noAnimation: true});
    const children = component.$element.children();
    expect(angular.element(children[0]).hasClass('ng-hide')).to.be.true;
    expect(angular.element(children[1]).hasClass('ng-hide')).to.be.false;
    expect(angular.element(children[2]).hasClass('ng-hide')).to.be.true;
  });

  it('should show only the multiple select when multiple=true', function() {
    const component = makeComponent({multiple: true});
    const children = component.$element.children();
    expect(angular.element(children[0]).hasClass('ng-hide')).to.be.true;
    expect(angular.element(children[1]).hasClass('ng-hide')).to.be.true;
    expect(angular.element(children[2]).hasClass('ng-hide')).to.be.false;
  });
});
