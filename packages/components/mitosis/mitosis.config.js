const applyHostStylePlugin = require('./_runtime/apply-host-style-plugin');

/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'divider/Divider.lite.tsx',
  dest: 'divider/output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true, plugins: [applyHostStylePlugin] },
  },
};
