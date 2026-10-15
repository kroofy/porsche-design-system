import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

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

@customElement("lit-radio-group")
export default class LitRadioGroup extends LitElement {
  @property() form: any;
  @property() name: any;
  @property() value: any;
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
  @property() direction: any;
  @property() label: any;
  @property() description: any;
  @property() required: any;

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
    const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));
    const loading = isTrue(this.loading ?? this.getAttribute("loading"));
    const compact = isTrue(this.compact ?? this.getAttribute("compact"));
    const formState =
      (this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none";
    const message = this.message ?? this.getAttribute("message") ?? "";
    const hasMsg =
      !!message && (formState === "success" || formState === "error");
    const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);
    const hideBase =
      typeof hideLabel === "object" && hideLabel !== null
        ? pick(hideLabel, "base", false)
        : hideLabel;
    const direction = parse(this.getAttribute("direction") ?? this.direction, "column");
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
        media += ".wrapper{" + dirFor(pick(direction, bp, directionBase)) + "}";
      }
      media += "}";
      out += media;
    }
    return out;
  }
  get labelText() {
    return this.label ?? this.getAttribute("label") ?? "";
  }
  get descriptionText() {
    return this.description ?? this.getAttribute("description") ?? "";
  }
  get messageText() {
    const formState = this.state ?? this.getAttribute("state") ?? "none";
    const message = this.message ?? this.getAttribute("message") ?? "";
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
      (this.disabled ?? this.getAttribute("disabled")) === true || (this.disabled ?? this.getAttribute("disabled")) === "true" || (this.disabled ?? this.getAttribute("disabled")) === ""
    );
  }
  get isLoading() {
    return (
      (this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === ""
    );
  }
  get isRequired() {
    return (
      (this.required ?? this.getAttribute("required")) === true || (this.required ?? this.getAttribute("required")) === "true" || (this.required ?? this.getAttribute("required")) === ""
    );
  }
  get ariaInvalid() {
    return this.state === "error" ? "true" : "";
  }
  get messageRole() {
    return this.state === "success" ? "status" : "alert";
  }
  get loadingText() {
    if ((this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === "")
      return "Loading";
    return "";
  }


  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  syncOptions() {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const loading = !!this.isLoading;
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const name = this.name ?? this.getAttribute("name") ?? "";
    for (const option of this.itemChildren()) {
      const optionValue = option.value ?? option.getAttribute("value");
      option.selected = optionValue === value && value !== null && value !== undefined;
      option.disabledParent = disabled;
      option.loadingParent = loading;
      option.state = state;
      option.name = name;
    }
  }

  fieldsetDescribedBy() {
    const parts = [];
    if (this.isLoading) parts.push("loading");
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.syncOptions();
  }

  updated() {
    this.syncOptions();
  }

  render() {
    const disabled = !!this.isDisabled;
    const loading = !!this.isLoading;
    const required = !!this.isRequired;
    const hasLabel = !!this.labelText || !!this.querySelector('[slot="label"]');
    const hasDescription = !!this.descriptionText || !!this.querySelector('[slot="description"]');
    const labelDisabled = disabled || loading;
    const labelBlock = hasLabel
      ? html`<div class="label-wrapper"><div class="label" id="label" aria-disabled=${labelDisabled ? "true" : nothing}>${this.labelText}<slot name="label"></slot></div><slot name="label-after"></slot></div>`
      : nothing;
    const descBlock = hasDescription
      ? html`<span class="label" id="description" aria-disabled=${labelDisabled ? "true" : nothing}>${this.descriptionText}<slot name="description"></slot></span>`
      : nothing;
    const spinner = loading
      ? html`<p-spinner class="spinner" aria-hidden="true"></p-spinner>`
      : nothing;
    const icon = this.iconName
      ? html`<p-icon name=${this.iconName} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>`
      : nothing;
    return html`<fieldset class="root" ?disabled=${disabled} role="radiogroup" aria-required=${required ? "true" : nothing} aria-invalid=${this.ariaInvalid || nothing} aria-labelledby=${hasLabel ? "label" : nothing} aria-describedby=${this.fieldsetDescribedBy()}><style .innerHTML="${this.cssText}"></style>${labelBlock}${descBlock}<div class="wrapper"><slot></slot>${spinner}</div><span class="message" id="message" role=${this.messageRole}>${icon}${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></fieldset>`;
  }
}
