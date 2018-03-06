import {elemReadyPromise} from '../util/elemReadyPromise';

import {MDC_MENU_TOGGLE_EVENT} from './toggle/directive';

describe('mdc-menu', () => {
  let MockMenu;
  let $rootScope;
  const getMockMenu = (bindings, parent, doCompile = true) => {
    const menu = new MockMenu(bindings, parent, false);

    menu.ready = elemReadyPromise(menu.$element);
    if (doCompile) {
      menu.compile();
    }
    return menu;
  };

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator, _$rootScope_) => {
    MockMenu = $componentGenerator('mdcMenu');
    $rootScope = _$rootScope_;
  }));

  it('should have the `mdc-menu` class', () => {
    const menu = getMockMenu();

    expect(menu.$element.hasClass('mdc-menu')).to.be.true;

    return menu.ready;
  });

  it('should set tabindex=-1 by default', () => {
    const menu = getMockMenu();

    expect(menu.$element.attr('tabindex')).to.equal('-1');

    return menu.ready;
  });

  it('should not override tabindex if specified', () => {
    const menu = getMockMenu({tabindex: 3});

    expect(menu.$element.attr('tabindex')).to.equal('3');

    return menu.ready;
  });

  it('should open when `MDCMenu:toggle` is fired with {id=menuId}', () => {
    const menu = getMockMenu({id: 'menu'});
    const elem = menu.$element;

    expect(elem.hasClass('mdc-menu--animating-open')).to.be.false;

    $rootScope.$broadcast(MDC_MENU_TOGGLE_EVENT, {id: 'menu'});
    expect(elem.hasClass('mdc-menu--animating-open')).to.be.true;

    return menu.ready;
  });

  it('should not open when `MDCMenu:toggle` is fired with {id!=menuId}', () => {
    const menu = getMockMenu({id: 'menu'});
    const elem = menu.$element;

    expect(elem.hasClass('mdc-menu--animating-open')).to.be.false;

    $rootScope.$broadcast(MDC_MENU_TOGGLE_EVENT, {id: 'notmenu'});
    expect(elem.hasClass('mdc-menu--animating-open')).to.be.false;

    return menu.ready;
  });
});


describe('mdc-menu-anchor', () => {
  let MockAnchor;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator) => {
    MockAnchor = $componentGenerator('mdcMenuAnchor');
  }));

  it('should have the `mdc-menu-anchor` class', () => {
    const menu = new MockAnchor();

    expect(menu.$element.hasClass('mdc-menu-anchor')).to.be.true;
  });
});


describe('mdc-menu-toggle', () => {
  let $compile;
  let $scope;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
  }));

  it('should open mdc-menu with the given id when an id is specified', () => {
    const parent = angular.element('<div></div>');
    const toggle = angular.element('<div mdc-menu-toggle="testMenu"></div>');
    const menu1 = angular.element('<mdc-menu id="testMenu"></mdc-menu>');
    const menu2 = angular.element('<mdc-menu></mdc-menu>');
    const ready = elemReadyPromise(menu1);
    parent.append(toggle);
    parent.append(menu1);
    parent.append(menu2);
    $compile(parent)($scope);

    $scope.$digest();

    expect(menu1.hasClass('mdc-menu--animating-open')).to.be.false;
    expect(menu2.hasClass('mdc-menu--animating-open')).to.be.false;

    toggle.triggerHandler('click');
    expect(menu1.hasClass('mdc-menu--animating-open')).to.be.true;
    expect(menu2.hasClass('mdc-menu--animating-open')).to.be.false;

    return ready;
  });

  it('should open mdc-menu when inside mdc-menu-anchor', () => {
    const parent = angular.element('<div mdc-menu-anchor></div>');
    const toggle = angular.element('<div mdc-menu-toggle></div>');
    const menu = angular.element('<mdc-menu></mdc-menu>');
    const ready = elemReadyPromise(menu);

    parent.append(toggle);
    parent.append(menu);
    $compile(parent)($scope);

    $scope.$digest();

    expect(menu.hasClass('mdc-menu--animating-open')).to.be.false;

    toggle.triggerHandler('click');
    expect(menu.hasClass('mdc-menu--animating-open')).to.be.true;

    return ready;
  });
});
