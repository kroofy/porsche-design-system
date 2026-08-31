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

@customElement("lit-pin-code")
export default class LitPinCode extends LitElement {
  @property() form: any;
  @property() name: any;
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property() loading: any;
  @property() compact: any;
  @property() state: any;
  @property() message: any;
  @property() hideLabel: any;
  @property() length: any;
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
    const disabled = isTrue(this.disabled);
    const loading = isTrue(this.loading ?? this.getAttribute("loading"));
    const compact = isTrue(this.compact);
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
    let length = Number(this.length ?? this.getAttribute("length"));
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
    return this.state === "error" ? "true" : "";
  }
  get messageRole() {
    return this.state === "success" ? "status" : "alert";
  }
  get loadingText() {
    if (this.loading === true || this.loading === "true" || this.loading === "")
      return "Loading";
    return "";
  }
  get inputType() {
    return this.type === "password" ? "password" : "text";
  }
  get pinLength() {
    let length = Number(this.length ?? this.getAttribute("length"));
    if (!Number.isFinite(length) || length < 1) length = 4;
    if (length > 6) length = 6;
    return length;
  }
  get parsedValue() {
    const rawValue = this.value ?? this.getAttribute("value");
    return rawValue == null ? "" : String(rawValue);
  }


  isCurrentInput(index, value, length) {
    if (!value) return index === 0;
    const firstWhitespaceIndex = value.indexOf(" ");
    if (firstWhitespaceIndex === -1) return index === length - 1;
    return index === firstWhitespaceIndex;
  }

  fieldsetDescribedBy() {
    const parts = [];
    if (this.isLoading) parts.push("loading");
    if (this.messageText) parts.push("message");
    if (this.descriptionText) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  inputDescribedBy() {
    const parts = [];
    if (this.labelText) parts.push("label");
    if (this.messageText) parts.push("message");
    return parts.length ? parts.join(" ") : nothing;
  }

  render() {
    const length = Number(this.pinLength);
    const value = this.parsedValue;
    const loading = !!this.isLoading;
    const disabled = !!this.isDisabled;
    const required = !!this.isRequired;
    const type = this.inputType;
    const inputs = Array.from({ length }, (_, index) => {
      const ch = value[index];
      const val = !ch || ch === " " ? "" : ch;
      const isCurrent = this.isCurrentInput(index, value, length);
      return html`<input id=${isCurrent ? "current-input" : nothing} type=${type} aria-label=${index + 1 + "-" + length} aria-describedby=${this.inputDescribedBy()} aria-invalid=${this.ariaInvalid || nothing} aria-disabled=${loading ? "true" : nothing} autocomplete="one-time-code" pattern="\\d*" inputmode="numeric" .value=${val} ?disabled=${disabled} ?required=${required} name=${this.name || nothing} form=${this.form || nothing}>`;
    });
    const spinner = loading
      ? html`<p-spinner class="spinner" size="inherit" aria-hidden="true"></p-spinner>`
      : nothing;
    return html`<fieldset class="root" ?disabled=${disabled} aria-invalid=${this.ariaInvalid || nothing} aria-labelledby=${this.labelText ? "label" : nothing} aria-describedby=${this.fieldsetDescribedBy()}><style .innerHTML="${this.cssText}"></style><div class="label-wrapper"><label class="label" id="label" for="current-input" aria-disabled=${disabled || loading ? "true" : nothing}>${this.labelText}</label><slot name="label-after"></slot></div><span class="label" id="description">${this.descriptionText}</span><div class="wrapper" dir="ltr">${inputs}${spinner}</div><span class="message" id="message" role=${this.messageRole}><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></fieldset>`;
  }
}
