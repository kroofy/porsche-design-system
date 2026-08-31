import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitTableProps {
  caption?: string;
  compact?: any;
  layout?: string;
  sticky?: any;
}

@customElement("p-table")
export default class LitTable extends LitElement {
  @property() sticky: any;
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() compact: any;
  @property() layout: any;
  @property() caption: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const compact = isTrue(this.compact ?? this.getAttribute("compact"));
    const layout = this.layout ?? this.getAttribute("layout") ?? "auto";
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
    return this.caption ?? this.getAttribute("caption") ?? "";
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.shadowRoot?.addEventListener("internalSortingChange", (e) => {
      e.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("update", { bubbles: false, detail: e.detail }),
      );
    });
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  isTrue(v) {
    return v === true || v === "true" || v === "";
  }

  hasSlottedCaption() {
    return !!this.querySelector('[slot="caption"]');
  }

  captionValue() {
    return this.caption ?? this.getAttribute("caption") ?? "";
  }

  isCompact() {
    return this.isTrue(this.compact ?? this.getAttribute("compact"));
  }

  isSticky() {
    return this.isTrue(this.sticky ?? this.getAttribute("sticky"));
  }

  render() {
    const caption = this.captionValue();
    const slotted = this.hasSlottedCaption();
    const captionEl = slotted
      ? html`<div id="caption" class="caption"><slot name="caption"></slot></div>`
      : nothing;
    const label = caption && !slotted ? caption : nothing;
    const labelledBy = !caption && slotted ? "caption" : nothing;
    return html`<style .innerHTML="${this.cssText}"></style>${captionEl}<p-scroller scrollbar="true" ?compact=${this.isCompact()} ?sticky=${this.isSticky()}><div class="table" role="table" aria-label=${label} aria-labelledby=${labelledBy}><slot></slot></div></p-scroller>`;
  }
}
