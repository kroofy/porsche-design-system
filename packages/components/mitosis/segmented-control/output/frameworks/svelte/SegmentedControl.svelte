<!-- mitosis-native-host: native svelte from SegmentedControl.lite.tsx -->
<script context="module" lang="ts">
  export interface LitSegmentedControlProps {
    label?: string;
    description?: string;
    message?: string;
    state?: string;
    hideLabel?: any;
    compact?: any;
    disabled?: any;
    required?: any;
    columns?: any;
    noWrap?: any;
    value?: any;
    name?: string;
    form?: string;
  }
</script>

<script lang="ts">
  import PIcon from "../../../../icon/output/frameworks/svelte/Icon.svelte";
  import { scopeCss } from "../../../../_runtime/scope-css.js";
  export let disabled: LitSegmentedControlProps["disabled"];
  export let compact: LitSegmentedControlProps["compact"];
  export let noWrap: LitSegmentedControlProps["noWrap"];
  export let state: LitSegmentedControlProps["state"];
  export let message: LitSegmentedControlProps["message"];
  export let hideLabel: LitSegmentedControlProps["hideLabel"];
  export let columns: LitSegmentedControlProps["columns"];
  export let label: LitSegmentedControlProps["label"];
  export let description: LitSegmentedControlProps["description"];
  export let required: LitSegmentedControlProps["required"];
  function __cmpProps() { return { disabled, compact, noWrap, state, message, hideLabel, columns, label, description, required }; }

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
    const compact = isTrue(__cmpProps().compact);
    const noWrap = isTrue(__cmpProps().noWrap);
    const formState = state === "success" || state === "error" ? state : "none";
    const message = __cmpProps().message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(__cmpProps().hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    const columns = parse(__cmpProps().columns, "auto");
    const columnsBase =
      typeof columns === "object" && columns !== null
        ? pick(columns, "base", "auto")
        : columns;
    const minItem = 46;
    const maxCap = 220;
    const measuredMin: any = 46;
    const measuredMax: any = 80;
    const colWidthFor = (col: any) => {
      if (col === "auto" || col === undefined || col === null || col === "") {
        const w =
          (measuredMax > maxCap && maxCap) ||
          (measuredMax < minItem && measuredMin) ||
          measuredMax;
        return "repeat(auto-fit, " + w + "px)";
      }
      return "repeat(" + col + ", minmax(0, 1fr))";
    };
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
    let out =
      ":host([hidden]){display:none !important}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "slot:not([name]){display:grid;grid-auto-rows:1fr";
    if (noWrap) {
      out += ";grid-auto-flow:column;grid-auto-columns:max-content";
    } else {
      out += ";grid-template-columns:" + colWidthFor(columnsBase);
    }
    out +=
      ";gap:6px}.root{all:unset;display:grid;gap:var(--p-spacing-static-xs)}";
    if (noWrap)
      out += ".scroller{margin:calc(-1 * var(--p-spacing-static-xs)) 0}";
    out += ".label-wrapper{" + labelVisFor(hideBase) + "}";
    out +=
      ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
      (disabled ? "not-allowed" : "inherit") +
      ";color:var(--p-color-primary)";
    if (disabled) out += ";pointer-events:none;opacity:0.4";
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
    if (disabled) {
      out += "@media(forced-colors:active){.label{opacity:1;color:GrayText}}";
    }
    const keys: any = {};
    if (typeof hideLabel === "object" && hideLabel !== null)
      for (const k of Object.keys(hideLabel)) keys[k] = 1;
    if (typeof columns === "object" && columns !== null)
      for (const k of Object.keys(columns)) keys[k] = 1;
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
        !noWrap &&
        typeof columns === "object" &&
        columns !== null &&
        columns[bp] !== undefined
      ) {
        media +=
          "slot:not([name]){grid-template-columns:" +
          colWidthFor(pick(columns, bp, columnsBase)) +
          "}";
      }
      media += "}";
      out += media;
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
  $: isRequired = () => {
    return required === true || required === "true" || required === "";
  };
  $: ariaInvalid = () => {
    return state === "error" ? "true" : "";
  };
  $: messageRole = () => {
    return state === "success" ? "status" : "alert";
  };
  $: __pdsComponents = { PIcon };
  $: scopedCssText = scopeCss("\n  :host([hidden]) {\n    display: none !important;\n  }\n" + (typeof cssText === "function" ? cssText() : (cssText || "")), ".p-segmented-control");
</script>

<div class="p-segmented-control" data-pds="segmented-control">
<fieldset class="root">
  {@html `<${"style"}>${scopedCssText}<${"/style"}>`}
  <div class="label-wrapper">
    <div class="label" id="label">{labelText()}<slot name="label" /></div>
    <slot name="label-after" />
  </div>
  <span class="label" id="description"
    >{descriptionText()}<slot name="description" /></span
  ><slot /><span class="message" id="message"
    ><PIcon
      aria-hidden="true"
    />{messageText()}</span
  >
</fieldset>


</div>
