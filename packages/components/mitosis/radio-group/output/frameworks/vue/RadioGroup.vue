<!-- mitosis-native-host: native vue from RadioGroup.lite.tsx -->
<template>
  <div class="p-radio-group" data-pds="radio-group">

  <fieldset class="root">
    <component v-html="scopedCssText" :is="'style'"></component>
    <div class="label-wrapper">
      <div class="label" id="label">
        {{ labelText }}<slot name="label"></slot>
      </div>
      <slot name="label-after"></slot>
    </div>
    <span class="label" id="description"
      >{{ descriptionText }}<slot name="description"></slot
    ></span>
    <div class="wrapper">
      <slot></slot><PSpinner class="spinner" aria-hidden="true"></PSpinner>
    </div>
    <span class="message" id="message"
      ><PIcon aria-hidden="true"></PIcon>{{ messageText }}</span
    ><span class="loading" id="loading">{{ loadingText }}</span>
  </fieldset>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PSpinner from "../../../../spinner/output/frameworks/vue/Spinner.vue";
import PIcon from "../../../../icon/output/frameworks/vue/Icon.vue";
import { scopeCss } from "../../../../_runtime/scope-css.js";
export interface LitRadioGroupProps {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  loading?: any;
  required?: any;
  direction?: any;
  value?: any;
  name?: string;
  form?: string;
}

export default defineComponent({
  components: { PIcon, PSpinner },
  name: "lit-radio-group",

  props: [
    "disabled",
    "loading",
    "compact",
    "state",
    "message",
    "hideLabel",
    "direction",
    "label",
    "description",
    "required",
  ],

  computed: {
    scopedCssText() {
      return scopeCss(this.cssText || "", ".p-radio-group");
    },
    cssText() {
      const minWidth: any = {
        xs: 480,
        s: 760,
        m: 1000,
        l: 1300,
        xl: 1760,
        xxl: 1920,
      };
      const parse = (raw: any, fallback: any) => {
        if (raw === undefined || raw === null || raw === "") return fallback;
        if (typeof raw === "string" && raw.charAt(0) === "{") {
          try {
            return JSON.parse(
              raw
                .replace(/'/g, '"')
                .replace(/[\s"]?([a-z0-9-]+)[\s"]?:/gi, '"$1":')
            );
          } catch (e) {
            return fallback;
          }
        }
        return raw;
      };
      const isTrue = (v: any) => v === true || v === "true" || v === "";
      const pick = (obj: any, key: any, fallback: any) => {
        if (obj && typeof obj === "object") {
          if (obj[key] === undefined) return fallback;
          return obj[key];
        }
        return obj;
      };
      const disabled = isTrue(this.disabled);
      const loading = isTrue(this.loading);
      const compact = isTrue(this.compact);
      const formState =
        this.state === "success" || this.state === "error"
          ? this.state
          : "none";
      const message = this.message || "";
      const hasMsg =
        !!message && (formState === "success" || formState === "error");
      const hideLabel = parse(this.hideLabel, false);
      const hideBase =
        typeof hideLabel === "object" && hideLabel !== null
          ? pick(hideLabel, "base", false)
          : hideLabel;
      const direction = parse(this.direction, "column");
      const directionBase =
        typeof direction === "object" && direction !== null
          ? pick(direction, "base", "column")
          : direction;
      const scale = compact ? "0.64285714" : "1";
      const palettes: any = {
        none: "",
        success: "var(--p-color-success)",
        error: "var(--p-color-error)",
      };
      const messageColor = palettes[formState] || "";
      const labelVisFor = (h: any) =>
        isTrue(h)
          ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"
          : "min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal";
      const descVisFor = (h: any) =>
        isTrue(h)
          ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;margin-top:calc(-1 * var(--p-spacing-static-xs))"
          : "position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))";
      const dirFor = (d: any) =>
        d === "row"
          ? "flex-flow:row wrap;align-items:start"
          : "flex-flow:column nowrap;align-items:stretch";
      let out =
        ":host{--_p-radio-group-a:" +
        scale +
        ";--_p-radio-group-option-a:" +
        scale +
        "}" +
        ":host([hidden]){display:none !important}" +
        'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
        'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
        ".label-after{display:inline-block;vertical-align:top}";
      if (loading) {
        out +=
          "::slotted(*:not([slot])){opacity:0.4 !important}" +
          "@media(forced-colors:active){::slotted(*:not([slot])){opacity:1 !important;color:GrayText !important}}";
      }
      out +=
        ":not(:defined,[data-ssr]){visibility:hidden}" +
        ".root{all:unset;display:grid;justify-self:flex-start;row-gap:var(--p-spacing-static-xs)}" +
        ".wrapper{position:relative;display:flex;" +
        dirFor(directionBase) +
        ";column-gap:calc(22.4px * (var(--_p-radio-group-a) - 0.64285714) + 8px);row-gap:calc(11.2px * (var(--_p-radio-group-a) - 0.64285714) + 4px)}";
      if (loading) {
        out +=
          ".spinner{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);pointer-events:none}";
      }
      out += ".label-wrapper{" + labelVisFor(hideBase) + "}";
      out +=
        ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
        (disabled ? "not-allowed" : "inherit") +
        ";color:var(--p-color-primary)";
      if (disabled || loading) out += ";pointer-events:none";
      if (disabled) out += ";opacity:0.4";
      out +=
        ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);" +
        descVisFor(hideBase) +
        '}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
        ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
      if (messageColor) out += ";color:" + messageColor;
      out +=
        ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}";
      if (!hasMsg)
        out +=
          ".message{opacity:0;position:absolute}.message p-icon{display:none}";
      out +=
        ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
        ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
      if (disabled) {
        out += "@media(forced-colors:active){.label{opacity:1;color:GrayText}}";
      }
      const keys: any = {};
      if (typeof hideLabel === "object" && hideLabel !== null)
        for (const k of Object.keys(hideLabel)) keys[k] = 1;
      if (typeof direction === "object" && direction !== null)
        for (const k of Object.keys(direction)) keys[k] = 1;
      for (const bp of Object.keys(keys)) {
        if (bp === "base") continue;
        if (!minWidth[bp]) continue;
        let media = "@media(min-width:" + minWidth[bp] + "px){";
        if (
          typeof hideLabel === "object" &&
          hideLabel !== null &&
          hideLabel[bp] !== undefined
        ) {
          const h = pick(hideLabel, bp, hideBase);
          media +=
            ".label-wrapper{" +
            labelVisFor(h) +
            "}.label:is(span){" +
            descVisFor(h) +
            "}";
        }
        if (
          typeof direction === "object" &&
          direction !== null &&
          direction[bp] !== undefined
        ) {
          media +=
            ".wrapper{" + dirFor(pick(direction, bp, directionBase)) + "}";
        }
        media += "}";
        out += media;
      }
      return out;
    },
    labelText() {
      return this.label || "";
    },
    descriptionText() {
      return this.description || "";
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
    isDisabled() {
      return (
        this.disabled === true ||
        this.disabled === "true" ||
        this.disabled === ""
      );
    },
    isLoading() {
      return (
        this.loading === true || this.loading === "true" || this.loading === ""
      );
    },
    isRequired() {
      return (
        this.required === true ||
        this.required === "true" ||
        this.required === ""
      );
    },
    ariaInvalid() {
      return this.state === "error" ? "true" : "";
    },
    messageRole() {
      return this.state === "success" ? "status" : "alert";
    },
    loadingText() {
      if (
        this.loading === true ||
        this.loading === "true" ||
        this.loading === ""
      )
        return "Loading";
      return "";
    },
  },
});
</script>

