import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Canvas.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

const propsToEnsure = ['sidebarStartOpen', 'sidebarEndOpen', 'background'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitCanvas extends LitElement {',
      `export default class LitCanvas extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  'const startOpen = isTrue(this.sidebarStartOpen);',
  'const startOpen = isTrue(this.sidebarStartOpen ?? this.getAttribute("sidebar-start-open") ?? this.getAttribute("sidebarstartopen"));',
);
after = after.replace(
  'const endOpen = isTrue(this.sidebarEndOpen);',
  'const endOpen = isTrue(this.sidebarEndOpen ?? this.getAttribute("sidebar-end-open") ?? this.getAttribute("sidebarendopen"));',
);
after = after.replace(
  'const background = this.background === "surface" ? "surface" : "canvas";',
  'const background = (this.background ?? this.getAttribute("background")) === "surface" ? "surface" : "canvas";',
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
    super.disconnectedCallback();
  }

  _isTrue(v) {
    return v === true || v === "true" || v === "";
  }

  _startOpen() {
    return this._isTrue(this.sidebarStartOpen ?? this.getAttribute("sidebar-start-open") ?? this.getAttribute("sidebarstartopen"));
  }

  _endOpen() {
    return this._isTrue(this.sidebarEndOpen ?? this.getAttribute("sidebar-end-open") ?? this.getAttribute("sidebarendopen"));
  }

  _toggleStart() {
    this.dispatchEvent(new CustomEvent("sidebarStartUpdate", { bubbles: false, detail: { open: !this._startOpen() } }));
  }

  _dismissEnd() {
    this.dispatchEvent(new CustomEvent("sidebarEndDismiss", { bubbles: false }));
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const startOpen = this._startOpen();
    const endOpen = this._endOpen();
    const hasTitle = !!this.querySelector(':scope > [slot="title"]');
    const hasSidebarEnd = !!this.querySelector(':scope > [slot="sidebar-end"]');
    const hasFooter = !!this.querySelector(':scope > [slot="footer"]');
    const hasBackground = !!this.querySelector(':scope > [slot="background"]');
    const headerToggle = startOpen
      ? nothing
      : html\`<p-button icon="sidebar" variant="secondary" compact="true" hide-label="true" aria='{"aria-expanded":false}' @click=\${() => this._toggleStart()}>Open navigation sidebar</p-button>\`;
    const titleNode = hasTitle ? html\`<h2><slot name="title"></slot></h2>\` : nothing;
    const sidebarEndNode = hasSidebarEnd
      ? html\`<aside class="sidebar sidebar--end" ?inert=\${!endOpen} aria-label=\${endOpen ? "Settings sidebar open" : "Settings sidebar closed"} tabindex="-1"><div class="sidebar__header sidebar__header--end"><slot name="sidebar-end-header"></slot><p-button icon="close" variant="secondary" compact="true" hide-label="true" aria=\${endOpen ? '{"aria-expanded":true}' : '{"aria-expanded":false}'} @click=\${() => this._dismissEnd()}>\${endOpen ? "Close" : "Open"} settings sidebar</p-button></div><slot name="sidebar-end"></slot></aside>\`
      : nothing;
    const footerNode = hasFooter ? html\`<footer class="footer"><slot name="footer"></slot></footer>\` : nothing;
    const backgroundNode = hasBackground ? html\`<slot name="background"></slot>\` : nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><header class="header" tabindex="-1"><div class="blur"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="header__area header__area--start">\${headerToggle}<slot name="header-start"></slot></div><p-crest class="header__crest"></p-crest><p-wordmark class="header__wordmark" size="inherit"></p-wordmark><div class="header__area header__area--end"><slot name="header-end"></slot></div></header><aside class="sidebar sidebar--start" ?inert=\${!startOpen} aria-label=\${startOpen ? "Navigation sidebar open" : "Navigation sidebar closed"} tabindex="-1"><div class="sidebar__header sidebar__header--start"><p-button icon="sidebar" variant="secondary" compact="true" hide-label="true" aria=\${startOpen ? '{"aria-expanded":true}' : '{"aria-expanded":false}'} @click=\${() => this._toggleStart()}>\${startOpen ? "Close" : "Open"} navigation sidebar</p-button>\${titleNode}</div><slot name="sidebar-start"></slot></aside><main class="main"><slot></slot></main>\${sidebarEndNode}\${footerNode}\${backgroundNode}</div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-canvas-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-canvas-whitespace: patched Canvas.ts');
}
