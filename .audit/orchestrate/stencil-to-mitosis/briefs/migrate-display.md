GOAL         Migrate p-display to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Display.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-display.md, /opt/cursor/artifacts/mitosis_lit_display_after.png, /opt/cursor/artifacts/display_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, Crest/Wordmark/Flag/ModelSignature/Divider/Icon/Heading/Text.lite.tsx, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Text just passed byte-identical card swap. Playground: http://localhost:3333/?components=display. Stencil: packages/components/src/components/display/. Deprecated heading-like slotted typography. Copy heading/text harness, retarget the card. You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Display.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Display.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
