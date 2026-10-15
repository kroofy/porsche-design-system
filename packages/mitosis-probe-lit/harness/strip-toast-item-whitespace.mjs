import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/ToastItem.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replaceAll(
  'const visual = this.state || "info";',
  'const visual = this.state ?? this.getAttribute("state") ?? "info";',
);
after = after.replace(
  /get textValue\(\) \{[\s\S]*?\n  \}/,
  `get textValue() {
    return this.text ?? this.getAttribute("text") ?? "";
  }`,
);

if (!after.includes('connectedCallback()')) {
  after = after.replace(
    '  render() {',
    `  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("popover", "manual");
  }

  updated() {
    if (typeof this.showPopover === "function" && !this.matches(":popover-open")) {
      this.showPopover();
    }
  }

  render() {`,
  );
}

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    return html\`<style .innerHTML="\${this.cssText}"></style><div class="notification"><p>\${this.textValue}</p><button class="dismiss" type="button"><span>Close notification message</span></button></div>\`;
  }
}`,
);

if (after === before) {
  console.warn('strip-toast-item-whitespace: no patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-toast-item-whitespace: patched ToastItem.ts');
}
