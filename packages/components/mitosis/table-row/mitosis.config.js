/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'TableRow.lite.tsx',
  dest: 'output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true },
  },
};
