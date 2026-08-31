import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitMultiSelectProps {
  label?: string;
  description?: string;
  message?: string;
  state?: string;
  hideLabel?: any;
  compact?: any;
  disabled?: any;
  required?: any;
  name?: string;
  value?: any;
  form?: string;
  dropdownDirection?: string;
}

@customElement("p-multi-select")
export default class LitMultiSelect extends LitElement {
  @property({ attribute: "dropdown-direction" }) dropdownDirection: any;
  @property() form: any;
  @property() name: any;
  @property() value: any;
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property() compact: any;
  @property() state: any;
  @property() message: any;
  @property({ attribute: "hide-label" }) hideLabel: any;
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
    const scale = compact ? "0.64285714" : "1";
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
      "@keyframes fade-in{from{opacity:0}to{opacity:1}}" +
      ":host{display:block;--_p-multi-select-a:" +
      scale +
      " !important;--_p-multi-select-option-a:" +
      scale +
      " !important;--_p-optgroup-a:" +
      scale +
      " !important}" +
      ":host([hidden]){display:none !important}" +
      'slot[name="label-after"]{display:inline-block;vertical-align:top}' +
      'slot[name="label-after"]::slotted(*){margin-inline-start:var(--p-spacing-static-xs) !important}' +
      ".label-after{display:inline-block;vertical-align:top}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "button{all:unset;display:flex;align-items:center;gap:calc(22.4px * (var(--_p-multi-select-a) - 0.64285714) + 4px);height:calc(var(--_p-multi-select-a) * 3.5rem);box-sizing:border-box;min-width:0;padding-inline:calc(22.4px * (var(--_p-multi-select-a) - 0.64285714) + 8px);border:1px solid var(--p-multi-select-border-color," +
      palette.border +
      ");border-radius:" +
      (compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)") +
      ";background:var(--p-multi-select-background-color," +
      palette.bg +
      ");font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-multi-select-text-color,var(--p-color-primary));cursor:" +
      (disabled ? "not-allowed" : "pointer");
    if (disabled) out += ";opacity:0.4";
    out +=
      ";transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}";
    if (!disabled) {
      out +=
        "button:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        "@media(forced-colors:active){button:focus-visible{outline-color:Highlight}}" +
        "@media(hover:hover){button:hover,label:hover~button{border-color:var(--p-multi-select-border-color," +
        palette.hover +
        ")}}";
    }
    if (disabled) {
      out += "@media(forced-colors:active){button{opacity:1;color:GrayText}}";
    }
    out +=
      "button span{flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      "[popover]{all:unset;position:absolute;z-index:99;padding:calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);display:none;flex-direction:column;gap:calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px);max-height:max(calc(242px), calc(50vh - 54px / 2 - 6px * 2));box-sizing:border-box;overflow:hidden auto;scrollbar-width:thin;scrollbar-color:auto;animation:var(--p-animation-duration,var(--p-duration-sm)) fade-in var(--p-ease-in-out) forwards;filter:drop-shadow(0 0 8px rgba(0,0,0,0.15));background:var(--p-color-canvas);border:1px solid var(--p-color-contrast-low);border-radius:var(--p-radius-xl)}" +
      "[popover]:not(:popover-open){display:none}" +
      'slot[name="selected"]{display:block;height:100%;flex-grow:1;overflow:hidden}' +
      ".root{display:grid;gap:var(--p-spacing-static-xs);min-width:calc(1rem + var(--p-spacing-static-md) + 1px * 2 + calc(9px + var(--p-spacing-static-md) / 2 + (var(--p-leading-normal) + var(--p-spacing-static-xs) * 2) * 2))}" +
      ".options{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-multi-select-a) - 0.64285714) + 4px)}" +
      ".icon{margin-inline-end:-3px;pointer-events:none;transform:rotate3d(0,0,1,0.0001deg);transition:transform var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    out += ".label-wrapper{" + labelVisFor(hideBase) + "}";
    out +=
      ".label{font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);cursor:" +
      (disabled ? "not-allowed" : "pointer") +
      ";color:var(--p-color-primary)";
    if (disabled) out += ";pointer-events:none;opacity:0.4";
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
  get selectedText() {
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
    return html`<div class="label-wrapper"><label class="label" id="label" for="button" aria-disabled=${this.isDisabled ? "true" : nothing}>${this.labelText}<slot name="label"></slot></label><slot name="label-after"></slot></div>`;
  }
  get descriptionNode() {
    if (!this.hasDescription) return nothing;
    return html`<span class="label" id="description" aria-disabled=${this.isDisabled ? "true" : nothing}>${this.descriptionText}<slot name="description"></slot></span>`;
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
      (el) =>
        el.slot !== "label" &&
        el.slot !== "label-after" &&
        el.slot !== "description" &&
        el.slot !== "message" &&
        el.slot !== "filter" &&
        el.slot !== "selected",
    );
  }

  selectedLabel() {
    const raw = this.value ?? this.getAttribute("value");
    if (raw === null || raw === undefined || raw === "") return "";
    const values = Array.isArray(raw) ? raw : String(raw).split(",");
    const options = [...this.querySelectorAll("p-multi-select-option")];
    return values
      .map((value) => {
        const match = options.find((option) => String(option.value ?? option.getAttribute("value")) === String(value).trim());
        return (match?.textContent ?? "").toString().trim();
      })
      .filter(Boolean)
      .join(", ");
  }

  comboDescribedBy() {
    const parts = [];
    if (this.messageText) parts.push("message");
    if (this.descriptionText || this.querySelector('[slot="description"]')) parts.push("description");
    return parts.length ? parts.join(" ") : nothing;
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  render() {
    return html`<div class="root"><style .innerHTML="${this.cssText}"></style>${this.labelNode}${this.descriptionNode}<button type="button" role="combobox" id="button" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-required=${this.isRequired ? "true" : "false"} aria-controls="listbox" aria-autocomplete="none" aria-labelledby=${this.hasLabel ? "label" : nothing} aria-describedby=${this.comboDescribedBy()} aria-invalid=${this.ariaInvalid || nothing} ?disabled=${!!this.isDisabled}><span>${this.selectedLabel()}</span><p-icon class="icon" name="arrow-head-down" source="http://localhost:3001/icons/arrow-head-down.1e3cbb8.svg" color="primary" aria-hidden="true"></p-icon></button><div popover="manual" tabindex="0"><div id="listbox" class="options" role="listbox" aria-labelledby=${this.hasLabel ? "label" : nothing} aria-required=${this.isRequired ? "true" : "false"} aria-multiselectable="true" tabindex="-1"><slot></slot></div></div><span class="message" id="message" role=${this.messageRole}>${this.iconNode}${this.messageText}</span></div>`;
  }
}
