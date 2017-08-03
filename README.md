# angularjs-mdc  [![CircleCI](https://circleci.com/gh/fintechstudios/angularjs-mdc/tree/master.svg?style=svg)](https://circleci.com/gh/fintechstudios/angularjs-mdc/tree/master)
AngularJS wrapper for [Material Design Components Web](https://material.io/components/web/)

## Rationale

[angular-material](https://material.angularjs.org/latest/), one of the most popular AngularJS extension packages,
is a large package with bad performance on many browsers (notably, IE11). Besides this, there are no UX designers
from the Material Design team assuring that it is consistent with the Material Design spec.

[Material Design Components Web](https://material.io/components/web/) (the successor to Material Design Lite) is 
maintained in tandem by Google engineers & designers, provides a much smaller deliverable, and performs better
and more consistently across all modern browsers.

This package aims to wrap core MDC functionality in AngularJS components with the primary goal of
being an easy and suitable replacement for angular-material.


## Building

### Setup
`npm install`

### Commands Available
- `npm run build` - build a development ready version in `dist/`
- `npm run serve` - build a development version to memory, demos available at `localhost:8080`
- `npm run build:min` - build a production-ready version in `dist/`

## Testing
- `npm run test` - run auto-refreshing unit tests against source
- `npm run test:ci` - single-run unit tests against minified distributable


## Coverage

| Component       | Status              | Module           |
| --------------- | ------------------- | ---------------- |
| button          | :white_check_mark:  | mdc.button       |
| card            | :white_check_mark:  | mdc.card         |
| checkbox        | :x:                 | |
| dialog          | :white_check_mark:  | mdc.dialog       |
| drawer          | :x:                 | |
| elevation       | :x:                 | |
| fab             | :x:                 | |
| form-field      | :x:                 | |
| grid-list       | :white_check_mark:  | mdc.grid-list     |
| icon            | :white_check_mark:  | mdc.icon          |
| icon-toggle     | :white_check_mark:  | mdc.icon-toggle   |
| linear-progress | :x:                 | |
| list            | :white_check_mark:  | mdc.list          |
| menu            | :white_check_mark:  | mdc.menu          |
| radio           | :white_check_mark:  | mdc.radio         |
| ripple          | :x:                 | |
| select          | :white_check_mark:  | mdc.select        |
| slider          | :x:                 | |
| snackbar        | :x:                 | |
| switch          | :white_check_mark:  | mdc.switch        |
| tabs            | :white_check_mark:  | mdc.tabs          |
| textfield       | :x:                 | |
| theme           | :x:                 | |
| toolbar         | :x:                 | |
| typography      | :x:                 | |
