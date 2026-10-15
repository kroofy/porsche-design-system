GOAL         Write the lever the next component workers will follow so they do not rediscover Lit pitfalls per component.
SCOPE        May write: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md and a tiny helper under packages/mitosis-probe-lit/ only if it is a rerunnable check. May not write: packages/components/**, new component .lite.tsx files, packages/mitosis-probe/**.
CONTEXT      Lit p-divider passed live checks and a byte-identical 462x266 crop vs Stencil baseline. Report: .audit/orchestrate/stencil-to-mitosis/reports/fitness-lit.md. Must encode: target name is lit not webcomponent; useShadowDom true; cssText getter into shadow style not inline background; no JSX fragments (they emit my-fragment); alias lit/decorators.js; m breakpoint 1000px; pixel-diff by swapping hosts in the live playground card with the baseline capture script params.
ACCEPTANCE   A single skill/recipe file exists that a stranger can follow to migrate one TAG_NAME.
ACCEPTANCE   It names forbidden generators, the screenshot command, and the dead-end criteria.
VERIFY       File exists and contains the words lit, useShadowDom, cssText, my-fragment, 1000, pixel-diff.
TIMEBOX      20 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components edits, no migrating a second component in this unit.
REPORT       path of the recipe, SHA, what it encodes.
STANDING     Mitosis target is lit, not webcomponent. PDS m is 1000px. No 74-way fan-out until this recipe exists.
