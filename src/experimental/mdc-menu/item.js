import {MDCMenuItemController} from '../../mdc-menu/item/component';
import {HasNgValue} from '../../util/has-ng-value-mixin';

export class MDCExperimentalMenuItemController extends HasNgValue(MDCMenuItemController) {
  static get name() {
    return 'mdcMenuItem';
  }
}
