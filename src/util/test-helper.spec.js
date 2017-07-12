'use strict';

import {SimpleChange, getComponentGenerator} from '../util/test-helper';

class TestComponentController {
  constructor($element) {
    this.e = $element;

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
  .module('test', [])
  .component('testComponent', {
    bindings: {
      'bound': '@',
    },
    controller: TestComponentController,
  });

describe('test-helper', function() {
  context('.getComponentGenerator', function() {
    let makeCtrl;

    beforeEach(angular.mock.module('test'));
    beforeEach(inject(function($componentController) {
      makeCtrl = getComponentGenerator($componentController, 'test-component');
    }));

    it('should create a controller of the given name', function() {
      expect(makeCtrl()).to.be.an.instanceof(TestComponentController);
    });

    it('should inject an instance of the component element into the controller', function() {
      const ctrl = makeCtrl();
      expect(ctrl.e).to.exist;
      expect(ctrl.e).to.be.an.instanceof(angular.element);
      expect(ctrl.e[0].tagName).to.equal('TEST-COMPONENT');
    });

    it('should execute controller.$onChanges once', function() {
      const ctrl = makeCtrl();
      expect(ctrl.onChangesCalled).to.equal(1);
      ctrl.$onChanges({});
      expect(ctrl.onChangesCalled).to.equal(2);
    });

    it('should execute controller.$onInit once', function() {
      const ctrl = makeCtrl();
      expect(ctrl.onInitCalled).to.equal(1);
      ctrl.$onInit();
      expect(ctrl.onInitCalled).to.equal(2);
    });

    it('should execute controller.$postLink once', function() {
      const ctrl = makeCtrl();
      expect(ctrl.postLinkCalled).to.equal(1);
      ctrl.$postLink();
      expect(ctrl.postLinkCalled).to.equal(2);
    });

    it('should simulate binding to the controller', function() {
      const TEST_STRING = 'hello';
      const ctrl = makeCtrl({bound: TEST_STRING});
      expect(ctrl.bound).to.exist;
      expect(ctrl.bound).to.equal(TEST_STRING);
    });

    it('should execute `$onChanges`, then `$onInit`, then `$postLink`', function() {
      const ctrl = makeCtrl();
      expect(ctrl.functionCalls).to.be.lengthOf(3);
      expect(ctrl.functionCalls[0]).to.equal('$onChanges');
      expect(ctrl.functionCalls[1]).to.equal('$onInit');
      expect(ctrl.functionCalls[2]).to.equal('$postLink');
    });

    it('should pass bindings to the onChanges function', function() {
      const TEST_STRING = 'hello';
      const ctrl = makeCtrl({bound: TEST_STRING});
      expect(ctrl.lastChangesObj).to.exist;
      expect(ctrl.lastChangesObj.bound).to.exist;
      expect(ctrl.lastChangesObj.bound).to.be.instanceof(SimpleChange);
      expect(ctrl.lastChangesObj.bound.currentValue).to.exist;
      expect(ctrl.lastChangesObj.bound.currentValue).to.equal(TEST_STRING);
      expect(ctrl.lastChangesObj.bound.isFirstChange()).to.be.true;
    });

    it('should add an `_update_` function to the controller to simulate binding update', function() {
      const TEST1 = 'hello';
      const TEST2 = 'newValue';
      const ctrl = makeCtrl({bound: TEST1});
      expect(ctrl.onChangesCalled).to.equal(1);
      ctrl._update_('bound', TEST2);
      expect(ctrl.bound).to.equal(TEST2);
      expect(ctrl.onChangesCalled).to.equal(2);
      expect(ctrl.lastChangesObj).to.exist;
      expect(ctrl.lastChangesObj.bound).to.exist;
      expect(ctrl.lastChangesObj.bound).to.be.instanceof(SimpleChange);
      expect(ctrl.lastChangesObj.bound.previousValue).to.exist;
      expect(ctrl.lastChangesObj.bound.previousValue).to.equal(TEST1);
      expect(ctrl.lastChangesObj.bound.currentValue).to.exist;
      expect(ctrl.lastChangesObj.bound.currentValue).to.equal(TEST2);
      expect(ctrl.lastChangesObj.bound.isFirstChange()).to.be.false;
    });
  });
});
