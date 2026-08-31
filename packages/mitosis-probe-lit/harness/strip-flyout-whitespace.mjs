import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Flyout.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

const attrFallbacks = [
  ['const isOpen = isTrue(this.open);', 'const isOpen = isTrue(this.open ?? this.getAttribute("open"));'],
  [
    'const background = this.background === "surface" ? "surface" : "canvas";',
    'const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";',
  ],
  [
    'const backdrop = this.backdrop === "shading" ? "shading" : "blur";',
    'const backdrop = (this.backdrop ?? this.getAttribute("backdrop")) === "shading" ? "shading" : "blur";',
  ],
  [
    'const position = this.position === "start" ? "start" : "end";',
    'const position = (this.position ?? this.getAttribute("position")) === "start" ? "start" : "end";',
  ],
  [
    'const isFooterFixed = this.footerBehavior === "fixed";',
    'const isFooterFixed = (this.footerBehavior ?? this.getAttribute("footer-behavior") ?? this.getAttribute("footerbehavior")) === "fixed";',
  ],
  ['let fullscreen: any = this.fullscreen;', 'let fullscreen: any = this.fullscreen ?? this.getAttribute("fullscreen");'],
];
for (const [from, to] of attrFallbacks) {
  after = after.replace(from, to);
}

after = after.replace(
  /get isOpenFlag\(\) \{[\s\S]*?\n  \}/,
  `get isOpenFlag() {
    const open = this.open ?? this.getAttribute("open");
    return open === true || open === "true" || open === "";
  }`,
);
after = after.replace(
  /get ariaLabelText\(\) \{[\s\S]*?\n  \}/,
  `get ariaLabelText() {
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
  }`,
);

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
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

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const dismiss = html\`<button class="dismiss" type="button"><span>Dismiss flyout</span></button>\`;
    const label = this.ariaLabelText || nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style><dialog ?inert=\${!this.isOpenFlag} tabindex="-1" aria-modal="true" aria-label=\${label}><div class="scroller"><div class="flyout">\${dismiss}<slot name="header"></slot><slot></slot><slot name="footer"></slot><slot name="sub-footer"></slot></div></div></dialog>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-flyout-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-flyout-whitespace: patched Flyout.ts');
}
