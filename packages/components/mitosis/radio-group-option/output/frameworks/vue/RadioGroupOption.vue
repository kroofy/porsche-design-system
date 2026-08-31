<template>
  <div class="root">
    <component v-html="cssText" :is="'style'"></component>
    <div class="wrapper">
      <input type="radio" /><p-spinner
        class="spinner"
        aria-hidden="true"
      ></p-spinner>
    </div>
    <div class="label-wrapper">
      <label class="label" id="label"
        >{{ labelText }}<slot name="label"></slot></label
      ><span class="label-after"><slot name="label-after"></slot></span>
    </div>
    <span class="loading" id="loading">{{ loadingText }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface LitRadioGroupOptionProps {
  value?: any;
  label?: string;
  disabled?: any;
  loading?: any;
  selected?: any;
  disabledParent?: any;
  loadingParent?: any;
  name?: string;
  state?: string;
}

export default defineComponent({
  name: "lit-radio-group-option",

  props: [
    "disabled",
    "disabledParent",
    "selected",
    "loading",
    "loadingParent",
    "state",
    "label",
    "name",
    "value",
  ],

  computed: {
    cssText() {
      const isTrue = (v: any) => v === true || v === "true" || v === "";
      const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);
      const selected = isTrue(this.selected);
      const optionLoading = isTrue(this.loading) && !selected;
      const loading = optionLoading || isTrue(this.loadingParent);
      const blocked = disabled || loading;
      const formState =
        this.state === "success" || this.state === "error"
          ? this.state
          : "none";
      const palettes: any = {
        none: {
          bg: "var(--p-color-frosted)",
          border: "var(--p-color-contrast-lower)",
          hover: "var(--p-color-primary)",
          checked: "var(--p-color-primary)",
        },
        success: {
          bg: "var(--p-color-success-frosted-soft)",
          border: "var(--p-color-success)",
          hover: "var(--p-color-success)",
          checked: "var(--p-color-success)",
        },
        error: {
          bg: "var(--p-color-error-frosted-soft)",
          border: "var(--p-color-error)",
          hover: "var(--p-color-error)",
          checked: "var(--p-color-error)",
        },
      };
      const palette = palettes[formState] || palettes.none;
      const checkedIcon =
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>\') center/contain no-repeat';
      const dim = "calc(var(--_p-radio-group-option-a) * 1.75rem)";
      let out =
        ":host{display:block}" +
        ":host([hidden]){display:none !important}" +
        'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
        'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
        ".label-after{display:inline-block;vertical-align:top}" +
        ":not(:defined,[data-ssr]){visibility:hidden}" +
        "input{all:unset;display:grid;width:" +
        dim +
        ";height:" +
        dim +
        ";margin-block:max(0px, calc((var(--p-leading-normal) - " +
        dim +
        ") / 2));box-sizing:border-box;font:var(--p-typescale-sm) var(--p-font-porsche-next);background:" +
        palette.bg +
        ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);border:1px solid " +
        palette.border +
        ";border-radius:var(--p-radius-full)";
      if (blocked) out += ";pointer-events:none";
      out +=
        "}input:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        "input:checked{background:" +
        palette.checked +
        "}" +
        'input::before{content:"";grid-area:1/1}' +
        'input::after{content:"";margin:calc(-1px - max(0px, calc(24px - ' +
        dim +
        ") / 2));grid-area:1/1}" +
        "input:checked::before{-webkit-mask:" +
        checkedIcon +
        ";mask:" +
        checkedIcon +
        ";background-color:var(--p-color-canvas)}";
      if (blocked) {
        out +=
          "@media(forced-colors:active){input{border-color:GrayText}input:checked::before{background:CanvasText}input:focus-visible{outline-color:Highlight}}";
      } else {
        out +=
          "@media(forced-colors:active){input:checked::before{background:CanvasText}input:focus-visible{outline-color:Highlight}}" +
          "@media(hover:hover){input:hover{border-color:" +
          palette.hover +
          "}}";
      }
      out +=
        ".root{display:grid;grid-template-columns:auto minmax(0, 1fr);row-gap:var(--p-spacing-static-xs)}" +
        ".wrapper{position:relative;display:flex;align-items:center;align-self:flex-start;min-height:var(--p-leading-normal);cursor:" +
        (blocked ? "not-allowed" : "pointer");
      if (disabled) out += ";opacity:0.4";
      out += "}";
      if (loading) {
        out +=
          ".spinner{--p-spinner-size:calc(" +
          dim +
          " - 2px);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}";
      }
      out +=
        ".label-wrapper{min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;padding-top:max(0px, calc((" +
        dim +
        " - var(--p-leading-normal)) / 2));padding-inline-start:calc(11.2px * (var(--_p-radio-group-option-a) - 0.64285714) + 4px)}" +
        ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
        (blocked ? "not-allowed" : "pointer") +
        ";color:var(--p-color-primary)";
      if (blocked) out += ";pointer-events:none";
      if (disabled) out += ";opacity:0.4";
      out +=
        ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
        ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
      if (disabled) {
        out +=
          "@media(forced-colors:active){.wrapper{opacity:1;color:GrayText}.label{opacity:1;color:GrayText}}";
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
        this.disabled === "" ||
        this.disabledParent === true ||
        this.disabledParent === "true" ||
        this.disabledParent === ""
      );
    },
    isSelected() {
      return (
        this.selected === true ||
        this.selected === "true" ||
        this.selected === ""
      );
    },
    isLoadingParent() {
      return (
        this.loadingParent === true ||
        this.loadingParent === "true" ||
        this.loadingParent === ""
      );
    },
    isOptionLoading() {
      const selected =
        this.selected === true ||
        this.selected === "true" ||
        this.selected === "";
      const loading =
        this.loading === true || this.loading === "true" || this.loading === "";
      return loading && !selected;
    },
    isLoading() {
      const selected =
        this.selected === true ||
        this.selected === "true" ||
        this.selected === "";
      const loading =
        this.loading === true || this.loading === "true" || this.loading === "";
      const loadingParent =
        this.loadingParent === true ||
        this.loadingParent === "true" ||
        this.loadingParent === "";
      return (loading && !selected) || loadingParent;
    },
    loadingText() {
      const selected =
        this.selected === true ||
        this.selected === "true" ||
        this.selected === "";
      const loading =
        this.loading === true || this.loading === "true" || this.loading === "";
      const loadingParent =
        this.loadingParent === true ||
        this.loadingParent === "true" ||
        this.loadingParent === "";
      if (loadingParent) return "";
      if (loading && !selected) return "Loading";
      return "";
    },
    ariaInvalid() {
      return this.state === "error" ? "true" : "";
    },
    inputName() {
      return this.name || "";
    },
    inputValue() {
      return this.value == null ? "" : String(this.value);
    },
  },
});
</script>

<style scoped>
:host {
  display: block;
}
:host([hidden]) {
  display: none !important;
}
</style>