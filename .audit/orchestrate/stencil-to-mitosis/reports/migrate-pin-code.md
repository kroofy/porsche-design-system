# Migrate p-pin-code to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     1223a8c4c1 (source, bundle; baseline and this report land on top)
TAG      p-pin-code only. LIT_TAG lit-pin-code. packages/components untouched.

## Verdict

`PinCode.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=pin-code` swapped in-card to `lit-pin-code` diffs 0 of 540,960 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="pin-code"]`.

This is a `fieldset.root` with Label, four digit inputs, StateMessage, and an optional loading `p-spinner`. Nested `p-icon` / `p-spinner` stay Stencil. Light-DOM children are copied on swap (playground hosts have none). `rg my-fragment output/lit/src/PinCode.ts` is empty.

## What was built

Copied the textarea Label + StateMessage / cssText / shadow pattern. Textarea.lite.tsx was not edited.

- `src/PinCode.lite.tsx` mirrors `getComponentCss`: `--_p-pin-code-a` scale, digit grid `repeat(length, 1fr)`, form-state border/background, loading spinner overlay, hideLabel breakpoints (m is 1000), forced-colors `GrayText` on disabled/loading inputs, CanvasText not used here.
- Strip generates `length` inputs, current-input id, `p-spinner` only when `loading`, and re-reads `hide-label` / `length` / `loading` from attributes.
- Playground has 5 hosts: default, `loading="true"`, success+message, error+message, `disabled="true"`. All `label="Some label"`, default length 4.
- File harness proves shadow, four/six inputs, current-input id, numeric `inputmode`, loading spinner `P-SPINNER` size inherit, success/error `P-ICON`, hidden host.

`--p-animation-duration: 0s` (and transition) paused on both Stencil control and Lit after so the loading spinner does not drift.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-pin-code-whitespace.mjs
rg my-fragment output/lit/src/PinCode.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/PinCode.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-pin-code.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=pin-code" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_pin_code_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_pin_code_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-pin-code-baseline.mjs
node harness/verify-pin-code.mjs           # exit 0, failures: []
node harness/pixel-diff-pin-code.mjs       # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `PinCode.ts` has none.

## Live verification

`node harness/verify-pin-code.mjs`, exit 0: shadow root, cssText `<style>`, scale 1, `repeat(4, 1fr)`, four inputs, first `id=current-input`, type text / inputmode numeric, frosted background vs token ref, loading spinner `P-SPINNER` inherit + input opacity 0.4, success check icon + status role, error exclamation + `aria-invalid`, disabled inputs, `length=6` → six inputs + `repeat(6, 1fr)`, hidden host, no inner `lit-*`.

`node harness/pixel-diff-pin-code.mjs`, exit 0:

```json
{
  "swap": { "swapped": 5, "litRendered": 5, "fragment": false, "innerLit": false, "nested": { "icons": ["P-ICON", "P-ICON"], "spinners": ["P-SPINNER"] } },
  "controlStencilVsBaseline": { "aSize": "460x1176", "strictMismatch": 0, "totalPixels": 540960 },
  "litVsBaseline": { "aSize": "460x1176", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 540960 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_pin_code_before.png`
- `/opt/cursor/artifacts/mitosis_lit_pin_code_after.png`
- `/opt/cursor/artifacts/pin_code_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_pin_code_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-pin-code.md`

## Follow-ups

- `change` / `blur`, paste, and form internals are not in this pixel probe.
