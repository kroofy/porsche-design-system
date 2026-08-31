import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

@customElement("p-toast")
export default class LitToast extends LitElement {
  static styles = css`
      :host {
          position: fixed;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  get cssText() {
    return (
      ":host{--_p-toast-a:var(--p-toast-position-bottom,56px) !important;" +
      "position:fixed !important;" +
      "inset:auto max(22px, 10.625vw - 12px) var(--_p-toast-a) !important;" +
      "z-index:999999 !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "@keyframes in{from{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}to{transform:translate3d(0,0,0)}}" +
      "@keyframes out{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,calc(var(--_p-toast-a) + 100%),0)}}" +
      "@media(min-width:760px){:host{--_p-toast-a:var(--p-toast-position-bottom,64px) !important;" +
      "inset:auto auto var(--_p-toast-a) 64px !important;" +
      "max-width:min(42rem, calc(100vw - 64px * 2)) !important}}" +
      ".hydrated{animation:var(--p-animation-duration,.4s) in cubic-bezier(0,0,.2,1) forwards}" +
      ".close{animation:.4s out cubic-bezier(.4,0,.5,1) forwards !important}"
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "status");
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.addEventListener("dismiss", (e) => {
      e.stopPropagation();
      this._toastMessage = undefined;
      this.requestUpdate();
    });
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

  addMessage(message) {
    if (!message || !message.text) {
      throw new Error("[Porsche Design System] p-toast empty text provided to addMessage().");
    }
    this._toastMessage = {
      text: String(message.text).replace(/<(?!br)[^>]*>/g, ""),
      state: message.state || "info",
    };
    this.requestUpdate();
  }

  render() {
    const toast = this._toastMessage;
    return toast
      ? html`<style .innerHTML="${this.cssText}"></style><p-toast-item text="${toast.text}" state="${toast.state}"></p-toast-item>`
      : html`<style .innerHTML="${this.cssText}"></style><slot></slot>`;
  }
}
