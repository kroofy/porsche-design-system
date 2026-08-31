import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-table-head-row",
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
        display: table-row;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitTableHeadRow {
  get cssText() {
    return ":host{display:table-row}:host([hidden]){display:none !important}";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTableHeadRow],
  imports: [CommonModule],
  exports: [LitTableHeadRow],
})
export class LitTableHeadRowModule {}
