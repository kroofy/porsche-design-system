<!-- mitosis-native-host: native vue from Optgroup.lite.tsx -->
<template>
  <div class="p-optgroup" data-pds="optgroup">

  <div role="group">
    <component v-html="scopedCssText" :is="'style'"></component
    ><span id="label" role="presentation">{{ labelText }}</span
    ><slot></slot>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitOptgroupProps {
  label?: string;
  disabled?: any;
  hidden?: any;
}

export default defineComponent({
  name: "lit-optgroup",

  props: ["disabled", "label"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-optgroup");
    },
    cssText() {
      const isTrue = (v: any) => v === true || v === "true" || v === "";
      const disabled = isTrue(this.disabled);
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
    },
    labelText() {
      return this.label || "";
    },
    isDisabled() {
      return (
        this.disabled === true ||
        this.disabled === "true" ||
        this.disabled === ""
      );
    },
  },
});
</script>

