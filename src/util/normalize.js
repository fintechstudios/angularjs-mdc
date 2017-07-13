const PREFIX_REGEXP = /^((?:x|data)[:\-_])/i;
const SPECIAL_CHARS_REGEXP = /[:\-_]+(.)/g;


function fnCamelCaseReplace(all, letter) {
  return letter.toUpperCase();
}

/**
 * Converts all accepted directives format into proper directive name.
 * @param {string} name Name to normalize
 */
export function directiveNormalize(name) {
  return name
    .replace(PREFIX_REGEXP, '')
    .replace(SPECIAL_CHARS_REGEXP, fnCamelCaseReplace);
}

/**
 * Converts strings object from a foundation to list of proper binding names.
 *
 * @param {Object.<string, string>} obj String object, e.g. MDCIconToggleFoundation.strings
 * @param {string[]} skip List of items not needing to bind, like events (e.g. ['CHANGE_EVENTS']
 *
 * @returns {string[]} the list of binding names
 */
export function convertStringsObjToBindingNames(obj, skip) {
  const names = [];
  for (const attr in obj) {
    if (!obj.hasOwnProperty(attr) || skip.indexOf(attr) >= 0) {
      continue;
    }

    const norm = directiveNormalize(obj[attr]);
    names.push(norm);
  }
  return names;
}
