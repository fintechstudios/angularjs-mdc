import {BaseComponent} from '../util/base-component';
import {replaceFoundationConstants} from '../util/replace-foundation-constants';
import {replaceMdcClassname} from '../util/replace-mdc-classname';

import {MDCGridListFoundation} from '@material/grid-list';

import template from './mdc-grid-list.html';

const VALID_TILE_ASPECTS = ['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'];

const BASE_CLASSNAME = replaceMdcClassname('mdc-grid-list');
const START_ALIGN_ICON_CLASSNAME = `${BASE_CLASSNAME}--with-icon-align-start`;
const END_ALIGN_ICON_CLASSNAME = `${BASE_CLASSNAME}--with-icon-align-end`;
const WITH_GUTTER_CLASSNAME = `${BASE_CLASSNAME}--tile-gutter-1`;
const TILE_ASPECT_BASE_CLASSNAME = `${BASE_CLASSNAME}--tile-aspect`;
replaceFoundationConstants(MDCGridListFoundation);


/**
 * @ngdoc component
 * @name mdcGridList
 * @module mdc.grid-list
 * @description Grid List
 * Also supports classes "mdc-grid-list--header-caption" and "mdc-grid-list--twoline-caption"
 *
 * @param {string} [icon-align] Where to position icons on the tiles
 * @param {string} [gutter] Gutter size. Supports "1" for 1px, anything else for 4px
 * @param {string} [aspect] Aspect ratio of tiles -- supports 1x1, 16x9, 2x3, 3x2, 4x3, 3x4
 */
class MDCGridListController extends BaseComponent {
  static get name() {
    return 'mdcGridList';
  }

  static get bindings() {
    return {
      iconAlign: '@',
      gutter: '@',
      aspect: '@',
    };
  }

  static get template() {
    return template;
  }

  static get transclude() {
    return true;
  }

  static get $inject() {
    return ['$element', '$window'];
  }

  constructor(...args) {
    super(...args);

    this.root_ = this.$element[0];
    this.foundation_ = this.getDefaultFoundation();
  }

  getDefaultFoundation() {
    return new MDCGridListFoundation({
      getOffsetWidth: () => this.root_.offsetWidth,
      getNumberOfTiles: () => {
        return this.root_.querySelectorAll(MDCGridListFoundation.strings.TILE_SELECTOR).length;
      },
      getOffsetWidthForTileAtIndex: (index) => {
        return this.root_.querySelectorAll(MDCGridListFoundation.strings.TILE_SELECTOR)[index].offsetWidth;
      },
      setStyleForTilesElement: (property, value) => {
        this.root_.querySelector(MDCGridListFoundation.strings.TILES_SELECTOR).style[property] = value;
      },
      registerResizeHandler: (handler) => this.$window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => this.$window.removeEventListener('resize', handler),
    });
  }

  $postLink() {
    this.foundation_.init();
  }

  $onChanges(changesObj) {
    if (changesObj.iconAlign) {
      this.$element.toggleClass(START_ALIGN_ICON_CLASSNAME, this.iconAlign === 'start');
      this.$element.toggleClass(END_ALIGN_ICON_CLASSNAME, this.iconAlign === 'end');
    }
    if (changesObj.gutter) {
      this.$element.toggleClass(WITH_GUTTER_CLASSNAME, this.gutter == '1');
    }
    if (changesObj.aspect) {
      VALID_TILE_ASPECTS.forEach((r) => {
        this.$element.toggleClass(`${TILE_ASPECT_BASE_CLASSNAME}-${r}`, this.aspect === r);
      });
    }
  };

  $onDestroy() {
    this.foundation_.destroy();
  }
}

/**
 * @ngdoc component
 * @name mdcGridTile
 * @module mdc.grid-tile
 */


/**
 * @ngdoc module
 * @name mdc.grid-list
 * @description
 *
 * GridList
 */
angular
  .module('mdc.grid-list', [])
  .component(MDCGridListController.name, {
    controller: MDCGridListController,
    transclude: MDCGridListController.transclude,
    template: MDCGridListController.template,
    bindings: MDCGridListController.bindings,
  });
