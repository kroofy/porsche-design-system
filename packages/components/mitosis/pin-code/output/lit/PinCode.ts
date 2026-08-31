import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

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

@customElement("p-pin-code")
export default class LitPinCode extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property({ attribute: "loading" }) loading: any;
  @property() compact: any;
  @property() state: any;
  @property() message: any;
  @property({ attribute: "hide-label" }) hideLabel: any;
  @property({ attribute: "length" }) length: any;
  @property() label: any;
  @property() description: any;
  @property() required: any;
  @property() type: any;
  @property() value: any;

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
    const disabled = isTrue(this.getAttribute("disabled") ?? this.disabled);
    const loading = isTrue(this.getAttribute("loading") ?? this.loading);
    const compact = isTrue(this.getAttribute("compact") ?? this.compact);
    const formState =
      (this.getAttribute("state") ?? this.state) === "success" || (this.getAttribute("state") ?? this.state) === "error" ? this.state : "none";
    const message = (this.getAttribute("message") ?? this.message) || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    let length = Number(this.getAttribute("length") ?? this.length);
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
  }
  get labelText() {
    return (this.getAttribute("label") ?? this.label) || "";
  }
  get descriptionText() {
    return (this.getAttribute("description") ?? this.description) || "";
  }
  get messageText() {
    const formState = (this.getAttribute("state") ?? this.state) || "none";
    const message = (this.getAttribute("message") ?? this.message) || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  }
  get iconName() {
    const formState = (this.getAttribute("state") ?? this.state) || "none";
    const message = (this.getAttribute("message") ?? this.message) || "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  }
  get iconColor() {
    const formState = (this.getAttribute("state") ?? this.state) || "none";
    if (formState === "error") return "error";
    if (formState === "success") return "success";
    return "";
  }
  get isDisabled() {
    return (
      this.disabled === true || this.disabled === "true" || this.disabled === ""
    );
  }
  get isLoading() {
    return (
      this.loading === true || this.loading === "true" || this.loading === ""
    );
  }
  get isRequired() {
    return (
      this.required === true || this.required === "true" || this.required === ""
    );
  }
  get ariaInvalid() {
    return (this.getAttribute("state") ?? this.state) === "error" ? "true" : "";
  }
  get messageRole() {
    return (this.getAttribute("state") ?? this.state) === "success" ? "status" : "alert";
  }
  get loadingText() {
    if (this.loading === true || this.loading === "true" || this.loading === "")
      return "Loading";
    return "";
  }
  get inputType() {
    return (this.getAttribute("type") ?? this.type) === "password" ? "password" : "text";
  }
  get pinLength() {
    let length = Number(this.getAttribute("length") ?? this.length);
    if (!Number.isFinite(length) || length < 1) length = 4;
    if (length > 6) length = 6;
    return length;
  }
  get parsedValue() {
    return (this.getAttribute("value") ?? this.value) == null ? "" : String(this.getAttribute("value") ?? this.value);
  }

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  get labelNode() {
    if (!this.labelText) return nothing;
    return html`<div class="label-wrapper"><label class="label" id="label" for="current-input" aria-disabled=${this.isDisabled || this.isLoading ? "true" : nothing}>${this.labelText}</label><slot name="label-after"></slot></div>`;
  }
  get inputNodes() {
    const n = Number(this.pinLength) || 4;
    const value = this.parsedValue;
    const type = this.inputType;
    const nodes = [];
    for (let i = 0; i < n; i++) {
      const isCurrent = !value ? i === 0 : value.indexOf(" ") === -1 ? i === n - 1 : i === value.indexOf(" ");
      const ch = value[i] && value[i] !== " " ? value[i] : "";
      nodes.push(html`<input id=${isCurrent ? "current-input" : nothing} type=${type} aria-label=${i + 1 + "-" + n} aria-invalid=${this.ariaInvalid || nothing} aria-disabled=${this.isLoading ? "true" : nothing} autocomplete="one-time-code" pattern="\\d*" inputmode="numeric" .value=${ch} ?disabled=${!!this.isDisabled}>`);
    }
    return nodes;
  }
  get spinnerNode() {
    if (!this.isLoading) return nothing;
    return html`<p-spinner class="spinner" size="inherit" aria-hidden="true"></p-spinner>`;
  }
  get messageNode() {
    const text = this.messageText;
    const icon = this.iconName;
    if (!text) return html`<span id="message" class="message" role="alert"></span>`;
    const src =
      icon === "exclamation"
        ? "http://localhost:3001/icons/exclamation.46cd17b.svg"
        : "http://localhost:3001/icons/check.8ba06be.svg";
    return html`<span id="message" class="message" role=${this.messageRole}><p-icon name=${icon} source=${src} color=${this.iconColor} aria-hidden="true"></p-icon>${text}</span>`;
  }

  render() {
    return html`<fieldset class="root" ?disabled=${!!this.isDisabled} aria-invalid=${this.ariaInvalid || nothing} aria-labelledby=${this.labelText ? "label" : nothing}><style .innerHTML="${this.cssText}"></style>${this.labelNode}<div class="wrapper" dir="ltr">${this.inputNodes}${this.spinnerNode}</div>${this.messageNode}<span class="loading" id="loading" role="status">${this.loadingText}</span></fieldset>`;
  }
}
