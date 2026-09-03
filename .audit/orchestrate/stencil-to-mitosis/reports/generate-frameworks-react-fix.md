# generate-frameworks-react-fix

**unit:** Mitosis react output for `button-pure` and `tag-dismissible`
**status:** `compiled`
**source SHA:** `220215b886`
**accept SHA:** (this commit)

React-only `mitosis build` exited 0 for both tags. The default React prettier step still cannot parse the emit (`SyntaxError: '}' expected`). `options.react.prettier: false` writes the real generator output. `.lite.tsx` was not edited. Vue / angular / svelte for both tags were not rewritten. Lit IIFEs remain.

## Targets

| Tag | react | Path | `my-fragment` |
| --- | --- | --- | --- |
| button-pure | compiled | `packages/components/mitosis/button-pure/output/frameworks/react/ButtonPure.tsx` | empty |
| tag-dismissible | compiled | `packages/components/mitosis/tag-dismissible/output/frameworks/react/TagDismissible.tsx` | empty |

`mitosis build --config=mitosis.react.config.js` (`targets: ['react']`, `prettier: false`) exited 0 for each tag.

## Wiring

- Configs: `packages/components/mitosis/{button-pure,tag-dismissible}/mitosis.react.config.js`
- Script: `packages/components/scripts/generate-frameworks-react-fix.mjs` (`npm run generate:frameworks-react-fix`)
- Result: `packages/components/mitosis/frameworks-react-fix-result.json`
- Sibling vue / angular / svelte hashes unchanged
- IIFEs: `p-button-pure.iife.js`, `p-tag-dismissible.iife.js` unchanged

No dead-end. Files are Mitosis emit, not handwritten stand-ins.

## Follow-ups

- Default prettier-on React generate still fails for these two tags.
- Do not copy these files over published wrappers.
- Lit stays the playground host.
