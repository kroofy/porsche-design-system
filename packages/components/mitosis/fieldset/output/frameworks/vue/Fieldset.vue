<!-- mitosis-native-host: native vue from Fieldset.lite.tsx -->
<template>
  <div class="p-fieldset" data-pds="fieldset">

  <fieldset>
    <component v-html="scopedCssText" :is="'style'"></component>
    <legend>{{ labelText }}</legend>
    <slot></slot
    ><span class="message" id="message"
      ><PIcon aria-hidden="true"></PIcon>{{ messageText }}</span
    >
  </fieldset>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PIcon from "../../../../icon/output/frameworks/vue/Icon.vue";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitFieldsetProps {
  label?: string;
  labelSize?: string;
  required?: any;
  message?: string;
  state?: string;
  theme?: string;
}

export default defineComponent({
  components: { PIcon },
  name: "lit-fieldset",

  props: ["state", "message", "label", "labelSize"],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-fieldset");
    },
    cssText() {
      const formState =
        this.state === "success" || this.state === "error"
          ? this.state
          : "none";
      const message = this.message || "";
      const hasMsg =
        !!message && (formState === "success" || formState === "error");
      const label = this.label || "";
      const hasLabel = !!label;
      const labelSize = this.labelSize || "medium";
      const small = labelSize === "small";
      const palettes: any = {
        none: "",
        success: "var(--p-color-success)",
        error: "var(--p-color-error)",
      };
      const messageColor = palettes[formState] || "";
      let out =
        ":host{display:block}" +
        ":host([hidden]){display:none !important}" +
        ":not(:defined,[data-ssr]){visibility:hidden}" +
        "fieldset{all:unset;display:block}";
      if (hasLabel) {
        out +=
          "legend{all:unset;margin-bottom:var(--p-spacing-static-md);color:var(--p-color-primary);font:" +
          (small
            ? "var(--p-font-weight-semibold) var(--p-typescale-sm)"
            : "var(--p-font-weight-normal) var(--p-typescale-md)") +
          " / var(--p-leading-normal) var(--p-font-porsche-next)}";
      } else {
        out += "legend{display:none}";
      }
      out +=
        ".required{user-select:none}" +
        ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
      if (messageColor) out += ";color:" + messageColor;
      out +=
        ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);margin-top:var(--p-spacing-static-md)}.message:empty{opacity:0;position:absolute}";
      if (!hasMsg)
        out +=
          ".message{opacity:0;position:absolute}.message p-icon{display:none}";
      return out;
    },
    labelText() {
      return this.label || "";
    },
    messageText() {
      const formState = this.state || "none";
      const message = this.message || "";
      if (!message || (formState !== "success" && formState !== "error"))
        return "";
      return message;
    },
    iconName() {
      const formState = this.state || "none";
      const message = this.message || "";
      if (!message || (formState !== "success" && formState !== "error"))
        return "";
      return formState === "error" ? "exclamation" : "check";
    },
    iconColor() {
      const formState = this.state || "none";
      if (formState === "error") return "error";
      if (formState === "success") return "success";
      return "";
    },
  },
});
</script>

