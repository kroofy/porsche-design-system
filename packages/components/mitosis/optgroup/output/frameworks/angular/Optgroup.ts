/* mitosis-native-host: native angular from Optgroup.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitOptgroupProps {
  label?: string;
  disabled?: any;
  hidden?: any;
}

@Component({
  selector: "lit-optgroup",
  template: `
    <div class="p-optgroup" data-pds="optgroup">
    <div role="group">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <span id="label" role="presentation">{{labelText}}</span>
      <slot></slot>
    </div>
  
    </div>
  `,
  styles: [`
      .p-optgroup {
        display: contents;
      }
      .p-optgroup {
        display: block;
      }
      .p-optgroup[hidden] {
        display: none !important;
      }
    `],
})
export default class LitOptgroup {
  @Input() disabled!: LitOptgroupProps["disabled"];
  @Input() label!: LitOptgroupProps["label"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-optgroup");
  }

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const disabled = isTrue(this.disabled);
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px);--_p-multi-select-option-b:calc(44.8px * (var(--_p-optgroup-a) - 0.64285714) + 12px)}" +
      '[role="group"]{display:flex;flex-direction:column;gap:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px)}' +
      '[role="presentation"]{padding-block:calc(11.2px * (var(--_p-optgroup-a) - 0.64285714) + 4px);padding-inline:calc(16.8px * (var(--_p-optgroup-a) - 0.64285714) + 6px);font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)';
    if (disabled) out += ";opacity:0.4";
    out += "}";
    if (disabled) {
      out +=
        '@media(forced-colors:active){[role="presentation"]{opacity:1;color:GrayText}}';
    }
    return out;
  }
  get labelText() {
    return this.label || "";
  }
  get isDisabled() {
    return (
      this.disabled === true || this.disabled === "true" || this.disabled === ""
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitOptgroup],
  imports: [CommonModule],
  exports: [LitOptgroup],
})
export class LitOptgroupModule {}
