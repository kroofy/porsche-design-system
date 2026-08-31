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

@customElement("p-segmented-control")
export default class LitSegmentedControl extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property() compact: any;
  @property({ attribute: "no-wrap" }) noWrap: any;
  @property() state: any;
  @property() message: any;
  @property({ attribute: "hide-label" }) hideLabel: any;
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
    const disabled = isTrue(this.getAttribute("disabled") ?? this.disabled);
    const compact = isTrue(this.getAttribute("compact") ?? this.compact);
    const noWrap = isTrue(this.getAttribute("no-wrap") ?? this.getAttribute("nowrap") ?? this.noWrap);
    const formState =
      (this.getAttribute("state") ?? this.state) === "success" || (this.getAttribute("state") ?? this.state) === "error" ? this.state : "none";
    const message = this.getAttribute("message") ?? this.message ?? "";
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
      this.disabled === true || this.disabled === "true" || this.disabled === ""
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

  get hasLabel() {
    return !!this.labelText || !!this.querySelector('[slot="label"]');
  }
  get hasDescription() {
    return !!this.descriptionText || !!this.querySelector('[slot="description"]');
  }
  get hasLabelAfter() {
    return !!this.querySelector('[slot="label-after"]');
  }
  get isNoWrap() {
    const raw = this.getAttribute("no-wrap") ?? this.getAttribute("nowrap") ?? this.noWrap;
    return raw === true || raw === "true" || raw === "";
  }
  get labelNode() {
    if (!this.hasLabel) return nothing;
    const required = this.isRequired
      ? html`<span class="required" aria-hidden="true"> *</span>`
      : nothing;
    const after = this.hasLabelAfter ? html`<slot name="label-after"></slot>` : nothing;
    return html`<div class="label-wrapper"><div class="label" id="label" aria-disabled=${this.isDisabled ? "true" : nothing}>${this.labelText}<slot name="label"></slot>${required}</div>${after}</div>`;
  }
  get descriptionNode() {
    if (!this.hasDescription) return nothing;
    return html`<span class="label" id="description" aria-disabled=${this.isDisabled ? "true" : nothing}>${this.descriptionText}<slot name="description"></slot></span>`;
  }
  get slotNode() {
    if (this.isNoWrap) return html`<p-scroller class="scroller"><slot></slot></p-scroller>`;
    return html`<slot></slot>`;
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
    const root = document.body || this.shadowRoot || this;
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
    const finite = widths.filter((w) => Number.isFinite(w));
    if (!finite.length) return this._measured || { minWidth: dimension, maxWidth: 80 };
    const next = { minWidth: dimension, maxWidth: Math.max(...finite) };
    this._measured = next;
    return next;
  }

  stampItem(item) {
    const value = this.value ?? this.getAttribute("value");
    const disabled = !!this.isDisabled;
    const compact =
      this.compact === true ||
      this.compact === "true" ||
      this.compact === "" ||
      this.getAttribute("compact") === "" ||
      this.getAttribute("compact") === "true";
    const state = this.state ?? this.getAttribute("state") ?? "none";
    const message = this.message ?? this.getAttribute("message") ?? "";
    const itemValue = item.value ?? item.getAttribute("value");
    item.selected = value !== null && value !== undefined && String(itemValue) === String(value);
    item.state = state;
    item.message = message;
    item.compact = compact;
    item.disabledParent = disabled;
    const icon = item.icon ?? item.getAttribute("icon");
    if (icon === "like" && !(item.iconSource || item.getAttribute("icon-source"))) {
      item.iconSource = "http://localhost:3001/icons/like.a7468cd.svg";
    }
  }

  syncItems() {
    for (const item of this.itemChildren()) this.stampItem(item);
  }

  connectedCallback() {
    super.connectedCallback();
    const stampArg = (node) => {
      if (node && node.localName === "p-segmented-control-item") this.stampItem(node);
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
      this.syncItems();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true });
    queueMicrotask(() => {
      this.syncItems();
      this.requestUpdate();
    });
    this.addEventListener("internalSegmentedControlItemUpdate", (e) => {
      e.stopPropagation();
      if (this.isDisabled) return;
      const item = e.target;
      this.value = item.value ?? item.getAttribute("value");
      this.syncItems();
      this.requestUpdate();
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        this.syncItems();
        this.requestUpdate();
      });
    });
    this.syncItems();
  }
  updated() {
    this.syncItems();
  }

  render() {
    return html`<fieldset class="root" ?disabled=${!!this.isDisabled} aria-invalid=${this.ariaInvalid || nothing} aria-labelledby=${this.hasLabel ? "label" : nothing} aria-describedby=${this.hasDescription ? "description" : nothing}><style .innerHTML="${this.cssText}"></style>${this.labelNode}${this.descriptionNode}${this.slotNode}<span class="message" id="message" role=${this.messageRole}>${this.iconNode}${this.messageText}</span></fieldset>`;
  }
}
