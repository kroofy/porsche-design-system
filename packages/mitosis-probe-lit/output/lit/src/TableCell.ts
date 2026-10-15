import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitTableCellProps {
  multiline?: any;
}

@customElement("lit-table-cell")
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
  }

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
