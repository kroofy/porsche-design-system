import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/TabsItem.ts');
const before = await readFile(file, 'utf8');
let after = before;

if (!after.includes('@property() label') && !after.includes('@property() label:')) {
  after = after.replace(
    'export default class LitTabsItem extends LitElement {',
    'export default class LitTabsItem extends LitElement {\n  @property() label: any;',
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
  console.warn('strip-tabs-item-whitespace: no tabs-item patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-tabs-item-whitespace: patched TabsItem.ts');
}
