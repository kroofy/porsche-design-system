import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitCheckboxProps {
  label?: string;
  name?: string;
  value?: string;
  checked?: any;
  indeterminate?: any;
  disabled?: any;
  loading?: any;
  compact?: any;
  required?: any;
  state?: string;
  message?: string;
  hideLabel?: any;
}

@customElement("lit-checkbox")
export default class LitCheckbox extends LitElement {
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
  @property() label: any;
  @property() hideLabel: any;
  @property() checked: any;
  @property() indeterminate: any;

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
    const blocked = disabled || loading;
    const formState = this.state || "none";
    const message = this.message || "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hasLbl = !!(this.label || "");
    const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    const palettes: any = {
      none: {
        bg: "var(--p-checkbox-background-color,var(--p-color-frosted))",
        border: "var(--p-checkbox-border-color,var(--p-color-contrast-lower))",
        hover: "var(--p-checkbox-border-color,var(--p-color-primary))",
        checked: "var(--p-color-primary)",
        checkedHover:
          "var(--p-checkbox-border-color,var(--p-color-contrast-high))",
        indeterminate: "var(--p-color-primary)",
        message: "",
      },
      success: {
        bg: "var(--p-checkbox-background-color,var(--p-color-success-frosted-soft))",
        border: "var(--p-checkbox-border-color,var(--p-color-success))",
        hover: "var(--p-checkbox-border-color,var(--p-color-success))",
        checked: "var(--p-color-success)",
        checkedHover: "",
        indeterminate: "var(--p-color-success)",
        message: "var(--p-color-success)",
      },
      error: {
        bg: "var(--p-checkbox-background-color,var(--p-color-error-frosted-soft))",
        border: "var(--p-checkbox-border-color,var(--p-color-error))",
        hover: "var(--p-checkbox-border-color,var(--p-color-error))",
        checked: "var(--p-color-error)",
        checkedHover: "",
        indeterminate: "var(--p-color-error)",
        message: "var(--p-color-error)",
      },
    };
    const palette = palettes[formState] || palettes.none;
    const checkMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>\') center/contain no-repeat';
    const dashMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>\') center/contain no-repeat';
    const labelVisFor = (h: any) =>
      isTrue(h)
        ? "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"
        : "min-width:fit-content;position:static;width:auto;height:auto;padding:0;margin:0;overflow:visible;clip:auto;white-space:normal;padding-top:max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2));padding-inline-start:calc(11.2px * (var(--_p-checkbox-scaling) - 0.64285714) + 4px)";
    let out =
      ":host{display:block;--_p-checkbox-scaling:" +
      (compact ? "0.64285714" : "1") +
      "}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      "input{all:unset;display:grid;width:calc(var(--_p-checkbox-scaling) * 1.75rem);height:calc(var(--_p-checkbox-scaling) * 1.75rem);margin-block:max(0px, calc((var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));box-sizing:border-box;font:var(--p-typescale-sm) var(--p-font-porsche-next);background:" +
      palette.bg +
      ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);border:1px solid " +
      palette.border +
      ";border-radius:" +
      (compact ? "var(--p-radius-md)" : "var(--p-radius-lg)");
    if (blocked) out += ";pointer-events:none";
    out +=
      '}input::before{content:"";grid-area:1/1}input::after{content:"";margin:calc(-1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));grid-area:1/1}' +
      "input:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}";
    if (!loading) {
      out +=
        "input:indeterminate::before{-webkit-mask:" +
        dashMask +
        ";mask:" +
        dashMask +
        ";background-color:" +
        palette.indeterminate +
        "}input:checked{background:" +
        palette.checked +
        "}input:checked::before{-webkit-mask:" +
        checkMask +
        ";mask:" +
        checkMask +
        ";background-color:var(--p-checkbox-icon-color,var(--p-color-canvas))}";
    }
    if (blocked) {
      out +=
        "@media(forced-colors:active){input{border-color:GrayText}input:focus-visible{outline-color:Highlight}";
      if (!loading) {
        out +=
          "input:indeterminate::before{background:CanvasText}input:checked::before{background:CanvasText}";
      }
      out += "}";
    } else {
      out +=
        "@media(forced-colors:active){input:focus-visible{outline-color:Highlight}input:indeterminate::before{background:CanvasText}input:checked::before{background:CanvasText}}";
    }
    out +=
      "@media(hover:hover){input:hover{border-color:" + palette.hover + "}";
    if (!loading && formState === "none") {
      out +=
        "input:checked:hover{background-color:" +
        palette.checkedHover +
        ";border-color:transparent}";
    }
    out +=
      "}.root{display:grid;row-gap:var(--p-spacing-static-xs)}.wrapper{position:relative;display:grid;grid-template-columns:auto minmax(0, 1fr)}.input-wrapper{position:relative;align-items:center;display:grid;align-self:flex-start;min-height:var(--p-leading-normal);cursor:" +
      (blocked ? "not-allowed" : "pointer");
    if (disabled) out += ";opacity:0.4";
    out += "}";
    if (loading) {
      out +=
        ".spinner{--p-spinner-size:calc(calc(var(--_p-checkbox-scaling) * 1.75rem) - 2px);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}";
    } else {
      out += "p-spinner{display:none}";
    }
    out += ".label-wrapper{" + labelVisFor(hideBase) + "}";
    if (!hasLbl) out += ".label-wrapper{display:none}";
    out +=
      ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
      (blocked ? "not-allowed" : "pointer") +
      ";color:var(--p-color-primary)";
    if (blocked) out += ";pointer-events:none";
    if (disabled) out += ";opacity:0.4";
    out +=
      ';transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);display:inline}.label:empty{display:none}.label:is(span){cursor:unset;font-size:var(--p-typescale-xs);color:var(--p-color-contrast-high);margin-top:calc(-1 * var(--p-spacing-static-xs))}.label > slot[name="label"]::slotted(*){display:inline !important}.required{user-select:none}' +
      ".message{display:flex;gap:var(--p-spacing-static-xs);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next)";
    if (palette.message) out += ";color:" + palette.message;
    out +=
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}.message:empty{opacity:0;position:absolute}";
    if (!hasMsg)
      out +=
        ".message{opacity:0;position:absolute}.message p-icon{display:none}";
    out +=
      ".loading{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
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
        "}}";
    }
    return out;
  }
  get labelText() {
    return this.label || "";
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
  get isChecked() {
    return (
      this.checked === true || this.checked === "true" || this.checked === ""
    );
  }
  get isDisabled() {
    return (
      this.disabled === true || this.disabled === "true" || this.disabled === ""
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
  get loadingText() {
    const loading =
      this.loading === true || this.loading === "true" || this.loading === "";
    return loading ? "Loading" : "";
  }

  updated() {
    const input = this.renderRoot?.querySelector("input");
    if (input) {
      input.indeterminate =
        this.indeterminate === true ||
        this.indeterminate === "true" ||
        this.indeterminate === "";
    }
  }

  render() {
    return html`<div class="root"><style .innerHTML="${this.cssText}"></style><div class="wrapper"><div class="input-wrapper"><input type="checkbox" id="x" .checked=${!!this.isChecked} ?disabled=${!!this.isDisabled} aria-disabled=${this.ariaDisabled || nothing} aria-invalid=${this.ariaInvalid || nothing}><p-spinner class="spinner" aria-hidden="true"></p-spinner></div><div class="label-wrapper"><label class="label" id="label" for="x">${this.labelText}</label></div></div><span class="message" id="message"><p-icon name=${this.iconName || nothing} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></div>`;
  }
}
