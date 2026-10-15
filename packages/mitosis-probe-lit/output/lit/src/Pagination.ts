import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitPaginationProps {
  totalItemsCount?: any;
  itemsPerPage?: any;
  activePage?: any;
  showLastPage?: any;
  intl?: any;
}

@customElement("lit-pagination")
export default class LitPagination extends LitElement {
  @property() intl: any;
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() totalItemsCount: any;
  @property() itemsPerPage: any;
  @property() activePage: any;
  @property() showLastPage: any;

  get cssText() {
    const totalItems = Number(this.totalItemsCount ?? this.getAttribute("total-items-count") ?? this.getAttribute("totalitemscount") ?? 1);
    const perPage = Number(this.itemsPerPage ?? this.getAttribute("items-per-page") ?? this.getAttribute("itemsperpage") ?? 1);
    const pageTotal = Math.ceil(
      (totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage)
    );
    let active = Number(this.activePage ?? this.getAttribute("active-page") ?? this.getAttribute("activepage") ?? 1);
    if (active < 1) active = 1;
    if (active > pageTotal) active = pageTotal;
    let showLast: any = this.showLastPage ?? this.getAttribute("show-last-page") ?? this.getAttribute("showlastpage");
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


  readNumber(prop, attr, fallback) {
    const raw = this[prop] ?? this.getAttribute(attr) ?? this.getAttribute(attr.replace(/-/g, "")) ?? fallback;
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  pageTotal() {
    const totalItems = this.readNumber("totalItemsCount", "total-items-count", 1);
    const perPage = this.readNumber("itemsPerPage", "items-per-page", 1);
    return Math.ceil((totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage));
  }

  currentPage() {
    const total = this.pageTotal();
    let active = this.readNumber("activePage", "active-page", 1);
    if (active < 1) return 1;
    if (active > total) return total;
    return active;
  }

  showLast() {
    const raw = this.showLastPage ?? this.getAttribute("show-last-page") ?? this.getAttribute("showlastpage");
    if (raw === false || raw === "false") return false;
    return true;
  }

  parsedIntl() {
    let raw = this.intl ?? this.getAttribute("intl");
    const defaults = { root: "Pagination", prev: "Previous page", next: "Next page", page: "Page" };
    if (raw == null || raw === "") return defaults;
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        raw = JSON.parse(raw);
      } catch (e) {
        return defaults;
      }
    }
    if (typeof raw === "object" && raw !== null) return { ...defaults, ...raw };
    return defaults;
  }

  createItems() {
    const pageTotal = this.pageTotal();
    const activePage = this.currentPage();
    const showLastPage = this.showLast();
    const PAGE = 0;
    const ELLIPSIS = 1;
    const PREVIOUS = 2;
    const NEXT = 3;
    const createPage = (pageNumber) => ({
      type: PAGE,
      value: pageNumber,
      isActive: pageNumber === activePage,
      isBeforeCurrent: pageNumber === activePage - 1,
      isBeforeBeforeCurrent: pageNumber === activePage - 2,
      isAfterCurrent: pageNumber === activePage + 1,
      isAfterAfterCurrent: pageNumber === activePage + 2,
    });
    const range = (start, end) => Array.from(new Array(end - start + 1), (_, i) => i + start);
    const ellipsisItem = { type: ELLIPSIS, isActive: false };
    const items = [
      { type: PREVIOUS, value: Math.max(1, activePage - 1), isActive: activePage > 1 },
    ];
    if (1 + 2 + 2 >= pageTotal) {
      items.push(...range(1, pageTotal).map(createPage));
    } else {
      items.push(createPage(1));
      const middlePagesStart = Math.min(
        Math.max(activePage - 1, 3),
        pageTotal - 1 - 2 - (showLastPage ? 1 : 0),
      );
      const middlePagesEnd = middlePagesStart + 2;
      const firstEllipsisPageNumber = middlePagesStart - 1;
      const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
      const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis
        ? createPage(firstEllipsisPageNumber)
        : ellipsisItem;
      if (showPageInsteadOfFirstEllipsis && pageTotal > 5) items.push(ellipsisItem);
      items.push(firstEllipsisOrPage);
      items.push(...range(middlePagesStart, middlePagesEnd).map(createPage));
      const lastEllipsisPageNumber = middlePagesEnd + 1;
      const showPageInsteadOfLastEllipsis = lastEllipsisPageNumber === pageTotal - (showLastPage ? 1 : 0);
      const lastEllipsisOrPage = showPageInsteadOfLastEllipsis
        ? createPage(lastEllipsisPageNumber)
        : ellipsisItem;
      items.push(lastEllipsisOrPage);
      if (showPageInsteadOfLastEllipsis && pageTotal > 5) items.push(ellipsisItem);
      if (showLastPage) items.push(createPage(pageTotal));
    }
    items.push({ type: NEXT, value: Math.min(pageTotal, activePage + 1), isActive: activePage < pageTotal });
    return items;
  }

  render() {
    const intl = this.parsedIntl();
    const items = this.createItems();
    const lis = items.map((item, index) => {
      if (item.type === 2) {
        return html`<li class="prev"><span role="button" tabindex=${item.isActive ? 0 : nothing} aria-label=${intl.prev} aria-disabled=${item.isActive ? nothing : "true"}><p-icon color="primary" aria-hidden="true" name="arrow-left"></p-icon></span></li>`;
      }
      if (item.type === 3) {
        return html`<li class="next"><span role="button" tabindex=${item.isActive ? 0 : nothing} aria-label=${intl.next} aria-disabled=${item.isActive ? nothing : "true"}><p-icon color="primary" aria-hidden="true" name="arrow-right"></p-icon></span></li>`;
      }
      if (item.type === 1) {
        const side = index === 2 ? "ellip-start" : "ellip-end";
        return html`<li class="ellip ${side}"><span class="ellipsis"></span></li>`;
      }
      const classes = [
        item.isActive ? "current" : "",
        item.isBeforeCurrent ? "current-1" : "",
        item.isAfterCurrent ? "current+1" : "",
        item.isBeforeBeforeCurrent ? "current-2" : "",
        item.isAfterAfterCurrent ? "current+2" : "",
      ].filter(Boolean).join(" ");
      return html`<li class=${classes || nothing}><span role="button" tabindex="0" aria-label=${intl.page + " " + item.value} aria-current=${item.isActive ? "page" : nothing}>${item.value}</span></li>`;
    });
    return html`<nav aria-label=${intl.root}><style .innerHTML="${this.cssText}"></style><ul>${lis}</ul></nav>`;
  }
}
