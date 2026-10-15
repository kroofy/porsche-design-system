# Migrate p-fieldset to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     7cfd40da91 (source, bundle; baseline and this report land on top)
TAG      p-fieldset only. LIT_TAG lit-fieldset. packages/components untouched.

## Verdict

`Fieldset.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=fieldset` swapped in-card to `lit-fieldset` diffs 0 of 754,400 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="fieldset"]`.

This is not InputBase. The probe is a wrapper: `legend` + default slot + StateMessage. Nested message icons stay Stencil `p-icon`. Slotted `p-input-text` children stay Stencil; they are copied on in-card swap so the default slot is not empty.

## What was built

Copied a form-field harness and retargeted `[data-card="fieldset"]`. Textarea.lite.tsx was not edited.

- `src/Fieldset.lite.tsx` mirrors `p-fieldset`. Root is `<fieldset>` with cssText `<style>`, always-emitted `legend`, default `<slot>`, and `.message` + Stencil `p-icon`. `rg my-fragment output/lit/src/Fieldset.ts` is empty.
- Playground has 4 hosts, all `label="Some legend label"` wrapping two `p-input-text`. Second host is `label-size="small"` (semibold + typescale-sm). Third/fourth are success/error with `Some message.`
- Hyphenated `label-size` is re-read from the attribute after `mitosis build`. Pixel-diff copies attributes including `class` (`w-full`) and light-DOM children.
- Fieldset CSS has no breakpoint props. File harness proves shadow, default slot assignment, small vs medium legend, hide-empty-legend, hidden host, and attribute reactivity.
- Stencil `aria`/`aria-describedby`/`aria-invalid`/`required` asterisk are not in this pixel probe. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-fieldset-whitespace.mjs
rg my-fragment output/lit/src/Fieldset.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Fieldset.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-fieldset.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=fieldset" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_fieldset_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_fieldset_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-fieldset-baseline.mjs
node harness/verify-fieldset.mjs           # exit 0, failures: []
node harness/pixel-diff-fieldset.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Fieldset.ts` has none.

## Live verification

`node harness/verify-fieldset.mjs`, exit 0: shadow root, cssText `<style>`, `fieldset{all:unset}`, medium typescale-md legend, small semibold/typescale-sm, default slot assigns `slot child`, success/error icons stay `P-ICON`, no-label legend `display:none`, hidden host, attribute change after connect.

`node harness/pixel-diff-fieldset.mjs`, exit 0:

```json
{
  "swap": { "swapped": 4, "litRendered": 4, "fragment": false, "innerLit": false, "slottedCopied": true },
  "controlStencilVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "totalPixels": 754400 },
  "litVsBaseline": { "aSize": "460x1640", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 754400 }
}
```

Card height 1026px is clipped to the 1440x900 viewport (same clip for control and Lit).

## Artifacts

- `/opt/cursor/artifacts/stencil_fieldset_before.png`
- `/opt/cursor/artifacts/mitosis_lit_fieldset_after.png`
- `/opt/cursor/artifacts/fieldset_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_fieldset_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-fieldset.md`

## Follow-ups

- Mitosis Lit does not emit `aria` role/`aria-describedby`/`required` asterisk. Native fieldset semantics beyond the visual legend and slot are untested here.
