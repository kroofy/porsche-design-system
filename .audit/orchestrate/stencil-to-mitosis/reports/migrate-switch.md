# Migrate p-switch to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     6b914e84f5 (source, bundle; baseline and this report land on top)
TAG      p-switch only. LIT_TAG lit-switch. packages/components untouched.

## Verdict

`Switch.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=switch` swapped in-card to `lit-switch` diffs 0 of 269,560 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="switch"]`.

Inner loading stays `p-spinner`. It was not swapped to `lit-spinner`.

## What was built

All of it sits in the existing `packages/mitosis-probe-lit/` probe. Button and earlier sources were not rewritten.

- `src/Switch.lite.tsx` mirrors `p-switch`. `useMetadata({ tagName: 'lit-switch' })`. Static `:host([hidden])` in `useStyle`. AlignLabel, hideLabel, stretch, checked, disabled, loading, and compact live in a `cssText` getter, rendered as `<style innerHTML={state.cssText} />`. Colors use `var(--p-color-*)`. Scaling is `--_p-switch-a`. Checked paints success tokens; loading makes the toggle `transparent` and sizes `.spinner` to the track. Disabled sets host `opacity: 0.4` and skips hover. Forced-colors uses `GrayText` / `CanvasText` / `Highlight`.
- Stencil's shadow is `<Host><button>…</button><label><slot/></label><LoadingMessage/></Host>`. Mitosis cannot return a fragment. The probe uses one real root (`div.wrap`) with `display:contents` so the button and label stay flex children of `:host`. The sr-only `.loading` span lives in that wrap. `rg my-fragment output/lit/src/Switch.ts` is empty.
- The probe always emits `<p-spinner class="spinner">` inside `.toggle` and hides it with `display:none` when not loading. Stencil only mounts the spinner while loading; the always-on node is hidden so layout matches.
- Mitosis pretty-prints the template. `harness/strip-switch-whitespace.mjs` restores a single-line shadow tree, reads hyphenated `align-label` / `hide-label`, and omits empty `aria-disabled` via Lit `nothing`.
- Pixel-diff copies attributes **and** light-DOM children onto `lit-switch`. Host `class` is copied so `self-start` stays.
- Loading `p-spinner` animates. Capture and pixel-diff set `--p-animation-duration: 0s` on both sides.
- alignLabel / hideLabel / stretch parse JSON when the string starts with `{`. `m` compiles to `@media(min-width:1000px)`. The card does not use breakpoint JSON. The file harness proves 999 vs 1000 (`stretch` inline-flex 73.8px → flex 968px).
- Stencil sets `shadow: { delegatesFocus: true }` and emits `update` on click. Mitosis Lit does not emit those. Static pixel-diff does not toggle. Follow-up only.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
# …all prior strips…
node harness/strip-switch-whitespace.mjs
rg my-fragment output/lit/src/Switch.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Switch.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-switch.bundle.js
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-switch-baseline.mjs
node harness/verify-switch.mjs            # exit 0, failures: []
node harness/pixel-diff-switch.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Switch.ts` has none.

## Live verification

`node harness/verify-switch.mjs`, exit 0: shadow root, cssText `<style>`, `--_p-switch-a:1`, `role=switch`, inner `P-SPINNER`, token colors match `var()` refs, checked success + translate, loading spinner + transparent toggle, disabled opacity 0.4, hide-label clipped, stretch `display:flex`, 999 `inline-flex` vs 1000 `flex`.

`node harness/pixel-diff-switch.mjs`, exit 0:

```json
{
  "swap": { "swapped": 6, "litRendered": 6, "fragment": false, "innerLit": false },
  "controlStencilVsBaseline": { "aSize": "460x586", "strictMismatch": 0, "totalPixels": 269560 },
  "litVsBaseline": { "aSize": "460x586", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 269560 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_switch_before.png`
- `/opt/cursor/artifacts/mitosis_lit_switch_after.png`
- `/opt/cursor/artifacts/switch_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_switch_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-switch.md`

## Follow-ups

- Mitosis Lit does not emit `delegatesFocus` or the `update` event. Toggle behavior is untested here.
- `display:contents` on the wrap is a generator workaround, not a Stencil node.
