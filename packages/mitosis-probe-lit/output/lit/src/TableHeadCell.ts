import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitTableHeadCellProps {
  sort?: any;
  hideLabel?: any;
  multiline?: any;
}

@customElement("lit-table-head-cell")
export default class LitTableHeadCell extends LitElement {
  static styles = css`
      :host {
          display: table-cell;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() sort: any;
  @property() hideLabel: any;
  @property() multiline: any;

  parseSort() {
    let sort: any = this.sort ?? this.getAttribute("sort");
    if (typeof sort === "string" && sort.charAt(0) === "{") {
      try {
        sort = JSON.parse(sort);
      } catch (e) {
        sort = undefined;
      }
    }
    return sort;
  }
  get sortable() {
    const sort: any = this.parseSort();
    if (!sort) return false;
    return sort.active !== undefined && sort.direction !== undefined;
  }
  get cssText() {
    const sort: any = this.parseSort();
    const active = sort ? sort.active : undefined;
    const direction = sort ? sort.direction : undefined;
    const sortable = active !== undefined && direction !== undefined;
    const hideLabel =
      this.hideLabel === true ||
      this.hideLabel === "true" ||
      this.hideLabel === "" ||
      this.hasAttribute("hide-label") ||
      this.hasAttribute("hidelabel");
    const multiline =
      this.multiline === true ||
      this.multiline === "true" ||
      this.multiline === "" ||
      this.hasAttribute("multiline");
    const whiteSpace = multiline ? "normal" : "nowrap";
    let out =
      ":host{display:table-cell;" +
      "padding:2px var(--_p-table-a,var(--p-spacing-fluid-sm)) var(--_p-table-a,var(--p-spacing-fluid-sm)) !important;" +
      "vertical-align:bottom !important;" +
      "white-space:" +
      whiteSpace +
      " !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    if (sortable) {
      const deg = direction === "asc" ? "0" : "180";
      const opacity = active ? "1" : "0";
      out +=
        "button{position:relative;display:flex;gap:var(--p-spacing-static-xs);width:auto;margin:0;padding:0;font:inherit;color:inherit;align-items:flex-end;-webkit-appearance:none;appearance:none;background:transparent;text-align:start;border:0;z-index:0;cursor:pointer}" +
        "button:focus,button:focus-visible{outline:none}" +
        'button::before{content:"";position:absolute;inset:-2px -4px;border-radius:var(--p-radius-sm);z-index:-1;transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)}' +
        "button:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        "@media(forced-colors:active){button:focus-visible::before{outline-color:Highlight}}" +
        "@media(hover:hover){button:hover::before{-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);background-color:var(--p-color-frosted)}button:hover .icon,button:focus-visible .icon{opacity:1}}" +
        ".icon{transition:opacity var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);opacity:" +
        opacity +
        ";transform:rotate3d(0,0,1," +
        deg +
        "deg);transform-origin:50% 50%}";
    } else if (hideLabel) {
      out +=
        "span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;display:block;border:0}";
    }
    return out;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("scope", "col");
    this.setAttribute("role", "columnheader");
    const sort = this.parseSort();
    if (sort?.active) {
      this.setAttribute("aria-sort", sort.direction === "asc" ? "ascending" : "descending");
    } else {
      this.removeAttribute("aria-sort");
    }
  }

  onButtonClick() {
    const sort = this.parseSort() || {};
    this.dispatchEvent(
      new CustomEvent("internalSortingChange", {
        bubbles: true,
        detail: {
          ...sort,
          active: true,
          direction: sort.active ? (sort.direction === "asc" ? "desc" : "asc") : sort.direction,
        },
      }),
    );
  }

  render() {
    if (this.sortable) {
      return html`<style .innerHTML="${this.cssText}"></style><button type="button" @click=${this.onButtonClick}><slot></slot><p-icon class="icon" color="inherit" size="x-small" name="arrow-up" aria-hidden="true"></p-icon></button>`;
    }
    return html`<span><style .innerHTML="${this.cssText}"></style><slot></slot></span>`;
  }
}
