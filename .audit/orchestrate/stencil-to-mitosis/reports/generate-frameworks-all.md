# generate-frameworks-all

**unit:** Mitosis `react` / `vue` / `angular` / `svelte` for every landed `packages/components/mitosis/*/*.lite.tsx`
**status:** `compiled` (2 react dead-ends recorded)
**source SHA:** `8ba9fb2c50`
**accept SHA:** (this commit)

Walked 75 lite files. Per-tag `mitosis.frameworks.config.js` writes `dest: output/frameworks` so Lit `output/lit` is untouched. Divider outputs remain. 75 Lit IIFEs are still present. `rg my-fragment` on compiled framework files is empty. Published `packages/components-react|vue|angular` wrappers were not overwritten. Landed `.lite.tsx` files were not edited. Stencil was not restored.

## Compiled counts

| Target | compiled | failed |
| --- | --- | --- |
| react | 73 | 2 |
| vue | 75 | 0 |
| angular | 75 | 0 |
| svelte | 75 | 0 |

Failed pairs: `button-pure/react`, `tag-dismissible/react`. Combined `mitosis build` failed for those two tags because the React generator's prettier step threw `SyntaxError: '}' expected`. Vue / angular / svelte for those tags still compiled. Lite sources were not edited (the generator parsed them; React formatting of the emit failed).

## Per-tag per-target

| tag | react | vue | angular | svelte |
| --- | --- | --- | --- | --- |
| accordion | compiled | compiled | compiled | compiled |
| ai-tag | compiled | compiled | compiled | compiled |
| banner | compiled | compiled | compiled | compiled |
| button | compiled | compiled | compiled | compiled |
| button-pure | failed | compiled | compiled | compiled |
| button-tile | compiled | compiled | compiled | compiled |
| canvas | compiled | compiled | compiled | compiled |
| carousel | compiled | compiled | compiled | compiled |
| checkbox | compiled | compiled | compiled | compiled |
| crest | compiled | compiled | compiled | compiled |
| display | compiled | compiled | compiled | compiled |
| divider | compiled | compiled | compiled | compiled |
| drilldown | compiled | compiled | compiled | compiled |
| drilldown-item | compiled | compiled | compiled | compiled |
| drilldown-link | compiled | compiled | compiled | compiled |
| fieldset | compiled | compiled | compiled | compiled |
| flag | compiled | compiled | compiled | compiled |
| flyout | compiled | compiled | compiled | compiled |
| heading | compiled | compiled | compiled | compiled |
| icon | compiled | compiled | compiled | compiled |
| inline-notification | compiled | compiled | compiled | compiled |
| input-date | compiled | compiled | compiled | compiled |
| input-email | compiled | compiled | compiled | compiled |
| input-month | compiled | compiled | compiled | compiled |
| input-number | compiled | compiled | compiled | compiled |
| input-password | compiled | compiled | compiled | compiled |
| input-search | compiled | compiled | compiled | compiled |
| input-tel | compiled | compiled | compiled | compiled |
| input-text | compiled | compiled | compiled | compiled |
| input-time | compiled | compiled | compiled | compiled |
| input-url | compiled | compiled | compiled | compiled |
| input-week | compiled | compiled | compiled | compiled |
| link | compiled | compiled | compiled | compiled |
| link-pure | compiled | compiled | compiled | compiled |
| link-tile | compiled | compiled | compiled | compiled |
| link-tile-product | compiled | compiled | compiled | compiled |
| modal | compiled | compiled | compiled | compiled |
| model-signature | compiled | compiled | compiled | compiled |
| multi-select | compiled | compiled | compiled | compiled |
| multi-select-option | compiled | compiled | compiled | compiled |
| optgroup | compiled | compiled | compiled | compiled |
| pagination | compiled | compiled | compiled | compiled |
| pin-code | compiled | compiled | compiled | compiled |
| popover | compiled | compiled | compiled | compiled |
| radio-group | compiled | compiled | compiled | compiled |
| radio-group-option | compiled | compiled | compiled | compiled |
| scroller | compiled | compiled | compiled | compiled |
| segmented-control | compiled | compiled | compiled | compiled |
| segmented-control-item | compiled | compiled | compiled | compiled |
| select | compiled | compiled | compiled | compiled |
| select-option | compiled | compiled | compiled | compiled |
| sheet | compiled | compiled | compiled | compiled |
| spinner | compiled | compiled | compiled | compiled |
| stepper-horizontal | compiled | compiled | compiled | compiled |
| stepper-horizontal-item | compiled | compiled | compiled | compiled |
| switch | compiled | compiled | compiled | compiled |
| table | compiled | compiled | compiled | compiled |
| table-body | compiled | compiled | compiled | compiled |
| table-cell | compiled | compiled | compiled | compiled |
| table-head | compiled | compiled | compiled | compiled |
| table-head-cell | compiled | compiled | compiled | compiled |
| table-head-row | compiled | compiled | compiled | compiled |
| table-row | compiled | compiled | compiled | compiled |
| tabs | compiled | compiled | compiled | compiled |
| tabs-bar | compiled | compiled | compiled | compiled |
| tabs-item | compiled | compiled | compiled | compiled |
| tag | compiled | compiled | compiled | compiled |
| tag-dismissible | failed | compiled | compiled | compiled |
| text | compiled | compiled | compiled | compiled |
| text-list | compiled | compiled | compiled | compiled |
| text-list-item | compiled | compiled | compiled | compiled |
| textarea | compiled | compiled | compiled | compiled |
| toast | compiled | compiled | compiled | compiled |
| toast-item | compiled | compiled | compiled | compiled |
| wordmark | compiled | compiled | compiled | compiled |

## Wiring

- Script: `packages/components/scripts/generate-frameworks-all.mjs` (`npm run generate:frameworks-all`)
- Per-tag config: `packages/components/mitosis/{tag}/mitosis.frameworks.config.js`
- Outputs: `packages/components/mitosis/{tag}/output/frameworks/{react,vue,angular,svelte}/`
- Summary: `packages/components/mitosis/frameworks-all-result.json`
- Lit IIFE count: 75, unchanged (`p-divider.iife.js` SHA `d51d67a0f77bb375f4b8913b55ab68338d50f8b1fa26d5e47413fe30b4db4b82`)
- `customElement` / `webcomponent` were not used

## Follow-ups

- React prettier fail on `button-pure` and `tag-dismissible` is a generator format issue, not a lite parse issue.
- Do not copy these files over published wrappers in this unit.
- Lit stays the playground host.
