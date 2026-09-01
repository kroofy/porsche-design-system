<!-- mitosis-native-host: native svelte from SelectOption.lite.tsx -->
<script context="module" lang="ts">
  export interface LitSelectOptionProps {
    value?: any;
    disabled?: any;
    selected?: any;
    highlighted?: any;
    disabledParent?: any;
    hidden?: any;
  }
</script>

<script lang="ts">
  import PIcon from "../../../../icon/output/frameworks/svelte/Icon.svelte";
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let disabled: LitSelectOptionProps["disabled"];
  export let disabledParent: LitSelectOptionProps["disabledParent"];
  export let selected: LitSelectOptionProps["selected"];
  export let highlighted: LitSelectOptionProps["highlighted"];
  function __cmpProps() { return { disabled, disabledParent, selected, highlighted }; }

  $: cssText = () => {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(__cmpProps().disabled) || isTrue(disabledParent);
    let out =
      ":host{display:block;scroll-margin-block-start:calc(max(2px, var(--_p-select-option-a,1) * 6px) + 36px) !important;scroll-margin-block-end:max(2px, var(--_p-select-option-a,1) * 6px) !important}";
    if (disabled)
      out =
        ":host{display:block;opacity:0.4 !important;scroll-margin-block-start:calc(max(2px, var(--_p-select-option-a,1) * 6px) + 36px) !important;scroll-margin-block-end:max(2px, var(--_p-select-option-a,1) * 6px) !important}";
    out +=
      ":host([hidden]){display:none !important}" +
      "::slotted(img){font:var(--p-typescale-sm) var(--p-font-porsche-next) !important;width:auto !important;height:var(--p-leading-normal) !important;border-radius:var(--p-radius-sm) !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    if (disabled) {
      out +=
        "@media(forced-colors:active){:host{opacity:1 !important;color:GrayText !important}}";
    }
    out +=
      ".option{display:flex;gap:calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);padding-block:calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);padding-inline:var(--_p-select-option-b,calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px)) calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px);min-height:var(--p-leading-normal);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high);cursor:" +
      (disabled ? "not-allowed" : "pointer") +
      ";text-align:start;word-break:break-word;box-sizing:content-box;border-radius:var(--p-radius-sm);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".option--highlighted{background:var(--p-color-frosted)}" +
      ".option--highlighted,.option--selected{color:var(--p-color-primary)}" +
      ".option--disabled{cursor:not-allowed}" +
      ".option--hidden{display:none}" +
      ".icon{margin-inline-start:auto}" +
      "@media(forced-colors:active){.option--disabled{color:GrayText}.option--highlighted{forced-color-adjust:none;outline:2px solid Highlight;outline-offset:-2px}}";
    return out;
  };
  $: isDisabled = () => {
    return (
      disabled === true ||
      disabled === "true" ||
      disabled === "" ||
      disabledParent === true ||
      disabledParent === "true" ||
      disabledParent === ""
    );
  };
  $: isSelected = () => {
    return selected === true || selected === "true" || selected === "";
  };
  $: isHighlighted = () => {
    return highlighted === true || highlighted === "true" || highlighted === "";
  };
  $: optionClass = () => {
    const disabled =
      __cmpProps().disabled === true ||
      __cmpProps().disabled === "true" ||
      __cmpProps().disabled === "" ||
      disabledParent === true ||
      disabledParent === "true" ||
      disabledParent === "";
    const selected =
      __cmpProps().selected === true || __cmpProps().selected === "true" || __cmpProps().selected === "";
    const highlighted =
      __cmpProps().highlighted === true || __cmpProps().highlighted === "true" || __cmpProps().highlighted === "";
    let name = "option";
    if (selected) name += " option--selected";
    if (highlighted) name += " option--highlighted";
    if (disabled) name += " option--disabled";
    return name;
  };
  $: __pdsComponents = { PIcon };
  $: scopedCssText = scopeCss("\n  :host {\n    display: block;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-select-option");
</script>

<div class="p-select-option" data-pds="select-option">
<div class="option">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<slot /><PIcon
    name="check"
    color="primary"
  />
</div>


</div>
