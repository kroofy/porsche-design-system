import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitTableCellProps {
  multiline?: any;
}

@customElement("p-table-cell")
export default class LitTableCell extends LitElement {
  static styles = css`
      :host {
          display: table-cell;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() multiline: any;

  get cssText() {
    const multiline =
      this.multiline === true ||
      this.multiline === "true" ||
      this.multiline === "" ||
      this.hasAttribute("multiline");
    const whiteSpace = multiline ? "normal" : "nowrap";
    return (
      ":host{display:table-cell;vertical-align:middle;" +
      "padding:var(--_p-table-a) !important;" +
      "margin:0 !important;" +
      "white-space:" +
      whiteSpace +
      " !important}" +
      ":host([hidden]){display:none !important}"
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "cell");
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
