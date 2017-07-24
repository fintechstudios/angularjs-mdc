'use strict';

describe('mdc-simple-menu', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcSimpleMenu');
  }));

  context('should set the proper class for the `openFrom` property', function() {
    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(function(value) {
      it('should set the class for openFrom=' + value, inject(function($camelToKebab) {
        const className = 'mdc-simple-menu--open-from-' + $camelToKebab(value);
        const component = new $mockComponent({'openFrom': '{{ from }}'}, {'from': value});
        const elem = component.$element;
        expect(elem.hasClass(className)).to.be.true;

        component.$parent('from', '');
        expect(elem.hasClass(className)).to.be.false;

        component.$parent('from', value);
        expect(elem.hasClass(className)).to.be.true;
      }));
    });
  });

  it('should respond to the toggle event', inject(function(MDC_SIMPLE_MENU_TOGGLE_EVENT) {
    const component = new $mockComponent();
    const elem = component.$element;

    expect(elem.hasClass('mdc-simple-menu--animating')).to.be.false;
    elem.triggerHandler(MDC_SIMPLE_MENU_TOGGLE_EVENT);
    component.digest();
    expect(elem.hasClass('mdc-simple-menu--animating') || elem.hasClass('mdc-simple-menu--open')).to.be.true;
  }));

  it('should be open when open=true', function() {
    const component = new $mockComponent({'open': 'isOpen'}, {'isOpen': true});
    const elem = component.$element;

    component.$parent('isOpen', true);
    expect(elem.hasClass('mdc-simple-menu--animating') || elem.hasClass('mdc-simple-menu--open')).to.be.true;
  });
});


describe('mdc-simple-menu-toggle', function() {
  let $compile;
  let $scope;
  let $document;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $document = _$document_;
  }));

  it('should open an mdc-simple-menu in the same parent element when clicked', function() {
    const parent = angular.element('<div></div>');
    const toggle = angular.element('<div mdc-simple-menu-toggle></div>');
    const menu = angular.element('<mdc-simple-menu></mdc-simple-menu>');
    parent.append(toggle);
    parent.append(menu);
    $compile(parent)($scope);
    $scope.$digest();

    expect(menu.hasClass('mdc-simple-menu--animating') || menu.hasClass('mdc-simple-menu--open')).to.be.false;

    toggle.triggerHandler('click');
    expect(menu.hasClass('mdc-simple-menu--animating') || menu.hasClass('mdc-simple-menu--open')).to.be.true;
  });

  it('should not bind to any mdc-simple-menu when multiple are in the same parent', function() {
    const parent = angular.element('<div></div>');
    const toggle = angular.element('<div mdc-simple-menu-toggle></div>');
    const menu1 = angular.element('<mdc-simple-menu></mdc-simple-menu>');
    const menu2 = angular.element('<mdc-simple-menu></mdc-simple-menu>');
    parent.append(toggle);
    parent.append(menu1);
    parent.append(menu2);
    $compile(parent)($scope);
    $scope.$digest();

    expect(menu1.hasClass('mdc-simple-menu--animating') || menu1.hasClass('mdc-simple-menu--open')).to.be.false;
    expect(menu2.hasClass('mdc-simple-menu--animating') || menu2.hasClass('mdc-simple-menu--open')).to.be.false;

    toggle.triggerHandler('click');
    expect(menu1.hasClass('mdc-simple-menu--animating') || menu1.hasClass('mdc-simple-menu--open')).to.be.false;
    expect(menu2.hasClass('mdc-simple-menu--animating') || menu2.hasClass('mdc-simple-menu--open')).to.be.false;
  });

  it('should bind to mdc-simple-menu with the given id when an id is specified', function() {
    const parent = angular.element($document[0].body); // mdc-simple-menu-toggle searches body for id
    const toggle = angular.element('<div mdc-simple-menu-toggle="testMenu"></div>');
    const menu1 = angular.element('<mdc-simple-menu id="testMenu"></mdc-simple-menu>');
    const menu2 = angular.element('<mdc-simple-menu></mdc-simple-menu>');
    parent.append(toggle);
    parent.append(menu1);
    parent.append(menu2);
    $compile(parent)($scope);
    $scope.$digest();

    expect(menu1.hasClass('mdc-simple-menu--animating') || menu1.hasClass('mdc-simple-menu--open')).to.be.false;
    expect(menu2.hasClass('mdc-simple-menu--animating') || menu2.hasClass('mdc-simple-menu--open')).to.be.false;

    toggle.triggerHandler('click');
    expect(menu1.hasClass('mdc-simple-menu--animating') || menu1.hasClass('mdc-simple-menu--open')).to.be.true;
    expect(menu2.hasClass('mdc-simple-menu--animating') || menu2.hasClass('mdc-simple-menu--open')).to.be.false;
  });
});
