GOAL         Migrate p-stepper-horizontal to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/StepperHorizontal.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-stepper-horizontal.md, /opt/cursor/artifacts/mitosis_lit_stepper_horizontal_after.png, /opt/cursor/artifacts/stepper_horizontal_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, existing *.lite.tsx except StepperHorizontal, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Tabs-item just passed byte-identical in-parent swap. Playground: http://localhost:3333/?components=stepper-horizontal. Stencil: packages/components/src/components/stepper-horizontal/stepper-horizontal/. Keep p-stepper-horizontal-item and nested p-scroller / p-button / p-text as Stencil. Copy light-DOM children on in-card swap. size breakpoint m is 1000. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   StepperHorizontal.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on StepperHorizontal.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
