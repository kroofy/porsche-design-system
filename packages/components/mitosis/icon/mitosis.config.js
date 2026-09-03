/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'Icon.lite.tsx',
  dest: 'output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true },
  },
};
