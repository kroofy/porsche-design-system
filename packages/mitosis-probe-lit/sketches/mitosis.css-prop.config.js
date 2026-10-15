/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'sketches/DividerCssProp.lite.tsx',
  dest: 'sketches/output-css-prop',
  targets: ['lit'],
  commonOptions: { typescript: true },
  options: {
    lit: { useShadowDom: true },
  },
};
