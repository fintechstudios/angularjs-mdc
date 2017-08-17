'use strict';

/**
 * Make sure a given label/input pair has the same for/id.
 * @param {Element} labelable - the input that you wish to label
 * @param {Element} label - the label element
 * @param {string} defaultId - id to assign if both elements have none
 */
export function bindLabelId(labelable, label, defaultId) {
  const inputId = labelable.getAttribute('id') || label.getAttribute('for') || defaultId;
  if (!labelable.hasAttribute('id')) {
    labelable.setAttribute('id', inputId);
  }
  if (!label.hasAttribute('for')) {
    label.setAttribute('for', inputId);
  }
}
