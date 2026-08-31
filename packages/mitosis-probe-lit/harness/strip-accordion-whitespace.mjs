import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Accordion.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const isOpen = isTrue(this.open);',
  'const isOpen = isTrue(this.open ?? this.getAttribute("open"));',
);
after = after.replace(
  'const isCompact = isTrue(this.compact);',
  'const isCompact = isTrue(this.compact ?? this.getAttribute("compact"));',
);
after = after.replace(
  'const isSticky = isTrue(this.sticky);',
  'const isSticky = isTrue(this.sticky ?? this.getAttribute("sticky"));',
);
after = after.replace(
  'const align = this.alignMarker || "end";',
  'const align = this.alignMarker ?? this.getAttribute("align-marker") ?? this.getAttribute("alignmarker") ?? "end";',
);
after = after.replace(
  'const background = this.background || "none";',
  'const background = this.background ?? this.getAttribute("background") ?? "none";',
);
after = after.replace(
  'const indent = parse(this.indent, false);',
  'const indent = parse(this.getAttribute("indent") ?? this.indent, false);',
);
after = after.replace(
  'const size = parse(this.size, "small");',
  'const size = parse(this.getAttribute("size") ?? this.size, "small");',
);
after = after.replace(
  'const hasBefore = false;',
  'const hasBefore = !!this.querySelector(\'[slot="summary-before"]\');',
);
after = after.replace(
  'const hasAfter = false;',
  'const hasAfter = !!this.querySelector(\'[slot="summary-after"]\');',
);
after = after.replace(
  'const hasSummary = true;',
  'const hasSummary = !!this.querySelector(\'[slot="summary"]\');',
);
after = after.replace(
  'return this.heading || "";',
  'return this.heading ?? this.getAttribute("heading") ?? "";',
);
after = after.replace(
  'return this.headingTag || "h2";',
  'return this.headingTag ?? this.getAttribute("heading-tag") ?? this.getAttribute("headingtag") ?? "h2";',
);
after = after.replace(
  /this\.open === true \|\| this\.open === "true" \|\| this\.open === ""/,
  '(this.open ?? this.getAttribute("open")) === true || (this.open ?? this.getAttribute("open")) === "true" || (this.open ?? this.getAttribute("open")) === ""',
);

const propsToEnsure = [
  'open',
  'alignMarker',
  'background',
  'compact',
  'indent',
  'sticky',
  'size',
  'heading',
  'headingTag',
];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitAccordion extends LitElement {',
      `export default class LitAccordion extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

if (!after.includes('firstUpdated(')) {
  after = after.replace(
    /  render\(\) \{[\s\S]*?\n  \}\n\}/,
    `  firstUpdated() {
    const summary = this.renderRoot.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  }
  render() {
    const open = !!this.isOpenFlag;
    const tag = this.headingTagValue || "h2";
    const heading = tag === "h1"
      ? html\`<h1>\${this.headingText}<slot name="heading"></slot></h1>\`
      : tag === "h3"
        ? html\`<h3>\${this.headingText}<slot name="heading"></slot></h3>\`
        : tag === "h4"
          ? html\`<h4>\${this.headingText}<slot name="heading"></slot></h4>\`
          : tag === "h5"
            ? html\`<h5>\${this.headingText}<slot name="heading"></slot></h5>\`
            : tag === "h6"
              ? html\`<h6>\${this.headingText}<slot name="heading"></slot></h6>\`
              : html\`<h2>\${this.headingText}<slot name="heading"></slot></h2>\`;
    return html\`<details ?open=\${open}><style .innerHTML="\${this.cssText}"></style><summary><slot name="summary"></slot>\${heading}</summary><slot name="summary-before"></slot><slot name="summary-after"></slot><div><slot></slot></div></details>\`;
  }
}`,
  );
}

if (after === before) {
  console.warn('strip-accordion-whitespace: no accordion patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-accordion-whitespace: patched Accordion.ts');
}
