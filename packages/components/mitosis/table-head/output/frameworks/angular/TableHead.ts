import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-table-head",
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
      :host {
        display: table-header-group;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitTableHead {
  get cssText() {
    return (
      ":host{display:table-header-group;" +
      "font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "border-bottom:1px solid var(--_p-table-c) !important}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}"
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTableHead],
  imports: [CommonModule],
  exports: [LitTableHead],
})
export class LitTableHeadModule {}
