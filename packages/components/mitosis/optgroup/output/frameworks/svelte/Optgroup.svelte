<!-- mitosis-native-host: native svelte from Optgroup.lite.tsx -->
<script context="module" lang="ts">
  export interface LitOptgroupProps {
    label?: string;
    disabled?: any;
    hidden?: any;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let disabled: LitOptgroupProps["disabled"];
  export let label: LitOptgroupProps["label"];
  function __cmpProps() { return { disabled, label }; }

  $: cssText = () => {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(__cmpProps().disabled);
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);--_p-multi-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px)}" +
      '[role="group"]{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px)}' +
      '[role="presentation"]{padding-block:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);padding-inline:calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)';
    if (disabled) out += ";opacity:0.4";
    out += "}";
    if (disabled) {
      out +=
        '@media(forced-colors:active){[role="presentation"]{opacity:1;color:GrayText}}';
    }
    return out;
  };
  $: labelText = () => {
    return label || "";
  };
  $: isDisabled = () => {
    return disabled === true || disabled === "true" || disabled === "";
  };
  $: scopedCssText = scopeCss("\n  :host {\n    display: block;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-optgroup");
</script>

<div class="p-optgroup" data-pds="optgroup">
<div role="group">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<span
    id="label"
    role="presentation">{labelText()}</span
  ><slot />
</div>


</div>
