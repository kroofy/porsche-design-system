import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/TextList.ts');
const before = await readFile(file, 'utf8');
let after = before.replaceAll(
  'const type = this.type || "unordered";',
  'const type = this.type ?? this.getAttribute("type") ?? "unordered";',
);

const propsToEnsure = ['type'];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(decl) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      '@customElement("lit-text-list")',
      `@customElement("lit-text-list")\n  ${decl}\n`,
    );
  }
}

after = after.replace(
  /get isOrdered\(\) \{[\s\S]*?\n  \}/,
  `get isOrdered() {
    const type = this.type ?? this.getAttribute("type") ?? "unordered";
    return type !== "unordered";
  }`,
);

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    if (this.isOrdered) {
      return html\`<ol><style .innerHTML="\${this.cssText}"></style><slot></slot></ol>\`;
    }
    return html\`<ul><style .innerHTML="\${this.cssText}"></style><slot></slot></ul>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-text-list-whitespace: no text-list render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-text-list-whitespace: compacted TextList.ts render template');
}
