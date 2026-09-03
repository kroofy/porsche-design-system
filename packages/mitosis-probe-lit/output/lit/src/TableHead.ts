import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("lit-table-head")
export default class LitTableHead extends LitElement {
  static styles = css`
      :host {
          display: table-header-group;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  get cssText() {
    return (
      ":host{display:table-header-group;" +
      "font:var(--p-font-weight-semibold) var(--p-typescale-xs) / var(--p-leading-normal) var(--p-font-porsche-next) !important;" +
      "border-bottom:1px solid var(--_p-table-c) !important}" +
      ":host([hidden]){display:none !important}" +
      "::slotted(*){--_p-table-d:0px !important;--_p-table-b:none !important}"
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "rowgroup");
  }

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
