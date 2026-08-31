import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitPaginationProps {
  totalItemsCount?: any;
  itemsPerPage?: any;
  activePage?: any;
  showLastPage?: any;
  intl?: any;
}

@customElement("p-pagination")
export default class LitPagination extends LitElement {
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property({ attribute: "total-items-count" }) totalItemsCount: any;
  @property({ attribute: "items-per-page" }) itemsPerPage: any;
  @property({ attribute: "active-page" }) activePage: any;
  @property({ attribute: "show-last-page" }) showLastPage: any;

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
    let showLast: any = this.getAttribute("show-last-page") ?? this.showLastPage;
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

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  get pageItems() {
    const totalItems = Number(this.getAttribute("total-items-count") ?? this.totalItemsCount ?? 1);
    const perPage = Number(this.getAttribute("items-per-page") ?? this.itemsPerPage ?? 1);
    const pageTotal = Math.ceil((totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage));
    let active = Number(this.getAttribute("active-page") ?? this.activePage ?? 1);
    if (active < 1) active = 1;
    if (active > pageTotal) active = pageTotal;
    let showLast: any = this.getAttribute("show-last-page") ?? this.showLastPage;
    if (showLast === false || showLast === "false") showLast = false;
    else showLast = true;
    const PAGE = 0;
    const ELLIPSIS = 1;
    const PREVIOUS = 2;
    const NEXT = 3;
    const ellipsisItem = { type: ELLIPSIS, isActive: false };
    const createPage = (pageNumber: number) => ({
      type: PAGE,
      value: pageNumber,
      isActive: pageNumber === active,
      isBeforeCurrent: pageNumber === active - 1,
      isBeforeBeforeCurrent: pageNumber === active - 2,
      isAfterCurrent: pageNumber === active + 1,
      isAfterAfterCurrent: pageNumber === active + 2,
    });
    const createRange = (start: number, end: number) =>
      Array.from(new Array(end - start + 1), (_, i) => i + start);
    const items: any[] = [
      { type: PREVIOUS, value: Math.max(1, active - 1), isActive: active > 1 },
    ];
    if (1 + 2 + 2 >= pageTotal) {
      items.push(...createRange(1, pageTotal).map(createPage));
    } else {
      items.push(createPage(1));
      const middlePagesStart = Math.min(
        Math.max(active - 1, 3),
        pageTotal - 1 - 2 - (showLast ? 1 : 0)
      );
      const middlePagesEnd = middlePagesStart + 2;
      const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);
      const firstEllipsisPageNumber = middlePagesStart - 1;
      const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
      const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis
        ? createPage(firstEllipsisPageNumber)
        : ellipsisItem;
      if (showPageInsteadOfFirstEllipsis && pageTotal > 5) items.push(ellipsisItem);
      items.push(firstEllipsisOrPage);
      items.push(...middlePages);
      const lastEllipsisPageNumber = middlePagesEnd + 1;
      const showPageInsteadOfLastEllipsis =
        lastEllipsisPageNumber === pageTotal - (showLast ? 1 : 0);
      const lastEllipsisOrPage = showPageInsteadOfLastEllipsis
        ? createPage(lastEllipsisPageNumber)
        : ellipsisItem;
      items.push(lastEllipsisOrPage);
      if (showPageInsteadOfLastEllipsis && pageTotal > 5) items.push(ellipsisItem);
      if (showLast) items.push(createPage(pageTotal));
    }
    items.push({ type: NEXT, value: Math.min(pageTotal, active + 1), isActive: active < pageTotal });
    return items;
  }
  get pageNodes() {
    return this.pageItems.map((item: any, index: number) => {
      if (item.type === 2) {
        return html`<li class="prev"><span role="button" tabindex=${item.isActive ? 0 : nothing} aria-label="Previous page" aria-disabled=${item.isActive ? nothing : "true"}><p-icon name="arrow-left" color="primary" aria-hidden="true"></p-icon></span></li>`;
      }
      if (item.type === 3) {
        return html`<li class="next"><span role="button" tabindex=${item.isActive ? 0 : nothing} aria-label="Next page" aria-disabled=${item.isActive ? nothing : "true"}><p-icon name="arrow-right" color="primary" aria-hidden="true"></p-icon></span></li>`;
      }
      if (item.type === 1) {
        const which = index === 2 ? "start" : "end";
        return html`<li class="ellip ellip-${which}"><span class="ellipsis"></span></li>`;
      }
      const cls = [
        item.isActive ? "current" : "",
        item.isBeforeCurrent ? "current-1" : "",
        item.isAfterCurrent ? "current+1" : "",
        item.isBeforeBeforeCurrent ? "current-2" : "",
        item.isAfterAfterCurrent ? "current+2" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return html`<li class=${cls}><span role="button" tabindex="0" aria-label=${"Page " + item.value} aria-current=${item.isActive ? "page" : nothing}>${item.value}</span></li>`;
    });
  }

  render() {
    return html`<nav aria-label="Pagination"><style .innerHTML="${this.cssText}"></style><ul>${this.pageNodes}</ul></nav>`;
  }
}
