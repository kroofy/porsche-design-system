import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/DrilldownLink.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const rawHref = this.href;',
  'const rawHref = this.href ?? this.getAttribute("href");',
);
after = after.replace(
  'const isActive = isTrue(this.active);',
  'const isActive = isTrue(this.active ?? this.getAttribute("active"));',
);

const propsToEnsure = ['href', 'active', 'target', 'download', 'rel', 'aria'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitDrilldownLink extends LitElement {',
      `export default class LitDrilldownLink extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

if (!after.includes('get hrefValue()')) {
  after = after.replace(
    '  render() {',
    `  get hrefValue() {
    if (this.href !== undefined && this.href !== null) return this.href;
    if (this.hasAttribute("href")) return this.getAttribute("href");
    return nothing;
  }

  get isActiveFlag() {
    const raw = this.active ?? this.getAttribute("active");
    return raw === true || raw === "true" || raw === "";
  }

  get ariaAttrs() {
    const raw = this.aria ?? this.getAttribute("aria");
    if (raw && typeof raw === "object") return raw;
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        return JSON.parse(raw.replace(/'/g, '"'));
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    const href = this.hrefValue;
    const hasHref = href !== nothing;
    const target = this.target ?? this.getAttribute("target") ?? "_self";
    const download = this.download ?? this.getAttribute("download");
    const rel = this.rel ?? this.getAttribute("rel");
    const downloadAttr = download && download !== "undefined" ? download : nothing;
    const relAttr = rel && rel !== "undefined" ? rel : nothing;
    const ariaLabel = this.ariaAttrs["aria-label"] || nothing;
    if (hasHref) {
      return html\`<style .innerHTML="\${this.cssText}"></style><a href=\${href} target=\${target} download=\${downloadAttr} rel=\${relAttr} aria-current=\${this.isActiveFlag ? "true" : "false"} aria-label=\${ariaLabel}><slot></slot></a>\`;
    }
    return html\`<style .innerHTML="\${this.cssText}"></style><slot></slot>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-drilldown-link-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-drilldown-link-whitespace: patched DrilldownLink.ts');
}
