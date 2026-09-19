# baseline-divider

status: done
verdict: live-ui-verified
branch: cursor/mitosis-migration-41e6
rule visible: yes

Four horizontal `p-divider` rules and one vertical rule are visible on the live Stencil playground card at `http://localhost:3333/?components=divider`. Page title is Playground. Five hosts are hydrated. Each horizontal host is a 1px shadow `<hr>` spanning 170.656px.

## Paths

- `/opt/cursor/artifacts/stencil_divider_before.png`
- `.audit/orchestrate/stencil-to-mitosis/baseline/stencil_divider_before.png`
- script: `.audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-divider-baseline.mjs`

The two PNGs are identical: 462x266 8-bit RGB, PNG magic `89 50 4e 47 0d 0a 1a 0a`.

## Command

Playground already running. From repo root:

```bash
node .audit/orchestrate/stencil-to-mitosis/scripts/capture-stencil-divider-baseline.mjs
```

Uses Playwright against system Chrome (`CHROME_PATH` or `/usr/local/bin/google-chrome`). Viewport 1440x900, `deviceScaleFactor` 2. Screenshots `[data-card="divider"]`. Fails if the PNG does not contain at least three dark horizontal bands.

## Pixel proof

Image mean luminance 251.5 (light card). Four dark bands in the middle 50% of the card:

| y (device px) | mean luminance | token |
| --- | --- | --- |
| 60-61 | 94.2 | contrast-high |
| 88-89 | 112.1 | contrast-medium |
| 116-117 | 145.1 | contrast-low |
| 146-147 | 198.2 | contrast-lower |

This is a real divider card, not a blank or error page.

## Not done

Did not edit `packages/components`. Did not change the playground harness.
