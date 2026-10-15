import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/LinkTile.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

const attrFallbacks = [
  ['const size = parse(this.size, "medium");', 'const size = parse(this.size ?? this.getAttribute("size"), "medium");'],
  [
    'const weight = parse(this.weight, "semi-bold");',
    'const weight = parse(this.weight ?? this.getAttribute("weight"), "semi-bold");',
  ],
  [
    'const aspectRatio = parse(this.aspectRatio, "4/3");',
    'const aspectRatio = parse(this.aspectRatio ?? this.getAttribute("aspect-ratio") ?? this.getAttribute("aspectratio"), "4/3");',
  ],
  [
    'let compact: any = parse(this.compact, false);',
    'let compact: any = parse(this.compact ?? this.getAttribute("compact"), false);',
  ],
  ['const align = this.align || "bottom";', 'const align = this.align ?? this.getAttribute("align") ?? "bottom";'],
  ['const hasGradient = isTrue(this.gradient);', 'const hasGradient = isTrue(this.gradient ?? this.getAttribute("gradient"));'],
  ['const hasFooterSlot = false;', 'const hasFooterSlot = !!this.querySelector(\'[slot="footer"]\');'],
];
for (const [from, to] of attrFallbacks) {
  after = after.replace(from, to);
}

after = after.replaceAll(
  'if (this.compact === "true") compact = true;',
  'if ((this.compact ?? this.getAttribute("compact")) === "true") compact = true;',
);
after = after.replaceAll(
  'if (this.compact === "false") compact = false;',
  'if ((this.compact ?? this.getAttribute("compact")) === "false") compact = false;',
);

after = after.replace(
  'return this.description || "";',
  'return this.description ?? this.getAttribute("description") ?? "";',
);
after = after.replace(
  'return this.label || "";',
  'return this.label ?? this.getAttribute("label") ?? "";',
);

const propsToEnsure = [
  'size',
  'weight',
  'aspectRatio',
  'label',
  'description',
  'align',
  'gradient',
  'compact',
  'href',
  'target',
  'download',
  'rel',
  'aria',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitLinkTile extends LitElement {',
      `export default class LitLinkTile extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("slotchange", () => this.requestUpdate());
  }

  resolvedHref() {
    const href = this.href ?? this.getAttribute("href");
    if (href == null || href === "" || href === "undefined") return nothing;
    return href;
  }

  render() {
    const label = this.label ?? this.getAttribute("label") ?? "";
    const description = this.description ?? this.getAttribute("description") ?? "";
    const href = this.resolvedHref();
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const download = this.download ?? this.getAttribute("download");
    const rel = this.rel ?? this.getAttribute("rel");
    const downloadAttr = download && download !== "undefined" ? download : nothing;
    const relAttr = rel && rel !== "undefined" ? rel : nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><a href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr} tabindex="-1" aria-hidden="true"></a><slot name="header"></slot><div class="media"><slot></slot></div><div class="footer"><p>\${description}</p><slot name="footer"></slot><p-link class="link-or-button-pure" variant="secondary" href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr} hide-label="true" icon="arrow-right" compact="true">\${label}</p-link><p-link class="link-or-button" variant="secondary" href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr}>\${label}</p-link></div></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-link-tile-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-link-tile-whitespace: patched LinkTile.ts');
}
