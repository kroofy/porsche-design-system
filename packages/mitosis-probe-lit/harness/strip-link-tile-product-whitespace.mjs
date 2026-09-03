import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/LinkTileProduct.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

const attrFallbacks = [
  ['const href = this.href;', 'const href = this.href ?? this.getAttribute("href");'],
  [
    'this.priceOriginal && this.priceOriginal !== "undefined"',
    '(this.priceOriginal ?? this.getAttribute("price-original") ?? this.getAttribute("priceoriginal")) && (this.priceOriginal ?? this.getAttribute("price-original") ?? this.getAttribute("priceoriginal")) !== "undefined"',
  ],
  [
    'this.description && this.description !== "undefined"',
    '(this.description ?? this.getAttribute("description")) && (this.description ?? this.getAttribute("description")) !== "undefined"',
  ],
  [
    'const hasLikeButton = !isFalse(this.likeButton);',
    'const hasLikeButton = !isFalse(this.likeButton ?? this.getAttribute("like-button") ?? this.getAttribute("likebutton"));',
  ],
  [
    'const aspectRatio = parse(this.aspectRatio, "3/4");',
    'const aspectRatio = parse(this.aspectRatio ?? this.getAttribute("aspect-ratio") ?? this.getAttribute("aspectratio"), "3/4");',
  ],
];
for (const [from, to] of attrFallbacks) {
  after = after.replace(from, to);
}

after = after.replace(
  'return this.heading || "";',
  'return this.heading ?? this.getAttribute("heading") ?? "";',
);
after = after.replace(
  'return this.price || "";',
  'return this.price ?? this.getAttribute("price") ?? "";',
);

const propsToEnsure = [
  'heading',
  'price',
  'priceOriginal',
  'description',
  'likeButton',
  'liked',
  'href',
  'aspectRatio',
  'target',
  'rel',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitLinkTileProduct extends LitElement {',
      `export default class LitLinkTileProduct extends LitElement {\n  @property() ${prop}: any;`,
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

  isLiked() {
    const raw = this.liked ?? this.getAttribute("liked");
    return raw === true || raw === "true" || raw === "";
  }

  showLikeButton() {
    const raw = this.likeButton ?? this.getAttribute("like-button") ?? this.getAttribute("likebutton");
    return raw !== false && raw !== "false";
  }

  render() {
    const heading = this.heading ?? this.getAttribute("heading") ?? "";
    const price = this.price ?? this.getAttribute("price") ?? "";
    const priceOriginal = this.priceOriginal ?? this.getAttribute("price-original") ?? this.getAttribute("priceoriginal") ?? "";
    const description = this.description ?? this.getAttribute("description") ?? "";
    const href = this.resolvedHref();
    const hasHref = href !== nothing;
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const rel = this.rel ?? this.getAttribute("rel");
    const relAttr = rel && rel !== "undefined" ? rel : nothing;
    const liked = this.isLiked();
    const likeButton = this.showLikeButton();
    const anchor = hasHref
      ? html\`<a class="anchor" href=\${href} target=\${target} rel=\${relAttr} aria-labelledby="heading price" aria-describedby="header description"></a>\`
      : html\`<slot name="anchor"></slot>\`;
    const like = likeButton
      ? html\`<p-button-pure class="button" type="button" icon=\${liked ? "heart-filled" : "heart"} hide-label="true">\${liked ? "Remove from wishlist" : "Add to wishlist"}</p-button-pure>\`
      : nothing;
    const priceEl = price
      ? priceOriginal && priceOriginal !== "undefined"
        ? html\`<p id="price" class="price"><span class="sr-only">sale price</span>\${price}<span class="sr-only">original price</span><s>\${priceOriginal}</s></p>\`
        : html\`<p id="price" class="price">\${price}</p>\`
      : nothing;
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style>\${anchor}<div id="header" class="header"><slot name="header"></slot>\${like}</div><div class="image"><slot></slot></div><div class="wrapper">\${heading ? html\`<h3 id="heading" class="heading">\${heading}</h3>\` : nothing}\${priceEl}\${description && description !== "undefined" ? html\`<p id="description" class="description">\${description}</p>\` : nothing}</div></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-link-tile-product-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-link-tile-product-whitespace: patched LinkTileProduct.ts');
}
