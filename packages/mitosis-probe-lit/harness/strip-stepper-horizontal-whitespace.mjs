import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/StepperHorizontal.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  'const size = parse(this.size, "small");',
  'const size = parse(this.getAttribute("size") ?? this.size, "small");',
);

if (!after.includes('@property() size') && !after.includes('@property() size:')) {
  after = after.replace(
    'export default class LitStepperHorizontal extends LitElement {',
    'export default class LitStepperHorizontal extends LitElement {\n  @property() size: any;',
  );
}

const helpers = `
  stepItems() {
    return [...this.children].filter((el) => el.tagName === "P-STEPPER-HORIZONTAL-ITEM");
  }

  currentItem() {
    return this.stepItems().find((el) => (el.state ?? el.getAttribute("state")) === "current");
  }

  scrollCurrentIntoView() {
    const current = this.currentItem();
    if (!current) return;
    current.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center", container: "nearest" });
  }

  firstUpdated() {
    this.addEventListener("slotchange", () => {
      requestAnimationFrame(() => this.scrollCurrentIntoView());
    });
    customElements.whenDefined("p-scroller").then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => this.scrollCurrentIntoView()));
    });
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    return html\`<div class="wrap"><style .innerHTML="\${this.cssText}"></style><p-scroller class="scroller" .aria=\${{ role: "list" }}><slot></slot></p-scroller></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-stepper-horizontal-whitespace: no stepper-horizontal patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-stepper-horizontal-whitespace: patched StepperHorizontal.ts');
}
