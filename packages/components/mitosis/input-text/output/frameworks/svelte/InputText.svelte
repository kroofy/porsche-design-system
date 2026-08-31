<script context="module" lang="ts">
  export interface LitInputTextProps {
    label?: string;
    description?: string;
    message?: string;
    state?: string;
    hideLabel?: any;
    compact?: any;
    disabled?: any;
    loading?: any;
    readOnly?: any;
    required?: any;
    counter?: any;
    name?: string;
    value?: string;
    placeholder?: string;
    form?: string;
    maxLength?: any;
    minLength?: any;
    theme?: string;
  }
</script>

<script lang="ts">
  export let disabled: LitInputTextProps["disabled"];
  export let loading: LitInputTextProps["loading"];
  export let compact: LitInputTextProps["compact"];
  export let readOnly: LitInputTextProps["readOnly"];
  export let counter: LitInputTextProps["counter"];
  export let state: LitInputTextProps["state"];
  export let message: LitInputTextProps["message"];
  export let hideLabel: LitInputTextProps["hideLabel"];
  export let label: LitInputTextProps["label"];
  export let description: LitInputTextProps["description"];
  export let value: LitInputTextProps["value"];
  export let maxLength: LitInputTextProps["maxLength"];
  export let placeholder: LitInputTextProps["placeholder"];

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
    const disabled = isTrue(disabled);
    const loading = isTrue(loading);
    const compact = isTrue(compact);
    const readOnly = isTrue(readOnly);
    const hasCounter = isTrue(counter);
    const formState = state === "success" || state === "error" ? state : "none";
    const message = message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
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
    let out =
      ":host{display:block;--_p-input-base-a:" +
      (compact ? "0.64285714" : "1") +
      ";--ref-p-input-slotted-padding:calc(11.2px * (var(--_p-input-base-a) - 0.64285714)) !important;--ref-p-input-slotted-margin:calc(-1 * calc(11.2px * (var(--_p-input-base-a) - 0.64285714))) !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:dir(rtl)) input::placeholder{direction:rtl;text-align:end}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "input{all:unset;display:flex;flex:1;align-items:center;width:max(100%, 2ch);height:100%;font:var(--p-font-weight-normal) var(--p-typescale-sm) / calc(var(--p-leading-normal) + 6px) var(--p-font-porsche-next);text-overflow:ellipsis}" +
      ".root{display:grid;gap:var(--p-spacing-static-xs)}" +
      ".wrapper{display:flex;align-items:center;gap:calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 4px);height:calc(var(--_p-input-base-a) * 3.5rem);box-sizing:border-box;padding-inline:calc(22.4px * (var(--_p-input-base-a) - 0.64285714) + 8px);border:1px solid " +
      palette.border +
      ";border-radius:" +
      (compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)") +
      ";background:" +
      (readOnly ? "var(--p-color-frosted)" : palette.bg) +
      ";color:" +
      (readOnly ? "var(--p-color-contrast-medium)" : "var(--p-color-primary)") +
      ";cursor:" +
      (disabled ? "not-allowed" : "text") +
      ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)";
    if (readOnly) out += ";border-color:transparent";
    if (disabled) out += ";opacity:0.4";
    out +=
      "}.wrapper:not(:has(input:disabled)):focus-within{border-color:" +
      palette.hover +
      "}";
    if (disabled) out += ".wrapper>*{opacity:0.4}";
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
    if (loading) {
      out += "";
    } else {
      out += "p-spinner{display:none}";
    }
    if (!hasCounter) out += ".counter{display:none}";
    out +=
      ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    if (hasCounter) {
      out +=
        ".counter{pointer-events:none;max-width:100%;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high)}" +
        ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    }
    if (disabled) {
      out +=
        "@media(forced-colors:active){.wrapper{opacity:1;color:GrayText;border-color:GrayText}.wrapper>*{opacity:1;color:GrayText}.wrapper:not(:has(input:disabled)):focus-within{outline:2px solid Highlight;outline-offset:2px}.label{opacity:1;color:GrayText}}";
    } else {
      out +=
        "@media(forced-colors:active){.wrapper:not(:has(input:disabled)):focus-within{outline:2px solid Highlight;outline-offset:2px}}";
    }
    if (!disabled && !readOnly && !loading) {
      out +=
        "@media(hover:hover){.wrapper:hover:not(.button:hover), .label-wrapper:hover~.wrapper{border-color:" +
        palette.hover +
        "}}";
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
    const message = message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  };
  $: iconName = () => {
    const formState = state || "none";
    const message = message || "";
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
  $: inputValue = () => {
    return value == null ? "" : String(value);
  };
  $: maxLengthValue = () => {
    return maxLength == null || maxLength === "" ? "" : String(maxLength);
  };
  $: maxLengthNumber = () => {
    const parsed = Number.parseInt(maxLengthValue(), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  $: hasCounter = () => {
    return counter === true || counter === "true" || counter === "";
  };
  $: counterText = () => {
    if (!hasCounter()) return "";
    if (maxLengthNumber()) return `${inputValue().length}/${maxLengthNumber()}`;
    return `${inputValue().length}`;
  };
  $: remainingText = () => {
    if (!hasCounter()) return "";
    if (maxLengthNumber()) {
      return `You have ${
        maxLengthNumber() - inputValue().length
      } out of ${maxLengthNumber()} characters left`;
    }
    return `${inputValue().length} characters entered`;
  };
  $: isDisabled = () => {
    return disabled === true || disabled === "true" || disabled === "";
  };
  $: isReadOnly = () => {
    return readOnly === true || readOnly === "true" || readOnly === "";
  };
  $: ariaDisabled = () => {
    const disabled =
      disabled === true || disabled === "true" || disabled === "";
    const loading = loading === true || loading === "true" || loading === "";
    return disabled || loading ? "true" : "";
  };
  $: ariaInvalid = () => {
    return state === "error" ? "true" : "";
  };
  $: ariaReadonly = () => {
    return readOnly === true || readOnly === "true" || readOnly === ""
      ? "true"
      : "";
  };
  $: loadingText = () => {
    const loading = loading === true || loading === "true" || loading === "";
    return loading ? "Loading" : "";
  };
  $: placeholderText = () => {
    return placeholder || "";
  };
</script>

<div class="root">
  {@html `<${"style"}  >${cssText()}<${"/style"}>`}
  <div class="label-wrapper">
    <label class="label" id="label" for="input-text">{labelText()}</label><slot
      name="label-after"
    />
  </div>
  <span class="label" id="description">{descriptionText()}</span>
  <div class="wrapper">
    <slot name="start" /><input type="text" id="input-text" dir="auto" /><span
      class="sr-only"
      aria-live="polite">{remainingText()}</span
    ><span class="counter" aria-hidden="true">{counterText()}</span><slot
      name="end"
    /><svelte:component this={p - spinner} aria-hidden="true" />
  </div>
  <span class="message" id="message"
    ><svelte:component
      this={p - icon}
      aria-hidden="true"
    />{messageText()}</span
  ><span class="loading" id="loading" role="status">{loadingText()}</span>
</div>

<style>
  :host([hidden]) {
    display: none !important;
  }
</style>