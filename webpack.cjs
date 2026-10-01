// Webpack settings every course needs when it uses lp-toolkit. Wrap the
// course's override with it in remotion.config.ts:
//   const {lpWebpack} = require('lp-toolkit/webpack');
//   Config.overrideWebpackConfig((c) => lpWebpack(enableTailwind(c)));
//
// symlinks: false keeps module resolution on the course's node_modules path
// when the toolkit is linked from a local checkout (npm i -D ../lp-toolkit).
// Without it, webpack follows the link and finds React and Remotion in the
// toolkit's own node_modules, and two copies of either break every render.
const lpWebpack = (config) => ({
  ...config,
  resolve: {...config.resolve, symlinks: false},
});

module.exports = {lpWebpack};
