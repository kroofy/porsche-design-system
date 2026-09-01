/* mitosis-native-host: native angular from TableBody.lite.tsx */
import { NgModule } from "@angular/core";
import { scopeCss } from "../../../../_runtime/scope-css.js";
import { CommonModule } from "@angular/common";

import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "lit-table-body",
  template: `
    <div class="p-table-body" data-pds="table-body">
    <div class="root">
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(scopedCssText)"></style>
      <slot></slot>
    </div>
  
    </div>
  `,
  styles: [`
      .p-table-body {
        display: contents;
      }
      .p-table-body {
        display: table-row-group;
      }
      .p-table-body[hidden] {
        display: none !important;
      }
    `],
})
export default class LitTableBody {
  get scopedCssText() {
    return scopeCss(this.cssText, ".p-table-body");
  }

  get cssText() {
    return ":host{display:table-row-group}:host([hidden]){display:none !important}";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTableBody],
  imports: [CommonModule],
  exports: [LitTableBody],
})
export class LitTableBodyModule {}
