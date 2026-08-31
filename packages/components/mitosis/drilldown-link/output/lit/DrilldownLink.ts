import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitDrilldownLinkProps {
  href?: any;
  active?: any;
  target?: any;
  download?: any;
  rel?: any;
  aria?: any;
}

@customElement("p-drilldown-link")
export default class LitDrilldownLink extends LitElement {
  @property() aria: any;
  @property() rel: any;
  @property() download: any;
  @property() target: any;
  static styles = css`
      :host {
          display: grid;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() href: any;
  @property() active: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const rawHref = (() => {
      const raw = this.href;
      if (raw !== nothing && raw !== undefined && raw !== null && raw !== "undefined") return raw;
      if (this.hasAttribute("href")) {
        const attr = this.getAttribute("href");
        if (attr !== "undefined") return attr;
      }
      return nothing;
    })();
    const hasSlottedAnchor = rawHref === nothing || rawHref === undefined || rawHref === null;
    const isActive = isTrue(this.active ?? this.getAttribute("active"));
    const deco = isActive ? "inherit" : "transparent";
    const cursor = isActive ? "default" : "pointer";
    const important = hasSlottedAnchor ? " !important" : "";
    const host =
      ":host{display:grid}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    const anchor =
      "all:unset" +
      important +
      ";padding:calc(var(--p-spacing-fluid-sm) + 2px) calc(var(--p-spacing-fluid-sm) + 4px)" +
      important +
      ";margin:-2px calc(var(--p-spacing-fluid-sm) * -1 - 4px)" +
      important +
      ";border-radius:var(--p-radius-sm)" +
      important +
      ";font:var(--p-font-weight-normal) var(--p-typescale-md) / var(--p-leading-normal) var(--p-font-porsche-next)" +
      important +
      ";color:var(--_p-drilldown-a)" +
      important +
      ";text-decoration:underline" +
      important +
      ";text-decoration-color:" +
      deco +
      important +
      ";cursor:" +
      cursor +
      important +
      ";transition:text-decoration-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out)" +
      important;
    const sel = hasSlottedAnchor ? "::slotted(a)" : "a";
    const hoverSel = hasSlottedAnchor ? "::slotted(a:hover)" : "a:hover";
    const focusSel = hasSlottedAnchor
      ? "::slotted(a:focus-visible)"
      : "a:focus-visible";
    return (
      host +
      sel +
      "{" +
      anchor +
      "}" +
      focusSel +
      "{outline:2px solid var(--p-color-focus)" +
      important +
      ";outline-offset:2px" +
      important +
      "}" +
      "@media(forced-colors:active){" +
      focusSel +
      "{outline-color:Highlight" +
      important +
      "}}" +
      "@media(hover:hover){" +
      hoverSel +
      "{text-decoration-color:inherit" +
      important +
      "}}"
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
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

  get hrefValue() {
    const raw = this.href;
    if (raw !== nothing && raw !== undefined && raw !== null && raw !== "undefined") return raw;
    if (this.hasAttribute("href")) {
      const attr = this.getAttribute("href");
      if (attr !== "undefined") return attr;
    }
    return nothing;
  }

  get hasHrefFlag() {
    const href = this.hrefValue;
    return href !== nothing && href !== undefined && href !== null;
  }

  get isActiveFlag() {
    const raw = this.active ?? this.getAttribute("active");
    return raw === true || raw === "true" || raw === "";
  }

  get ariaAttrs() {
    const raw = this.aria ?? this.getAttribute("aria");
    if (raw && typeof raw === "object") return raw;
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        return JSON.parse(raw.replace(/'/g, '"'));
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  render() {
    const href = this.hrefValue;
    const hasHref = href !== nothing && href !== undefined && href !== null;
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const download = this.download ?? this.getAttribute("download");
    const rel = this.rel ?? this.getAttribute("rel");
    const downloadAttr = (download !== nothing && download !== undefined && download !== null && download !== "undefined") ? download : nothing;
    const relAttr = (rel !== nothing && rel !== undefined && rel !== null && rel !== "undefined") ? rel : nothing;
    const ariaLabel = this.ariaAttrs["aria-label"] || nothing;
    if (hasHref) {
      return html`<style .innerHTML="${this.cssText}"></style><a href=${href} target=${target} download=${downloadAttr} rel=${relAttr} aria-current=${this.isActiveFlag ? "true" : "false"} aria-label=${ariaLabel}><slot></slot></a>`;
    }
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
