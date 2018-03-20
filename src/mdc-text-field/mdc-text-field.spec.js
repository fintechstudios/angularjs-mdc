import {wrapPromise} from '../util/decorators';


describe('mdc-text-field', () => {
  const LABEL_TEXT = 'Test Label';
  const ICON_HTML = '<mdc-icon>arrow_back</mdc-icon>';

  let MockTextField;
  let tfParentEl;

  beforeEach(angular.mock.module('ngMockComponent'));
  beforeEach(angular.mock.module('mdc'));

  beforeEach(inject(($componentGenerator) => {
    MockTextField = $componentGenerator('mdcTextField');
    tfParentEl = angular.element('<div></div>');
  }));

  function getMockTF(bindings = {}, locals, {doCompile = true, textarea = false, icon} = {}) {
    bindings.label = LABEL_TEXT;
    const tf = new MockTextField(bindings, locals, false);
    tfParentEl.append(tf.$element);

    if (icon === 'leading') {
      tf.$element.append(ICON_HTML);
    }
    tf.$element.append(
      `<${textarea ? 'textarea': 'input'} ng-model="tfModel" ng-disabled="tfDisabled">${textarea ? '</textarea>': ''}`
    );
    if (icon === 'trailing') {
      tf.$element.append(ICON_HTML);
    }

    if (doCompile) {
      tf.compile();
    }

    return new Promise((resolve) => tf.$element.ready(() => resolve(tf)));
  }

  it('should have the mdc-text-field class', () => {
    return getMockTF()
      .then((tf) => {
        expect(tf.$element.hasClass('mdc-text-field')).to.be.true;
      });
  });

  context('default', () => {
    it('should have a label element with contents = label binding', () => {
      return getMockTF()
        .then((tf) => {
          const label = tf.$element.find('label');

          expect(label[0]).to.exist;
          expect(label.text()).to.equal(LABEL_TEXT);
          expect(label.hasClass('mdc-floating-label')).to.be.true;
        });
    });

    it('should init mdc.label_', () => {
      return getMockTF()
        .then((tf) => {
          expect(tf.$ctrl.mdc.label_).to.exist;
        });
    });

    it('should have label[for] equal to input[id]', () => {
      return getMockTF()
        .then((tf) => {
          const label = tf.$element.find('label');
          const input = tf.$element.find('input');

          expect(input.attr('id')).to.exist;
          expect(label.attr('for')).to.exist;

          expect(input.attr('id')).to.equal(label.attr('for'));
        });
    });

    it('should not apply a placeholder when label is specified', () => {
      return getMockTF()
        .then((tf) => {
          const input = tf.$element.find('input');

          expect(input.attr('placeholder')).to.be.undefined;
          expect(input.attr('aria-label')).to.be.undefined;
        });
    });

    it('should have a child .mdc-line-ripple', () => {
      return getMockTF()
        .then((tf) => {
          const lr = tf.$element[0].querySelector('.mdc-line-ripple');

          expect(lr).to.exist;
        });
    });

    it('should init mdc.lineRipple_', () => {
      return getMockTF()
        .then((tf) => {
          expect(tf.$ctrl.mdc.lineRipple_).to.exist;
        });
    });
  });

  context('child textarea', () => {
    it('should have the mdc-text-field--textarea class', () => {
      return getMockTF({}, {}, {textarea: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--textarea')).to.be.true;
        });
    });

    it('should not have a child mdc-line-ripple if contains a textarea', () => {
      return getMockTF({}, {}, {textarea: true})
        .then((tf) => {
          const lr = tf.$element[0].querySelector('.mdc-line-ripple');

          expect(lr).to.not.exist;
        });
    });

    it('should not init mdc.lineRipple_ if contains a textarea', () => {
      return getMockTF({}, {}, {textarea: true})
        .then((tf) => {
          expect(tf.$ctrl.mdc.lineRipple_).to.not.exist;
        });
    });
  });

  context('fullwidth=true', () => {
    it('should have mdc-text-field--fullwidth if fullwidth = true', () => {
      return getMockTF({fullwidth: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--fullwidth')).to.be.true;
        });
    });

    it('should not have a child label', () => {
      return getMockTF({fullwidth: true})
        .then((tf) => {
          const label = tf.$element.find('label');
          expect(label[0]).to.not.exist;
        });
    });

    it('should not init mdc.label_', () => {
      return getMockTF({fullwidth: true})
        .then((tf) => {
          expect(tf.$ctrl.mdc.label_).to.not.exist;
        });
    });

    it('should have a label if contains a textarea', () => {
      return getMockTF({fullwidth: true}, {}, {textarea: true})
        .then((tf) => {
          const label = tf.$element.find('label');

          expect(label[0]).to.exist;
          expect(label.text()).to.equal(LABEL_TEXT);
          expect(label.hasClass('mdc-floating-label')).to.be.true;
        });
    });

    it('should init mdc.label_ if fullwidth = true and contains a textarea', () => {
      return getMockTF({fullwidth: true}, {}, {textarea: true})
        .then((tf) => {
          expect(tf.$ctrl.mdc.label_).to.exist;
        });
    });

    it('should apply a placeholder when fullwidth=true and label is specified', () => {
      return getMockTF({fullwidth: true})
        .then((tf) => {
          const input = tf.$element.find('input');

          expect(input.attr('placeholder')).to.equal(LABEL_TEXT);
          expect(input.attr('aria-label')).to.equal(LABEL_TEXT);
        });
    });
  });

  context('box=true', () => {
    it('should have mdc-text-field--box', () => {
      return getMockTF({box: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--box')).to.be.true;
        });
    });
  });

  context('outlined=true', () => {
    it('should have mdc-text-field--outlined', () => {
      return getMockTF({outlined: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--outlined')).to.be.true;
        });
    });

    it('should not have a child mdc-line-ripple', () => {
      return getMockTF({outlined: true})
        .then((tf) => {
          const lr = tf.$element[0].querySelector('.mdc-line-ripple');

          expect(lr).to.not.exist;
        });
    });

    it('should not init mdc.lineRipple_', () => {
      return getMockTF({outlined: true})
        .then((tf) => {
          expect(tf.$ctrl.mdc.lineRipple_).to.not.exist;
        });
    });

    it('should have a child mdc-notched-outline', () => {
      return getMockTF({outlined: true})
        .then((tf) => {
          const outline = tf.$element[0].querySelector('.mdc-notched-outline');

          expect(outline).to.exist;
        });
    });

    it('should initialize mdc.outline_', () => {
      return getMockTF({outlined: true})
        .then((tf) => {
          expect(tf.$ctrl.mdc.outline_).to.exist;
        });
    });

    it('should not have mdc-text-field--outlined if contains a textarea', () => {
      return getMockTF({outlined: true}, {}, {textarea: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--outlined')).to.be.false;
        });
    });

    it('should not have a child mdc-notched-outline if contains a textarea', () => {
      return getMockTF({outlined: true}, {}, {textarea: true})
        .then((tf) => {
          const outline = tf.$element[0].querySelector('.mdc-notched-outline');

          expect(outline).to.not.exist;
        });
    });

    it('should not init mdc.outline_ if contains a textarea', () => {
      return getMockTF({outlined: true}, {}, {textarea: true})
        .then((tf) => {
          expect(tf.$ctrl.mdc.outline_).to.not.exist;
        });
    });

    it('should not have mdc-text-field--box if box=true', () => {
      return getMockTF({outlined: true, box: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--box')).to.be.false;
        });
    });
  });

  context('dense=true', () => {
    it('should have mdc-text-field--dense', () => {
      return getMockTF({dense: true})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--dense')).to.be.true;
        });
    });
  });

  context('with icons', () => {
    it('should have mdc-text-field--with-leading-icon if icon is before input', () => {
      return getMockTF({outlined: true}, {}, {icon: 'leading'})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--with-leading-icon')).to.be.true;
        });
    });

    it('should init mdc.icon_ if leading icon', () => {
      return getMockTF({outlined: true}, {}, {icon: 'leading'})
        .then((tf) => {
          expect(tf.$ctrl.mdc.icon_).to.exist;
        });
    });

    it('should have mdc-text-field--with-trailing-icon if icon is after input', () => {
      return getMockTF({outlined: true}, {}, {icon: 'trailing'})
        .then((tf) => {
          expect(tf.$element.hasClass('mdc-text-field--with-trailing-icon')).to.be.true;
          expect(tf.$ctrl.mdc.icon_).to.exist;
        });
    });

    it('should init mdc.icon_ if trailing icon', () => {
      return getMockTF({outlined: true}, {}, {icon: 'trailing'})
        .then((tf) => {
          expect(tf.$ctrl.mdc.icon_).to.exist;
        });
    });
  });

  context('with helper text', () => {
    const HELP_TEXT = 'Test Help Text';

    it('should create a mdc-text-field-helper-text element', () => {
      return getMockTF({helperText: HELP_TEXT})
        .then(() => {
          const helperTextEl = tfParentEl[0].querySelector('.mdc-text-field-helper-text');
          expect(tfParentEl.children()[1]).to.equal(helperTextEl);
          expect(helperTextEl).to.exist;
          expect(helperTextEl.textContent).to.equal(HELP_TEXT);
        });
    });

    it('should set input[aria-controls] equal to helper-text[id]', () => {
      return getMockTF({helperText: HELP_TEXT})
        .then((tf) => {
          const input = tf.$element.find('input')[0];
          expect(input.getAttribute('aria-controls')).to.exist;

          const helperTextEl = tfParentEl[0].querySelector('.mdc-text-field-helper-text');
          expect(helperTextEl.id).to.exist;

          expect(input.getAttribute('aria-controls')).to.equal(helperTextEl.id);
        });
    });

    it('should have --persistent on helperText if helperTextPersistent = true', () => {
      return getMockTF({helperText: HELP_TEXT, helperTextPersistent: true})
        .then(() => {
          const helperTextEl = tfParentEl[0].querySelector('.mdc-text-field-helper-text');

          expect(helperTextEl.classList.contains('mdc-text-field-helper-text--persistent')).to.be.true;
        });
    });

    it('should have --validation-msg on helperText if helperTextValidation = true', () => {
      return getMockTF({helperText: HELP_TEXT, helperTextValidation: true})
        .then(() => {
          const helperTextEl = tfParentEl[0].querySelector('.mdc-text-field-helper-text');

          expect(helperTextEl.classList.contains('mdc-text-field-helper-text--validation-msg')).to.be.true;
        });
    });
  });

  context('disabled', () => {
    const DISABLED_CLASS = 'mdc-text-field--disabled';
    it(`should have ${DISABLED_CLASS}`, () => {
      return getMockTF({}, {tfDisabled: true})
        .then((tf) => {
          expect(tf.$element.hasClass(DISABLED_CLASS)).to.be.true;
        });
    });

    it('should toggle class if input changes disabled', () => {
      let tf;
      return getMockTF({}, {})
        .then((textfield) => {
          tf = textfield;
          expect(tf.$element.hasClass(DISABLED_CLASS)).to.be.false;

          // need to wrap with a promise so we wait for MutationObserver
          const p = wrapPromise(tf.$ctrl, 'applyDisabled_');
          tf.$parent('tfDisabled', true);
          return p;
        })
        .then(() => {
          expect(tf.$element.hasClass(DISABLED_CLASS)).to.be.true;
        });
    });
  });

  context('model', () => {
    const TEST_VALUE = 'test value';
    const FLOAT_LABEL = 'mdc-floating-label--float-above';

    it('should update mdc.value when input ng-model changes', () => {
      return getMockTF({}, {tfModel: ''})
        .then((tf) => {
          expect(tf.$ctrl.mdc.value).to.equal('');

          tf.$parent('tfModel', TEST_VALUE);

          expect(tf.$ctrl.mdc.value).to.equal(TEST_VALUE);
        });
    });

    it(`should initialize with ${FLOAT_LABEL} if ng-model has initial value`, () => {
      return getMockTF({}, {tfModel: TEST_VALUE})
        .then((tf) => {
          const label = tf.$element.find('label');

          expect(label.hasClass(FLOAT_LABEL)).to.be.true;
        });
    });
  });
});
