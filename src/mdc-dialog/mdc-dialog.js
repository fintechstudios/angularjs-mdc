import {MDCDialogBodyController} from './component/body';
import {MDCDialogController} from './component/dialog';
import {$mdcDialogProvider} from './service/$mdcDialog';

require('../util/angular-material-core-slim');


angular
  .module('mdc.dialog', ['material.core.slim'])
  .provider('$mdcDialog', $mdcDialogProvider)
  .component(MDCDialogController.name, {
    controller: MDCDialogController,
    template: MDCDialogController.template,
    transclude: MDCDialogController.transclude,
  })
  .component(MDCDialogBodyController.name, {
    controller: MDCDialogBodyController,
    bindings: MDCDialogBodyController.bindings,
  });
