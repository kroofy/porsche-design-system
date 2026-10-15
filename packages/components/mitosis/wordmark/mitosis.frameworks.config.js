/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'Wordmark.lite.tsx',
  dest: 'output/frameworks',
  targets: ['react', 'vue', 'angular', 'svelte'],
  commonOptions: {
    typescript: true,
  },
  options: {},
};
