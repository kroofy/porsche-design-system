/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'TagDismissible.lite.tsx',
  dest: 'output/frameworks',
  targets: ['react'],
  commonOptions: {
    typescript: true,
  },
  options: {
    react: { prettier: false },
  },
};
