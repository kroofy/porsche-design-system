import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/pagination');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-pagination.iife.js');

const env = { ...process.env, NODE_PATH: probeNodeModules };

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Pagination.ts'),
  resolve(mitosisDir, 'output/lit/Pagination.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-pagination: generated Pagination.ts not found');
  process.exit(1);
}

const renderTemplate = `return html\`<nav aria-label="Pagination"><style .innerHTML="\${this.cssText}"></style><ul>\${this.pageNodes}</ul></nav>\`;`;

const extraGetters = `  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  get pageItems() {
    const totalItems = Number(this.getAttribute("total-items-count") ?? this.totalItemsCount ?? 1);
    const perPage = Number(this.getAttribute("items-per-page") ?? this.itemsPerPage ?? 1);
    const pageTotal = Math.ceil((totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage));
    let active = Number(this.getAttribute("active-page") ?? this.activePage ?? 1);
    if (active < 1) active = 1;
    if (active > pageTotal) active = pageTotal;
    let showLast: any = this.getAttribute("show-last-page") ?? this.showLastPage;
    if (showLast === false || showLast === "false") showLast = false;
    else showLast = true;
    const PAGE = 0;
    const ELLIPSIS = 1;
    const PREVIOUS = 2;
    const NEXT = 3;
    const ellipsisItem = { type: ELLIPSIS, isActive: false };
    const createPage = (pageNumber: number) => ({
      type: PAGE,
      value: pageNumber,
      isActive: pageNumber === active,
      isBeforeCurrent: pageNumber === active - 1,
      isBeforeBeforeCurrent: pageNumber === active - 2,
      isAfterCurrent: pageNumber === active + 1,
      isAfterAfterCurrent: pageNumber === active + 2,
    });
    const createRange = (start: number, end: number) =>
      Array.from(new Array(end - start + 1), (_, i) => i + start);
    const items: any[] = [
      { type: PREVIOUS, value: Math.max(1, active - 1), isActive: active > 1 },
    ];
    if (1 + 2 + 2 >= pageTotal) {
      items.push(...createRange(1, pageTotal).map(createPage));
    } else {
      items.push(createPage(1));
      const middlePagesStart = Math.min(
        Math.max(active - 1, 3),
        pageTotal - 1 - 2 - (showLast ? 1 : 0)
      );
      const middlePagesEnd = middlePagesStart + 2;
      const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);
      const firstEllipsisPageNumber = middlePagesStart - 1;
      const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
      const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis
        ? createPage(firstEllipsisPageNumber)
        : ellipsisItem;
      if (showPageInsteadOfFirstEllipsis && pageTotal > 5) items.push(ellipsisItem);
      items.push(firstEllipsisOrPage);
      items.push(...middlePages);
      const lastEllipsisPageNumber = middlePagesEnd + 1;
      const showPageInsteadOfLastEllipsis =
        lastEllipsisPageNumber === pageTotal - (showLast ? 1 : 0);
      const lastEllipsisOrPage = showPageInsteadOfLastEllipsis
        ? createPage(lastEllipsisPageNumber)
        : ellipsisItem;
      items.push(lastEllipsisOrPage);
      if (showPageInsteadOfLastEllipsis && pageTotal > 5) items.push(ellipsisItem);
      if (showLast) items.push(createPage(pageTotal));
    }
    items.push({ type: NEXT, value: Math.min(pageTotal, active + 1), isActive: active < pageTotal });
    return items;
  }
  get pageNodes() {
    return this.pageItems.map((item: any, index: number) => {
      if (item.type === 2) {
        return html\`<li class="prev"><span role="button" tabindex=\${item.isActive ? 0 : nothing} aria-label="Previous page" aria-disabled=\${item.isActive ? nothing : "true"}><p-icon name="arrow-left" source="http://localhost:3001/icons/arrow-left.e03c25b.svg" color="primary" aria-hidden="true"></p-icon></span></li>\`;
      }
      if (item.type === 3) {
        return html\`<li class="next"><span role="button" tabindex=\${item.isActive ? 0 : nothing} aria-label="Next page" aria-disabled=\${item.isActive ? nothing : "true"}><p-icon name="arrow-right" color="primary" aria-hidden="true"></p-icon></span></li>\`;
      }
      if (item.type === 1) {
        const which = index === 2 ? "start" : "end";
        return html\`<li class="ellip ellip-\${which}"><span class="ellipsis"></span></li>\`;
      }
      const cls = [
        item.isActive ? "current" : "",
        item.isBeforeCurrent ? "current-1" : "",
        item.isAfterCurrent ? "current+1" : "",
        item.isBeforeBeforeCurrent ? "current-2" : "",
        item.isAfterAfterCurrent ? "current+2" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return html\`<li class=\${cls}><span role="button" tabindex="0" aria-label=\${"Page " + item.value} aria-current=\${item.isActive ? "page" : nothing}>\${item.value}</span></li>\`;
    });
  }

  render() {`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replace(/@property\(\)\s+totalItemsCount/g, '@property({ attribute: "total-items-count" }) totalItemsCount')
  .replace(/@property\(\)\s+itemsPerPage/g, '@property({ attribute: "items-per-page" }) itemsPerPage')
  .replace(/@property\(\)\s+activePage/g, '@property({ attribute: "active-page" }) activePage')
  .replace(/@property\(\)\s+showLastPage/g, '@property({ attribute: "show-last-page" }) showLastPage')
  .replaceAll(
    'const totalItems = Number(this.totalItemsCount == null || this.totalItemsCount === \'\' ? 1 : this.totalItemsCount);',
    'const totalItems = Number((this.getAttribute("total-items-count") ?? this.totalItemsCount) == null || (this.getAttribute("total-items-count") ?? this.totalItemsCount) === "" ? 1 : (this.getAttribute("total-items-count") ?? this.totalItemsCount));'
  )
  .replaceAll(
    'const perPage = Number(this.itemsPerPage == null || this.itemsPerPage === \'\' ? 1 : this.itemsPerPage);',
    'const perPage = Number((this.getAttribute("items-per-page") ?? this.itemsPerPage) == null || (this.getAttribute("items-per-page") ?? this.itemsPerPage) === "" ? 1 : (this.getAttribute("items-per-page") ?? this.itemsPerPage));'
  )
  .replaceAll(
    'let active = Number(this.activePage == null || this.activePage === \'\' ? 1 : this.activePage);',
    'let active = Number((this.getAttribute("active-page") ?? this.activePage) == null || (this.getAttribute("active-page") ?? this.activePage) === "" ? 1 : (this.getAttribute("active-page") ?? this.activePage));'
  )
  .replaceAll(
    'let showLast: any = this.showLastPage;',
    'let showLast: any = this.getAttribute("show-last-page") ?? this.showLastPage;'
  )
  .replace(/return html`[\s\S]*?`;/, renderTemplate);

if (!after.includes('total-items-count')) {
  after = after.replace(
    'export default class LitPagination extends LitElement {',
    `export default class LitPagination extends LitElement {
  @property({ attribute: "total-items-count" }) totalItemsCount: any;
  @property({ attribute: "items-per-page" }) itemsPerPage: any;
  @property({ attribute: "active-page" }) activePage: any;
  @property({ attribute: "show-last-page" }) showLastPage: any;`
  );
}

after = after.replace('  render() {', extraGetters);

if (after.includes('my-fragment')) {
  console.error('build-lit-pagination: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-pagination")')) {
  console.error('build-lit-pagination: expected @customElement("p-pagination")');
  process.exit(1);
}

const required = [
  'class="prev"',
  'class="next"',
  'class="ellipsis"',
  'ellip-start',
  'p-icon',
  'arrow-left',
  'arrow-right',
  'arrow-left.e03c25b.svg',
  'total-items-count',
  'items-per-page',
  'active-page',
  'show-last-page',
  'min-width:760px',
  'pageNodes',
  'delegatesFocus',
  'aria-label="Pagination"',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-pagination: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('lit-pagination') || after.includes('lit-icon')) {
  console.error('build-lit-pagination: generated output must use p-* tags, not lit-*');
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
