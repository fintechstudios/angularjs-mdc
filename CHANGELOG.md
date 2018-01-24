<a name="0.30.0"></a>
# [0.30.0](https://github.com/fintechstudios/angularjs-mdc/compare/v0.29.0...v0.30.0) (2018-01-23)

### BREAKING CHANGES
* **text-field**:
    * Renamed `mdcTextfield` to `mdcTextField`
* **button**:
    * `mdcButton` is now a directive. To properly support `:disabled`, use it on `button` or `a` elements
    * Color is removed, and up to the client to determine using `@material/button/mixins`
* **icon**:
    * no longer has default styling
* **icon-toggle**:
    * Color is removed, and up to the client to determine using `@material/icon-toggle/mixins`
* **list**:
    * The `mdc-list-item__text__secondary` class was renamed to `mdc-list-item__secondary-text` to follow BEM conventions
    * List padding is now per-item rather than across the entire list. Separators now span the entire list width
      by default, with the addition of a mdc-list-divider--padded modifier class to achieve the old default behavior.
    * `__start-detail` has been renamed to `__graphic`, and `__end-detail` has been renamed to `__meta`.
      In addition, meta data tiles no longer have a default width/height (fixes #1644).

### Features
* **ripple**:
    * Added `mdcRipple` directive
    * `MDCRippleMixin` to apply ripples to component controllers
* **button**:
    * Nested `mdc-icon` is properly styled
    * Support `unelevated` and `stroked` style
    * `card-action` setting is removed, as it is handled automatically