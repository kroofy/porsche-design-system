/* mitosis-native-host: native angular from TableCell.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTableCellProps {
  multiline?: any;
}

@Component({
  selector: "lit-table-cell",
  template: `
    <div class="p-table-cell" data-pds="table-cell">
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <slot></slot>
    </div>
  
    </div>
  `,
  styles: [`
      .p-table-cell {
        display: contents;
      }
      .p-table-cell {
        display: table-cell;
      }
      .p-table-cell[hidden] {
        display: none !important;
      }
    `],
})
export default class LitTableCell {
  @Input() multiline!: LitTableCellProps["multiline"];

  get scopedCssText() {
    return scopeCss(this.cssText, ".p-table-cell");
  }

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
