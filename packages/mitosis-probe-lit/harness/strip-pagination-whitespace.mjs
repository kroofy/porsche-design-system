import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Pagination.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);

after = after.replace(
  /const totalItems = Number\([\s\S]*?\);/,
  'const totalItems = Number(this.totalItemsCount ?? this.getAttribute("total-items-count") ?? this.getAttribute("totalitemscount") ?? 1);',
);
after = after.replace(
  /const perPage = Number\([\s\S]*?\);/,
  'const perPage = Number(this.itemsPerPage ?? this.getAttribute("items-per-page") ?? this.getAttribute("itemsperpage") ?? 1);',
);
after = after.replace(
  /let active = Number\([\s\S]*?\);/,
  'let active = Number(this.activePage ?? this.getAttribute("active-page") ?? this.getAttribute("activepage") ?? 1);',
);
after = after.replace(
  'let showLast: any = this.showLastPage;',
  'let showLast: any = this.showLastPage ?? this.getAttribute("show-last-page") ?? this.getAttribute("showlastpage");',
);

const propsToEnsure = ['totalItemsCount', 'itemsPerPage', 'activePage', 'showLastPage', 'intl'];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitPagination extends LitElement {',
      `export default class LitPagination extends LitElement {\n  ${decl}`,
    );
  }
}

const helpers = `
  readNumber(prop, attr, fallback) {
    const raw = this[prop] ?? this.getAttribute(attr) ?? this.getAttribute(attr.replace(/-/g, "")) ?? fallback;
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  pageTotal() {
    const totalItems = this.readNumber("totalItemsCount", "total-items-count", 1);
    const perPage = this.readNumber("itemsPerPage", "items-per-page", 1);
    return Math.ceil((totalItems < 1 ? 1 : totalItems) / (perPage < 1 ? 1 : perPage));
  }

  currentPage() {
    const total = this.pageTotal();
    let active = this.readNumber("activePage", "active-page", 1);
    if (active < 1) return 1;
    if (active > total) return total;
    return active;
  }

  showLast() {
    const raw = this.showLastPage ?? this.getAttribute("show-last-page") ?? this.getAttribute("showlastpage");
    if (raw === false || raw === "false") return false;
    return true;
  }

  parsedIntl() {
    let raw = this.intl ?? this.getAttribute("intl");
    const defaults = { root: "Pagination", prev: "Previous page", next: "Next page", page: "Page" };
    if (raw == null || raw === "") return defaults;
    if (typeof raw === "string" && raw.charAt(0) === "{") {
      try {
        raw = JSON.parse(raw);
      } catch (e) {
        return defaults;
      }
    }
    if (typeof raw === "object" && raw !== null) return { ...defaults, ...raw };
    return defaults;
  }

  createItems() {
    const pageTotal = this.pageTotal();
    const activePage = this.currentPage();
    const showLastPage = this.showLast();
    const PAGE = 0;
    const ELLIPSIS = 1;
    const PREVIOUS = 2;
    const NEXT = 3;
    const createPage = (pageNumber) => ({
      type: PAGE,
      value: pageNumber,
      isActive: pageNumber === activePage,
      isBeforeCurrent: pageNumber === activePage - 1,
      isBeforeBeforeCurrent: pageNumber === activePage - 2,
      isAfterCurrent: pageNumber === activePage + 1,
      isAfterAfterCurrent: pageNumber === activePage + 2,
    });
    const range = (start, end) => Array.from(new Array(end - start + 1), (_, i) => i + start);
    const ellipsisItem = { type: ELLIPSIS, isActive: false };
    const items = [
      { type: PREVIOUS, value: Math.max(1, activePage - 1), isActive: activePage > 1 },
    ];
    if (1 + 2 + 2 >= pageTotal) {
      items.push(...range(1, pageTotal).map(createPage));
    } else {
      items.push(createPage(1));
      const middlePagesStart = Math.min(
        Math.max(activePage - 1, 3),
        pageTotal - 1 - 2 - (showLastPage ? 1 : 0),
      );
      const middlePagesEnd = middlePagesStart + 2;
      const firstEllipsisPageNumber = middlePagesStart - 1;
      const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
      const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis
        ? createPage(firstEllipsisPageNumber)
        : ellipsisItem;
      if (showPageInsteadOfFirstEllipsis && pageTotal > 5) items.push(ellipsisItem);
      items.push(firstEllipsisOrPage);
      items.push(...range(middlePagesStart, middlePagesEnd).map(createPage));
      const lastEllipsisPageNumber = middlePagesEnd + 1;
      const showPageInsteadOfLastEllipsis = lastEllipsisPageNumber === pageTotal - (showLastPage ? 1 : 0);
      const lastEllipsisOrPage = showPageInsteadOfLastEllipsis
        ? createPage(lastEllipsisPageNumber)
        : ellipsisItem;
      items.push(lastEllipsisOrPage);
      if (showPageInsteadOfLastEllipsis && pageTotal > 5) items.push(ellipsisItem);
      if (showLastPage) items.push(createPage(pageTotal));
    }
    items.push({ type: NEXT, value: Math.min(pageTotal, activePage + 1), isActive: activePage < pageTotal });
    return items;
  }
`;

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `${helpers}
  render() {
    const intl = this.parsedIntl();
    const items = this.createItems();
    const lis = items.map((item, index) => {
      if (item.type === 2) {
        return html\`<li class="prev"><span role="button" tabindex=\${item.isActive ? 0 : nothing} aria-label=\${intl.prev} aria-disabled=\${item.isActive ? nothing : "true"}><p-icon color="primary" aria-hidden="true" name="arrow-left"></p-icon></span></li>\`;
      }
      if (item.type === 3) {
        return html\`<li class="next"><span role="button" tabindex=\${item.isActive ? 0 : nothing} aria-label=\${intl.next} aria-disabled=\${item.isActive ? nothing : "true"}><p-icon color="primary" aria-hidden="true" name="arrow-right"></p-icon></span></li>\`;
      }
      if (item.type === 1) {
        const side = index === 2 ? "ellip-start" : "ellip-end";
        return html\`<li class="ellip \${side}"><span class="ellipsis"></span></li>\`;
      }
      const classes = [
        item.isActive ? "current" : "",
        item.isBeforeCurrent ? "current-1" : "",
        item.isAfterCurrent ? "current+1" : "",
        item.isBeforeBeforeCurrent ? "current-2" : "",
        item.isAfterAfterCurrent ? "current+2" : "",
      ].filter(Boolean).join(" ");
      return html\`<li class=\${classes || nothing}><span role="button" tabindex="0" aria-label=\${intl.page + " " + item.value} aria-current=\${item.isActive ? "page" : nothing}>\${item.value}</span></li>\`;
    });
    return html\`<nav aria-label=\${intl.root}><style .innerHTML="\${this.cssText}"></style><ul>\${lis}</ul></nav>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-pagination-whitespace: no pagination render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-pagination-whitespace: compacted Pagination.ts render template');
}
