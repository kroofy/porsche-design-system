import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTabsItemProps {
  label?: string;
}

@Component({
  selector: "lit-tabs-item",
  template: `
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <slot></slot>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitTabsItem {
  @Input() label!: LitTabsItemProps["label"];

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
