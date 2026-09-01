<!-- mitosis-native-host: native svelte from PinCode.lite.tsx -->
<script context="module" lang="ts">
  export interface LitPinCodeProps {
    label?: string;
    description?: string;
    message?: string;
    state?: string;
    hideLabel?: any;
    compact?: any;
    disabled?: any;
    loading?: any;
    required?: any;
    name?: string;
    value?: any;
    length?: any;
    type?: string;
    form?: string;
    theme?: string;
  }
</script>

<script lang="ts">
  import PIcon from "../../../../icon/output/frameworks/svelte/Icon.svelte";
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let disabled: LitPinCodeProps["disabled"];
  export let loading: LitPinCodeProps["loading"];
  export let compact: LitPinCodeProps["compact"];
  export let state: LitPinCodeProps["state"];
  export let message: LitPinCodeProps["message"];
  export let hideLabel: LitPinCodeProps["hideLabel"];
  export let length: LitPinCodeProps["length"];
  export let label: LitPinCodeProps["label"];
  export let description: LitPinCodeProps["description"];
  export let required: LitPinCodeProps["required"];
  export let type: LitPinCodeProps["type"];
  export let value: LitPinCodeProps["value"];
  function __cmpProps() { return { disabled, loading, compact, state, message, hideLabel, length, label, description, required, type, value }; }

  $: cssText = () => {
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
    const disabled = isTrue(__cmpProps().disabled);
    const loading = isTrue(__cmpProps().loading);
    const compact = isTrue(__cmpProps().compact);
    const formState = state === "success" || state === "error" ? state : "none";
    const message = __cmpProps().message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(__cmpProps().hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    let length = Number(__cmpProps().length);
    if (!Number.isFinite(length) || length < 1) length = 4;
    if (length > 6) length = 6;
    const palettes: any = {
      none: {
        bg: "var(--p-color-frosted)",
        border: "var(--p-color-contrast-lower)",
        hover: "var(--p-color-primary)",
        message: "",
      },
      success: {
        bg: "var(--p-color-success-frosted-soft)",
        border: "var(--p-color-success)",
        hover: "var(--p-color-success)",
        message: "var(--p-color-success)",
      },
      error: {
        bg: "var(--p-color-error-frosted-soft)",
        border: "var(--p-color-error)",
        hover: "var(--p-color-error)",
        message: "var(--p-color-error)",
      },
    };
    const palette = palettes[formState] || palettes.none;
    const labelVisFor = (h: any) =>
      isTrue(h)
        ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"
        : "min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal";
    const descVisFor = (h: any) =>
      isTrue(h)
        ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;margin-top:calc(-1 * var(--p-spacing-static-xs))"
        : "position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;margin-top:calc(-1 * var(--p-spacing-static-xs))";
    const pad = "calc(11.2px * (var(--_p-pin-code-a) - 0.64285714) + 4px)";
    let out =
      ":host{display:block;--_p-pin-code-a:" +
      (compact ? "0.64285714" : "1") +
      "}" +
      ":host([hidden]){display:none !important}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "input{all:unset;display:block;width:auto;min-width:calc(1ch + " +
      pad +
      " * 2 + 1px * 2);max-width:calc(var(--_p-pin-code-a) * 3.5rem);height:calc(var(--_p-pin-code-a) * 3.5rem);padding:" +
      pad +
      ";box-sizing:border-box;border:1px solid " +
      palette.border +
      ";border-radius:" +
      (compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)") +
      ";background:" +
      palette.bg +
      ";font:var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next);color:var(--p-color-primary);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);text-overflow:ellipsis;cursor:" +
      (disabled || loading ? "not-allowed" : "text") +
      ";text-align:center";
    if (disabled || loading) out += ";opacity:0.4";
    out += "}input:focus-visible{border-color:" + palette.hover + "}";
    if (!disabled && !loading) {
      out +=
        "@media(hover:hover){input:hover{border-color:" + palette.hover + "}}";
    }
    if (disabled || loading) {
      out += "@media(forced-colors:active){input{opacity:1;color:GrayText}}";
    }
    out +=
      ".root{all:unset;display:grid;gap:var(--p-spacing-static-xs)}" +
      ".wrapper{position:relative;display:grid;grid-template-columns:repeat(" +
      length +
      ", 1fr);justify-self:flex-start;gap:" +
      pad +
      "}";
    if (loading) {
      out +=
        ".spinner{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);pointer-events:none}";
    }
    out += ".label-wrapper{" + labelVisFor(hideBase) + "}";
    out +=
      ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
      (disabled || loading ? "not-allowed" : "pointer") +
      ";color:var(--p-color-primary)";
    if (disabled || loading) out += ";pointer-events:none";
    if (disabled) out += ";opacity:0.4";
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);" +
      descVisFor(hideBase) +
      '}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
      ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
    if (palette.message) out += ";color:" + palette.message;
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}";
    if (!hasMsg)
      out +=
        ".message{opacity:0;position:absolute}.message p-icon{display:none}";
    out +=
      ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    if (disabled) {
      out += "@media(forced-colors:active){.label{opacity:1;color:GrayText}}";
    }
    const keys: any = {};
    if (typeof hideLabel === "object" && hideLabel !== null)
      for (const k of Object.keys(hideLabel)) keys[k] = 1;
    for (const bp of Object.keys(keys)) {
      if (bp === "base") continue;
      if (!minWidth[bp]) continue;
      const h = pick(hideLabel, bp, hideBase);
      out +=
        "@media(min-width:" +
        minWidth[bp] +
        "px){.label-wrapper{" +
        labelVisFor(h) +
        "}.label:is(span){" +
        descVisFor(h) +
        "}}";
    }
    return out;
  };
  $: labelText = () => {
    return label || "";
  };
  $: descriptionText = () => {
    return description || "";
  };
  $: messageText = () => {
    const formState = state || "none";
    const message = __cmpProps().message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  };
  $: iconName = () => {
    const formState = state || "none";
    const message = __cmpProps().message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  };
  $: iconColor = () => {
    const formState = state || "none";
    if (formState === "error") return "error";
    if (formState === "success") return "success";
    return "";
  };
  $: isDisabled = () => {
    return disabled === true || disabled === "true" || disabled === "";
  };
  $: isLoading = () => {
    return loading === true || loading === "true" || loading === "";
  };
  $: isRequired = () => {
    return required === true || required === "true" || required === "";
  };
  $: ariaInvalid = () => {
    return state === "error" ? "true" : "";
  };
  $: messageRole = () => {
    return state === "success" ? "status" : "alert";
  };
  $: loadingText = () => {
    if (loading === true || loading === "true" || loading === "")
      return "Loading";
    return "";
  };
  $: inputType = () => {
    return type === "password" ? "password" : "text";
  };
  $: pinLength = () => {
    let length = Number(__cmpProps().length);
    if (!Number.isFinite(length) || length < 1) length = 4;
    if (length > 6) length = 6;
    return length;
  };
  $: parsedValue = () => {
    return value == null ? "" : String(value);
  };
  $: __pdsComponents = { PIcon };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-pin-code");
</script>

<div class="p-pin-code" data-pds="pin-code">
<fieldset class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}
  <div class="label-wrapper">
    <label class="label" id="label" for="current-input">{labelText()}</label
    ><slot name="label-after" />
  </div>
  <span class="label" id="description">{descriptionText()}</span>
  <div class="wrapper"><input  disabled={!!isDisabled()} /><input  disabled={!!isDisabled()} /><input  disabled={!!isDisabled()} /><input  disabled={!!isDisabled()} /></div>
  <span class="message" id="message"
    ><PIcon
      aria-hidden="true"
    />{messageText()}</span
  ><span class="loading" id="loading">{loadingText()}</span>
</fieldset>


</div>
