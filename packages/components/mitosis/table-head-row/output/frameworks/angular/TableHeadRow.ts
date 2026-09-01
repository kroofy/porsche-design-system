/* mitosis-native-host: native angular from TableHeadRow.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-table-head-row",
  template: `
    <div class="p-table-head-row" data-pds="table-head-row">
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <slot></slot>
    </div>
  
    </div>
  `,
  styles: [`
      .p-table-head-row {
        display: contents;
      }
      .p-table-head-row {
        display: table-row;
      }
      .p-table-head-row[hidden] {
        display: none !important;
      }
    `],
})
export default class LitTableHeadRow {
  get scopedCssText() {
    return scopeCss(this.cssText, ".p-table-head-row");
  }

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
