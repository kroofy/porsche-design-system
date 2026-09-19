/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  dest: 'output',
  targets: ['customElement', 'react', 'vue', 'angular'],
  commonOptions: {
    typescript: true,
  },
  options: {
    // typescript:false because with typescript:true the generator leaks
    // `export type` declarations into a .js file that no browser can parse.
    customElement: { typescript: false },
    // Default stylesType is styled-jsx, a Next.js-only runtime dep the PDS
    // React wrapper does not carry. style-tag emits a plain <style> element.
    react: { stylesType: 'style-tag' },
    vue: {},
    // Default output is a legacy NgModule; PDS targets Angular 21 standalone.
    angular: { standalone: true },
  },
};
