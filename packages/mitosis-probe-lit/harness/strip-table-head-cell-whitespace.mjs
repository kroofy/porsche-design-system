import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/TableHeadCell.ts');
const before = await readFile(file, 'utf8');
let after = before;

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("scope", "col");
    this.setAttribute("role", "columnheader");
    const sort = this.parseSort();
    if (sort?.active) {
      this.setAttribute("aria-sort", sort.direction === "asc" ? "ascending" : "descending");
    } else {
      this.removeAttribute("aria-sort");
    }
  }

  onButtonClick() {
    const sort = this.parseSort() || {};
    this.dispatchEvent(
      new CustomEvent("internalSortingChange", {
        bubbles: true,
        detail: {
          ...sort,
          active: true,
          direction: sort.active ? (sort.direction === "asc" ? "desc" : "asc") : sort.direction,
        },
      }),
    );
  }

  render() {`,
  );
}

after = after.replace(
  'let sort: any = this.sort;',
  'let sort: any = this.sort ?? this.getAttribute("sort");',
);

after = after.replace(
  `    const hideLabel =
      this.hideLabel === true ||
      this.hideLabel === "true" ||
      this.hideLabel === "";
    const multiline =
      this.multiline === true ||
      this.multiline === "true" ||
      this.multiline === "";`,
  `    const hideLabel =
      this.hideLabel === true ||
      this.hideLabel === "true" ||
      this.hideLabel === "" ||
      this.hasAttribute("hide-label") ||
      this.hasAttribute("hidelabel");
    const multiline =
      this.multiline === true ||
      this.multiline === "true" ||
      this.multiline === "" ||
      this.hasAttribute("multiline");`,
);

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    if (this.sortable) {
      return html\`<style .innerHTML="\${this.cssText}"></style><button type="button" @click=\${this.onButtonClick}><slot></slot><p-icon class="icon" color="inherit" size="x-small" name="arrow-up" aria-hidden="true"></p-icon></button>\`;
    }
    return html\`<span><style .innerHTML="\${this.cssText}"></style><slot></slot></span>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-table-head-cell-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-table-head-cell-whitespace: patched TableHeadCell.ts');
}
