/**
 * Convert HTML, CSS, and SCSS files to use the new classnames (lmdc-)
 *
 * Finds all classes referencing mdc- and replaces with lmdc-
 *
 * @example
 * ```shell
 * $ node @fintechstudios/angularjs-mdc/transform-to-lmdc ./src
 * ```
 *
 * @fileOverview
 */

const process = require('process');
const fsPromises = require('fs').promises;
const path = require('path');

const HTML_CLASSES_REGEX = /class="(.+?)"/g;
const HTML_MDC_REGEX = /mdc-/g;
const CSS_MDC_REGEX = /\.mdc-/g;
const VALID_FILE = /\.(html|s?css)$/;

function replaceHtmlClasses(fileContents) {
  return fileContents.replace(HTML_CLASSES_REGEX, (fullMatch, classContents) => {
    const withLmdc = classContents.replace(HTML_MDC_REGEX, 'lmdc-');

    return `class="${withLmdc}"`;
  })
}

function replaceCssClasses(fileContents) {
  return fileContents.replace(CSS_MDC_REGEX, '.lmdc-');
}

async function replaceFilesInFolder(folder) {
  const entities = await fsPromises.readdir(folder, { withFileTypes: true })

  for (const entity of entities) {
    const { name: fileName } = entity;
    const filePath = path.join(folder, fileName);
    if (entity.isDirectory()) {
      await replaceFilesInFolder(filePath);
      continue;
    }

    if (!VALID_FILE.test(fileName)) {
      continue;
    }
    const fileBuffer = await fsPromises.readFile(filePath);
    const contents = String(fileBuffer);
    let newContents;
    if (fileName.endsWith('.html')) {
      newContents = replaceHtmlClasses(contents);
    } else if (fileName.endsWith('.css') || fileName.endsWith('.scss')) {
      newContents = replaceCssClasses(contents);
    }
    await fsPromises.writeFile(filePath, newContents);
  }
}

async function main() {
  const inputPath = process.argv[2] || process.cwd();
  await replaceFilesInFolder(inputPath);
}

main()
  .catch((err) => console.error(err));
