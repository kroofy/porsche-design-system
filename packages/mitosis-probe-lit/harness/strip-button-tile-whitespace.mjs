import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/ButtonTile.ts');
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
  ['const disabled = isTrue(this.disabled);', 'const disabled = isTrue(this.disabled ?? this.getAttribute("disabled"));'],
  ['const loading = isTrue(this.loading);', 'const loading = isTrue(this.loading ?? this.getAttribute("loading"));'],
  ['const hasGradient = isTrue(this.gradient);', 'const hasGradient = isTrue(this.gradient ?? this.getAttribute("gradient"));'],
  ['const hasFooterSlot = false;', 'const hasFooterSlot = !!this.querySelector(\'[slot="footer"]\');'],
];
for (const [from, to] of attrFallbacks) {
  after = after.replace(from, to);
}

after = after.replaceAll('if (this.compact === "true") compact = true;', 'if ((this.compact ?? this.getAttribute("compact")) === "true") compact = true;');
after = after.replaceAll('if (this.compact === "false") compact = false;', 'if ((this.compact ?? this.getAttribute("compact")) === "false") compact = false;');

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
  'type',
  'disabled',
  'loading',
  'icon',
  'iconSource',
  'aria',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitButtonTile extends LitElement {',
      `export default class LitButtonTile extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "click",
      (event) => {
        const disabled = this.isDisabled();
        const loading = this.isLoading();
        if (disabled || loading) event.stopPropagation();
      },
      true,
    );
    this.addEventListener("slotchange", () => this.requestUpdate());
  }

  isDisabled() {
    const raw = this.disabled ?? this.getAttribute("disabled");
    return raw === true || raw === "true" || raw === "";
  }

  isLoading() {
    const raw = this.loading ?? this.getAttribute("loading");
    return raw === true || raw === "true" || raw === "";
  }

  render() {
    const label = this.label ?? this.getAttribute("label") ?? "";
    const description = this.description ?? this.getAttribute("description") ?? "";
    const icon = this.icon ?? this.getAttribute("icon") ?? "none";
    const iconSource = this.iconSource ?? this.getAttribute("icon-source") ?? this.getAttribute("iconsource") ?? "";
    const type = this.type ?? this.getAttribute("type") ?? "submit";
    const disabled = this.isDisabled();
    const loading = this.isLoading();
    const compactIcon = icon === "none" ? "arrow-right" : icon;
    const source = iconSource || nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><slot name="header"></slot><div class="media"><slot></slot></div><div class="footer"><p>\${description}</p><slot name="footer"></slot><p-button class="link-or-button-pure" variant="secondary" icon=\${compactIcon} type=\${type} ?disabled=\${disabled} ?loading=\${loading} hide-label="true" compact="true" .iconSource=\${source}>\${label}</p-button><p-button class="link-or-button" variant="secondary" icon=\${icon} type=\${type} ?disabled=\${disabled} ?loading=\${loading} .iconSource=\${source}>\${label}</p-button></div></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-button-tile-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-button-tile-whitespace: patched ButtonTile.ts');
}
