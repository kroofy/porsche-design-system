import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const tagTs = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Tag.ts');
const before = await readFile(tagTs, 'utf8');
const compacted = before.replace(
  /return html`[\s\S]*?`;/,
  'return html`<span><style .innerHTML="${this.cssText}"></style><p-icon class="icon" name="${this.iconName}" source="${this.iconSrc}" color="inherit" size="x-small" aria-hidden="true"></p-icon><slot></slot></span>`;'
);
const after = compacted
  .replace(
    'const source = this.iconSource || "";',
    'const source = this.iconSource || this.getAttribute("icon-source") || this.getAttribute("iconsource") || "";'
  )
  .replace(
    'get iconSrc() {\n    return this.iconSource || "";\n  }',
    'get iconSrc() {\n    return this.iconSource || this.getAttribute("icon-source") || this.getAttribute("iconsource") || "";\n  }'
  );
if (after === before) {
  console.warn('strip-tag-whitespace: no tag render template to compact');
} else {
  await writeFile(tagTs, after);
  console.warn('strip-tag-whitespace: compacted Tag.ts render template');
}
