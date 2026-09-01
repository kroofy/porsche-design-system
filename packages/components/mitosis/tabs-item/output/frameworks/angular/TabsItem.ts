/* mitosis-native-host: native angular from TabsItem.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTabsItemProps {
  label?: string;
}

@Component({
  selector: "lit-tabs-item",
  template: `
    <div class="p-tabs-item" data-pds="tabs-item">
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <slot></slot>
    </div>
  
    </div>
  `,
  styles: [`
      .p-tabs-item {
        display: contents;
      }
      .p-tabs-item[hidden] {
        display: none !important;
      }
    `],
})
export default class LitTabsItem {
  @Input() label!: LitTabsItemProps["label"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-tabs-item");
  }

  get cssText() {
    return (
      ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
      "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
    );
  }
  get labelValue() {
    return this.label || "";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTabsItem],
  imports: [CommonModule],
  exports: [LitTabsItem],
})
export class LitTabsItemModule {}
