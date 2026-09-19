const applyHostStylePlugin = require('../components/mitosis/_runtime/apply-host-style-plugin');

/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  dest: 'output',
  // The brief names the target "webcomponent (Lit)", but in Mitosis 0.14.0
  // targets.js maps `webcomponent` to componentToCustomElement, the exact
  // generator the first probe disqualified. The Lit generator is the target
  // named `lit`. Using `webcomponent` would silently re-run the dead probe.
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    // ToLitOptions documents useShadowDom as "Default: enabled", but no code
    // path sets that default; undefined is falsy and the generator emits a
    // light-DOM createRenderRoot instead. Must be explicit.
    lit: { useShadowDom: true, plugins: [applyHostStylePlugin] },
  },
};
