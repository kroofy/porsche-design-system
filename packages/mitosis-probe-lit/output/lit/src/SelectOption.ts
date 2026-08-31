import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitSelectOptionProps {
  value?: any;
  disabled?: any;
  selected?: any;
  highlighted?: any;
  disabledParent?: any;
  hidden?: any;
}

@customElement("lit-select-option")
export default class LitSelectOption extends LitElement {
  @property() hidden: any;
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
  @property() disabledParent: any;
  @property() selected: any;
  @property() highlighted: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));
    let out =
      ":host{display:block;scroll-margin-block-start:calc(max(2px, var(--_p-select-option-a,1) * 6px) + 36px) !important;scroll-margin-block-end:max(2px, var(--_p-select-option-a,1) * 6px) !important}";
    if (disabled)
      out =
        ":host{display:block;opacity:0.4 !important;scroll-margin-block-start:calc(max(2px, var(--_p-select-option-a,1) * 6px) + 36px) !important;scroll-margin-block-end:max(2px, var(--_p-select-option-a,1) * 6px) !important}";
    out +=
      ":host([hidden]){display:none !important}" +
      "::slotted(img){font:var(--p-typescale-sm) var(--p-font-porsche-next) !important;width:auto !important;height:var(--p-leading-normal) !important;border-radius:var(--p-radius-sm) !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    if (disabled) {
      out +=
        "@media(forced-colors:active){:host{opacity:1 !important;color:GrayText !important}}";
    }
    out +=
      ".option{display:flex;gap:calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);padding-block:calc(11.2px * (var(--_p-select-option-a) - 0.64285714) + 4px);padding-inline:var(--_p-select-option-b,calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px)) calc(16.8px * (var(--_p-select-option-a) - 0.64285714) + 6px);min-height:var(--p-leading-normal);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-contrast-high);cursor:" +
      (disabled ? "not-allowed" : "pointer") +
      ";text-align:start;word-break:break-word;box-sizing:content-box;border-radius:var(--p-radius-sm);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      ".option--highlighted{background:var(--p-color-frosted)}" +
      ".option--highlighted,.option--selected{color:var(--p-color-primary)}" +
      ".option--disabled{cursor:not-allowed}" +
      ".option--hidden{display:none}" +
      ".icon{margin-inline-start:auto}" +
      "@media(forced-colors:active){.option--disabled{color:GrayText}.option--highlighted{forced-color-adjust:none;outline:2px solid Highlight;outline-offset:-2px}}";
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
      (this.highlighted ?? this.getAttribute("highlighted")) === true ||
      (this.highlighted ?? this.getAttribute("highlighted")) === "true" ||
      (this.highlighted ?? this.getAttribute("highlighted")) === ""
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
    const hasValue = this.value !== undefined && this.value !== null && this.getAttribute("value") !== null;
    this.setAttribute("aria-selected", selected ? "true" : "false");
    if (disabled) this.setAttribute("aria-disabled", "true");
    else this.removeAttribute("aria-disabled");
    if (hasValue) this.removeAttribute("aria-label");
    else this.setAttribute("aria-label", "Empty value");
  }

  firstUpdated() {
    this.syncHostAria();
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
    const icon = selected
      ? html`<p-icon class="icon" name="check" color="primary" aria-hidden="true"></p-icon>`
      : nothing;
    return html`<div class="${cls.join(" ")}"><style .innerHTML="${this.cssText}"></style><slot></slot>${icon}</div>`;
  }
}
