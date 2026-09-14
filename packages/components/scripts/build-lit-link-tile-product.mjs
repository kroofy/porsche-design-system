import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/link-tile-product');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-link-tile-product.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/LinkTileProduct.ts'),
  resolve(mitosisDir, 'output/lit/LinkTileProduct.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-link-tile-product: generated LinkTileProduct.ts not found');
  process.exit(1);
}

const extraGetters = `  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: true });
    queueMicrotask(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._childObserver?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  resolvedHref() {
    const href = this.href ?? this.getAttribute("href");
    if (href == null || href === "" || href === "undefined") return nothing;
    return href;
  }

  isLiked() {
    const raw = this.liked ?? this.getAttribute("liked");
    return raw === true || raw === "true" || raw === "";
  }

  showLikeButton() {
    const raw = this.likeButton ?? this.getAttribute("like-button") ?? this.getAttribute("likebutton");
    return raw !== false && raw !== "false";
  }

  optionalAttr(raw) {
    if (raw == null || raw === "" || raw === "undefined") return nothing;
    return raw;
  }

  onLikeClick = (event) => {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent("like", { detail: { liked: this.isLiked() }, bubbles: false }));
  };

  updated() {
    this.applyHostStyle();
  }

  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }

  render() {`;

const renderTemplate = `const heading = this.heading ?? this.getAttribute("heading") ?? "";
    const price = this.price ?? this.getAttribute("price") ?? "";
    const priceOriginal = this.priceOriginal ?? this.getAttribute("price-original") ?? this.getAttribute("priceoriginal") ?? "";
    const description = this.description ?? this.getAttribute("description") ?? "";
    const href = this.resolvedHref();
    const hasHref = href !== nothing;
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const relAttr = this.optionalAttr(this.rel ?? this.getAttribute("rel"));
    const liked = this.isLiked();
    const likeButton = this.showLikeButton();
    const iconName = liked ? "heart-filled" : "heart";
    const files = { heart: "heart.9a5962e.svg", "heart-filled": "heart-filled.dd7decf.svg" };
    const iconSource = "http://localhost:3001/icons/" + files[iconName];
    const anchor = hasHref
      ? html\`<a class="anchor" href=\${href} target=\${target} rel=\${relAttr} aria-labelledby="heading price" aria-describedby="header description"></a>\`
      : html\`<slot name="anchor"></slot>\`;
    const like = likeButton
      ? html\`<p-button-pure class="button" type="button" icon=\${iconName} hide-label="true" .iconSource=\${iconSource} @click=\${this.onLikeClick}>\${liked ? "Remove from wishlist" : "Add to wishlist"}</p-button-pure>\`
      : nothing;
    const priceEl = price
      ? priceOriginal && priceOriginal !== "undefined"
        ? html\`<p id="price" class="price"><span class="sr-only">sale price</span>\${price}<span class="sr-only">original price</span><s>\${priceOriginal}</s></p>\`
        : html\`<p id="price" class="price">\${price}</p>\`
      : nothing;
    return html\`<div class="root">\${anchor}<div id="header" class="header"><slot name="header"></slot>\${like}</div><div class="image"><slot></slot></div><div class="wrapper">\${heading ? html\`<h3 id="heading" class="heading">\${heading}</h3>\` : nothing}\${priceEl}\${description && description !== "undefined" ? html\`<p id="description" class="description">\${description}</p>\` : nothing}</div></div>\`;`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+aspectRatio/g, '@property({ attribute: "aspect-ratio" }) aspectRatio')
  .replace(/@property\(\)\s+priceOriginal/g, '@property({ attribute: "price-original" }) priceOriginal')
  .replace(/@property\(\)\s+likeButton/g, '@property({ attribute: "like-button" }) likeButton')
  .replace('const href = this.href;', 'const href = this.href ?? this.getAttribute("href");')
  .replace(
    'this.priceOriginal && this.priceOriginal !== "undefined"',
    '(this.priceOriginal ?? this.getAttribute("price-original") ?? this.getAttribute("priceoriginal")) && (this.priceOriginal ?? this.getAttribute("price-original") ?? this.getAttribute("priceoriginal")) !== "undefined"'
  )
  .replace(
    'this.description && this.description !== "undefined"',
    '(this.description ?? this.getAttribute("description")) && (this.description ?? this.getAttribute("description")) !== "undefined"'
  )
  .replace(
    'const hasLikeButton = !isFalse(this.likeButton);',
    'const hasLikeButton = !isFalse(this.likeButton ?? this.getAttribute("like-button") ?? this.getAttribute("likebutton"));'
  )
  .replace(
    'const aspectRatio = parse(this.aspectRatio, "3/4");',
    'const aspectRatio = parse(this.aspectRatio ?? this.getAttribute("aspect-ratio") ?? this.getAttribute("aspectratio"), "3/4");'
  )
  .replace('return this.heading || "";', 'return this.heading ?? this.getAttribute("heading") ?? "";')
  .replace('return this.price || "";', 'return this.price ?? this.getAttribute("price") ?? "";')
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

const propsToEnsure = [
  ['heading', null],
  ['price', null],
  ['priceOriginal', 'price-original'],
  ['description', null],
  ['likeButton', 'like-button'],
  ['liked', null],
  ['href', null],
  ['aspectRatio', 'aspect-ratio'],
  ['target', null],
  ['rel', null],
];
for (const [prop, attr] of propsToEnsure) {
  const needle = attr ? `@property({ attribute: "${attr}" }) ${prop}` : `@property() ${prop}`;
  if (!after.includes(needle) && !after.includes(`@property() ${prop}:`) && !after.includes(`@property() ${prop}`)) {
    after = after.replace(
      'export default class LitLinkTileProduct extends LitElement {',
      attr
        ? `export default class LitLinkTileProduct extends LitElement {\n  @property({ attribute: "${attr}" }) ${prop}: any;`
        : `export default class LitLinkTileProduct extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-link-tile-product: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-link-tile-product")')) {
  console.error('build-lit-link-tile-product: expected @customElement("p-link-tile-product")');
  process.exit(1);
}

const required = [
  'class="root"',
  'class="header"',
  'class="image"',
  'class="wrapper"',
  'class="anchor"',
  'slot name="anchor"',
  'href !== nothing',
  'p-button-pure',
  'heart-filled',
  'heart.9a5962e.svg',
  'heart-filled.dd7decf.svg',
  'Remove from wishlist',
  'Add to wishlist',
  'sr-only',
  'min-width: 760px',
  'static styles',
  'hostStyle',
  'applyHostStyle',
  'MutationObserver',
  'slotchange',
  'queueMicrotask',
  'resolvedHref',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-link-tile-product: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (
  after.includes('lit-link-tile-product') ||
  after.includes('delegatesFocus') ||
  after.includes('formAssociated')
) {
  console.error(
    'build-lit-link-tile-product: generated output must stay p-* and not fake delegatesFocus/formAssociated'
  );
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-link-tile-product', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-link-tile-product: ${err.message}`);
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
