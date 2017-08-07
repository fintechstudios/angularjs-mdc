require('./mdc-button/mdc-button');
require('./mdc-card/mdc-card');
require('./mdc-dialog/mdc-dialog');
require('./mdc-drawer/mdc-drawer');
require('./mdc-grid-list/mdc-grid-list');
require('./mdc-icon/mdc-icon');
require('./mdc-icon-toggle/mdc-icon-toggle');
require('./mdc-list/mdc-list');
require('./mdc-menu/mdc-menu');
require('./mdc-radio/mdc-radio');
require('./mdc-select/mdc-select');
require('./mdc-snackbar/mdc-snackbar');
require('./mdc-switch/mdc-switch');
require('./mdc-tabs/mdc-tabs');

angular.module('mdc', [
  'mdc.button', 'mdc.card', 'mdc.dialog', 'mdc.drawer', 'mdc.grid-list',
  'mdc.icon', 'mdc.icon-toggle', 'mdc.list', 'mdc.menu',
  'mdc.radio', 'mdc.tabs', 'mdc.select', 'mdc.snackbar', 'mdc.switch',
]);
