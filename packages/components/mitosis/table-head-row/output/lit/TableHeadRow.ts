import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("p-table-head-row")
export default class LitTableHeadRow extends LitElement {
  static styles = css`
      :host {
          display: table-row;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  get cssText() {
    return ":host{display:table-row}:host([hidden]){display:none !important}";
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "row");
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

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
