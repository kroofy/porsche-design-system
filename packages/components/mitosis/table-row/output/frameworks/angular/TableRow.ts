/* mitosis-native-host: native angular from TableRow.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-table-row",
  template: `
    <div class="p-table-row" data-pds="table-row">
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <slot></slot>
    </div>
  
    </div>
  `,
  styles: [`
      .p-table-row {
        display: contents;
      }
      .p-table-row {
        display: table-row;
      }
      .p-table-row[hidden] {
        display: none !important;
      }
    `],
})
export default class LitTableRow {
  get scopedCssText() {
    return scopeCss(this.cssText, ".p-table-row");
  }

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
