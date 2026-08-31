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

@customElement("p-radio-group")
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
  @property({ attribute: "hide-label" }) hideLabel: any;
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
    const disabled = isTrue(this.getAttribute("disabled") ?? this.disabled);
    const loading = isTrue(this.getAttribute("loading") ?? this.loading);
    const compact = isTrue(this.getAttribute("compact") ?? this.compact);
    const formState =
      (this.getAttribute("state") ?? this.state) === "success" || (this.getAttribute("state") ?? this.state) === "error" ? (this.getAttribute("state") ?? this.state) : "none";
    const message = this.getAttribute("message") ?? this.message ?? "";
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
    return this.getAttribute("label") ?? this.label ?? "";
  }
  get descriptionText() {
    return this.getAttribute("description") ?? this.description ?? "";
  }
  get messageText() {
    const formState = this.getAttribute("state") ?? this.state ?? "none";
    const message = this.getAttribute("message") ?? this.message ?? "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return message;
  }
  get iconName() {
    const formState = this.getAttribute("state") ?? this.state ?? "none";
    const message = this.getAttribute("message") ?? this.message ?? "";
    if (!message || (formState !== "success" && formState !== "error"))
      return "";
    return formState === "error" ? "exclamation" : "check";
  }
  get iconColor() {
    const formState = this.getAttribute("state") ?? this.state ?? "none";
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
    return (this.getAttribute("state") ?? this.state) === "error" ? "true" : "";
  }
  get messageRole() {
    return (this.getAttribute("state") ?? this.state) === "success" ? "status" : "alert";
  }
  get loadingText() {
    if ((this.loading ?? this.getAttribute("loading")) === true || (this.loading ?? this.getAttribute("loading")) === "true" || (this.loading ?? this.getAttribute("loading")) === "")
      return "Loading";
    return "";
  }

  get hasLabel() {
    return !!this.labelText || !!this.querySelector('[slot="label"]');
  }
  get hasDescription() {
    return !!this.descriptionText || !!this.querySelector('[slot="description"]');
  }
  get labelNode() {
    if (!this.hasLabel) return nothing;
    const required = this.isRequired
      ? html`<span class="required" aria-hidden="true"> *</span>`
      : nothing;
    const labelDisabled = this.isDisabled || this.isLoading;
    return html`<div class="label-wrapper"><div class="label" id="label" aria-disabled=${labelDisabled ? "true" : nothing}>${this.labelText}<slot name="label"></slot>${required}</div><slot name="label-after"></slot></div>`;
  }
  get descriptionNode() {
    if (!this.hasDescription) return nothing;
    const labelDisabled = this.isDisabled || this.isLoading;
    return html`<span class="label" id="description" aria-disabled=${labelDisabled ? "true" : nothing}>${this.descriptionText}<slot name="description"></slot></span>`;
  }
  get spinnerNode() {
    if (!this.isLoading) return nothing;
    return html`<p-spinner class="spinner" aria-hidden="true"></p-spinner>`;
  }
  get iconNode() {
    const icon = this.iconName;
    if (!icon) return nothing;
    const src =
      icon === "exclamation"
        ? "http://localhost:3001/icons/exclamation.46cd17b.svg"
        : "http://localhost:3001/icons/check.8ba06be.svg";
    return html`<p-icon name=${icon} source=${src} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>`;
  }

  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  stampOption(option) {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const loading = !!this.isLoading;
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const name = this.name ?? this.getAttribute("name") ?? "";
    const optionValue = option.value ?? option.getAttribute("value");
    option.selected = optionValue === value && value !== null && value !== undefined;
    option.disabledParent = disabled;
    option.loadingParent = loading;
    option.state = state;
    option.name = name;
  }

  syncOptions() {
    for (const option of this.itemChildren()) this.stampOption(option);
  }

  fieldsetDescribedBy() {
    const parts = [];
    if (this.isLoading) parts.push("loading");
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  connectedCallback() {
    super.connectedCallback();
    const stampArg = (node) => {
      if (node && node.localName === "p-radio-group-option") this.stampOption(node);
      if (node && node.nodeType === 11) {
        for (const child of node.childNodes) stampArg(child);
      }
    };
    for (const name of ["appendChild", "insertBefore", "append", "prepend"]) {
      const orig = this[name];
      if (typeof orig !== "function") continue;
      this[name] = (...args) => {
        for (const arg of args) stampArg(arg);
        return orig.apply(this, args);
      };
    }
    this._childObserver = new MutationObserver(() => {
      this.syncOptions();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => {
      this.syncOptions();
      this.requestUpdate();
    });
    customElements.whenDefined("p-radio-group-option").then(() => {
      this.syncOptions();
      this.requestUpdate();
    });
    this.addEventListener("internalRadioGroupOptionChange", (e) => {
      e.stopPropagation();
      if (this.isDisabled || this.isLoading) return;
      const option = e.target;
      this.value = option.value ?? option.getAttribute("value");
      this.syncOptions();
      this.requestUpdate();
    });
    this.addEventListener("internalRadioGroupOptionBlur", (e) => {
      e.stopPropagation();
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncOptions();
        this.requestUpdate();
      });
    });
    this.syncOptions();
  }
  updated() {
    this.syncOptions();
  }

  render() {
    return html`<fieldset class="root" ?disabled=${!!this.isDisabled} role="radiogroup" aria-required=${this.isRequired ? "true" : nothing} aria-invalid=${this.ariaInvalid || nothing} aria-labelledby=${this.hasLabel ? "label" : nothing} aria-describedby=${this.fieldsetDescribedBy()}><style .innerHTML="${this.cssText}"></style>${this.labelNode}${this.descriptionNode}<div class="wrapper"><slot></slot>${this.spinnerNode}</div><span class="message" id="message" role=${this.messageRole}>${this.iconNode}${this.messageText}</span><span class="loading" id="loading" role="status">${this.loadingText}</span></fieldset>`;
  }
}
