import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface LitPaginationProps {
  totalItemsCount?: any;
  itemsPerPage?: any;
  activePage?: any;
  showLastPage?: any;
  intl?: any;
}

@Component({
  selector: "lit-pagination",
  template: `
    <nav>
      <style [innerHTML]="sanitizer.bypassSecurityTrustHtml(cssText)"></style>
      <ul>
        <li class="prev">
          <span
            ><p-icon
              name="arrow-left"
              color="primary"
              aria-hidden="true"
            ></p-icon
          ></span>
        </li>
      </ul>
    </nav>
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
export default class LitPagination {
  @Input() totalItemsCount!: LitPaginationProps["totalItemsCount"];
  @Input() itemsPerPage!: LitPaginationProps["itemsPerPage"];
  @Input() activePage!: LitPaginationProps["activePage"];
  @Input() showLastPage!: LitPaginationProps["showLastPage"];

  get cssText() {
    const totalItems = Number(
      this.totalItemsCount == null || this.totalItemsCount === ""
        ? 1
        : this.totalItemsCount
    );
    const perPage = Number(
      this.itemsPerPage == null || this.itemsPerPage === ""
        ? 1
        : this.itemsPerPage
    );
    const pageTotal = Math.ceil(
      (totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage)
    );
    let active = Number(
      this.activePage == null || this.activePage === "" ? 1 : this.activePage
    );
    if (active < 1) active = 1;
    if (active > pageTotal) active = pageTotal;
    let showLast: any = this.showLastPage;
    if (showLast === false || showLast === "false") {
      showLast = false;
    } else {
      showLast = true;
    }
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "nav{display:flex;justify-content:center;user-select:none}" +
      "ul{display:flex;gap:var(--p-spacing-static-xs);margin:0;padding:0}" +
      "li{list-style-type:none}" +
      "span{display:flex;justify-content:center;align-items:center;transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);position:relative;padding:0 6px;min-width:2.25rem;height:2.25rem;box-sizing:border-box;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);white-space:nowrap;cursor:pointer;background-color:transparent;color:var(--p-color-primary);border-radius:var(--p-radius-full);border-color:transparent;outline:0}" +
      "span[aria-current]{cursor:default;pointer-events:none;background-color:var(--p-color-frosted-strong)}" +
      "span[aria-disabled]{cursor:default;pointer-events:none;opacity:0.4}" +
      "span:not(.ellipsis):focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}";
    let minS = "ul{gap:var(--p-spacing-static-sm)}";
    if (pageTotal < 8) {
      minS += "li.ellip{display:none}";
    } else {
      if (active <= 4) minS += "li.ellip-start{display:none}";
      if (pageTotal - active < 4)
        minS += "li.ellip-end:nth-last-child(3){display:none}";
      if (pageTotal - active < 3)
        minS += "li.ellip-end:nth-last-child(2){display:none}";
    }
    out += "@media(min-width:760px){" + minS + "}";
    if (pageTotal > 5) {
      let maxS = "";
      if (active < 4) {
        maxS =
          "li.ellip-start, li:nth-child(6), li:nth-child(7), li:not(.ellip):nth-child(8){display:none}";
      } else if (pageTotal - active < 3) {
        maxS =
          "li.ellip-end, li.ellip-start + li:not(.current), li.ellip-start + li:not(.current) + li:not(.current){display:none}";
      } else {
        maxS =
          "li.ellip-start + li:not(.current), li.current-1, li.current+1, li.current+1 + li:not(.ellip){display:none}";
      }
      if (!showLast) {
        if (pageTotal - active < 2) {
          maxS +=
            "li.current-2" +
            (pageTotal - active === 1 ? ",li.current-1" : "") +
            "{display:none}";
        } else if (active > 2) {
          maxS +=
            "li.current+1,li.current+2{display:none}li.ellip-end{display:initial}";
        }
      }
      out += "@media(max-width:759px){" + maxS + "}";
    }
    out +=
      "@media(forced-colors:active){span:not(.ellipsis):focus-visible{outline-color:Highlight}span[aria-disabled]{opacity:1;color:GrayText}span[aria-current]{border:2px solid CanvasText}}" +
      "@media(hover:hover){span:not([aria-disabled]):not(.ellipsis):hover{-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);background:var(--p-color-frosted)}@media(forced-colors:active){span:not([aria-disabled]):not(.ellipsis):hover{outline:2px solid CanvasText;outline-offset:-2px}}}" +
      ".ellipsis{cursor:default;pointer-events:none}" +
      '.ellipsis::after{content:"…"}';
    return out;
  }

  constructor(protected sanitizer: DomSanitizer) {}
}

@NgModule({
  declarations: [LitPagination],
  imports: [CommonModule],
  exports: [LitPagination],
})
export class LitPaginationModule {}
