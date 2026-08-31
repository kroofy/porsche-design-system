const ICON =
  'url(\'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.5 10v6h-1v-6zm0-2v1h-1V8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16m0-1c-4.95 0-9 4.05-9 9s4.05 9 9 9 9-4.05 9-9-4.05-9-9-9"/></svg>\') center/contain no-repeat';

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators";
import { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from "@floating-ui/dom";

export interface LitPopoverProps {
  open?: any;
  direction?: string;
  description?: string;
  compact?: any;
  aria?: any;
}

@customElement("p-popover")
export default class LitPopover extends LitElement {
  @property() aria: any;
  @property() direction: any;
  static styles = css`
      :host {
          display: contents;
          margin: 0;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() open: any;
  @property() compact: any;
  @property() description: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const isOpen = this.effectiveOpen();
    const compact = isTrue(this.compact);
    const skipEntry = this._isInitialRender !== false;
    const pad = compact
      ? "var(--p-spacing-static-sm)"
      : "var(--p-spacing-static-md)";
    const radius = compact ? "var(--p-radius-lg)" : "var(--p-radius-xl)";
    const ease = isOpen ? "var(--p-ease-in)" : "var(--p-ease-out)";
    const dur = "var(--p-transition-duration,var(--p-duration-sm))";
    const opacity = isOpen ? "1" : "0";
    let out =
      ":host{display:contents;margin:0}" +
      ":host([hidden]){display:none !important}" +
      ".wrap{display:contents}" +
      "slot:not([name]), p{display:block;margin:0;min-width:0;min-height:0;max-width:inherit;max-height:inherit;box-sizing:border-box;padding-block:var(--p-popover-py," +
      pad +
      ");padding-inline:var(--p-popover-px," +
      pad +
      ");overflow:hidden auto;overscroll-behavior-y:none}" +
      "button{all:unset;margin:inherit;display:inline-grid;vertical-align:top;font:var(--p-typescale-sm) var(--p-font-porsche-next);width:var(--p-leading-normal);height:var(--p-leading-normal);flex:none;cursor:pointer}" +
      "button:focus-visible::before{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      'button::before{grid-area:1/1;content:"";margin:-2px;transition:background-color ' +
      dur +
      " var(--p-ease-in-out);border-radius:var(--p-radius-full)";
    if (isOpen) {
      out +=
        ";background:var(--p-color-frosted);-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)";
    }
    out +=
      "}" +
      'button::after{grid-area:1/1;content:"";-webkit-mask:' +
      ICON +
      ";mask:" +
      ICON +
      ";background:var(--p-color-primary)}" +
      "[popover]{all:unset;position:fixed;top:0;left:0;filter:drop-shadow(0 0 16px rgba(0,0,0,.3));backdrop-filter:drop-shadow(0 0 transparent);border-radius:var(--p-popover-radius," +
      radius +
      ");background:var(--p-color-canvas);font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);color:var(--p-color-primary);width:var(--p-popover-w,max-content);height:var(--p-popover-h,auto);min-width:var(--p-popover-min-w,0px);min-height:var(--p-popover-min-h,auto);max-width:var(--p-popover-max-w,min(calc(100dvw - 16px), 48ch));max-height:var(--p-popover-max-h,calc(100dvh - 16px));opacity:" +
      opacity +
      ";transition:opacity " +
      dur +
      " " +
      ease +
      ";overlay:none;display:none}" +
      "[popover]:popover-open{overlay:auto;display:grid}" +
      "[popover]::backdrop{display:none}" +
      "@media(forced-colors:active){button::after{background:ButtonText}button:focus-visible::before{outline-color:Highlight}[popover]{outline:2px solid CanvasText;outline-offset:-2px}}" +
      "@media(hover:hover){button:hover::before{background:var(--p-color-frosted-strong);-webkit-backdrop-filter:var(--p-blur-frosted);backdrop-filter:var(--p-blur-frosted)}}" +
      "@supports (color: oklch(from red l c h)){[popover]{background:hsl(from var(--p-color-canvas) h 0% calc(l + 14))}}" +
      "@supports (overlay: auto) and (transition-behavior: allow-discrete){[popover]{transition:opacity " +
      dur +
      " " +
      ease +
      ",overlay " +
      dur +
      " " +
      ease +
      " allow-discrete, display " +
      dur +
      " " +
      ease +
      " allow-discrete}}" +
      ".arrow{position:absolute;width:24px;height:12px;clip-path:polygon(50% 0, 100% 110%, 0 110%);background:inherit}" +
      "@media(forced-colors:active){.arrow{background:CanvasText}}";
    if (isOpen && !skipEntry) {
      out += "@starting-style{[popover]{opacity:0}}";
    }
    return out;
  }
  get descriptionText() {
    return this.description ?? this.getAttribute("description") ?? "";
  }

  _isInitialRender = true;
  _isOpen = false;
  _cleanUpAutoUpdate;
  _boundTrigger;

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("click", this._onHostClick);
    this.addEventListener("slotchange", () => this.requestUpdate());
    queueMicrotask(() => this.requestUpdate());
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this.removeEventListener("click", this._onHostClick);
    this._cleanUpAutoUpdate?.();
    this._cleanUpAutoUpdate = undefined;
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  _onHostClick = (e) => {
    if (this.isControlled()) return;
    if (e.target?.closest?.('[slot="button"]')) {
      this._isOpen = !this._isOpen;
      this.requestUpdate();
    }
  };

  isControlled() {
    if (this.open === true || this.open === false) return true;
    return this.hasAttribute("open");
  }

  effectiveOpen() {
    if (this.isControlled()) {
      const raw = this.open ?? this.getAttribute("open");
      return raw === true || raw === "true" || raw === "";
    }
    return !!this._isOpen;
  }

  hasSlottedButton() {
    return !!this.querySelector('[slot="button"]');
  }

  triggerElement() {
    const root = this.renderRoot;
    const button = root?.querySelector("button");
    if (button) return button;
    const slot = root?.querySelector('slot[name="button"]');
    return slot?.assignedElements?.()[0] ?? this.querySelector('[slot="button"]');
  }

  async positionPopover() {
    const pop = this.renderRoot?.querySelector("[popover]");
    const arrowEl = this.renderRoot?.querySelector(".arrow");
    const trigger = this.triggerElement();
    if (!pop || !arrowEl || !trigger) return;
    const { x, y, placement, middlewareData } = await computePosition(trigger, pop, {
      placement: this.direction ?? this.getAttribute("direction") ?? "bottom",
      strategy: "fixed",
      middleware: [
        offset(18),
        shift({
          padding: 8,
          limiter: limitShift({
            offset: ({ rects }) => (rects.reference.width > 33 ? 0 : rects.reference.width),
          }),
        }),
        flip({
          padding: 8,
          fallbackAxisSideDirection: "end",
        }),
        arrow({
          element: arrowEl,
          padding: Number.parseFloat(getComputedStyle(pop).borderRadius) || 12,
        }),
      ],
    });
    const placementVertical = placement === "top" || placement === "bottom";
    const placementTopLeft = placement === "top" || placement === "left";
    Object.assign(pop.style, { left: x + "px", top: y + "px" });
    const { x: xArrow, y: yArrow } = middlewareData.arrow || {};
    Object.assign(arrowEl.style, {
      clipPath: placementVertical ? "polygon(50% 0, 100% 110%, 0 110%)" : "polygon(0 50%, 110% 0, 110% 100%)",
      width: placementVertical ? "24px" : "12px",
      height: placementVertical ? "12px" : "24px",
      transform: "rotate(" + (placementTopLeft ? "180deg" : "0") + ")",
      left: ["right", "bottom", "top"].includes(placement)
        ? xArrow != null
          ? xArrow + "px"
          : "-12px"
        : "",
      right: placement === "left" ? (xArrow != null ? xArrow + "px" : "-12px") : "",
      top: ["bottom", "left", "right"].includes(placement)
        ? yArrow != null
          ? yArrow + "px"
          : "-12px"
        : "",
      bottom: placement === "top" ? (yArrow != null ? yArrow + "px" : "-12px") : "",
    });
  }

  syncAutoUpdate(active) {
    const trigger = this.triggerElement();
    const pop = this.renderRoot?.querySelector("[popover]");
    if (active && this._cleanUpAutoUpdate && this._boundTrigger !== trigger) {
      this._cleanUpAutoUpdate();
      this._cleanUpAutoUpdate = undefined;
    }
    if (active && trigger && pop && !this._cleanUpAutoUpdate) {
      this._cleanUpAutoUpdate = autoUpdate(trigger, pop, () => this.positionPopover());
      this._boundTrigger = trigger;
    } else if (!active && this._cleanUpAutoUpdate) {
      this._cleanUpAutoUpdate();
      this._cleanUpAutoUpdate = undefined;
      this._boundTrigger = undefined;
    }
  }

  async updated() {
    const pop = this.renderRoot?.querySelector("[popover]");
    const open = this.effectiveOpen();
    if (pop) {
      if (open) {
        const nested = [...this.querySelectorAll("p-popover")];
        await Promise.all(nested.map((el) => el.updateComplete).filter(Boolean));
        if (pop.matches(":popover-open")) {
          if (nested.length) {
            pop.hidePopover();
            pop.showPopover();
          }
        } else {
          pop.showPopover();
        }
      } else if (pop.matches(":popover-open")) {
        pop.hidePopover();
      }
    }
    this.syncAutoUpdate(open);
    if (open) await this.positionPopover();
    this._isInitialRender = false;
  }

  render() {
    const open = this.effectiveOpen();
    const description = this.description ?? this.getAttribute("description") ?? "";
    const hasDescription = !!(description && description !== "undefined");
    const trigger = this.hasSlottedButton()
      ? html`<slot name="button"></slot>`
      : html`<button type="button" aria-label="More information" aria-details="popover" aria-expanded=${open ? "true" : "false"} @click=${() => {
          if (!this.isControlled()) {
            this._isOpen = !this._isOpen;
            this.requestUpdate();
          }
        }}></button>`;
    const body = hasDescription ? html`<p>${description}</p>` : html`<slot></slot>`;
    return html`<style .innerHTML="${this.cssText}"></style>${trigger}<div id="popover" popover="manual" ?inert=${!open}><div class="arrow"></div>${body}</div>`;
  }
}
