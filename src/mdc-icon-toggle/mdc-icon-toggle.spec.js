'use strict';

describe('mdc-icon-toggle', function() {
  const CONTENT_TOGGLE_BINDINGS = {
    'toggleOn': '{"content": "favorite", "label": "Remove from Favorites"}',
    'toggleOff': '{"content": "favorite_border", "label": "Add to Favorites"}',
  };

  const CSS_TOGGLE_BINDINGS = {
    'toggleOn': '{"cssClass": "fa-star", "label": "Unstar this item"}',
    'toggleOff': '{"cssClass": "fa-star-o", "label": "Star this item"}',
  };

  let $mockComponent;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcIconToggle');
  }));

  function testState(state, bindings, testComponent=undefined) {
    const toggleData = JSON.parse(bindings['toggle' + (state === 'on' ? 'On' : 'Off')]);
    if (bindings.toggleOn.indexOf('cssClasses') < 0) {
      it(`should insert toggle-${state}.content into the element HTML`, function() {
        const elem = new $mockComponent(bindings).$element;
        expect(elem.html()).to.equal(toggleData.content);
      });
    }

    it(`should insert toggle-${state}.label as aria-label`, function() {
      const component = testComponent || new $mockComponent(bindings);
      expect(component.$element.attr('aria-label')).to.equal(toggleData.label);
      expect(component.$ctrl.ariaLabel).to.equal(toggleData.label);
    });

    it(`should set aria-pressed=${state === 'on' ? 'true' : 'false'}`, function() {
      const component = testComponent || new $mockComponent(bindings);
      const pressed = state === 'on' ? 'true' : 'false';

      expect(component.$element.attr('aria-pressed')).to.equal(pressed);
      expect(component.$ctrl.ariaPressed).to.equal(pressed);
    });
  }

  it('should have the `material-icons` classes by default', function() {
    const elem = new $mockComponent().$element;
    expect(elem.hasClass('material-icons')).to.be.true;
  });

  it('should not have the `material-icons` class when toggleOn has `cssClass`', function() {
    const elem = new $mockComponent({'toggleOn': CSS_TOGGLE_BINDINGS['toggleOn']}).$element;

    expect(elem.hasClass('material-icons')).to.be.false;
  });

  it('should not have the `material-icons` class when toggleOff has `cssClass`', function() {
    const elem = new $mockComponent({'toggleOff': CSS_TOGGLE_BINDINGS['toggleOff']}).$element;

    expect(elem.hasClass('material-icons')).to.be.false;
  });

  it('should not have the `material-icons` class when toggleOff and toggleOn has `cssClass`', function() {
    const elem = new $mockComponent(CSS_TOGGLE_BINDINGS).$element;

    expect(elem.hasClass('material-icons')).to.be.false;
  });

  context('should be toggled off by default', function() {
    testState('off', CONTENT_TOGGLE_BINDINGS);
  });

  it('should be toggled off when aria-pressed=false', function() {
    testState('off', Object.assign({'ariaPressed': 'false'}, CONTENT_TOGGLE_BINDINGS));
  });

  it('should be toggled on when aria-pressed=true', function() {
    testState('on', Object.assign({'ariaPressed': 'true'}, CONTENT_TOGGLE_BINDINGS));
  });

  it('should be toggled off when ng-model=false', function() {
    const bindings = Object.assign({'ng-model': 'isToggled'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isToggled': false});
    testState('off', bindings, component);
  });

  it('should be toggled on when ng-model=true', function() {
    const bindings = Object.assign({'ng-model': 'isToggled'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isToggled': true});
    testState('on', bindings, component);
  });

  it('should be toggled off when ng-model=false and aria-pressed=true', function() {
    const bindings = Object.assign({'ng-model': 'isToggled', 'ariaPressed': 'true'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isToggled': false});
    testState('off', bindings, component);
  });

  it('should be toggled on when ng-model=true and aria-pressed=false', function() {
    const bindings = Object.assign({'ng-model': 'isToggled', 'ariaPressed': 'false'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isToggled': true});
    testState('on', bindings, component);
  });

  it('when ng-model is specified, clicking the element should change the scoped variable', function() {
    const bindings = Object.assign({'ng-model': 'isToggled'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isToggled': false});

    testState('off', bindings, component);
    expect(component.$parent('isToggled')).to.be.false;

    component.$element.triggerHandler('click');
    testState('on', CONTENT_TOGGLE_BINDINGS, component);
    expect(component.$parent('isToggled')).to.be.true;
  });

  it('changes to ng-model should change the toggle state', function() {
    const bindings = Object.assign({'ng-model': 'isToggled'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isToggled': false});
    testState('off', bindings, component);

    component.$parent('isToggled', true);
    testState('on', CONTENT_TOGGLE_BINDINGS, component);
  });

  it('should change from toggled on to toggled off when clicked', function() {
    const component = new $mockComponent(CONTENT_TOGGLE_BINDINGS);
    const elem = component.$element;
    testState('off', CONTENT_TOGGLE_BINDINGS, component);

    elem.triggerHandler('click');
    testState('on', CONTENT_TOGGLE_BINDINGS, component);

    elem.triggerHandler('click');
    testState('off', CONTENT_TOGGLE_BINDINGS, component);
  });

  function expectComponentToBeDisabled(component) {
    const elem = component.$element;
    expect(elem.hasClass('mdc-icon-toggle--disabled')).to.be.true;
    expect(elem.attr('aria-disabled')).to.equal('true');
    expect(elem.attr('tabindex')).to.equal('-1');
    expect(component.$ctrl.ariaDisabled).to.equal('true');
  }

  function expectComponentToBeEnabled(component) {
    const elem = component.$element;
    expect(elem.hasClass('mdc-icon-toggle--disabled')).to.be.false;
    expect(elem.attr('aria-disabled')).to.not.exist;
    expect(elem.attr('disabled')).to.not.exist;
    expect(component.$ctrl.ariaDisabled).to.not.exist;
  }

  it('should be disabled when ng-disabled=true', function() {
    const bindings = Object.assign({'ngDisabled': true}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings);
    expectComponentToBeDisabled(component);
  });

  it('should be enabled when ng-disabled=false', function() {
    const bindings = Object.assign({'ngDisabled': false}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings);
    expectComponentToBeEnabled(component);
  });

  it('should toggle between disabled and enabled when ngDisabled changes', function() {
    const bindings = Object.assign({'ngDisabled': 'isDisabled'}, CONTENT_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'isDisabled': true});

    expectComponentToBeDisabled(component);
    component.$parent('isDisabled', false);
    expectComponentToBeEnabled(component);
    component.$parent('isDisabled', true);
    expectComponentToBeDisabled(component);
  });

  it('if iconInnerSelector is present, cssClasses should be applied to the internal object', function() {
    const bindings = Object.assign({'iconInnerSelector': '.fa'}, CSS_TOGGLE_BINDINGS);
    const component = new $mockComponent(bindings, {'ngModel': 'isToggled'}, false);
    const elem = component.$element;
    elem.html('<i class="fa" aria-hidden="true"></i>');
    const innerElem = elem.find('i');
    component.compile();

    expect(component.$ctrl.iconInnerSelector).to.equal('.fa');

    testState('on', bindings, component);
    expect(innerElem.length).to.equal(1);
    expect(innerElem.hasClass('fa')).to.be.true;
    expect(innerElem.hasClass('fa-star-o')).to.be.true;

    elem.triggerHandler('click');
    testState('off', bindings, component);
    expect(innerElem.hasClass('fa')).to.be.true;
    expect(innerElem.hasClass('fa-star')).to.be.true;
  });

  ['primary', 'secondary'].forEach(function(color) {
    it('should have the `mdc-icon-toggle--' + color + '` class when color=' + color, function() {
      const component = new $mockComponent({'color': '{{ iconColor }}'}, {iconColor: ''});
      const elem = component.$element;

      expect(elem.hasClass('mdc-icon-toggle--' + color)).to.be.false;
      component.$parent('iconColor', color);
      expect(elem.hasClass('mdc-icon-toggle--' + color)).to.be.true;
      component.$parent('iconColor', '');
      expect(elem.hasClass('mdc-icon-toggle--' + color)).to.be.false;
    });
  });
});
