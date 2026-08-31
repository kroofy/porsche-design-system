import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("p-text-list-item")
export default class LitTextListItem extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  get cssText() {
    return (
      ":host{display:grid;grid-template-columns:var(--_p-text-list-e) 1fr !important;column-gap:var(--p-spacing-static-md) !important;font:inherit !important;color:inherit !important}" +
      ":host([hidden]){display:none !important}" +
      ".root{display:contents}" +
      "slot{display:inline}" +
      '::slotted(*){--_p-text-list-f:.625rem !important;--_p-text-list-g:"–" !important;--_p-text-list-a:2rem !important;--_p-text-list-b:"" !important}' +
      "::slotted(*:last-child){grid-column:2 !important}"
    );
  }

  render() {
    return html`<div class="root"><style .innerHTML="${this.cssText}"></style><slot></slot></div>`;
  }
}
