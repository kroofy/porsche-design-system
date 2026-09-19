# generate-frameworks-divider

**unit:** Mitosis framework output for `p-divider` (`react`, `vue`, `angular`, `svelte`)
**status:** `compiled`
**source SHA:** `2e9a617d9a`
**accept SHA:** (this commit)
**mitosis build:** exit `0`

`Divider.lite.tsx` compiled to all four requested targets. Lit playground `p-divider` and `src/assets/p-divider.iife.js` were not regenerated. `rg my-fragment` on the generated framework files is empty. Published wrappers under `packages/components-react|vue|angular` were not overwritten. Stencil was not restored. No second tag.

## Targets

| Target | Compiled | Path | `my-fragment` |
| --- | --- | --- | --- |
| react | yes | `packages/components/mitosis/divider/output/frameworks/react/Divider.tsx` | empty |
| vue | yes | `packages/components/mitosis/divider/output/frameworks/vue/Divider.vue` | empty |
| angular | yes | `packages/components/mitosis/divider/output/frameworks/angular/Divider.ts` | empty |
| svelte | yes | `packages/components/mitosis/divider/output/frameworks/svelte/Divider.svelte` | empty |

No dead-end. Combined `mitosis build --config=mitosis.frameworks.config.js` exited 0 and emitted one file per target.

## Wiring

- Config: `packages/components/mitosis/divider/mitosis.frameworks.config.js` (`targets: ['react', 'vue', 'angular', 'svelte']`, `dest: 'output/frameworks'`)
- Script: `packages/components/scripts/generate-frameworks-divider.mjs` (`npm run generate:frameworks-divider`)
- Source lite: `packages/components/mitosis/divider/Divider.lite.tsx` (unchanged)
- Lit dest stays `output/lit/divider/Divider.ts`
- IIFE still `packages/components/src/assets/p-divider.iife.js` (SHA `d51d67a0f77bb375f4b8913b55ab68338d50f8b1fa26d5e47413fe30b4db4b82`)
- Result JSON: `packages/components/mitosis/divider/output/frameworks/generate-result.json`

`m` is 1000 in the generated `minWidth` maps. `s` is 760. `customElement` / `webcomponent` were not used.

## Generator caveats (not compile failures)

- React wraps `cssText` in a styled-jsx `<style jsx>` that still uses `:host`. That is host CSS for a web component, not a React class.
- Vue names the component `lit-divider` and injects `cssText` via `<component :is="'style'" v-html="cssText">`.
- Angular selector is `lit-divider` (`useMetadata.tagName` is `p-divider` but the Angular generator kept the function name). `:host { display: contents }` is emitted before the intended `display: block`.
- Svelte binds `cssText` as a function (`$: cssText = () => { ... }`) and inlines the style tag with `{@html ...}`. The getter shadows the `direction` prop (`let direction = direction || "horizontal"`).

These files are generated artifacts, not a rewrite of the 75 landed Lit hosts.

## Follow-ups

- Do not copy these files over published `packages/components-react|vue|angular` wrappers in this unit.
- Lit stays the playground host.
- Do not start a second tag.
