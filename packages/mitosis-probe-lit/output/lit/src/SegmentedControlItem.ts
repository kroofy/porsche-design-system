import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitSegmentedControlItemProps {
  value?: any;
  disabled?: any;
  label?: string;
  icon?: string;
  iconSource?: string;
  selected?: any;
  compact?: any;
  disabledParent?: any;
  state?: string;
  message?: string;
}

@customElement("lit-segmented-control-item")
export default class LitSegmentedControlItem extends LitElement {
  @property() message: any;
  @property() value: any;
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() compact: any;
  @property() disabled: any;
  @property() disabledParent: any;
  @property() selected: any;
  @property() state: any;
  @property() icon: any;
  @property() iconSource: any;
  @property() label: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const compact = isTrue(this.compact ?? this.getAttribute("compact"));
    const disabled = isTrue(this.disabled ?? this.getAttribute("disabled")) || isTrue(this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent"));
    const selected = isTrue(this.selected ?? this.getAttribute("selected"));
    const formState =
      (this.state ?? this.getAttribute("state")) === "success" || (this.state ?? this.getAttribute("state")) === "error" ? (this.state ?? this.getAttribute("state")) : "none";
    const icon = this.icon ?? this.getAttribute("icon") ?? "";
    const source = this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";
    const hasIcon = icon !== "" || source !== "";
    const hasSlotted = !!this.textContent?.trim() || [...this.childNodes].some((n) => n.nodeType === 1);
    const scaling = compact ? "0.5" : "1";
    const vp =
      "max(2px, var(--p-spacing-static-sm) * var(--_p-segmented-control-a," +
      scaling +
      "))";
    const hp = "calc(" + vp + " + 4px)";
    const padding =
      hasIcon && hasSlotted
        ? vp + " " + hp + " " + vp + " " + vp
        : vp + " " + hp;
    const dimension =
      "calc(max(var(--p-leading-normal), var(--_p-segmented-control-a," +
      scaling +
      ") * (var(--p-leading-normal) + 10px)) + (" +
      vp +
      " + 1px) * 2)";
    const borders: any = {
      none: "var(--p-color-contrast-lower)",
      success: "var(--p-color-success)",
      error: "var(--p-color-error)",
    };
    const borderHovers: any = {
      none: "var(--p-color-primary)",
      success: "var(--p-color-success)",
      error: "var(--p-color-error)",
    };
    const backgrounds: any = {
      none: "var(--p-color-frosted)",
      success: "var(--p-color-success-frosted-soft)",
      error: "var(--p-color-error-frosted-soft)",
    };
    const border = selected
      ? borderHovers[formState] || borderHovers.none
      : borders[formState] || borders.none;
    const background = selected
      ? "var(--p-color-frosted-strong)"
      : backgrounds[formState] || backgrounds.none;
    const radius = compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)";
    const spanColor = selected
      ? "var(--p-color-contrast-high)"
      : "var(--p-color-contrast-medium)";
    const buttonFont =
      "normal normal 400 1rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif";
    const labelFont =
      "normal normal 400 .875rem/calc(6px + 2.125ex) 'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif";
    let out = ":host{display:block";
    if (disabled) out += ";opacity:0.4 !important";
    out +=
      "}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "button{position:relative;display:block;height:100%;width:100%;min-height:" +
      dimension +
      ";min-width:" +
      dimension +
      ";padding:" +
      padding +
      ";border:1px solid " +
      border +
      ";border-radius:" +
      radius +
      ";background:" +
      background +
      ";color:var(--p-color-primary);font:" +
      buttonFont;
    if (disabled) {
      out += ";cursor:not-allowed";
    } else {
      out += ";cursor:pointer";
    }
    out +=
      "}button:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      "span{display:block;font:" +
      labelFont +
      ";overflow-wrap:normal;color:" +
      spanColor +
      "}";
    if (disabled) {
      out +=
        "@media(forced-colors:active){:host{opacity:1 !important;color:GrayText !important}button{color:GrayText;border-color:GrayText}button:focus-visible{outline-color:Highlight}span{color:GrayText}}";
    } else {
      out +=
        "@media(forced-colors:active){button:focus-visible{outline-color:Highlight}}";
      if (!selected) {
        out +=
          "@media(hover:hover){button{transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}button:hover{background-color:var(--p-color-frosted-strong)}}";
      }
    }
    if (hasIcon) {
      out += ".icon{height:1.5rem;width:1.5rem";
      if (hasSlotted) out += ";margin-inline-end:.25rem";
      out += "}";
    }
    return out;
  }
  get labelText() {
    return this.label ?? this.getAttribute("label") ?? "";
  }
  get iconName() {
    return this.icon ?? this.getAttribute("icon") ?? "";
  }
  get iconSrc() {
    return this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";
  }
  get isDisabled() {
    const disabled = this.disabled ?? this.getAttribute("disabled");
    const parent = this.disabledParent ?? this.getAttribute("disabled-parent") ?? this.getAttribute("disabledparent");
    return (
      disabled === true ||
      disabled === "true" ||
      disabled === "" ||
      parent === true ||
      parent === "true" ||
      parent === ""
    );
  }
  get isSelected() {
    const selected = this.selected ?? this.getAttribute("selected");
    return selected === true || selected === "true" || selected === "";
  }

  render() {
    const label = this.labelText;
    const icon = this.iconName;
    const source = this.iconSrc;
    const hasIcon = !!icon || !!source;
    const selected = !!this.isSelected;
    const disabled = !!this.isDisabled;
    const labelNode = label ? html`<span>${label}</span>` : nothing;
    const iconNode = hasIcon
      ? html`<p-icon class="icon" name=${icon || nothing} source=${source || nothing} color="inherit" size="inherit" aria-hidden="true"></p-icon>`
      : nothing;
    return html`<button type="button" aria-pressed=${selected ? "true" : "false"} aria-disabled=${disabled ? "true" : nothing}><style .innerHTML="${this.cssText}"></style>${labelNode}${iconNode}<slot></slot></button>`;
  }
}
