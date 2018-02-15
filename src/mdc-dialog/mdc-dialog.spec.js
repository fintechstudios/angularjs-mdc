'use strict';

describe('mdc-dialog', () => {
  const BASIC_TEMPLATE = '<mdc-dialog>' +
    '<mdc-dialog-body>' +
    '<p>Muppets are the best</p>' +
    '</mdc-dialog-body>' +
    '</mdc-dialog>';
  let $mdcDialog;
  let $rootScope;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(inject(($injector) => {
    $mdcDialog = $injector.get('$mdcDialog');
    $rootScope = $injector.get('$rootScope');
  }));

  const PRESET_METHODS = {
    alert: [
      'parent', 'title', 'htmlContent', 'textContent', 'ok', 'css', 'scrollable',
    ],
    prompt: [
      'parent', 'title', 'htmlContent', 'textContent', 'initialValue', 'placeholder',
      'ok', 'cancel', 'css', 'scrollable',
    ],
    confirm: [
      'parent', 'title', 'htmlContent', 'textContent', 'ok', 'cancel', 'css', 'scrollable',
    ],
  };

  ['alert', 'prompt', 'confirm'].forEach(function(preset) {
    describe('#' + preset + '()', function() {
      hasConfigurationMethods(preset, PRESET_METHODS[preset]);

      it('shows a basic ' + preset + ' dialog', function() {
        const parent = angular.element('<div>');
        $mdcDialog.show(
          $mdcDialog[preset]()
            .parent(parent)
            .title('Title')
            .textContent('Hello world')
            .css('someClass anotherClass')
            .ok('Next')
        );

        $rootScope.$apply();

        const mdcDialog = angular.element(parent[0].querySelector('mdc-dialog'));
        const mdcBody = mdcDialog.find('mdc-dialog-body');
        expect(mdcBody.text().trim()).to.equal('Hello world');

        const title = mdcDialog.find('mdc-dialog-title');
        expect(title.text()).to.equal('Title');

        const css = mdcDialog.attr('class').split(' ');
        expect(css).to.include('someClass');
        expect(css).to.include('anotherClass');

        const buttons = parent.find('button');
        expect(buttons.length).to.equal(preset === 'alert' ? 1 : 2);
        const okButton = buttons.eq(preset === 'alert' ? 0 : 1);
        expect(okButton.text().trim()).to.equal('Next');
      });
    });
  });

  function hasConfigurationMethods(preset, methods) {
    angular.forEach(methods, function(method) {
      return it('supports chainable config method #' + method, function() {
        const dialog = $mdcDialog[preset]();
        expect(typeof dialog[method]).to.equal('function');
        expect(dialog[method]()).to.equal(dialog);
      });
    });
  }
});


describe('mdc-dialog-body', function() {
  let $mockComponent;

  beforeEach(angular.mock.module('mdc'));
  beforeEach(angular.mock.module('ngMockComponent'));

  beforeEach(inject(function($componentGenerator) {
    $mockComponent = $componentGenerator('mdcDialogBody');
  }));

  it('should have the `mdc-dialog__body--scrollable` class when scrollable=true', function() {
    const component = new $mockComponent({'scrollable': 'hasScroll'}, {hasScroll: false});
    const elem = component.$element;

    expect(elem.hasClass('mdc-dialog__body--scrollable')).to.be.false;

    component.$parent('hasScroll', true);
    expect(elem.hasClass('mdc-dialog__body--scrollable')).to.be.true;

    component.$parent('hasScroll', false);
    expect(elem.hasClass('mdc-dialog__body--scrollable')).to.be.false;
  });
});
