/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'TableCell.lite.tsx',
  dest: 'output/frameworks',
  targets: ['react', 'vue', 'angular', 'svelte'],
  commonOptions: {
    typescript: true,
  },
  options: {},
};
