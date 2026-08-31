import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-table-row",
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
export default class LitTableRow {
  get cssText() {
    return (
      ":host{display:table-row;" +
      "border-bottom:var(--_p-table-d) solid var(--_p-table-c) !important;" +
      "transition:background var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out) !important}" +
      ":host([hidden]){display:none !important}" +
      "@media(hover:hover){:host(:hover){background:var(--_p-table-b) !important}}"
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTableRow],
  imports: [CommonModule],
  exports: [LitTableRow],
})
export class LitTableRowModule {}
