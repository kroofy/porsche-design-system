# Close: stencil-to-mitosis

Predicate: 0/75. Stopped.

Mitosis compiled `p-divider` to customElement, react, vue, and angular, and the custom element rendered live. It still cannot replace Stencil for PDS.

Gaps proved on the live custom element:

- No runtime JSS `attachComponentCss`
- No `BreakpointCustomizable` direction
- Forced-colors / HCM makes the divider invisible (inline background)
- No `observedAttributes` / attribute reactivity
- No PDS `validateProps`

Baseline Stencil screenshot is live-ui-verified. Mitosis after screenshot exists. Pixel-diff is not 0 and cannot be made 0 without a custom style runtime, which is Stencil again.

Loop `loop-stencil-to-mitosis` unsubscribed. No migrate fan-out.
