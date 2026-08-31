import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-text-list-item",
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
export default class LitTextListItem {
  get cssText() {
    return (
      ":host{display:grid;grid-template-columns:var(--_p-text-list-e) 1fr !important;column-gap:var(--p-spacing-static-md) !important;font:inherit !important;color:inherit !important}" +
      ":host([hidden]){display:none !important}" +
      ".root{display:contents}" +
      "slot{display:inline}" +
      '::slotted(*){--_p-text-list-f:.625rem !important;--_p-text-list-g:"–" !important;--_p-text-list-a:2rem !important;--_p-text-list-b:"" !important}' +
      "::slotted(*:last-child){grid-column:2 !important}"
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTextListItem],
  imports: [CommonModule],
  exports: [LitTextListItem],
})
export class LitTextListItemModule {}
