import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Table.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replaceAll(
  'const compact = isTrue(this.compact);',
  'const compact = isTrue(this.compact ?? this.getAttribute("compact"));',
);
after = after.replaceAll(
  'const layout = this.layout || "auto";',
  'const layout = this.layout ?? this.getAttribute("layout") ?? "auto";',
);
after = after.replace(
  'return this.caption || "";',
  'return this.caption ?? this.getAttribute("caption") ?? "";',
);

const propsToEnsure = ['caption', 'compact', 'layout', 'sticky'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitTable extends LitElement {',
      `export default class LitTable extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  connectedCallback() {
    super.connectedCallback();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("slotchange", () => this.requestUpdate());
    this.shadowRoot?.addEventListener("internalSortingChange", (e) => {
      e.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("update", { bubbles: false, detail: e.detail }),
      );
    });
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }

  isTrue(v) {
    return v === true || v === "true" || v === "";
  }

  hasSlottedCaption() {
    return !!this.querySelector('[slot="caption"]');
  }

  captionValue() {
    return this.caption ?? this.getAttribute("caption") ?? "";
  }

  isCompact() {
    return this.isTrue(this.compact ?? this.getAttribute("compact"));
  }

  isSticky() {
    return this.isTrue(this.sticky ?? this.getAttribute("sticky"));
  }

  render() {
    const caption = this.captionValue();
    const slotted = this.hasSlottedCaption();
    const captionEl = slotted
      ? html\`<div id="caption" class="caption"><slot name="caption"></slot></div>\`
      : nothing;
    const label = caption && !slotted ? caption : nothing;
    const labelledBy = !caption && slotted ? "caption" : nothing;
    return html\`<style .innerHTML="\${this.cssText}"></style>\${captionEl}<p-scroller scrollbar="true" ?compact=\${this.isCompact()} ?sticky=\${this.isSticky()}><div class="table" role="table" aria-label=\${label} aria-labelledby=\${labelledBy}><slot></slot></div></p-scroller>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-table-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-table-whitespace: patched Table.ts');
}
