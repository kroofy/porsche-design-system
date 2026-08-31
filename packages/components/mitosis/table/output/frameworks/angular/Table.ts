import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitTableProps {
  caption?: string;
  compact?: any;
  layout?: string;
  sticky?: any;
}

@Component({
  selector: "lit-table",
  template: `
    <div class="table" role="table">
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
        display: block;
      }
      :host([hidden]) {
        display: none !important;
      }
    `,
  ],
})
export default class LitTable {
  @Input() compact!: LitTableProps["compact"];
  @Input() layout!: LitTableProps["layout"];
  @Input() caption!: LitTableProps["caption"];

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const compact = isTrue(this.compact);
    const layout = this.layout || "auto";
    const pad = compact
      ? "var(--p-spacing-static-sm)"
      : "var(--p-spacing-fluid-sm)";
    let out =
      ":host{display:block;" +
      "--p-scroller-indicator-top:var(--p-table-scroll-indicator-top,0px) !important;" +
      "--p-scroller-indicator-bottom:var(--p-table-scroll-indicator-bottom,0px) !important;" +
      "--_p-table-b:var(--p-color-frosted) !important;" +
      "--_p-table-c:var(--p-color-contrast-low) !important;" +
      "--_p-table-a:" +
      pad +
      " !important;" +
      "--_p-table-d:1px !important;" +
      "font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "color:var(--p-color-primary) !important;" +
      "text-align:start !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      ".caption{margin-bottom:var(--p-spacing-fluid-md)}" +
      ".table{display:table;border-collapse:collapse;white-space:nowrap";
    if (layout === "fixed") {
      out += ";table-layout:fixed;min-width:100%}";
    } else {
      out += ";width:100%}";
    }
    return out;
  }
  get captionText() {
    return this.caption || "";
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitTable],
  imports: [CommonModule],
  exports: [LitTable],
})
export class LitTableModule {}
