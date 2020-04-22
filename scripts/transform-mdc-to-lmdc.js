const postcss = require('postcss');


/**
 * @returns {function(...[*]=)}
 */
function transformMdcToLmdc() {
  return (root) => {
    root.walkRules((rule) => {
      if (!rule.selectors) {
        return rule;
      }

      rule.selectors = rule.selectors.map((selector) => selector.replace(/\.mdc-/g, '.lmdc-'));
    });
  };
}

const plugin = postcss.plugin('transform-mdc-to-lmdc', transformMdcToLmdc);
module.exports = plugin;
