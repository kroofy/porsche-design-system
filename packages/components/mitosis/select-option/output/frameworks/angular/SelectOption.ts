/* mitosis-native-host: native angular from SelectOption.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitSelectOptionProps {
  value?: any;
  disabled?: any;
  selected?: any;
  highlighted?: any;
  disabledParent?: any;
  hidden?: any;
}

@Component({
  selector: "lit-select-option",
  template: `
    <div class="p-select-option" data-pds="select-option">
    <div class="option">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <slot></slot>
      <p-icon name="check" color="primary"></p-icon>
    </div>
  
    </div>
  `,
  styles: [`
      .p-select-option {
        display: contents;
      }
      .p-select-option {
        display: block;
      }
      .p-select-option[hidden] {
        display: none !important;
      }
    `],
})
export default class LitSelectOption {
  @Input() disabled!: LitSelectOptionProps["disabled"];
  @Input() disabledParent!: LitSelectOptionProps["disabledParent"];
  @Input() selected!: LitSelectOptionProps["selected"];
  @Input() highlighted!: LitSelectOptionProps["highlighted"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-select-option");
  }

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(this.disabled) || isTrue(this.disabledParent);
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

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitSelectOption],
  imports: [CommonModule],
  exports: [LitSelectOption],
})
export class LitSelectOptionModule {}
