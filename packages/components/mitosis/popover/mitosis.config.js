/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'Popover.lite.tsx',
  dest: 'output',
  targets: ['lit'],
  commonOptions: {
    typescript: true,
  },
  options: {
    lit: { useShadowDom: true },
  },
};
