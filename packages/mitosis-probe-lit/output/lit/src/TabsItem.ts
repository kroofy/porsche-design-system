import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitTabsItemProps {
  label?: string;
}

@customElement("lit-tabs-item")
export default class LitTabsItem extends LitElement {
  static styles = css`
      :host([hidden]) {
          display: none !important;
        }
`;

  @property() label: any;

  get cssText() {
    return (
      ":host{display:block;color:var(--p-color-primary) !important;border-radius:2px !important}" +
      ":host([hidden]){display:none !important}" +
      ":host(:focus-visible){outline:2px solid var(--p-color-focus) !important;outline-offset:2px !important}" +
      "@media(forced-colors:active){:host(:focus-visible){outline-color:Highlight !important}}"
    );
  }
  get labelValue() {
    return this.label || "";
  }

  render() {
    return html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
