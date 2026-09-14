/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'sketches/DividerUseStyle.lite.tsx',
  dest: 'sketches/output-use-style',
  targets: ['lit'],
  commonOptions: { typescript: true },
  options: {
    lit: { useShadowDom: true },
  },
};
