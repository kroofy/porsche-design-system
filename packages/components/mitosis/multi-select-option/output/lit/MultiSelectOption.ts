import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitMultiSelectOptionProps {
  value?: any;
  disabled?: any;
  selected?: any;
  highlighted?: any;
  disabledParent?: any;
  hidden?: any;
}

@customElement("p-multi-select-option")
export default class LitMultiSelectOption extends LitElement {
  @property() value: any;
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() disabled: any;
  @property({ attribute: "disabled-parent" }) disabledParent: any;
  @property() selected: any;
  @property() highlighted: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));
    const selected = isTrue(this.selected ?? this.getAttribute("selected"));
    const checkMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>\') center/contain no-repeat';
    let out = ":host{display:block;";
    if (disabled) out += "opacity:0.4 !important;";
    out +=
      "scroll-margin-block-start:calc(max(2px, var(--_p-multi-select-option-a,1) * 6px) + 36px) !important;scroll-margin-block-end:max(2px, var(--_p-multi-select-option-a,1) * 6px) !important;--_p-checkbox-scaling:var(--_p-multi-select-option-a) !important}" +
      ":host([hidden]){display:none !important}" +
      "slot{display:block;padding-top:max(0px, calc((calc(var(--_p-checkbox-scaling) * 1.75rem) - var(--p-leading-normal)) / 2))}";
    if (disabled) {
      out +=
        "@media(forced-colors:active){:host{opacity:1 !important;color:GrayText !important}}";
    }
    out +=
      ".option{display:flex;gap:calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);padding-block:calc(11.2px * (var(--_p-multi-select-option-a) - 0.64285714) + 4px);padding-inline:var(--_p-multi-select-option-b,calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px)) calc(16.8px * (var(--_p-multi-select-option-a) - 0.64285714) + 6px);min-height:var(--p-leading-normal);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high);cursor:pointer;text-align:start;word-break:break-word;box-sizing:content-box;border-radius:var(--p-radius-sm);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".option--highlighted{background:var(--p-color-frosted)}" +
      ".option--highlighted,.option--selected{color:var(--p-color-primary)}" +
      ".option--disabled{cursor:not-allowed}" +
      ".option--hidden{display:none}" +
      ".checkbox{all:unset;display:grid;width:calc(var(--_p-checkbox-scaling) * 1.75rem);height:calc(var(--_p-checkbox-scaling) * 1.75rem);margin-block:max(0px, calc((var(--p-leading-normal) - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));box-sizing:border-box;font:var(--p-typescale-sm) var(--p-font-porsche-next);background:var(--p-checkbox-background-color,var(--p-color-frosted));transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), border-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);border:1px solid var(--p-checkbox-border-color,var(--p-color-contrast-lower));border-radius:var(--p-radius-md);";
    if (disabled) out += "pointer-events:none;";
    out += "flex-shrink:0}";
    out += '.checkbox::before{content:"";grid-area:1/1';
    if (selected) {
      out +=
        ";-webkit-mask:" +
        checkMask +
        ";mask:" +
        checkMask +
        ";background-color:var(--p-checkbox-icon-color,var(--p-color-canvas))";
    }
    out +=
      '}.checkbox::after{content:"";margin:calc(-1px - max(0px, calc(24px - calc(var(--_p-checkbox-scaling) * 1.75rem)) / 2));grid-area:1/1}';
    if (selected) out += ".checkbox{background:var(--p-color-primary)}";
    out +=
      "@media(forced-colors:active){.option--disabled{color:GrayText}.option--highlighted{forced-color-adjust:none;outline:2px solid Highlight;outline-offset:-2px}";
    if (disabled) out += ".checkbox{border-color:GrayText}";
    if (selected) out += ".checkbox::before{background:CanvasText}";
    out += "}";
    if (selected) {
      out +=
        "@media(hover:hover){.checkbox:hover{border-color:transparent;background-color:var(--p-checkbox-border-color,var(--p-color-contrast-high))}}";
    } else {
      out +=
        "@media(hover:hover){.checkbox:hover{border-color:var(--p-checkbox-border-color,var(--p-color-primary))}}";
    }
    return out;
  }
  get isDisabled() {
    return (
      (this.disabled ?? this.getAttribute("disabled")) === true ||
      (this.disabled ?? this.getAttribute("disabled")) === "true" ||
      (this.disabled ?? this.getAttribute("disabled")) === "" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === true ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === "true" ||
      (this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent")) === ""
    );
  }
  get isSelected() {
    return (
      (this.selected ?? this.getAttribute("selected")) === true || (this.selected ?? this.getAttribute("selected")) === "true" || (this.selected ?? this.getAttribute("selected")) === ""
    );
  }
  get isHighlighted() {
    return (
      this.highlighted === true ||
      this.highlighted === "true" ||
      this.highlighted === ""
    );
  }
  get optionClass() {
    const disabled =
      this.disabled === true ||
      this.disabled === "true" ||
      this.disabled === "" ||
      this.disabledParent === true ||
      this.disabledParent === "true" ||
      this.disabledParent === "";
    const selected =
      this.selected === true ||
      this.selected === "true" ||
      this.selected === "";
    const highlighted =
      this.highlighted === true ||
      this.highlighted === "true" ||
      this.highlighted === "";
    let name = "option";
    if (selected) name += " option--selected";
    if (highlighted) name += " option--highlighted";
    if (disabled) name += " option--disabled";
    return name;
  }

  syncHostAria() {
    this.setAttribute("role", "option");
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const rawValue = this.value ?? this.getAttribute("value");
    const hasValue = rawValue !== undefined && rawValue !== null;
    this.setAttribute("aria-selected", selected ? "true" : "false");
    if (disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
    if (hasValue) this.removeAttribute("aria-label");
    else this.setAttribute("aria-label", "Empty value");
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, characterData: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
    this.addEventListener("click", () => {
      if (this.isDisabled) return;
      this.dispatchEvent(new CustomEvent("internalOptionUpdate", { bubbles: true }));
    });
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.syncHostAria();
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }
  updated() {
    this.syncHostAria();
  }

  render() {
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const highlighted = !!this.isHighlighted;
    const cls = ["option"];
    if (selected) cls.push("option--selected");
    if (highlighted) cls.push("option--highlighted");
    if (disabled) cls.push("option--disabled");
    return html`<div class="${cls.join(" ")}"><style .innerHTML="${this.cssText}"></style><span class="checkbox" aria-hidden="true"></span><slot></slot></div>`;
  }
}
