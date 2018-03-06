/**
 * Get a promise that resolves when the given element.ready has fired.
 *
 * @param {JQLite} $element
 * @return {Promise<JQLite>}
 */
export function elemReadyPromise($element) {
  return new Promise((resolve) => $element.ready(() => resolve($element)));
}
