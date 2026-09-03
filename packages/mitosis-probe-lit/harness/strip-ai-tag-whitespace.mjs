import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/AiTag.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replaceAll(
  'const locale = this.locale || "en-US";',
  'const locale = this.locale ?? this.getAttribute("locale") ?? "en-US";',
);
after = after.replaceAll(
  'const variant = this.variant || "generated";',
  'const variant = this.variant ?? this.getAttribute("variant") ?? "generated";',
);

const propsToEnsure = ['locale', 'variant'];
for (const prop of propsToEnsure) {
  const decl = `@property() ${prop}: any;`;
  if (!after.includes(decl) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      '@customElement("lit-ai-tag")',
      `@customElement("lit-ai-tag")\n  ${decl}\n`,
    );
  }
}

after = after.replace(
  /get isAbbreviation\(\) \{[\s\S]*?\n  \}/,
  `get isAbbreviation() {
    return (this.variant ?? this.getAttribute("variant") ?? "generated") === "abbreviation";
  }`,
);

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    if (this.isAbbreviation) {
      return html\`<style .innerHTML="\${this.cssText}"></style><div><abbr title="\${this.longLabel}">\${this.shortLabel}</abbr></div>\`;
    }
    return html\`<style .innerHTML="\${this.cssText}"></style><div>\${this.copyLabel}</div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-ai-tag-whitespace: no ai-tag render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-ai-tag-whitespace: compacted AiTag.ts render template');
}
