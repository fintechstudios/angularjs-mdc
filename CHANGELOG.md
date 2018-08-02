<a name="0.5.2"></a>
# [0.5.2](https://github.com/fintechstudios/angularjs-mdc/compare/v0.5.1....v0.5.2) (2018-08-02)

### Bug fixes
* **tabs**: set max height and width on experimental tab-bar menu

<a name="0.5.1"></a>
# [0.5.1](https://github.com/fintechstudios/angularjs-mdc/compare/v0.5.0....v0.5.1) (2018-03-06)

### Bug fixes
* **floating-label**: include styles in build
* **menu**: prevent failure when opening an empty menu

<a name="0.5.0"></a>
# [0.5.0](https://github.com/fintechstudios/angularjs-mdc/compare/v0.4.0....v0.5.0) (2018-03-06)

### BREAKING CHANGES
* **text-field**: `mdc-text-field__label` changed to `mdc-floating-label`

### Features
* **mdc**: Update to [material-components-web@0.32.0](https://github.com/material-components/material-components-web/compare/v0.31.0...v0.32.0)

<a name="0.4.0"></a>
# [0.4.0](https://github.com/fintechstudios/angularjs-mdc/compare/v0.3.6....v0.4.0) (2018-03-05)

### BREAKING CHANGES
* **tabs**: active and onSelect removed, use ng-model & ng-value

### Features
* **tabs**: use ng-model & ng-vale for tab selection
* **menu**: menu select outputs MDCMenuItemController instead of HTMLElement

### Bug Fixes
* **tabs**: reliably scroll to active tab if not visible on init
* **demos**: remove arrow functions from demos to support IE11

<a name="0.3.6"></a>
# [0.3.5](https://github.com/fintechstudios/angularjs-mdc/compare/v0.3.5....v0.3.6) (2018-02-15)

### Bug fixes
* **select**: properly floats label on init
* **ripple**: properly layout ripples with default computeBoundingRect

### Code Refactoring
* **select**: match [material-components-web#2244](https://github.com/material-components/material-components-web/pull/2244)

### Features
* **mdc**: Update to [material-components-web@0.31.0](https://github.com/material-components/material-components-web/compare/v0.30.0...v0.31.0)

<a name="0.3.5"></a>
# [0.3.5](https://github.com/fintechstudios/angularjs-mdc/compare/v0.3.4....v0.3.5) (2018-02-15)

### Bug fixes
* **dialog**: use mdc-button directive in default templates
* **icon**: no longer auto-applies styles when nested inside button
* **tabs**: bind classes to components instead of relying on scss

<a name="0.3.4"></a>
# [0.3.4](https://github.com/fintechstudios/angularjs-mdc/compare/v0.3.3....v0.3.4) (2018-02-12)

### Bug fixes
* **form-field**: do not depend on $scope to initialize input-id ([#29](https://github.com/fintechstudios/angularjs-mdc/pull/29))

<a name="0.3.3"></a>
# [0.3.3](https://github.com/fintechstudios/angularjs-mdc/compare/v0.3.0....v0.3.3) (2018-02-09)

### Features
* **menu**: mdc-menu-toggle no longer needs an id when nested in mdc-menu-anchor ([#22](https://github.com/fintechstudios/angularjs-mdc/pull/22))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/fintechstudios/angularjs-mdc/compare/v0.2.9....v0.3.0) (2018-02-09)

Update to support [material-components-web v0.30.0](https://github.com/material-components/material-components-web/tree/v0.30.0).

### BREAKING CHANGES
* **button**:
    * `mdcButton` is now a directive. To properly support `:disabled`, use it on `button` or `a` elements
    * Color is removed, and up to the client to determine using `@material/button/mixins`
* **card**:
    * for now, CSS only
* **icon**:
    * no longer has default styling
* **icon-toggle**:
    * Color is removed, and up to the client to determine using `@material/icon-toggle/mixins`
* **list**:
    * The `mdc-list-item__text__secondary` class was renamed to `mdc-list-item__secondary-text` to follow BEM conventions
    * List padding is now per-item rather than across the entire list. Separators now span the entire list width
      by default, with the addition of a mdc-list-divider--padded modifier class to achieve the old default behavior.
    * `__start-detail` has been renamed to `__graphic`, and `__end-detail` has been renamed to `__meta`.
      In addition, meta data tiles no longer have a default width/height.
* **menu**:
    * All references to `mdc-simple-menu` changed to `mdc-menu`
    * `mdc-menu-toggle` requires a menu `id` to be specified - it will no longer auto-find the menu.
    * `open-from` changed to `anchor-corner` -- supports TOP_START, TOP_END, BOTTOM_START, BOTTOM_END
* **select**:
    * `mdc-select-item` directive added - use this for children of mdc-select
    * `prompt` changed to `label`
    * `noAnimation` removed
    * `autoResize` removed
    * `multiple` removed
* **text-field**:
    * Renamed `mdcTextfield` to `mdcTextField`
    * No longer uses nested `<label>`, use `label` parameter
* **tabs**:
    * `indicator` removed from `tab-bar`, style with CSS

### Features
* All components controllers are now composable.
* **button**:
    * Nested `mdc-icon` is properly styled
    * Support `unelevated` and `stroked` style
* **form-field**:
    * Better support for components
* **list**:
    * `mdc-list-item` is now a directive
* **menu**:
    * `mdc-menu` now supports `rememberSelection`, `quickOpen`, and `anchorMargin` bindings
    * `mdc-menu-item` is a directive to go within `mdc-menu`, supports `onSelect`
* **ripple**:
    * Added `mdcRipple` directive, supports `dataMdcRippleIsUnbounded`
    * `MDCRippleMixin` to apply ripples to component controllers
* **text-field**:
    * supports `box`, `outlined`, `helperText`, `helperTextPersistent`, and `helperTextValidation`
    * nested `mdc-icon` elements will be properly styled
