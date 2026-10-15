import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitInlineNotificationProps {
  heading?: string;
  headingTag?: string;
  description?: string;
  state?: string;
  dismissButton?: any;
  actionLabel?: string;
  actionLoading?: any;
  actionIcon?: string;
}

@customElement("lit-inline-notification")
export default class LitInlineNotification extends LitElement {
  static styles = css`
      :host {
          display: block;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() state: any;
  @property() heading: any;
  @property() actionLabel: any;
  @property() dismissButton: any;
  @property() headingTag: any;
  @property() description: any;
  @property() actionIcon: any;
  @property() actionLoading: any;

  get cssText() {
    const visual = this.state ?? this.getAttribute("state") ?? "info";
    const heading = this.heading ?? this.getAttribute("heading") ?? "";
    const hasHeadingSlot = !!this.querySelector('[slot="heading"]');
    const hasHeading = !!(heading || hasHeadingSlot);
    const actionLabel = this.actionLabel ?? this.getAttribute("action-label") ?? this.getAttribute("actionlabel") ?? "";
    const hasAction = !!actionLabel;
    let dismiss: any = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");
    if (dismiss === false || dismiss === "false") {
      dismiss = false;
    } else {
      dismiss = true;
    }
    const bgMap: any = {
      info: "var(--p-color-info-frosted)",
      success: "var(--p-color-success-frosted)",
      warning: "var(--p-color-warning-frosted)",
      error: "var(--p-color-error-frosted)",
    };
    const colorMap: any = {
      info: "var(--p-color-info)",
      success: "var(--p-color-success)",
      warning: "var(--p-color-warning)",
      error: "var(--p-color-error)",
    };
    const maskMap: any = {
      info: 'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9m-.75 4.5h1.5V9h-1.5zm1.5 8.5h-1.5v-6h1.5z"/></svg>\')',
      success:
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m-1.26 12.69-3.8-3.8 1.07-1.05 2.73 2.73 5.25-5.26 1.06 1.06z"/></svg>\')',
      warning:
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.58 18.26 13.3 3.75A1.5 1.5 0 0 0 12 3a1.5 1.5 0 0 0-1.3.75l-8.28 14.5a1.5 1.5 0 0 0 0 1.5c.28.47.76.75 1.3.75h16.56a1.5 1.5 0 0 0 1.3-2.25M13 17.5h-2v-2h2zm-.4-3.5h-1.2L11 8.5h2z"/></svg>\')',
      error:
        'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 3H6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4l2 2 2-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 3.5-.4 5.5h-1.2L11 6.5zm-2 7h2v2h-2z"/></svg>\')',
    };
    const closeMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>\') center/contain no-repeat';
    const iconMask =
      (maskMap[visual] || maskMap.info) + " center/contain no-repeat";
    const bg = bgMap[visual] || bgMap.info;
    const color = colorMap[visual] || colorMap.info;
    const placeSelf = hasHeading ? "center" : "flex-start";
    const descGrid = hasHeading ? "2/2" : "1/2";
    const descMargin = hasHeading ? "var(--p-spacing-static-xs)" : "0px";
    let out =
      ":host{display:block}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}";
    if (hasHeading) {
      out +=
        'slot[name="heading"],h1,h2,h3,h4,h5,h6{all:unset;grid-area:1/2;font:var(--p-font-weight-semibold) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)}';
    }
    out +=
      'slot:not([name]),slot[name="description"],p{all:unset;grid-area:' +
      descGrid +
      ";margin-top:" +
      descMargin +
      ";font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary)}" +
      ".notification{display:grid;grid-template:repeat(3, auto) / auto minmax(0, 1fr) repeat(2, auto);padding:calc(var(--p-spacing-static-sm) + var(--p-spacing-fluid-sm));border-radius:var(--p-radius-2xl);background:" +
      bg +
      ";-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)}";
    if (dismiss) {
      out +=
        ".dismiss{all:unset;box-sizing:border-box;display:grid;place-items:center;padding:6px;border-radius:var(--p-radius-full);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);background-color:var(--p-color-frosted-strong);color:var(--p-color-primary);cursor:pointer;-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted);transition:background-color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out), color var(--p-transition-duration,var(--p-duration-sm)) var(--p-ease-in-out);grid-area:1/4/-1;align-self:flex-start;margin-block:calc(-6 * var(--p-spacing-static-2xs));margin-inline:var(--p-spacing-static-md) calc(-6 * var(--p-spacing-static-2xs))}" +
        ".dismiss:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
        '.dismiss::before{content:"";width:var(--p-leading-normal);height:var(--p-leading-normal);-webkit-mask:' +
        closeMask +
        ";mask:" +
        closeMask +
        ";background:currentColor}" +
        ".dismiss span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}";
    }
    if (hasAction) {
      out +=
        ".action{grid-area:3/1/auto/-1;margin-top:var(--p-spacing-static-md);align-self:flex-start}";
    }
    out +=
      "@media(min-width:760px){.notification::before{grid-area:1/1;place-self:" +
      placeSelf +
      ';content:"";width:1.5rem;height:1.5rem;margin-inline-end:var(--p-spacing-static-sm);background:' +
      color +
      ";-webkit-mask:" +
      iconMask +
      ";mask:" +
      iconMask +
      "}@media(forced-colors:active){.notification::before{background:CanvasText}}";
    if (hasAction) {
      out +=
        ".action{grid-area:1/3;margin-top:0px;margin-inline-start:var(--p-spacing-static-md)}";
    }
    out += "}";
    out +=
      "@media(forced-colors:active){.notification{outline:2px solid CanvasText;outline-offset:-2px}";
    if (dismiss) {
      out +=
        ".dismiss{forced-color-adjust:none;background:Canvas;box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.dismiss:focus-visible{outline-color:Highlight}";
    }
    out += "}";
    if (dismiss) {
      out +=
        "@media(hover:hover){.dismiss:hover{background-color:var(--p-color-frosted)}@media(forced-colors:active){.dismiss:hover{background:Canvas}}}";
    }
    return out;
  }
  get headingText() {
    return this.heading ?? this.getAttribute("heading") ?? "";
  }
  get headingTagValue() {
    return this.headingTag ?? this.getAttribute("heading-tag") ?? this.getAttribute("headingtag") ?? "h5";
  }
  get descriptionText() {
    return this.description ?? this.getAttribute("description") ?? "";
  }
  get actionLabelText() {
    return this.actionLabel ?? this.getAttribute("action-label") ?? this.getAttribute("actionlabel") ?? "";
  }
  get actionIconName() {
    return this.actionIcon ?? this.getAttribute("action-icon") ?? this.getAttribute("actionicon") ?? "arrow-right";
  }
  get actionLoadingFlag() {
    const loading = this.actionLoading ?? this.getAttribute("action-loading") ?? this.getAttribute("actionloading");
    return loading === true || loading === "true" || loading === "";
  }
  get showDismiss() {
    const dismiss = this.dismissButton ?? this.getAttribute("dismiss-button") ?? this.getAttribute("dismissbutton");
    if (dismiss === false || dismiss === "false") return false;
    return true;
  }
  get hasHeadingSlot() {
    return !!this.querySelector('[slot="heading"]');
  }
  get headingAria() {
    const heading = this.heading ?? this.getAttribute("heading") ?? "";
    if (heading) return heading;
    return (this.querySelector('[slot="heading"]')?.textContent ?? "").trim();
  }
  get roleName() {
    const visual = this.state ?? this.getAttribute("state") ?? "info";
    return visual === "warning" || visual === "error" ? "alert" : "status";
  }
  get ariaLive() {
    const visual = this.state ?? this.getAttribute("state") ?? "info";
    return visual === "warning" || visual === "error" ? "assertive" : "polite";
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  render() {
    const heading = this.headingText;
    const tag = this.headingTagValue;
    let headingEl = nothing;
    if (heading) {
      if (tag === "h1") headingEl = html`<h1>${heading}</h1>`;
      else if (tag === "h2") headingEl = html`<h2>${heading}</h2>`;
      else if (tag === "h3") headingEl = html`<h3>${heading}</h3>`;
      else if (tag === "h4") headingEl = html`<h4>${heading}</h4>`;
      else if (tag === "h6") headingEl = html`<h6>${heading}</h6>`;
      else headingEl = html`<h5>${heading}</h5>`;
    } else {
      headingEl = html`<slot name="heading"></slot>`;
    }
    const desc = this.descriptionText
      ? html`<p>${this.descriptionText}</p>`
      : html`<slot></slot>`;
    const action = this.actionLabelText
      ? html`<p-button-pure class="action" icon=${this.actionIconName || nothing} ?loading=${this.actionLoadingFlag}>${this.actionLabelText}</p-button-pure>`
      : nothing;
    const dismiss = this.showDismiss
      ? html`<button class="dismiss" type="button" aria-description=${this.headingAria || nothing}><span>Close notification</span></button>`
      : nothing;
    return html`<style .innerHTML="${this.cssText}"></style><div class="notification" role=${this.roleName} aria-live=${this.ariaLive} aria-label=${this.headingAria || nothing}>${headingEl}${desc}${action}${dismiss}</div>`;
  }
}
