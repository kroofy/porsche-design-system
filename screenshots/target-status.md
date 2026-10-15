# Mitosis targets: status

Measured on `cursor/mitosis-sync-preview-89b3`. There are 58 playground demos covering all 75 tags (17 tags render as children). Results are reproduced in CI by the `Mitosis Playground` workflow.

## Per target

| Target | Compiles | Renders the 58 demos | Visual parity with upstream 4.8.0 |
| --- | --- | --- | --- |
| Lit (web components, `p-*.iife.js`) | 75/75 built | 58/58, 0 errors | Closest. This path carries all the `build-lit-*` behavior. |
| React (`output/frameworks/react`) | `tsc` strict: 4 type errors | 56/58, 0 errors. Carousel and Banner render nothing. | 31 components ≤0.5% pixel mismatch. Gaps listed below. |
| Vue | `vue-tsc`: 1 type error | 56/58, 0 errors. Same two empty. | Same CSS and markup as React, so the same gaps. |
| Svelte | all 75 compile (vite / svelte 4) | 56/58, 0 errors. Same two empty. | Same gaps. |
| Angular (standalone, JIT in the playground) | `ngc` strictTemplates: 1 error (NG8002, tabs → tabs-bar `activeTabIndex`) | 56/58, 0 errors. Same two empty. | Same gaps. The `<p-*>` host element stays in the DOM. |

None of the framework targets emit events: no `.lite.tsx` declares callbacks. The 20 components that dispatch events in Lit get that only from `build-lit-*.mjs`.

## React fidelity by component

**Matches upstream (≤0.5% per variant, light and dark):** button, button-pure, link, link-pure, heading, text, display, icon, divider, crest, wordmark, model-signature, ai-tag, spinner, switch, checkbox (except `indeterminate`), input-text, input-email, input-password, input-search, input-url, input-tel, input-number, input-date, input-month, input-time, input-week, pin-code, fieldset, stepper-horizontal, popover (closed trigger).

**Minor differences:** flag (`size="lg"`), text-list, tag (larger pills), tag-dismissible (label size), textarea (shorter), table (columns not stretched), link-tile-product (no like button), button-tile and link-tile (no inner CTA).

**Broken or missing behavior:**

| Component | Problem |
| --- | --- |
| accordion | heading rendered twice, panel hidden |
| radio-group | labels duplicated, options stuck loading, no selection |
| segmented-control | no selection |
| select, multi-select | no value, options rendered inline |
| tabs | no tab bar, all panels shown |
| tabs-bar | no active indicator |
| pagination | no page numbers |
| scroller | no scroll button |
| inline-notification | heading rendered twice |
| carousel | renders nothing |
| banner, modal, flyout, sheet | never open (`showPopover` / `showModal` live in `build-lit-*`) |
| drilldown | labels missing |
| canvas | header missing |
| toast-item | empty |

Root cause: 40 of the 75 `build-lit-*.mjs` scripts replace the generated Lit `render()` template with a hand-written one, and 13.8k lines of Lit-only post-processing add behavior. That markup and logic never reaches the `.lite.tsx` the frameworks compile from.
