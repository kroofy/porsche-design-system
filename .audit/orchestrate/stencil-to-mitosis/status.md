# Orchestrate status

Generated: 2026-08-30T22:18:36.196Z

## Units

States: done=13, in-progress=1

| ID | Track | State | Branch | PR | SHA | Brief |
| --- | --- | --- | --- | --- | --- | --- |
| fitness-divider | fitness | done | cursor/mitosis-migration-41e6 | 3 | d3d2baa45c118ff183ef52501e82ac865f53a646 | briefs/fitness-divider.md |
| baseline-divider | baseline | done | cursor/mitosis-migration-41e6 | 3 | ad0d909eee3bd4b645954069cffd352020bc9ac3 | briefs/baseline-divider.md |
| fitness-lit | fitness | done | cursor/mitosis-migration-41e6 | 3 | efd4b7f2b04661a1b8757b5f16ac50e2f377b178 | briefs/fitness-lit.md |
| lever-migrate-recipe | primitives | done | cursor/mitosis-migration-41e6 | 3 | 36c4774e5cb40277cd44f1229e547ece70828ff3 | briefs/lever-migrate-recipe.md |
| migrate-crest | migrate | done | cursor/mitosis-migration-41e6 | 3 | 2cbcee0ebe22bd6c3f4fcbe3ee8e5341a5923f99 | briefs/migrate-crest.md |
| migrate-wordmark | migrate | done | cursor/mitosis-migration-41e6 | 3 | adcb403aa5617fafce8206125dc84cbf5fc451b1 | briefs/migrate-wordmark.md |
| migrate-flag | migrate | done | cursor/mitosis-migration-41e6 | 3 | 4edd6127ec542c2b7b5310e7501a8e7f2997cae8 | briefs/migrate-flag.md |
| migrate-model-signature | migrate | done | cursor/mitosis-migration-41e6 | 3 | 3ab704f859 | briefs/migrate-model-signature.md |
| migrate-icon | migrate | done | cursor/mitosis-migration-41e6 | 3 | d702e8eb4f | briefs/migrate-icon.md |
| migrate-heading | migrate | done | cursor/mitosis-migration-41e6 | 3 | 0fe05aaab6 | briefs/migrate-heading.md |
| migrate-text | migrate | done | cursor/mitosis-migration-41e6 | 3 | fa008afa41 | briefs/migrate-text.md |
| migrate-display | migrate | done | cursor/mitosis-migration-41e6 | 3 | 6825564b24 | briefs/migrate-display.md |
| migrate-spinner | migrate | done | cursor/mitosis-migration-41e6 | 3 | d04025d34b | briefs/migrate-spinner.md |
| migrate-tag | migrate | in-progress | cursor/mitosis-migration-41e6 | 3 |  | briefs/migrate-tag.md |

## Verification ledger

Verdicts: live-ui-verified=11, verifier-failed=1

| PR | SHA | Verdict | Evidence | Verifier | Timestamp |
| --- | --- | --- | --- | --- | --- |
| 3 | ad0d909eee3bd4b645954069cffd352020bc9ac3 | live-ui-verified | /opt/cursor/artifacts/stencil_divider_before.png | coordinator-receipt | 2026-08-30T21:03:11.275Z |
| 3 | d3d2baa45c118ff183ef52501e82ac865f53a646 | verifier-failed | /workspace/.audit/orchestrate/stencil-to-mitosis/reports/fitness-divider.md | coordinator-receipt | 2026-08-30T21:11:17.772Z |
| 3 | efd4b7f2b04661a1b8757b5f16ac50e2f377b178 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_divider_after.png | coordinator-byte-equal-png | 2026-08-30T21:31:04.657Z |
| 3 | 2cbcee0ebe22bd6c3f4fcbe3ee8e5341a5923f99 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_crest_after.png | coordinator-byte-equal-png | 2026-08-30T21:38:06.734Z |
| 3 | adcb403aa5617fafce8206125dc84cbf5fc451b1 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_wordmark_after.png | coordinator-byte-equal-png | 2026-08-30T21:42:06.265Z |
| 3 | 4edd6127ec542c2b7b5310e7501a8e7f2997cae8 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_flag_after.png | coordinator-byte-equal-png | 2026-08-30T21:51:12.288Z |
| 3 | 3ab704f859 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_model_signature_after.png | coordinator-byte-equal-png | 2026-08-30T21:57:25.184Z |
| 3 | d702e8eb4f | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_icon_after.png | coordinator-byte-equal-png | 2026-08-30T22:01:26.766Z |
| 3 | 0fe05aaab6 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_heading_after.png | coordinator-byte-equal-png | 2026-08-30T22:06:22.642Z |
| 3 | fa008afa41 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_text_after.png | coordinator-byte-equal-png | 2026-08-30T22:09:38.651Z |
| 3 | 6825564b24 | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_display_after.png | coordinator-byte-equal-png | 2026-08-30T22:14:10.282Z |
| 3 | d04025d34b | live-ui-verified | /opt/cursor/artifacts/mitosis_lit_spinner_after.png | coordinator-byte-equal-png | 2026-08-30T22:18:36.094Z |

## Frontier

Generation: 0
Lowest unmerged: none

(none)

## Gates

(none)

<!-- orch-summary {"unitStates":{"done":13,"in-progress":1},"ledgerVerdicts":{"live-ui-verified":11,"verifier-failed":1},"frontierGeneration":0,"openGateIds":[]} -->
