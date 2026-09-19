/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'RadioGroup.lite.tsx',
  dest: 'output/frameworks',
  targets: ['react', 'vue', 'angular', 'svelte'],
  commonOptions: {
    typescript: true,
  },
  options: {},
};
