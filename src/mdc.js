require('./mdc-button/mdc-button');
require('./mdc-card/mdc-card');
require('./mdc-dialog/mdc-dialog');
require('./mdc-icon/mdc-icon');
require('./mdc-icon-toggle/mdc-icon-toggle');
require('./mdc-list/mdc-list');
require('./mdc-menu/mdc-menu');
require('./mdc-radio/mdc-radio');
require('./mdc-select/mdc-select');
require('./mdc-switch/mdc-switch');

angular.module('mdc', [
  'mdc.button', 'mdc.card', 'mdc.dialog', 'mdc.icon',
  'mdc.icon-toggle', 'mdc.list', 'mdc.menu', 'mdc.radio',
  'mdc.select', 'mdc.switch',
]);
