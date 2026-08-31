import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTableCellProps {
  multiline?: any;
}

@Component({
  selector: "lit-table-cell",
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
        display: table-cell;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitTableCell {
  @Input() multiline!: LitTableCellProps["multiline"];

  get cssText() {
    const multiline =
      this.multiline === true ||
      this.multiline === "true" ||
      this.multiline === "";
    const whiteSpace = multiline ? "normal" : "nowrap";
    return (
      ":host{display:table-cell;vertical-align:middle;" +
      "padding:var(--_p-table-a) !important;" +
      "margin:0 !important;" +
      "white-space:" +
      whiteSpace +
      " !important}" +
      ":host([hidden]){display:none !important}"
    );
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTableCell],
  imports: [CommonModule],
  exports: [LitTableCell],
})
export class LitTableCellModule {}
