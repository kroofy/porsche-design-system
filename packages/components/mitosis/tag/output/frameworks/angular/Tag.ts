/* mitosis-native-host: native angular from Tag.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTagProps {
  variant?: string;
  icon?: string;
  iconSource?: string;
  compact?: any;
}

@Component({
  selector: "lit-tag",
  template: `
    <div class="p-tag" data-pds="tag">
    <span
      ><style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <p-icon
        class="icon"
        color="inherit"
        size="x-small"
        aria-hidden="true"
        [name]="iconName"
        [source]="iconSrc"
      ></p-icon>
      <slot></slot
    ></span>
  
    </div>
  `,
  styles: [`
      .p-tag {
        display: contents;
      }
      .p-tag {
        display: inline-flex;
        vertical-align: top;
        white-space: nowrap;
      }
      .p-tag[hidden] {
        display: none !important;
      }
    `],
})
export default class LitTag {
  @Input() variant!: LitTagProps["variant"];
  @Input() compact!: LitTagProps["compact"];
  @Input() icon!: LitTagProps["icon"];
  @Input() iconSource!: LitTagProps["iconSource"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-tag");
  }

  get cssText() {
    const textMap: any = {
      primary: "var(--p-color-canvas)",
      secondary: "var(--p-color-primary)",
      info: "var(--p-color-canvas)",
      "info-frosted": "var(--p-color-primary)",
      success: "var(--p-color-canvas)",
      "success-frosted": "var(--p-color-primary)",
      warning: "var(--p-color-canvas)",
      "warning-frosted": "var(--p-color-primary)",
      error: "var(--p-color-canvas)",
      "error-frosted": "var(--p-color-primary)",
    };
    const bgMap: any = {
      primary: "var(--p-color-primary)",
      secondary: "var(--p-color-frosted-strong)",
      info: "var(--p-color-info)",
      "info-frosted": "var(--p-color-info-frosted)",
      success: "var(--p-color-success)",
      "success-frosted": "var(--p-color-success-frosted)",
      warning: "var(--p-color-warning)",
      "warning-frosted": "var(--p-color-warning-frosted)",
      error: "var(--p-color-error)",
      "error-frosted": "var(--p-color-error-frosted)",
    };
    const hoverMap: any = {
      primary: "var(--p-color-contrast-high)",
      secondary: "var(--p-color-frosted)",
      info: "var(--p-color-info-medium)",
      "info-frosted": "var(--p-color-info-frosted-soft)",
      success: "var(--p-color-success-medium)",
      "success-frosted": "var(--p-color-success-frosted-soft)",
      warning: "var(--p-color-warning-medium)",
      "warning-frosted": "var(--p-color-warning-frosted-soft)",
      error: "var(--p-color-error-medium)",
      "error-frosted": "var(--p-color-error-frosted-soft)",
    };
    const frosted: any = {
      secondary: 1,
      "info-frosted": 1,
      "success-frosted": 1,
      "warning-frosted": 1,
      "error-frosted": 1,
    };
    const variant = this.variant || "secondary";
    const text = textMap[variant] || textMap.secondary;
    const bg = bgMap[variant] || bgMap.secondary;
    const hover = hoverMap[variant] || hoverMap.secondary;
    let compact: any = this.compact;
    if (compact === true || compact === "true" || compact === "") {
      compact = true;
    } else {
      compact = false;
    }
    const icon = this.icon || "none";
    const source = this.iconSource || "";
    const hasIcon = (icon !== "none" && icon !== "") || source !== "";
    const pad = compact
      ? "padding:var(--p-spacing-static-2xs) var(--p-spacing-static-sm);border-radius:calc(1px + (var(--p-leading-normal) / 2));"
      : "padding:4px calc(12 * var(--p-spacing-static-2xs));border-radius:calc(4px + (var(--p-leading-normal) / 2));";
    const blur = frosted[variant]
      ? "-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);"
      : "";
    const iconRule = hasIcon
      ? "p-icon{margin-inline-start:-2px}"
      : "p-icon{display:none}";
    return (
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "span{position:relative;display:flex;gap:2px;" +
      pad +
      "font:var(--p-font-weight-normal) var(--p-typescale-xs)/var(--p-leading-normal) var(--p-font-porsche-next);" +
      blur +
      "color:" +
      text +
      ";background:" +
      bg +
      ";transition:color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out),background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out),backdrop-filter var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}" +
      "::slotted(a),::slotted(button){all:unset!important;text-decoration:underline!important;cursor:pointer!important;font:inherit!important;color:inherit!important}" +
      '::slotted(a)::before,::slotted(button)::before{content:""!important;position:absolute!important;inset:0!important;border-radius:var(--p-radius-full)!important}' +
      "::slotted(a:focus-visible)::before,::slotted(button:focus-visible)::before{outline:2px solid var(--p-color-focus)!important;outline-offset:2px!important}" +
      "::slotted(br){display:none!important}" +
      "@media(forced-colors:active){span{outline:2px solid CanvasText;outline-offset:-2px;background-color:Canvas;color:CanvasText}::slotted(a:focus-visible)::before,::slotted(button:focus-visible)::before{outline-color:Highlight!important}}" +
      "@media(hover:hover){span:hover{background:" +
      hover +
      "}}" +
      iconRule
    );
  }
  get iconName() {
    const icon = this.icon || "none";
    if (icon === "none" || icon === "") return "";
    return icon;
  }
  get iconSrc() {
    return this.iconSource || "";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTag],
  imports: [CommonModule],
  exports: [LitTag],
})
export class LitTagModule {}
