import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitInputUrlProps {
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
  indicator?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  form?: string;
  maxLength?: any;
  minLength?: any;
  theme?: string;
}

@customElement("lit-input-url")
export default class LitInputUrl extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property() loading: any;
  @property() compact: any;
  @property() readOnly: any;
  @property() indicator: any;
  @property() state: any;
  @property() message: any;
  @property() hideLabel: any;
  @property() label: any;
  @property() description: any;
  @property() value: any;
  @property() maxLength: any;
  @property() placeholder: any;

  get cssText() {
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
    const readOnly = isTrue(this.getAttribute("read-only") ?? this.readOnly);
    const hasIndicator = isTrue(this.getAttribute("indicator") ?? this.indicator);
    const formState =
      this.state === "success" || this.state === "error" ? this.state : "none";
    const message = this.message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);
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
      ":host(:dir(rtl)) .wrapper,:host(:dir(rtl)) input:placeholder-shown{direction:ltr}" +
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
    if (!loading) out += "p-spinner{display:none}";
    if (!hasIndicator) out += ".wrapper > p-icon{display:none}";
    out +=
      ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
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
  }
  get labelText() {
    return this.label || "";
  }
  get descriptionText() {
    return this.description || "";
  }
  get messageText() {
    const formState = this.state || "none";
    const message = this.message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  }
  get iconName() {
    const formState = this.state || "none";
    const message = this.message || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  }
  get iconColor() {
    const formState = this.state || "none";
    if (formState === "error") return "error";
    if (formState === "success") return "success";
    return "";
  }
  get inputValue() {
    const rawValue = this.value ?? this.getAttribute("value");
    return rawValue == null ? "" : String(rawValue);
  }
  get maxLengthValue() {
    const raw = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");
    return raw == null || raw === "" ? "" : String(raw);
  }
  get isDisabled() {
    return (
      this.disabled === true || this.disabled === "true" || this.disabled === ""
    );
  }
  get isReadOnly() {
    return (
      (this.readOnly ?? this.getAttribute("read-only")) === true || (this.readOnly ?? this.getAttribute("read-only")) === "true" || (this.readOnly ?? this.getAttribute("read-only")) === ""
    );
  }
  get ariaDisabled() {
    const disabled =
      this.disabled === true ||
      this.disabled === "true" ||
      this.disabled === "";
    const loading =
      this.loading === true || this.loading === "true" || this.loading === "";
    return disabled || loading ? "true" : "";
  }
  get ariaInvalid() {
    return this.state === "error" ? "true" : "";
  }
  get ariaReadonly() {
    return this.readOnly === true ||
      this.readOnly === "true" ||
      this.readOnly === ""
      ? "true"
      : "";
  }
  get loadingText() {
    const loading =
      this.loading === true || this.loading === "true" || this.loading === "";
    return loading ? "Loading" : "";
  }
  get placeholderText() {
    return this.placeholder || "";
  }

  updated() {
    const input = this.renderRoot?.querySelector("input");
    if (input) {
      const value = this.value ?? this.getAttribute("value") ?? "";
      if (input.value !== String(value)) input.value = String(value);
      const maxLength = this.maxLength ?? this.getAttribute("max-length") ?? this.getAttribute("maxlength");
      if (maxLength != null && maxLength !== "") input.maxLength = Number(maxLength);
      const readOnly = this.readOnly ?? this.getAttribute("read-only");
      input.readOnly = readOnly === true || readOnly === "true" || readOnly === "";
      const placeholder = this.placeholder ?? this.getAttribute("placeholder") ?? "";
      input.placeholder = placeholder;
      const name = this.name ?? this.getAttribute("name") ?? "";
      input.name = name;
      const disabled = this.disabled ?? this.getAttribute("disabled");
      input.disabled = disabled === true || disabled === "true" || disabled === "";
    }
  }

  render() {
    return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="label-wrapper"><label class="label" id="label" for="input-url">${this.labelText}</label><slot name="label-after"></slot></div><span class="label" id="description">${this.descriptionText}</span><div class="wrapper"><slot name="start"></slot><p-icon name="linked" color="contrast-low" aria-hidden="true"></p-icon><input type="url" id="input-url" dir="auto" .value=${this.inputValue} placeholder=${this.placeholderText || nothing} name=${this.name || nothing} ?disabled=${!!this.isDisabled} ?readonly=${!!this.isReadOnly} maxlength=${this.maxLengthValue || nothing} aria-disabled=${this.ariaDisabled || nothing} aria-invalid=${this.ariaInvalid || nothing} aria-readonly=${this.ariaReadonly || nothing}><slot name="end"></slot><p-spinner aria-hidden="true"></p-spinner></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;
  }
}
