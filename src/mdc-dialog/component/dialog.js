import {replaceMdcClassname} from '../../util/replace-mdc-classname';
import template from './dialog.html';


export const BASE_CLASSNAME = replaceMdcClassname('mdc-dialog');

/**
 * @ngdoc component
 * @name mdcDialog
 * @module mdc.dialog
 */
export class MDCDialogController {
  static get name() {
    return 'mdcDialog';
  }

  static get template() {
    return template;
  }

  static get transclude() {
    return true;
  }
}


/**
 * @ngdoc component
 * @name mdcDialogHeader
 * @module mdc.dialog
 */


/**
 * @ngdoc component
 * @name mdcDialogTitle
 * @module mdc.dialog
 */


/**
 * @ngdoc component
 * @name mdcDialogFooter
 * @module mdc.dialog
 */
