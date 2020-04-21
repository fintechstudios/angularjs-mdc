
const MDC_PREFIX_REGEX = /mdc-/;

/**
 * @param {string} className
 * @returns {string}
 */
export function replaceMdcClassname(className) {
  if (className.startsWith('--') || className.includes('lmdc-')) {
    return className;
  }

  return className.replace(MDC_PREFIX_REGEX, 'lmdc-');
}
