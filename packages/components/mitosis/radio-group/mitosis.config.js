/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'RadioGroup.lite.tsx',
  dest: 'output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true },
  },
};
