import { LitElement, html, css, nothing } from "lit";
import { Splide } from "@splidejs/splide";
import { customElement, property, state, query } from "lit/decorators";

export interface LitCarouselProps {
  heading?: any;
  headingSize?: any;
  description?: any;
  alignHeader?: any;
  alignControls?: any;
  rewind?: any;
  width?: any;
  slidesPerPage?: any;
  pagination?: any;
  aria?: any;
  intl?: any;
  activeSlideIndex?: any;
  skipLinkTarget?: any;
  focusOnCenterSlide?: any;
  gradient?: any;
  trimSpace?: any;
}

@customElement("lit-carousel")
export default class LitCarousel extends LitElement {
  @property() trimSpace: any;
  @property() focusOnCenterSlide: any;
  @property() skipLinkTarget: any;
  @property() activeSlideIndex: any;
  @property() intl: any;
  @property() aria: any;
  @property() slidesPerPage: any;
  @property() rewind: any;
  static styles = css`
      :host {
          display: flex;
          flex-direction: column;
        }
        :host([hidden]) {
          display: none !important;
        }
`;

  @property() heading: any;
  @property() description: any;
  @property() headingSize: any;
  @property() width: any;
  @property() alignHeader: any;
  @property() alignControls: any;
  @property() gradient: any;
  @property() pagination: any;

