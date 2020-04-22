import {replaceMdcClassname} from './replace-mdc-classname';

export function replaceFoundationConstants(foundation) {
  if (foundation.___constantsUpdated) {
    // don't rerun replacement if it has already occurred
    return;
  }

  [foundation.cssClasses, foundation.strings].forEach((obj) => {
    if (!obj) {
      return;
    }

    Object.keys(obj)
      .forEach((key) => {
        obj[key] = replaceMdcClassname(obj[key]);
      });
  });

  foundation.___constantsUpdated = true;
}
