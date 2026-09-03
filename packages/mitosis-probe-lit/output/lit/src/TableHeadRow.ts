import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("lit-table-head-row")
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
  }

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
