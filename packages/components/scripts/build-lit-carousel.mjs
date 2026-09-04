import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/carousel');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-carousel.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Carousel.ts'),
  resolve(mitosisDir, 'output/lit/Carousel.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-carousel: generated Carousel.ts not found');
  process.exit(1);
}

const extraMethods = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => {
      this._assignSlideSlots();
      this.requestUpdate();
    });
    this._childObserver.observe(this, { childList: true, subtree: false });
    queueMicrotask(() => this.requestUpdate());
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

  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
    this.toggleAttribute("data-heading", vars["--p-car-heading"] === "1");
    this.toggleAttribute("data-desc", vars["--p-car-desc"] === "1");
    this.toggleAttribute("data-controls", vars["--p-car-controls"] === "1");
    this.toggleAttribute("data-center", vars["--p-car-center"] === "1");
    this.toggleAttribute("data-gradient", vars["--p-car-gradient"] === "1");
    this.toggleAttribute("data-pag", vars["--p-car-pag"] === "1");
  }

  updated() {
    this.applyHostStyle();
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
      try {
        return JSON.parse(raw.replace(/'/g, '"').replace(/([{,]\\s*)([A-Za-z_][A-Za-z0-9_]*)\\s*:/g, '$1"$2":'));
      } catch (e) {
        return fallback;
      }
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
        ? html\`<h2 class="heading" id="heading">\${heading}</h2>\`
        : html\`<div class="heading" id="heading"><slot name="heading"></slot></div>\`;
    const descNode = !hasDescription
      ? nothing
      : description
        ? html\`<p>\${description}</p>\`
        : html\`<slot name="description"></slot>\`;
    const controlsNode = hasControls ? html\`<slot name="controls"></slot>\` : nothing;
    const skipNode = skip && skip !== "undefined"
      ? html\`<p-link-pure href=\${skip} icon="arrow-last" class="btn skip-link" align-label="start" hide-label="true">Skip carousel entries</p-link-pure>\`
      : nothing;
    const navBtns = this._hasNavigation()
      ? html\`<p-button-pure class="btn btn-prev" type="button" hide-label="true" icon="arrow-left" icon-source="http://localhost:3001/icons/arrow-left.e03c25b.svg" @click=\${() => this._slidePrev()}></p-button-pure><p-button-pure class="btn btn-next" type="button" hide-label="true" icon="arrow-right" @click=\${() => this._slideNext()}></p-button-pure>\`
      : nothing;
    const slideNodes = (this._slides || slides).map((_, i) => html\`<div class="splide__slide" tabindex="0"><slot name="slide-\${i}"></slot></div>\`);
    const pagination = this._parsedPagination() && this._hasNavigation()
      ? html\`<div class="pagination-container" aria-hidden="true"><div class="pagination"></div></div>\`
      : nothing;
    return html\`<div class="header">\${headingNode}\${descNode}\${controlsNode}<div class="nav">\${skipNode}\${navBtns}</div></div><div id="splide" class="splide" @mousedown=\${(e) => e.preventDefault()}><div class="splide__track"><div class="splide__list">\${slideNodes}</div></div></div>\${pagination}<div class="slide-status" aria-live="polite" aria-atomic="true"></div>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";\nimport { Splide } from "@splidejs/splide";'
  );

after = after.replace(
  'const heading = this.heading || "";',
  'const heading = (this.heading ?? this.getAttribute("heading")) || "";'
);
after = after.replace(
  'const description = this.description || "";',
  'const description = (this.description ?? this.getAttribute("description")) || "";'
);
after = after.replace(
  'const hasHeading = !!heading;',
  'const hasHeading = !!heading || !!this.querySelector(":scope > [slot=heading]");'
);
after = after.replace(
  'const hasDescription = !!description;',
  'const hasDescription = !!description || !!this.querySelector(":scope > [slot=description]");'
);
after = after.replace(
  'const hasControls = false;',
  'const hasControls = !!this.querySelector(":scope > [slot=controls]");'
);
after = after.replace(
  'const headingSize = this.headingSize || "x-large";',
  'const headingSize = (this.headingSize ?? this.getAttribute("heading-size") ?? this.getAttribute("headingsize")) || "x-large";'
);
after = after.replace(
  'const width = this.width || "basic";',
  'const width = (this.width ?? this.getAttribute("width")) || "basic";'
);
after = after.replace(
  'const alignHeader = this.alignHeader || "start";',
  'const alignHeader = (this.alignHeader ?? this.getAttribute("align-header") ?? this.getAttribute("alignheader")) || "start";'
);
after = after.replace(
  'const alignControls = this.alignControls || "auto";',
  'const alignControls = (this.alignControls ?? this.getAttribute("align-controls") ?? this.getAttribute("aligncontrols")) || "auto";'
);
after = after.replace(
  'const gradient = isTrue(this.gradient);',
  'const gradient = isTrue(this.gradient ?? this.getAttribute("gradient"));'
);
after = after.replace(
  'const pagination = parse(this.pagination, false);',
  'const pagination = parse(this.pagination ?? this.getAttribute("pagination"), false);'
);
after = after.replace(
  'const hasNavigation = true;',
  `const slidesPerPageRaw = this.slidesPerPage ?? this.getAttribute("slides-per-page") ?? this.getAttribute("slidesperpage") ?? 1;
      const parsedSpp = parse(slidesPerPageRaw, 1);
      const sppNow = typeof parsedSpp === "object" && parsedSpp
        ? (window.matchMedia("(min-width:1000px)").matches && parsedSpp.m !== undefined ? parsedSpp.m
          : window.matchMedia("(min-width:760px)").matches && parsedSpp.s !== undefined ? parsedSpp.s
          : parsedSpp.base !== undefined ? parsedSpp.base : 1)
        : parsedSpp;
      const slideCount = [...this.children].filter((el) => {
        const slot = el.getAttribute("slot");
        return slot !== "heading" && slot !== "description" && slot !== "controls";
      }).length;
      const sppNum = sppNow === "auto" ? 1 : Math.round(Number(sppNow) || 1);
      const amountOfPages = slideCount === 0 ? 0 : slideCount < sppNum ? 1 : slideCount - sppNum + 1;
      const hasNavigation = sppNow === "auto" || amountOfPages > 1;`
);
after = after.replace(
  'const isInfinite = false;',
  'const focusCenter = isTrue(this.focusOnCenterSlide ?? this.getAttribute("focus-on-center-slide") ?? this.getAttribute("focusoncenterslide"));\n      const isInfinite = (focusCenter ? slideCount : amountOfPages) > 5;'
);

const propsToEnsure = [
  'heading',
  'headingSize',
  'description',
  'alignHeader',
  'alignControls',
  'rewind',
  'width',
  'slidesPerPage',
  'pagination',
  'aria',
  'intl',
  'activeSlideIndex',
  'skipLinkTarget',
  'focusOnCenterSlide',
  'gradient',
  'trimSpace',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitCarousel extends LitElement {',
      `export default class LitCarousel extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-carousel: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-carousel")')) {
  console.error('build-lit-carousel: expected @customElement("p-carousel")');
  process.exit(1);
}
if (/\bclass="root"/.test(after) || after.includes("class='root'")) {
  console.error('build-lit-carousel: dummy .root must not wrap the shadow tree');
  process.exit(1);
}
if (after.includes('href="undefined"') || after.includes("href='undefined'")) {
  console.error('build-lit-carousel: omit href so it does not become undefined');
  process.exit(1);
}

const required = [
  'display: flex',
  'flex-direction: column',
  'class="header"',
  'id="splide"',
  'class="splide"',
  'splide__track',
  'splide__list',
  'slide-status',
  'speed: 0',
  'min-width: 760px',
  'min-width: 1920px',
  'min-width:1000px',
  'hide-label="true"',
  'p-button-pure',
  'MutationObserver',
  'queueMicrotask',
  'applyHostStyle',
  '--p-car-col',
  'slot name="heading"',
  'slot name="description"',
  'slot name="controls"',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-carousel: missing ${missing.join(', ')}`);
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-carousel', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-carousel: ${err.message}`);
  process.exit(1);
}
if (after.includes('lit-carousel') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-carousel: generated output must stay p-carousel');
  process.exit(1);
}

if (after !== before) {
  await writeFile(generated, after);
}

const esb = spawnSync(
  esbuildBin,
  [
    generated,
    '--bundle',
    '--format=iife',
    `--tsconfig=${resolve(componentsRoot, 'mitosis/tsconfig.json')}`,
    '--alias:lit/decorators=lit/decorators.js',
    `--outfile=${outfile}`,
  ],
  { cwd: probeNodeModules, env, stdio: 'inherit' }
);
if (esb.status !== 0) process.exit(esb.status ?? 1);
