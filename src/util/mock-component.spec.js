'use strict';

describe('test-helper', function() {
  class TestComponentController {
    constructor($element, $scope) {
      this.e = $element;
      this.$scope = $scope;

      this.postLinkCalled = 0;
      this.onChangesCalled = 0;
      this.onInitCalled = 0;

      this.functionCalls = [];
      this.lastChangesObj = null;
    }

    $onInit() {
      this.functionCalls.push('$onInit');
      this.onInitCalled++;
    }

    $onChanges(changesObj) {
      this.functionCalls.push('$onChanges');
      this.onChangesCalled++;
      this.lastChangesObj = changesObj;
    }

    $postLink() {
      this.functionCalls.push('$postLink');
      this.postLinkCalled++;
    }
  }

  angular
    .module('testHelperModule', [])
    .component('testComponent', {
      bindings: {
        'testString': '@',
        'testOneWay': '<',
        'testTwoWay': '=',
        'testMethod': '&',
      },
      controller: TestComponentController,
    });

  const COMPONENT_NAME = 'testComponent';
  const TAG_NAME = 'test-component';

  const TEST_STRING = 'testStringOut';
  const UPDATED_STRING = 'newStringOutput';

  context('.getComponentGenerator', function() {
    let $mockComponent;

    beforeEach(angular.mock.module('ngMockComponent'));
    beforeEach(angular.mock.module('testHelperModule'));
    beforeEach(inject(function($componentGenerator) {
      $mockComponent = $componentGenerator(COMPONENT_NAME);
    }));

    it('should have .name, which is the given component name', function() {
      const component = new $mockComponent();
      expect(component.name).to.exist;
      expect(component.name).to.equal(COMPONENT_NAME);
    });

    it('should have .tagName, which is the given component element tag', function() {
      const component = new $mockComponent();
      expect(component.tagName).to.exist;
      expect(component.tagName).to.equal(TAG_NAME);
    });

    it('should have .$ctrl, which is a controller of the given name', function() {
      const component = new $mockComponent();
      expect(component.$ctrl).to.exist;
      expect(component.$ctrl).to.be.an.instanceof(TestComponentController);
    });

    it('should provide .$childScope, which is the scope of the controller', function() {
      const component = new $mockComponent();
      expect(component.$ctrl.$scope).to.equal(component.$childScope);
    });

    it('should provide .$parentScope, which is the scope above the controller', function() {
      const component = new $mockComponent();
      expect(component.$childScope.$parent).to.equal(component.$parentScope);
    });

    it('should have .$element, which is the element linked to the controller', function() {
      const component = new $mockComponent();
      expect(component.$element).to.exist;
      expect(component.$element).to.be.an.instanceof(angular.element);
      expect(component.$element[0].tagName).to.equal(TAG_NAME.toUpperCase());

      const ctrl = component.$ctrl;
      expect(ctrl.e).to.exist;
      expect(ctrl.e).to.be.an.instanceof(angular.element);
      expect(ctrl.e[0].tagName).to.equal(TAG_NAME.toUpperCase());

      expect(component.$element[0] === ctrl.e[0]).to.be.true;
    });

    it('should allow controller compilation to be stalled by passing `doCompile=false`', function() {
      const component = new $mockComponent({}, {}, false);
      expect(component.$childScope).to.not.exist;
      expect(component.$ctrl).to.not.exist;
    });

    it('should provide `.compile()` to compile the controller if `doCompile=false`', function() {
      const component = new $mockComponent({}, {}, false);
      expect(component.$childScope).to.not.exist;
      expect(component.$ctrl).to.not.exist;

      component.compile();

      expect(component.$childScope).to.exist;
      expect(component.$ctrl).to.exist;
      expect(component.$ctrl).to.be.instanceof(TestComponentController);
    });

    context('should execute the component lifecycle', function() {
      it('should execute controller.$onChanges once', function() {
        const ctrl = new $mockComponent().$ctrl;
        expect(ctrl.onChangesCalled).to.equal(1);
      });

      it('should execute controller.$onInit once', function() {
        const ctrl = new $mockComponent().$ctrl;
        expect(ctrl.onInitCalled).to.equal(1);
      });

      it('should execute controller.$postLink once', function() {
        const ctrl = new $mockComponent().$ctrl;
        expect(ctrl.postLinkCalled).to.equal(1);
      });

      it('should execute `$onChanges`, then `$onInit`, then `$postLink`', function() {
        const ctrl = new $mockComponent().$ctrl;
        expect(ctrl.functionCalls).to.be.lengthOf(3);
        expect(ctrl.functionCalls[0]).to.equal('$onChanges');
        expect(ctrl.functionCalls[1]).to.equal('$onInit');
        expect(ctrl.functionCalls[2]).to.equal('$postLink');
      });

      it('should pass bindings to the `$onChanges` function', function() {
        const ctrl = new $mockComponent({testString: TEST_STRING}).$ctrl;
        expect(ctrl.lastChangesObj).to.exist;
        expect(ctrl.lastChangesObj.testString).to.exist;
        expect(ctrl.lastChangesObj.testString.currentValue).to.exist;
        expect(ctrl.lastChangesObj.testString.currentValue).to.equal(TEST_STRING);
        expect(ctrl.lastChangesObj.testString.isFirstChange()).to.be.true;
      });

      it('updated string bindings should execute the `$onChanges` function', function() {
        const component = new $mockComponent({testString: '{{ parentString }}'}, {parentString: TEST_STRING});
        const ctrl = component.$ctrl;

        expect(ctrl.onChangesCalled).to.exist;
        expect(ctrl.onChangesCalled).to.equal(1);

        component.updateParent('parentString', UPDATED_STRING);
        expect(ctrl.onChangesCalled).to.equal(2);
        expect(ctrl.lastChangesObj.testString).to.exist;
        expect(ctrl.lastChangesObj.testString.currentValue).to.exist;
        expect(ctrl.lastChangesObj.testString.currentValue).to.equal(UPDATED_STRING);
        expect(ctrl.lastChangesObj.testString.isFirstChange()).to.be.false;
      });

      it('updated one-way bindings should execute the `$onChanges` function', function() {
        const component = new $mockComponent({testOneWay: 'parentString'}, {parentString: TEST_STRING});
        const ctrl = component.$ctrl;

        expect(ctrl.onChangesCalled).to.exist;
        expect(ctrl.onChangesCalled).to.equal(1);

        component.updateParent('parentString', UPDATED_STRING);
        expect(ctrl.onChangesCalled).to.equal(2);
        expect(ctrl.lastChangesObj.testOneWay).to.exist;
        expect(ctrl.lastChangesObj.testOneWay.currentValue).to.exist;
        expect(ctrl.lastChangesObj.testOneWay.currentValue).to.equal(UPDATED_STRING);
        expect(ctrl.lastChangesObj.testOneWay.isFirstChange()).to.be.false;
      });

      it('updated two-way bindings should not execute the `$onChanges` function', function() {
        const component = new $mockComponent({testTwoWay: 'parentString'}, {parentString: TEST_STRING});
        const ctrl = component.$ctrl;

        expect(ctrl.testTwoWay).to.equal(TEST_STRING);
        expect(ctrl.onChangesCalled).to.exist;
        expect(ctrl.onChangesCalled).to.equal(1);

        component.updateParent('parentString', UPDATED_STRING);
        expect(ctrl.onChangesCalled).to.equal(1);
        expect(ctrl.testTwoWay).to.equal(UPDATED_STRING);
      });
    });

    describe('should provide bindings to the controller', function() {
      it('string bindings initialize', function() {
        const ctrl = new $mockComponent({testString: TEST_STRING}).$ctrl;
        expect(ctrl.testString).to.exist;
        expect(ctrl.testString).to.equal(TEST_STRING);
      });

      it('one-way bindings initialize', function() {
        const ctrl = new $mockComponent({testOneWay: 'parentString'}, {parentString: TEST_STRING}).$ctrl;
        expect(ctrl.testOneWay).to.exist;
        expect(ctrl.testOneWay).to.equal(TEST_STRING);
      });

      it('two-way bindings initialize', function() {
        const ctrl = new $mockComponent({testTwoWay: 'parentString'}, {parentString: TEST_STRING}).$ctrl;
        expect(ctrl.testTwoWay).to.exist;
        expect(ctrl.testTwoWay).to.equal(TEST_STRING);
      });

      it('method bindings instantiate', function() {
        function testMethod(message) {
          return message;
        }
        const component = new $mockComponent(
          {testMethod: 'parentMethod("' + TEST_STRING + '")'}, {parentMethod: testMethod});
        const ctrl = component.$ctrl;

        expect(ctrl.testMethod).to.exist;
        expect(ctrl.testMethod()).to.equal(testMethod(TEST_STRING));
      });

      it('one-way bindings updated in the parent scope will update the controller', function() {
        const UPDATED_STRING = 'newStringOutput';
        const component = new $mockComponent({testOneWay: 'parentString'}, {parentString: TEST_STRING});
        const ctrl = component.$ctrl;
        expect(ctrl.testOneWay).to.exist;
        expect(ctrl.testOneWay).to.equal(TEST_STRING);

        component.$parentScope.parentString = UPDATED_STRING;
        component.$parentScope.$apply();

        expect(ctrl.testOneWay).to.equal(UPDATED_STRING);
      });

      it('two-way bindings updated in the parent scope will update the controller', function() {
        const UPDATED_STRING = 'newStringOutput';
        const component = new $mockComponent({testTwoWay: 'parentString'}, {parentString: TEST_STRING});
        const ctrl = component.$ctrl;
        expect(ctrl.testTwoWay).to.exist;
        expect(ctrl.testTwoWay).to.equal(TEST_STRING);

        component.$parentScope.parentString = UPDATED_STRING;
        component.$parentScope.$apply();

        expect(ctrl.testTwoWay).to.equal(UPDATED_STRING);
      });

      it('two-way bindings updated in the local scope will update the parent', function() {
        const component = new $mockComponent({testTwoWay: 'parentString'}, {parentString: TEST_STRING});
        const ctrl = component.$ctrl;
        expect(ctrl.testTwoWay).to.exist;
        expect(ctrl.testTwoWay).to.equal(TEST_STRING);

        ctrl.testTwoWay = UPDATED_STRING;
        ctrl.$scope.$apply();
        expect(component.$parentScope.parentString).to.equal(UPDATED_STRING);
      });
    });

    it('should provide `.updateParent()` to facilitate updates to parent scope', function() {
      const component = new $mockComponent({testOneWay: 'parentString'}, {parentString: TEST_STRING});
      const ctrl = component.$ctrl;
      expect(ctrl.testOneWay).to.exist;
      expect(ctrl.testOneWay).to.equal(TEST_STRING);

      component.updateParent('parentString', UPDATED_STRING);
      expect(ctrl.testOneWay).to.equal(UPDATED_STRING);
    });
  });
});
