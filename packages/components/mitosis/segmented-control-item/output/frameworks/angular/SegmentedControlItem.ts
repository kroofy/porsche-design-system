import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

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

@Component({
  selector: "lit-segmented-control-item",
  template: `
    <button type="button">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <span>{{labelText}}</span>
      <p-icon
        class="icon"
        color="inherit"
        size="inherit"
        aria-hidden="true"
        [name]="iconName"
        [source]="iconSrc"
      ></p-icon>
      <slot></slot>
    </button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitSegmentedControlItem {
  @Input() compact!: LitSegmentedControlItemProps["compact"];
  @Input() disabled!: LitSegmentedControlItemProps["disabled"];
  @Input() disabledParent!: LitSegmentedControlItemProps["disabledParent"];
  @Input() selected!: LitSegmentedControlItemProps["selected"];
  @Input() state!: LitSegmentedControlItemProps["state"];
  @Input() icon!: LitSegmentedControlItemProps["icon"];
  @Input() iconSource!: LitSegmentedControlItemProps["iconSource"];
  @Input() label!: LitSegmentedControlItemProps["label"];

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const compact = isTrue(this.compact);
    const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);
    const selected = isTrue(this.selected);
    const formState =
      this.state === "success" || this.state === "error" ? this.state : "none";
    const icon = this.icon || "";
    const source = this.iconSource || "";
    const hasIcon = icon !== "" || source !== "";
    const hasSlotted = true;
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
    return this.label || "";
  }
  get iconName() {
    return this.icon || "";
  }
  get iconSrc() {
    return this.iconSource || "";
  }
  get isDisabled() {
    return (
      this.disabled === true ||
      this.disabled === "true" ||
      this.disabled === "" ||
      this.disabledParent === true ||
      this.disabledParent === "true" ||
      this.disabledParent === ""
    );
  }
  get isSelected() {
    return (
      this.selected === true || this.selected === "true" || this.selected === ""
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitSegmentedControlItem],
  imports: [CommonModule],
  exports: [LitSegmentedControlItem],
})
export class LitSegmentedControlItemModule {}
