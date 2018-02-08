# angularjs-mdc  [![CircleCI](https://circleci.com/gh/fintechstudios/angularjs-mdc/tree/master.svg?style=svg)](https://circleci.com/gh/fintechstudios/angularjs-mdc/tree/master)
AngularJS wrapper for [Material Design Components Web](https://material.io/components/web/)

[Demos](https://fintechstudios.github.io/angularjs-mdc/) - automatically updated with every release

## Rationale

This package aims to wrap core MDC functionality in AngularJS components with the primary goal of
being an easy and suitable replacement for angular-material.

## Building

### Setup
`npm install`

### Commands Available
- `npm run build` - build a development ready version in `dist/`
- `npm run serve` - build a development version to memory, demos available at `localhost:8080`
- `npm run build:min` - build a production-ready version in `dist/`
- `npm run build:demos` - just build the demo css into /demos/assets/

## Testing
- `npm run test` - run auto-refreshing unit tests against source
- `npm run test:ci` - single-run unit tests against minified distributable


## Coverage

| Component       | Status              | Module           |
| --------------- | ------------------- | ---------------- |
| button          | :white_check_mark:  | mdc.button       |
| card            | :white_check_mark:  | SCSS & CSS only  |
| chip            | :x:                 | |
| checkbox        | :white_check_mark:  | mdc.checkbox     |
| dialog          | :white_check_mark:  | mdc.dialog       |
| drawer          | :x:                 | |
| elevation       | :white_check_mark:  | SCSS & CSS only  |
| fab             | :x:                 | |
| form-field      | :white_check_mark:  | mdc.form-field   |
| grid-list       | :white_check_mark:  | mdc.grid-list    |
| icon            | :white_check_mark:  | mdc.icon         |
| icon-toggle     | :white_check_mark:  | mdc.icon-toggle  |
| linear-progress | :x:                 | |
| list            | :white_check_mark:  | mdc.list         |
| menu            | :white_check_mark:  | mdc.menu         |
| radio           | :white_check_mark:  | mdc.radio        |
| ripple          | :white_check_mark:  | mdc.ripple       |
| select          | :white_check_mark:  | mdc.select       |
| slider          | :x:                 | |
| snackbar        | :white_check_mark:  | mdc.snackbar     |
| switch          | :white_check_mark:  | mdc.switch       |
| tabs            | :white_check_mark:  | mdc.tabs         |
| textfield       | :white_check_mark:  | mdc.textfield    |
| theme           | :white_check_mark:  | SCSS & CSS only  |
| toolbar         | :x:                 | |
| typography      | :white_check_mark:  | SCSS & CSS only  |
