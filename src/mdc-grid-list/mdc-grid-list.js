import {MDCGridListFoundation} from '@material/grid-list';

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
class MdcGridListController {
  constructor($element, $window) {
    this.elem = $element;
    this.window = $window;
    this.root_ = this.elem[0];
    this.foundation_ = this.getDefaultFoundation();
  }

  static get VALID_TILE_ASPECTS() {
    return ['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'];
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
      registerResizeHandler: (handler) => this.window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => this.window.removeEventListener('resize', handler),
    });
  }

  $postLink() {
    this.foundation_.init();
  }

  $onChanges(changesObj) {
    if (changesObj.iconAlign) {
      this.elem.toggleClass('mdc-grid-list--with-icon-align-start', this.iconAlign === 'start');
      this.elem.toggleClass('mdc-grid-list--with-icon-align-end', this.iconAlign === 'end');
    }
    if (changesObj.gutter) {
      this.elem.toggleClass('mdc-grid-list--tile-gutter-1', this.gutter == '1');
    }
    if (changesObj.aspect) {
      MdcGridListController.VALID_TILE_ASPECTS.forEach((r) => {
        this.elem.toggleClass('mdc-grid-list--tile-aspect-' + r, this.aspect === r);
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
  .component('mdcGridList', {
    controller: MdcGridListController,
    transclude: true,
    template: require('raw-loader!./mdc-grid-list.html'),
    bindings: {
      iconAlign: '@',
      gutter: '@',
      aspect: '@',
    },
  });
