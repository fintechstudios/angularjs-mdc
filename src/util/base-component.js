import {BindInjections} from './bind-injections';

/**
 * Provides base AngularJS hooks to prevent throwing errors
 *
 * @class BaseComponent
 * @mixes BindInjections
 */
export class BaseComponent extends BindInjections {
  $onChanges(changes) {}
  $onInit() {}
  $postLink() {}
  $onDestroy() {}
}
