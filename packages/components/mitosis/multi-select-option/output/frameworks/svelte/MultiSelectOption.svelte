<!-- mitosis-native-host: native svelte from MultiSelectOption.lite.tsx -->
<script context="module" lang="ts">
  export interface LitMultiSelectOptionProps {
    value?: any;
    disabled?: any;
    selected?: any;
    highlighted?: any;
    disabledParent?: any;
    hidden?: any;
  }
</script>

<script lang="ts">
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let disabled: LitMultiSelectOptionProps["disabled"];
  export let disabledParent: LitMultiSelectOptionProps["disabledParent"];
  export let selected: LitMultiSelectOptionProps["selected"];
  export let highlighted: LitMultiSelectOptionProps["highlighted"];
  function __cmpProps() { return { disabled, disabledParent, selected, highlighted }; }

  $: cssText = () => {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(__cmpProps().disabled) || isTrue(disabledParent);
    const selected = isTrue(__cmpProps().selected);
    const checkMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>\') center/contain no-repeat';
    let out = ":host{display:block;";
    if (disabled) out += "opacity:0.4 !important;";
    out +=
      "scroll-margin-block-start:calc(max(2px, var(--_p-multi-select-option-a,1) * 6px) + 36px) !important;scroll-margin-block-end:max(2px, var(--_p-multi-select-option-a,1) * 6px) !important;--_p-checkbox-scaling:var(--_p-multi-select-option-a) !important}" +
      ":host([hidden]){display:none !important}" +
      "slot{display:block;padding-top:max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))}";
    if (disabled) {
      out +=
        "@media(forced-colors:active){:host{opacity:1 !important;color:GrayText !important}}";
    }
    out +=
      ".option{display:flex;gap:calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);padding-block:calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);padding-inline:var(--_p-multi-select-option-b,calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px)) calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px);min-height:var(--p-leading-normal);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high);cursor:pointer;text-align:start;word-break:break-word;box-sizing:content-box;border-radius:var(--p-radius-sm);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".option--highlighted{background:var(--p-color-frosted)}" +
      ".option--highlighted,.option--selected{color:var(--p-color-primary)}" +
      ".option--disabled{cursor:not-allowed}" +
      ".option--hidden{display:none}" +
      ".checkbox{all:unset;display:grid;width:calc(var(--_p-checkbox-scaling) * 1.75rem);height:calc(var(--_p-checkbox-scaling) * 1.75rem);margin-block:max(0px, calc((var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));box-sizing:border-box;font:var(--p-typescale-sm) var(--p-font-porsche-next);background:var(--p-checkbox-background-color,var(--p-color-frosted));transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);border:1px solid var(--p-checkbox-border-color,var(--p-color-contrast-lower));border-radius:var(--p-radius-md);";
    if (disabled) out += "pointer-events:none;";
    out += "flex-shrink:0}";
    out += '.checkbox::before{content:"";grid-area:1/1';
    if (selected) {
      out +=
        ";-webkit-mask:" +
        checkMask +
        ";mask:" +
        checkMask +
        ";background-color:var(--p-checkbox-icon-color,var(--p-color-canvas))";
    }
    out +=
      '}.checkbox::after{content:"";margin:calc(-1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));grid-area:1/1}';
    if (selected) out += ".checkbox{background:var(--p-color-primary)}";
    out +=
      "@media(forced-colors:active){.option--disabled{color:GrayText}.option--highlighted{forced-color-adjust:none;outline:2px solid Highlight;outline-offset:-2px}";
    if (disabled) out += ".checkbox{border-color:GrayText}";
    if (selected) out += ".checkbox::before{background:CanvasText}";
    out += "}";
    if (selected) {
      out +=
        "@media(hover:hover){.checkbox:hover{border-color:transparent;background-color:var(--p-checkbox-border-color,var(--p-color-contrast-high))}}";
    } else {
      out +=
        "@media(hover:hover){.checkbox:hover{border-color:var(--p-checkbox-border-color,var(--p-color-primary))}}";
    }
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
  $: scopedCssText = scopeCss("\n  :host {\n    display: block;\n  }\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-multi-select-option");
</script>

<div class="p-multi-select-option" data-pds="multi-select-option">
<div class="option">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}<span
    class="checkbox"
  /><slot />
</div>


</div>