  get cssText() {
    const isTrue = (v: any) => v === true || v === "true" || v === "";
    const parse = (raw: any, fallback: any) => {
      if (raw === undefined || raw === null || raw === "") return fallback;
      if (typeof raw === "string" && raw.charAt(0) === "{") {
        try {
          return JSON.parse(raw.replace(/'/g, '"'));
        } catch (e) {
          return fallback;
        }
      }
      return raw;
    };
    const heading = (this.heading ?? this.getAttribute("heading")) || "";
    const description = (this.description ?? this.getAttribute("description")) || "";
    const hasHeading = !!heading || !!this.querySelector(":scope > [slot=heading]");
    const hasDescription = !!description || !!this.querySelector(":scope > [slot=description]");
    const hasControls = !!this.querySelector(":scope > [slot=controls]");
    const headingSize = (this.headingSize ?? this.getAttribute("heading-size") ?? this.getAttribute("headingsize")) || "x-large";
    const width = (this.width ?? this.getAttribute("width")) || "basic";
    const alignHeader = (this.alignHeader ?? this.getAttribute("align-header") ?? this.getAttribute("alignheader")) || "start";
    const alignControls = (this.alignControls ?? this.getAttribute("align-controls") ?? this.getAttribute("aligncontrols")) || "auto";
    const gradient = isTrue(this.gradient ?? this.getAttribute("gradient"));
    const pagination = parse(this.pagination ?? this.getAttribute("pagination"), false);
    const hasPagination =
      pagination === true ||
      pagination === "true" ||
      (pagination && typeof pagination === "object");
    const isCenter = alignHeader === "center";
    const slidesPerPageRaw = this.slidesPerPage ?? this.getAttribute("slides-per-page") ?? this.getAttribute("slidesperpage") ?? 1;
      const parsedSpp = parse(slidesPerPageRaw, 1);
      const sppNow = typeof parsedSpp === "object" && parsedSpp
        ? (window.matchMedia("(min-width:1000px)").matches && parsedSpp.m !== undefined ? parsedSpp.m
          : window.matchMedia("(min-width:760px)").matches && parsedSpp.s !== undefined ? parsedSpp.s
          : parsedSpp.base !== undefined ? parsedSpp.base : 1)
        : parsedSpp;
      const slideKids = [...this.children].filter((el) => el.slot !== "heading" && el.slot !== "description" && el.slot !== "controls" && !String(el.slot || "").startsWith("slide-") || String(el.slot || "").startsWith("slide-"));
      const slideCount = [...this.children].filter((el) => {
        const slot = el.getAttribute("slot");
        return slot !== "heading" && slot !== "description" && slot !== "controls";
      }).length;
      const sppNum = sppNow === "auto" ? 1 : Math.round(Number(sppNow) || 1);
      const amountOfPages = slideCount === 0 ? 0 : slideCount < sppNum ? 1 : slideCount - sppNum + 1;
      const hasNavigation = sppNow === "auto" || amountOfPages > 1;
    const focusCenter = isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
      const isInfinite = (focusCenter ? slideCount : amountOfPages) > 5;
    const col = width === "extended" ? "1" : "2";
    const padBase = "max(22px, 10.625vw - 12px)";
    const padS =
      "calc(calc(5vw - 16px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((100vw - calc(5vw - 16px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * " +
      col +
      ")";
    const padXxl =
      "calc(max(0px, 50vw - 2560px / 2) + min(50vw - 880px, 400px) + (clamp(16px, 1.25vw + 12px, 36px) + calc((min(100vw, 2560px) - min(50vw - 880px, 400px) * 2 - clamp(16px, 1.25vw + 12px, 36px) * 15) / 16)) * " +
      col +
      ")";
    const pad = (v: any) =>
      "var(--p-carousel-ps,var(--p-carousel-px," + v + "))";
    const fontSize =
      headingSize === "xx-large"
        ? "var(--p-typescale-2xl)"
        : "var(--p-typescale-xl)";
    let out =
      ":host{display:flex;gap:var(--p-spacing-fluid-md) !important;flex-direction:column !important;box-sizing:content-box !important}" +
      ":host([hidden]){display:none !important}" +
      ":not(:defined,[data-ssr]){visibility:hidden}" +
      "::slotted(*){border-radius:var(--p-carousel-border-radius,var(--p-radius-3xl)) !important}";
    if (hasHeading || hasDescription) {
      out +=
        '.heading,p,::slotted([slot="description"]){grid-column:1/-1 !important;color:var(--p-color-primary) !important' +
        (isCenter
          ? ";text-align:center !important;justify-self:center !important"
          : "") +
        "}";
    }
    if (hasHeading) {
      out +=
        ".heading{max-width:56.25rem !important;margin:0 0 " +
        (hasDescription ? "0" : "var(--p-spacing-fluid-md)") +
        " !important;font:var(--p-font-weight-normal) " +
        fontSize +
        " / var(--p-leading-normal) var(--p-font-porsche-next) !important}" +
        '::slotted([slot="heading"]){margin:0 !important;font:var(--p-font-weight-normal) ' +
        fontSize +
        " / var(--p-leading-normal) var(--p-font-porsche-next) !important}";
    }
    if (hasDescription) {
      out +=
        'p,::slotted([slot="description"]){max-width:34.375rem !important;margin:var(--p-spacing-fluid-sm) 0 var(--p-spacing-fluid-md) !important;font:var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next) !important}';
    }
    if (hasControls) {
      const just =
        alignControls !== "auto"
          ? alignControls
          : isCenter
          ? "center"
          : "start";
      out +=
        'slot[name="controls"]{display:block;grid-column:1/-1;grid-row-start:3;align-self:center;justify-self:' +
        just +
        "}";
    }
    out +=
      ".header{display:grid;padding-inline-start:" +
      pad(padBase) +
      ";padding-inline-end:" +
      pad(padBase) +
      "}" +
      ".nav{display:none;color-scheme:var(--p-carousel-prev-next-color-scheme)}" +
      ".btn{padding:var(--p-spacing-static-sm)}" +
      ".skip-link:not(:focus){opacity:0;pointer-events:none}" +
      ".slide-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
      ".splide{overflow:hidden;padding:4px 0;margin:-4px 0}" +
      ".splide__track{position:relative;padding-block:0px !important;padding-inline-start:" +
      pad(padBase) +
      " !important;padding-inline-end:" +
      pad(padBase) +
      " !important" +
      (gradient
        ? ";-webkit-mask:linear-gradient(90deg,transparent 20%,#000 var(--p-gradient-color-width,33%) calc(100% - var(--p-gradient-color-width,33%)),transparent 80%);mask:linear-gradient(90deg,transparent 20%,#000 var(--p-gradient-color-width,33%) calc(100% - var(--p-gradient-color-width,33%)),transparent 80%)"
        : "") +
      "}" +
      ".splide__list{backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex}" +
      ".splide__slide{backface-visibility:hidden;-webkit-backface-visibility:hidden;flex-shrink:0;transform:translateZ(0);border-radius:var(--p-carousel-border-radius,var(--p-radius-3xl))}" +
      ".splide__slide:focus-visible{outline:2px solid var(--p-color-focus);outline-offset:2px}" +
      ".splide__sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}" +
      ".splide__track--draggable{cursor:grab;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}";
    if (isCenter) {
      out +=
        ".splide:not(.is-overflow) .splide__list{justify-content:center}" +
        ".splide:not(.is-overflow) .splide__slide:last-child{margin-inline-end:0 !important}";
    }
    if (hasPagination && hasNavigation) {
      const justPag = isInfinite ? "flex-start" : "center";
      out +=
        ".pagination-container{display:flex;position:relative;justify-content:" +
        justPag +
        ";width:calc(20px + 8px * 4 + 8px * 4);left:calc(50% - (calc(20px + 8px * 4 + 8px * 4)) / 2);overflow-x:hidden}" +
        ".pagination{display:flex;align-items:center;width:fit-content;height:8px;gap:8px;transition:transform var(--p-transition-duration,var(--p-duration-md))}" +
        ".bullet{border-radius:var(--p-radius-full);background:var(--p-color-contrast-medium);width:8px;height:8px;transition:background-color var(--p-transition-duration,var(--p-duration-md)), width var(--p-transition-duration,var(--p-duration-md))}" +
        ".bullet--active{background:var(--p-color-primary);height:8px;width:20px !important}" +
        '@media (pointer: coarse){.pagination-container{width:calc(20px + 8px * 4 + 16px * 4 + 2 * 8px);left:calc(50% - calc(20px + 8px * 4 + 16px * 4 + 2 * 8px) / 2)}.pagination{height:calc(8px + 2 * 8px);gap:16px}.bullet{position:relative}.bullet::before{content:"";position:absolute;inset:-8px}}' +
        "@media(hover:hover){.bullet{cursor:pointer}}";
    }
    out +=
      "@media(min-width:760px){.header{grid-template-columns:minmax(0px,1fr) auto;padding-inline-start:" +
      pad(padS) +
      ";padding-inline-end:" +
      pad(padS) +
      (hasNavigation ? ";column-gap:var(--p-spacing-static-md)" : "") +
      "}.nav{grid-row-start:3;grid-column-end:-1;display:flex;gap:var(--p-spacing-static-xs);align-self:flex-start}.splide__track{padding-inline-start:" +
      pad(padS) +
      " !important;padding-inline-end:" +
      pad(padS) +
      " !important}}" +
      "@media(min-width:1920px){.header{padding-inline-start:" +
      pad(padXxl) +
      ";padding-inline-end:" +
      pad(padXxl) +
      "}.splide__track{padding-inline-start:" +
      pad(padXxl) +
      " !important;padding-inline-end:" +
      pad(padXxl) +
      " !important}}" +
      "@media(forced-colors:active){.splide__slide:focus-visible{outline-color:Highlight}}";
    return out;
  }

  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => {
      this._assignSlideSlots();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true, subtree: false });
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this._slideObserver?.disconnect();
    this._splide?.destroy();
    this._splide = undefined;
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._assignSlideSlots();
    this.requestUpdate();
    queueMicrotask(() => this._initSplide());
  }

