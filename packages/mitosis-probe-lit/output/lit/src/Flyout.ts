import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";

export interface LitFlyoutProps {
  open?: any;
  position?: string;
  disableBackdropClick?: any;
  background?: string;
  backdrop?: string;
  footerBehavior?: string;
  fullscreen?: any;
  aria?: any;
}

@customElement("lit-flyout")
export default class LitFlyout extends LitElement {
  static styles = css`
      :host {
          display: contents;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() open: any;
  @property() background: any;
  @property() backdrop: any;
  @property() position: any;
  @property() footerBehavior: any;
  @property() fullscreen: any;
  @property() aria: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const isOpen = isTrue(this.open ?? this.getAttribute("open"));
    const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";
    const backdrop = (this.backdrop ?? this.getAttribute("backdrop")) === "shading" ? "shading" : "blur";
    const position = (this.position ?? this.getAttribute("position")) === "start" ? "start" : "end";
    const isStart = position === "start";
    const isFooterFixed = (this.footerBehavior ?? this.getAttribute("footer-behavior") ?? this.getAttribute("footerbehavior")) === "fixed";
    let fullscreen: any = this.fullscreen ?? this.getAttribute("fullscreen");
    if (fullscreen == null || fullscreen === "") fullscreen = false;
    if (typeof fullscreen === "string" && fullscreen.trim().charAt(0) === "{") {
      try {
        fullscreen = JSON.parse(fullscreen.replace(/'/g, '"'));
      } catch (e) {
        try {
          fullscreen = JSON.parse(
            fullscreen
              .replace(/'/g, '"')
              .replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g, '$1"$2":')
          );
        } catch (e2) {
          fullscreen = false;
        }
      }
    }
    const dialogBg =
      background === "surface"
        ? "var(--p-color-surface)"
        : "var(--p-color-canvas)";
    const dismissBg = dialogBg;
    const dismissHover =
      background === "surface"
        ? "var(--p-color-canvas)"
        : "var(--p-color-surface)";
    const closeMask =
      'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18 6.706-5.294 5.294 5.294 5.294-.706.706-5.294-5.294-5.294 5.294-.706-.706 5.294-5.294-5.294-5.294.706-.706 5.294 5.294 5.294-5.294z"/></svg>\') center/contain no-repeat';
    const durMd = "var(--p-transition-duration,var(--p-duration-md))";
    const durSm = "var(--p-transition-duration,var(--p-duration-sm))";
    const durLg = "var(--p-transition-duration,var(--p-duration-lg))";
    const delay = isOpen ? "var(--p-transition-duration,0s)" : durMd;
    const ease = isOpen ? "var(--p-ease-in)" : "var(--p-ease-out)";
    const dialogDur = isOpen ? durLg : durMd;
    const panelDur = isOpen ? durMd : durSm;
    let dialogVis = isOpen
      ? "width:100dvw;height:100dvh;visibility:inherit;pointer-events:auto;background:var(--p-color-backdrop)"
      : "width:0px;height:0px;visibility:hidden;pointer-events:none;background:transparent";
    if (isOpen && backdrop === "blur") {
      dialogVis +=
        ";-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)";
    }
    const dialogTrans =
      "visibility 0s linear " +
      delay +
      ", width 0s linear " +
      delay +
      ", height 0s linear " +
      delay +
      ", background-color " +
      dialogDur +
      " " +
      ease +
      ", -webkit-backdrop-filter " +
      dialogDur +
      " " +
      ease +
      ", backdrop-filter " +
      dialogDur +
      " " +
      ease;
    const scrollerClosed = isOpen
      ? "opacity:1;transform:translate3d(0,0,0)"
      : isStart
      ? "opacity:0;transform:translate3d(-100%,0,0)"
      : "opacity:0;transform:translate3d(100%,0,0)";
    const scrollerRtl = isOpen
      ? ""
      : isStart
      ? ".scroller:dir(rtl){transform:translate3d(100%,0,0)}"
      : ".scroller:dir(rtl){transform:translate3d(-100%,0,0)}";
    const scrollerInset = isStart
      ? "inset-block:0;inset-inline-start:0"
      : "inset-block:0;inset-inline-end:0";
    const docked = isStart
      ? "width:var(--p-flyout-width,auto);min-width:320px;max-width:100vw;" +
        "clip-path:inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0);" +
        "border-start-end-radius:var(--p-radius-3xl);border-end-end-radius:var(--p-radius-3xl)"
      : "width:var(--p-flyout-width,auto);min-width:320px;max-width:100vw;" +
        "clip-path:inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl));" +
        "border-start-start-radius:var(--p-radius-3xl);border-end-start-radius:var(--p-radius-3xl)";
    const stretched =
      "width:100dvw;min-width:auto;max-width:none;border-radius:0;clip-path:none";
    const dockedRtl = isStart
      ? ".flyout:dir(rtl){clip-path:inset(0 round var(--p-radius-3xl) 0 0 var(--p-radius-3xl))}"
      : ".flyout:dir(rtl){clip-path:inset(0 round 0 var(--p-radius-3xl) var(--p-radius-3xl) 0)}";
    const stretchedRtl = ".flyout:dir(rtl){clip-path:none}";
    const hcmBorder = isStart
      ? "@media(forced-colors:active){.flyout{border-inline-end:2px solid CanvasText}}"
      : "@media(forced-colors:active){.flyout{border-inline-start:2px solid CanvasText}}";
    const minWidth: any = {
      xs: 480,
      s: 760,
      m: 1000,
      l: 1300,
      xl: 1760,
      xxl: 1920,
    };
    const fsRule = (v: any) =>
      v === true || v === "true" ? stretched : docked;
    const fsRtl = (v: any) =>
      v === true || v === "true" ? stretchedRtl : dockedRtl;
    const fsHcm = (v: any) => (v === true || v === "true" ? "" : hcmBorder);
    let flyoutBox = docked;
    let flyoutMedia = dockedRtl + hcmBorder;
    if (typeof fullscreen === "object" && fullscreen !== null) {
      flyoutBox = fsRule(fullscreen.base);
      flyoutMedia = fsRtl(fullscreen.base) + fsHcm(fullscreen.base);
      for (const bp of Object.keys(fullscreen)) {
        if (bp === "base" || !minWidth[bp]) continue;
        flyoutMedia +=
          "@media(min-width:" +
          minWidth[bp] +
          "px){.flyout{" +
          fsRule(fullscreen[bp]) +
          "}" +
          fsRtl(fullscreen[bp]) +
          fsHcm(fullscreen[bp]) +
          "}";
      }
    } else if (isTrue(fullscreen)) {
      flyoutBox = stretched;
      flyoutMedia = stretchedRtl;
    }
    const headerRadius = isStart
      ? "border-start-end-radius:var(--p-radius-3xl)"
      : "border-start-start-radius:var(--p-radius-3xl)";
    const fixedRows = isFooterFixed ? "grid-template-rows:auto 1fr auto;" : "";
    let out =
      ":host{display:contents;" +
      "--ref-p-flyout-pt:var(--p-spacing-fluid-md) !important;" +
      "--ref-p-flyout-pb:calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) !important;" +
      "--ref-p-flyout-px:var(--p-spacing-fluid-lg) !important;" +
      "--pds-internal-grid-outer-column:calc(var(--p-spacing-fluid-lg) - clamp(16px, 1.25vw + 12px, 36px)) !important;" +
      "--pds-internal-grid-margin:calc(var(--p-spacing-fluid-lg) * -1) !important;" +
      "--pds-internal-grid-width-min:auto !important;" +
      "--pds-internal-grid-width-max:none !important;" +
      "--_p-dialog-a:" +
      dialogBg +
      " !important}" +
      ":host([hidden]){display:none !important}" +
      "slot{display:block}" +
      "slot:first-of-type{grid-row-start:1}" +
      "slot:not([name]){grid-column:2/3;z-index:0}" +
      "slot[name=header]{grid-column:1/-1;z-index:1;position:sticky;top:0;" +
      "margin-block:calc(-1 * var(--p-spacing-fluid-md)) calc(-1 * var(--p-spacing-static-md));" +
      "padding:var(--p-spacing-fluid-md) var(--p-spacing-fluid-lg) var(--p-spacing-static-md);" +
      "background:linear-gradient(180deg,var(--_p-dialog-a) 0%,var(--_p-dialog-a) 80%,transparent 100%);" +
      headerRadius +
      "}" +
      "slot[name=footer]{grid-column:1/-1;z-index:2;position:sticky;bottom:-.1px;" +
      "margin-block:calc(-1 * calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)));" +
      "padding:calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)) var(--p-spacing-fluid-lg);" +
      "background:linear-gradient(0deg,var(--_p-dialog-a) 0%,var(--_p-dialog-a) 20%,transparent 80%)}" +
      'slot[name=footer][data-stuck]::after{content:"";z-index:-1;position:absolute;' +
      "inset:calc(calc(calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md)) - var(--p-radius-3xl)) - 12 * var(--p-spacing-static-2xs)) calc(var(--p-spacing-fluid-lg) - 12 * var(--p-spacing-static-2xs));" +
      "background:var(--p-color-frosted);border-radius:var(--p-radius-2xl);" +
      "-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)}" +
      "slot[name=sub-footer]{grid-column:1/-1;z-index:3;padding-inline:var(--p-spacing-fluid-lg);background-color:var(--_p-dialog-a)}" +
      "dialog{all:unset;position:fixed;inset:0;max-width:100dvw;max-height:100dvh;overflow:hidden;" +
      "display:block;user-select:text;outline:0;" +
      dialogVis +
      ";transition:" +
      dialogTrans +
      ";overlay:none}" +
      "dialog:modal{overlay:auto}" +
      "dialog::backdrop{display:none}" +
      "@supports (overlay: auto) and (transition-behavior: allow-discrete){dialog{transition:" +
      dialogTrans +
      ", overlay " +
      dialogDur +
      " " +
      ease +
      " allow-discrete}}" +
      ".scroller{position:absolute;isolation:isolate;display:grid;" +
      scrollerInset +
      ";overflow:hidden auto;overscroll-behavior-y:none;background:rgba(255,255,255,.01);" +
      scrollerClosed +
      ";transition:opacity " +
      panelDur +
      " " +
      ease +
      ", transform " +
      panelDur +
      " " +
      ease +
      "}" +
      scrollerRtl +
      ".scroller:focus-visible{outline:none}" +
      ".flyout{position:relative;display:grid;" +
      "grid-template:auto/var(--p-spacing-fluid-sm) minmax(0,1fr) var(--p-spacing-fluid-sm);" +
      "gap:var(--p-spacing-fluid-md) calc(var(--p-spacing-fluid-lg) - var(--p-spacing-fluid-sm));" +
      "padding-top:var(--p-spacing-fluid-md);" +
      "padding-bottom:calc(var(--p-radius-3xl) + var(--p-spacing-fluid-md));" +
      "align-content:flex-start;transform:translate3d(0,0,0);color:var(--p-color-primary);background:var(--_p-dialog-a);" +
      fixedRows +
      flyoutBox +
      "}" +
      flyoutMedia +
      ".dismiss{all:unset;box-sizing:border-box;display:grid;place-items:center;padding:6px;" +
      "border-radius:var(--p-radius-full);" +
      "font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);" +
      "background-color:" +
      dismissBg +
      ";color:var(--p-color-primary);cursor:pointer;" +
      "transition:background-color " +
      durSm +
      " var(--p-ease-in-out), color " +
      durSm +
      " var(--p-ease-in-out);grid-area:1/3;z-index:5;position:sticky;top:var(--p-spacing-fluid-sm);" +
      "margin-top:calc(-1 * var(--p-spacing-fluid-md) + var(--p-spacing-fluid-sm));" +
      "margin-inline-end:var(--p-spacing-fluid-sm);place-self:flex-start flex-end}" +
      ".dismiss:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      '.dismiss::before{content:"";width:var(--p-leading-normal);height:var(--p-leading-normal);' +
      "-webkit-mask:" +
      closeMask +
      ";mask:" +
      closeMask +
      ";background:currentColor}" +
      ".dismiss span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
      "@media(forced-colors:active){.dismiss{forced-color-adjust:none;background:Canvas;box-shadow:inset 0 0 0 2px ButtonBorder;color:ButtonText}.dismiss:focus-visible{outline-color:Highlight}}" +
      "@media(hover:hover){.dismiss:hover{background-color:" +
      dismissHover +
      "}@media(forced-colors:active){.dismiss:hover{background:Canvas}}}";
    return out;
  }
  get isOpenFlag() {
    const open = this.open ?? this.getAttribute("open");
    return open === true || open === "true" || open === "";
  }
  get ariaLabelText() {
    const raw = this.aria ?? this.getAttribute("aria");
    if (raw && typeof raw === "object" && raw["aria-label"]) return raw["aria-label"];
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        const parsed = JSON.parse(raw.replace(/'/g, '"'));
        return parsed["aria-label"] || "";
      } catch (e) {
        return "";
      }
    }
    return "";
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this._headerResize?.disconnect();
    super.disconnectedCallback();
  }

  updated() {
    const dialog = this.renderRoot?.querySelector("dialog");
    if (!dialog) return;
    if (this.isOpenFlag) {
      if (!dialog.open) {
        dialog.inert = true;
        dialog.showModal();
        dialog.inert = false;
        dialog.focus();
      }
    } else if (dialog.open) {
      dialog.close();
    }
    dialog.inert = !this.isOpenFlag;
    if (this.shadowRoot && "adoptedStyleSheets" in this.shadowRoot && !this._stickySheet) {
      this._stickySheet = new CSSStyleSheet();
      this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this._stickySheet];
      this._stickySheet.replaceSync(":host{--p-flyout-sticky-top:0px}");
    }
    const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]');
    const headerEl = headerSlot?.assignedElements?.()[0];
    if (headerEl && this._stickySheet && !this._headerResize) {
      this._headerResize = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this._stickySheet.replaceSync(":host{--p-flyout-sticky-top:" + Math.floor(entry.target.getBoundingClientRect().height) + "px}");
        }
      });
      this._headerResize.observe(headerEl);
    }
  }

  render() {
    const dismiss = html`<button class="dismiss" type="button"><span>Dismiss flyout</span></button>`;
    const label = this.ariaLabelText || nothing;
    return html`<style .innerHTML="${this.cssText}"></style><dialog ?inert=${!this.isOpenFlag} tabindex="-1" aria-modal="true" aria-label=${label}><div class="scroller"><div class="flyout">${dismiss}<slot name="header"></slot><slot></slot><slot name="footer"></slot><slot name="sub-footer"></slot></div></div></dialog>`;
  }
}
