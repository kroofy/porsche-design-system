import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("lit-table-body")
export default class LitTableBody extends LitElement {
  static styles = css`
      :host {
          display: table-row-group;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  get cssText() {
    return ":host{display:table-row-group}:host([hidden]){display:none !important}";
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "rowgroup");
  }

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
