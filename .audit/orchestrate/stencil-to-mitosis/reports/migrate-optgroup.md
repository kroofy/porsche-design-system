# Migrate p-optgroup to Mitosis Lit

STATUS   live-ui-verified, pixel-diff 0, inside timebox
BRANCH   cursor/mitosis-migration-41e6
HEAD     83b26a7564 (source, bundle; baseline and this report land on top)
TAG      p-optgroup only. LIT_TAG lit-optgroup. packages/components untouched. Select.lite.tsx and SelectOption.lite.tsx untouched.

## Verdict

`Optgroup.lite.tsx` compiles with target `lit` and `useShadowDom: true`. The live playground card at `http://localhost:3333/?components=select` swapped optgroup hosts only to `lit-optgroup` and diffs 0 of 451,720 pixels against a same-session Stencil control and the stored baseline. Viewport 1440x900, deviceScaleFactor 2, crop `[data-card="select"]`. Card stays closed.

Parents stay `p-select`. Children stay `p-select-option`. Nested `p-icon` stays Stencil. Light-DOM option children are copied on swap. `rg my-fragment output/lit/src/Optgroup.ts` is empty.

## What was built

Copied the SelectOption in-parent swap pattern. SelectOption.lite.tsx and Select.lite.tsx were not edited.

- `src/Optgroup.lite.tsx` mirrors `getComponentCss`: `:host([hidden])`, `::slotted(*)` `--_p-select-option-b` indent, `[role=group]` column flex + gap from inherited `--_p-optgroup-a`, `[role=presentation]` semibold label, disabled opacity 0.4 + GrayText.
- Strip sets `aria-disabled` on the group and syncs `disabledParent` onto slotted Stencil options.
- Playground has 8 optgroups in 4 closed Stencil `p-select`s: label `Some optgroup`, second group `disabled="true"`, two `p-select-option`s each. Options sit in `display:none` popover.
- File harness proves shadow, group/presentation roles, slotted children, disabled label opacity, hidden host.

`p-select-option` throws `parent should be of kind p-select | p-optgroup` when reparented onto `lit-optgroup`. Swap swallows that connect check; options keep their last Stencil render. Parent `updateOptions` is patched to accept `LIT-OPTGROUP` so slotchange does not skip the groups.

Playwright `waitForSelector` uses `{ state: 'attached' }` because closed optgroups are not visible.

## Commands

```
cd packages/mitosis-probe-lit
./node_modules/.bin/mitosis build
git checkout -- output/lit/src/
node harness/strip-optgroup-whitespace.mjs
rg my-fragment output/lit/src/Optgroup.ts   # empty
/workspace/node_modules/.bin/esbuild output/lit/src/Optgroup.ts --bundle --format=iife \
  --tsconfig=tsconfig.json --alias:lit/decorators=lit/decorators.js \
  --outfile=harness/lit-optgroup.bundle.js
PLAYGROUND_URL="http://localhost:3333/?components=select" \
ARTIFACT_PNG="/opt/cursor/artifacts/stencil_optgroup_before.png" \
BASELINE_PNG=".audit/orchestrate/stencil-to-mitosis/baseline/stencil_optgroup_before.png" \
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-optgroup-baseline.mjs
node harness/verify-optgroup.mjs            # exit 0, failures: []
node harness/pixel-diff-optgroup.mjs        # exit 0, strictMismatch: 0
```

`rg my-fragment output/lit` still matches `output/lit/src/Divider.ts`. `Optgroup.ts` has none.

## Live verification

`node harness/verify-optgroup.mjs`, exit 0: shadow root, cssText `<style>`, host block, slotted option padding var, group flex, default slot, label `Some optgroup` + primary token color, disabled opacity 0.4 + GrayText + `aria-disabled`, hidden host, no inner `lit-*`.

`node harness/pixel-diff-optgroup.mjs`, exit 0:

```json
{
  "swap": { "swapped": 8, "litRendered": 8, "fragment": false, "parentStillStencil": true, "slottedCopied": true, "closed": true, "innerLit": false, "nested": { "groupCount": 8, "optionCount": 16, "optionTags": ["P-SELECT-OPTION"], "labels": ["Some optgroup"] } },
  "controlStencilVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "totalPixels": 451720 },
  "litVsBaseline": { "aSize": "460x982", "strictMismatch": 0, "perceptualMismatch": 0, "totalPixels": 451720 }
}
```

## Artifacts

- `/opt/cursor/artifacts/stencil_optgroup_before.png`
- `/opt/cursor/artifacts/mitosis_lit_optgroup_after.png`
- `/opt/cursor/artifacts/optgroup_pixel_diff.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_optgroup_before.png`
- `.audit/orchestrate/stencil-to-mitosis/reports/migrate-optgroup.md`

## Follow-ups

- `p-select-option` still requires a `p-select` or `p-optgroup` parent on connect. A relaxed parent check is needed before options can remount onto `lit-optgroup` without a swallowed connect.
- `p-select.updateOptions` still requires `p-optgroup` children. A relaxed child-kind check is needed before Lit groups can remount without a patched `updateOptions`.
- Open dropdown / group heading pixels are not in this closed-card probe.
- Keep leftover `harness/stencil_*_control.png` untracked.
