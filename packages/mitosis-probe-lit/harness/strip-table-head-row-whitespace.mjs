import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/TableHeadRow.ts');
const before = await readFile(file, 'utf8');
let after = before;

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "row");
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    return html\`<style .innerHTML="\${this.cssText}"></style><slot></slot>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-table-head-row-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-table-head-row-whitespace: patched TableHeadRow.ts');
}
