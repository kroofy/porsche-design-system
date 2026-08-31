import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

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

@customElement("lit-segmented-control")
export default class LitSegmentedControl extends LitElement {
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
  @property() noWrap: any;
  @property() state: any;
  @property() message: any;
  @property() hideLabel: any;
  @property() columns: any;
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
    const compact = isTrue(this.compact ?? this.getAttribute("compact"));
    const noWrap = isTrue(this.noWrap ?? this.getAttribute("no-wrap") ?? this.getAttribute("nowrap"));
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
    const columns = parse(this.getAttribute("columns") ?? this.columns, "auto");
    const columnsBase =
      typeof columns === "object" && columns !== null
        ? pick(columns, "base", "auto")
        : columns;
    const minItem = 46;
    const maxCap = 220;
    const measured = this.measureItemWidths(compact);
    const measuredMin: any = measured.minWidth;
    const measuredMax: any = measured.maxWidth;
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


  itemChildren() {
    return [...this.children].filter(
      (el) => el.slot !== "label" && el.slot !== "label-after" && el.slot !== "message" && el.slot !== "description",
    );
  }

  measureItemWidths(compact) {
    const scaling = compact ? 0.5 : 1;
    const verticalPadding = "max(2px, var(--p-spacing-static-sm) * " + scaling + ")";
    const horizontalPadding = "calc(" + verticalPadding + " + 4px)";
    const padding = verticalPadding + " " + horizontalPadding;
    const dimension =
      "calc(max(var(--p-leading-normal), " +
      scaling +
      " * (var(--p-leading-normal) + 10px)) + (" +
      verticalPadding +
      " + 1px) * 2)";
    if (typeof document === "undefined") return { minWidth: dimension, maxWidth: 46 };
    const items = this.itemChildren();
    if (!items.length) return { minWidth: dimension, maxWidth: 46 };
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.border = "1px solid";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.font = "normal normal 400 1rem/calc(6px + 2.125ex) Porsche Next, sans-serif";
    const root = this.shadowRoot || this;
    root.append(tempDiv);
    const widths = items.map((item) => {
      tempDiv.innerHTML = item.innerHTML;
      tempDiv.style.minWidth = dimension;
      tempDiv.style.padding = padding;
      if (item.icon || item.iconSource || item.getAttribute("icon") || item.getAttribute("icon-source")) {
        const tempIcon = document.createElement("div");
        tempIcon.style.display = "inline-block";
        tempIcon.style.width = "1.5rem";
        tempIcon.style.marginRight = ".25rem";
        tempDiv.prepend(tempIcon);
      }
      const label = item.label ?? item.getAttribute("label");
      if (label) {
        const tempLabel = document.createElement("div");
        tempLabel.style.font = "normal normal 400 .875rem/calc(6px + 2.125ex) Porsche Next, sans-serif";
        tempLabel.innerHTML = label;
        tempDiv.prepend(tempLabel);
      }
      return Number.parseFloat(getComputedStyle(tempDiv).width);
    });
    tempDiv.remove();
    return { minWidth: dimension, maxWidth: Math.max(...widths) };
  }

  syncItems() {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const compact = this.compact === true || this.compact === "true" || this.compact === "" || this.getAttribute("compact") === "" || this.getAttribute("compact") === "true";
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const message = this.message ?? this.getAttribute("message") ?? "";
    for (const item of this.itemChildren()) {
      item.selected = String(item.value ?? item.getAttribute("value")) === String(value) && value !== null && value !== undefined;
      item.state = state;
      item.message = message;
      item.compact = compact;
      item.disabledParent = disabled;
    }
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.syncItems();
  }

  render() {
    const disabled = !!this.isDisabled;
    const required = !!this.isRequired;
    const hasLabel = !!this.labelText || !!this.querySelector('[slot="label"]');
    const hasDescription = !!this.descriptionText || !!this.querySelector('[slot="description"]');
    const labelBlock = hasLabel
      ? html`<div class="label-wrapper"><div class="label" id="label" aria-disabled=${disabled ? "true" : nothing}>${this.labelText}<slot name="label"></slot></div><slot name="label-after"></slot></div>`
      : nothing;
    const descBlock = hasDescription
      ? html`<span class="label" id="description" aria-disabled=${disabled ? "true" : nothing}>${this.descriptionText}<slot name="description"></slot></span>`
      : nothing;
    const icon = this.iconName
      ? html`<p-icon name=${this.iconName} color=${this.iconColor || nothing} aria-hidden="true"></p-icon>`
      : nothing;
    return html`<fieldset class="root" ?disabled=${disabled} aria-invalid=${this.ariaInvalid || nothing} aria-labelledby=${hasLabel ? "label" : nothing} aria-describedby=${hasDescription ? "description" : nothing}><style .innerHTML="${this.cssText}"></style>${labelBlock}${descBlock}<slot></slot><span class="message" id="message" role=${this.messageRole}>${icon}${this.messageText}</span></fieldset>`;
  }
}
