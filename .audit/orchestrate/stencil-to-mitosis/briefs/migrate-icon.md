GOAL         Migrate p-icon to Mitosis Lit following the recipe, pixel-diff 0 on the live playground card.
SCOPE        May write: packages/mitosis-probe-lit/src/Icon.lite.tsx and matching harness only, .audit/orchestrate/stencil-to-mitosis/reports/migrate-icon.md, /opt/cursor/artifacts/mitosis_lit_icon_after.png, /opt/cursor/artifacts/icon_pixel_diff.png, a baseline under .audit/orchestrate/stencil-to-mitosis/baseline/. May not write: packages/components/**, packages/mitosis-probe/**, Crest/Wordmark/Flag/ModelSignature/Divider.lite.tsx, other TAG_NAMEs.
CONTEXT      Recipe: .audit/orchestrate/stencil-to-mitosis/skills/migrate-pds-component.md. Model-signature just passed byte-identical card swap. Playground: http://localhost:3333/?components=icon. Stencil: packages/components/src/components/icon/. Copy model-signature/flag harness, retarget the card. Stencil render is a void <img> with mask+background; size is breakpoint-customizable (prove 999 vs 1000 if the card uses m). You are the only writer in packages/mitosis-probe-lit.
ACCEPTANCE   Icon.lite.tsx compiles with target lit and useShadowDom true. rg my-fragment on Icon.ts is empty. Live card swap pixel-diff 0. Report written.
VERIFY       Recipe pixel-diff section. Control Stencil vs baseline 0 first.
TIMEBOX      45 minutes.
FORBIDDEN    no gt, no rebase, no force-push, no packages/components, no second tag, no customElement/webcomponent/stencil targets.
REPORT       status, SHA, pixel-diff counts, follow-ups.
STANDING     Target is lit. m is 1000px. cssText in shadow. No fragments. Alias lit/decorators.js. One TAG_NAME only.
