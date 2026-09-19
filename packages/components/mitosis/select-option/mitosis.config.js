/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'SelectOption.lite.tsx',
  dest: 'output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true },
  },
};
