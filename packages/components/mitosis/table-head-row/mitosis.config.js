/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'TableHeadRow.lite.tsx',
  dest: 'output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true },
  },
};
