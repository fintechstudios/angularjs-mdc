<a name="0.30.0"></a>
# [0.30.0](https://github.com/fintechstudios/angularjs-mdc/compare/v0.29.0...v0.30.0) (2018-02-08)

Update to support [material-components-web v0.30.0](https://github.com/material-components/material-components-web/tree/v0.30.0)
 (coincidentally the same version).

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