  updated() {
    this._assignSlideSlots();
    if (this._splide) {
      this._splide.options = { drag: this._hasNavigation() };
      this._splide.refresh();
      if (this._hasNavigation()) {
        this._renderPagination();
        this._updateButtons();
      }
    }
  }

  _assignSlideSlots() {
    const slides = [...this.children].filter((el) => {
      const slot = el.getAttribute("slot");
      return slot !== "heading" && slot !== "description" && slot !== "controls";
    });
    slides.forEach((el, i) => el.setAttribute("slot", "slide-" + i));
    this._slides = slides;
  }

  _parseJson(raw, fallback) {
    if (raw === undefined || raw === null || raw === "") return fallback;
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try { return JSON.parse(raw.replace(/'/g, '"')); } catch (e) { return fallback; }
    }
    return raw;
  }

  _isTrue(v) {
    return v === true || v === "true" || v === "";
  }

  _parsedSpp() {
    return this._parseJson(this.slidesPerPage ?? this.getAttribute("slides-per-page") ?? this.getAttribute("slidesperpage") ?? 1, 1);
  }

  _parsedPagination() {
    const raw = this._parseJson(this.pagination ?? this.getAttribute("pagination"), false);
    return raw === true || raw === "true" || raw === "";
  }

  _sppNow() {
    const parsed = this._parsedSpp();
    if (parsed && typeof parsed === "object") {
      if (window.matchMedia("(min-width:1000px)").matches && parsed.m !== undefined) return parsed.m;
      if (window.matchMedia("(min-width:760px)").matches && parsed.s !== undefined) return parsed.s;
      return parsed.base !== undefined ? parsed.base : 1;
    }
    return parsed;
  }

  _amountOfPages() {
    const count = (this._slides || []).length;
    const spp = this._sppNow() === "auto" ? 1 : Math.round(Number(this._sppNow()) || 1);
    return count === 0 ? 0 : count < spp ? 1 : count - spp + 1;
  }

  _hasNavigation() {
    return this._sppNow() === "auto" || this._amountOfPages() > 1;
  }

  _pageCount() {
    const focus = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
    return focus ? (this._slides || []).length : this._amountOfPages();
  }

  _splideBreakpoints() {
    const parsed = this._parsedSpp();
    const toOpt = (val) => ({ perPage: val === "auto" ? 1 : Math.round(Number(val) || 1), autoWidth: val === "auto" });
    if (parsed && typeof parsed === "object") {
      const map = { xs: 480, s: 760, m: 1000, l: 1300, xl: 1760, xxl: 1920 };
      const out = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (k === "base") out[0] = toOpt(v);
        else if (map[k]) out[map[k]] = toOpt(v);
      }
      return out;
    }
    return { 0: toOpt(parsed) };
  }

  _initSplide() {
    const container = this.renderRoot?.querySelector("#splide");
    if (!container || this._splide) return;
    const start = Number(this.activeSlideIndex ?? this.getAttribute("active-slide-index") ?? 0) || 0;
    const rewind = this._isTrue(this.rewind ?? this.getAttribute("rewind"));
    const focus = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
    const trim = this._isTrue(this.trimSpace ?? this.getAttribute("trim-space") ?? this.getAttribute("trimspace"));
    this._splide = new Splide(container, {
      start,
      arrows: false,
      easing: "cubic-bezier(0.45, 0, 0.55, 1)",
      focus: focus ? "center" : undefined,
      trimSpace: trim,
      pagination: false,
      rewind,
      rewindByDrag: true,
      drag: this._hasNavigation(),
      perMove: 1,
      mediaQuery: "min",
      speed: 0,
      gap: "var(--p-spacing-fluid-md)",
      live: false,
      breakpoints: this._splideBreakpoints(),
      i18n: this._parseJson(this.intl ?? this.getAttribute("intl"), {}) || {},
      direction: this.closest("[dir]")?.getAttribute("dir") || "ltr",
    });
    this._splide.on("mounted", () => {
      this._updateButtons();
      this._renderPagination();
    });
    this._splide.on("move", (activeIndex, previousIndex) => {
      this._updateButtons();
      this._updatePagination(activeIndex);
      this.dispatchEvent(new CustomEvent("update", { bubbles: false, detail: { activeIndex, previousIndex } }));
    });
    this._splide.mount();
    const trackSlides = () => {
      const slides = this._splide?.Components?.Elements?.slides || [];
      for (const el of slides) {
        el.removeAttribute("aria-hidden");
        el.setAttribute("tabindex", "0");
      }
    };
    this._slideObserver = new MutationObserver(trackSlides);
    this._slideObserver.observe(container, { subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
    trackSlides();
  }

  _updateButtons() {
    const prev = this.renderRoot?.querySelector(".btn-prev");
    const next = this.renderRoot?.querySelector(".btn-next");
    const splide = this._splide;
    if (!prev || !next || !splide) return;
    const rewind = !!splide.options.rewind;
    const isFirst = splide.index === 0;
    const pages = this._amountOfPages();
    const isLast = splide.index >= pages - 1;
    if (isFirst && !rewind) prev.setAttribute("disabled", "true");
    else prev.removeAttribute("disabled");
    if (isLast && !rewind) next.setAttribute("disabled", "true");
    else next.removeAttribute("disabled");
  }

  _renderPagination() {
    const el = this.renderRoot?.querySelector(".pagination");
    if (!el || !this._parsedPagination() || !this._hasNavigation()) return;
    const pages = this._pageCount();
    const active = this._splide?.index || 0;
    const sanitized = active > pages - 1 ? pages - 1 : active;
    el.innerHTML = Array.from({ length: pages }, (_, i) =>
      '<span class="bullet' + (i === sanitized ? ' bullet--active' : '') + '"></span>'
    ).join("");
  }

  _updatePagination(activeIndex) {
    const el = this.renderRoot?.querySelector(".pagination");
    if (!el) return;
    el.querySelector(".bullet--active")?.classList.remove("bullet--active");
    el.children[activeIndex]?.classList.add("bullet--active");
  }

  _slidePrev() {
    if (!this._splide) return;
    const focus = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
    if (focus) this._splide.go("<");
    else this._splide.go(this._splide.index === 0 ? this._amountOfPages() - 1 : "<");
  }

  _slideNext() {
    if (!this._splide) return;
    const focus = this._isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));
    if (focus) this._splide.go(">");
    else this._splide.go(this._splide.index >= this._amountOfPages() - 1 ? 0 : ">");
  }

  render() {
    const heading = (this.heading ?? this.getAttribute("heading")) || "";
    const description = (this.description ?? this.getAttribute("description")) || "";
    const hasHeading = !!heading || !!this.querySelector(":scope > [slot=heading]");
    const hasDescription = !!description || !!this.querySelector(":scope > [slot=description]");
    const hasControls = !!this.querySelector(":scope > [slot=controls]");
    const skip = this.skipLinkTarget ?? this.getAttribute("skip-link-target") ?? this.getAttribute("skiplinktarget");
    const slides = [...this.children].filter((el) => {
      const slot = el.getAttribute("slot");
      return slot !== "heading" && slot !== "description" && slot !== "controls";
    });
    if (!this._slides) this._slides = slides;
    const headingNode = !hasHeading
      ? nothing
      : heading
        ? html`<h2 class="heading" id="heading">${heading}</h2>`
        : html`<div class="heading" id="heading"><slot name="heading"></slot></div>`;
    const descNode = !hasDescription
      ? nothing
      : description
        ? html`<p>${description}</p>`
        : html`<slot name="description"></slot>`;
    const controlsNode = hasControls ? html`<slot name="controls"></slot>` : nothing;
    const skipNode = skip
      ? html`<p-link-pure href=${skip} icon="arrow-last" class="btn skip-link" align-label="start" hide-label="true">Skip carousel entries</p-link-pure>`
      : nothing;
    const navBtns = this._hasNavigation()
      ? html`<p-button-pure class="btn btn-prev" type="button" hide-label="true" icon="arrow-left" @click=${() => this._slidePrev()}></p-button-pure><p-button-pure class="btn btn-next" type="button" hide-label="true" icon="arrow-right" @click=${() => this._slideNext()}></p-button-pure>`
      : nothing;
    const slideNodes = (this._slides || slides).map((_, i) => html`<div class="splide__slide" tabindex="0"><slot name="slide-${i}"></slot></div>`);
    const pagination = this._parsedPagination() && this._hasNavigation()
      ? html`<div class="pagination-container" aria-hidden="true"><div class="pagination"></div></div>`
      : nothing;
    return html`<style .innerHTML="${this.cssText}"></style><div class="header">${headingNode}${descNode}${controlsNode}<div class="nav">${skipNode}${navBtns}</div></div><div id="splide" class="splide" @mousedown=${(e) => e.preventDefault()}><div class="splide__track"><div class="splide__list">${slideNodes}</div></div></div>${pagination}<div class="slide-status" aria-live="polite" aria-atomic="true"></div>`;
  }
}
