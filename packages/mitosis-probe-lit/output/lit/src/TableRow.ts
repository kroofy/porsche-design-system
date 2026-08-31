import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("lit-table-row")
export default class LitTableRow extends LitElement {
  static styles = css`
      :host {
          display: table-row;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  get cssText() {
    return (
      ":host{display:table-row;" +
      "border-bottom:var(--_p-table-d) solid var(--_p-table-c) !important;" +
      "transition:background var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out) !important}" +
      ":host([hidden]){display:none !important}" +
      "@media(hover:hover){:host(:hover){background:var(--_p-table-b) !important}}"
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "row");
  }

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
