import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Button.ts');
const before = await readFile(file, 'utf8');
const after = before
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";',
  )
  .replace(
    /return html`[\s\S]*?`;/,
    'return html`<button class="root" type=${this.buttonType || "submit"} aria-disabled=${this.ariaDisabled || nothing}><style .innerHTML="${this.cssText}"></style><p-icon class="icon" name=${this.iconName || nothing} source=${this.iconSrc || nothing} size="inherit" color="inherit" aria-hidden="true"></p-icon><p-spinner class="spinner" size="inherit" aria-hidden="true"></p-spinner><span class="label"><slot></slot></span><span class="loading" id="loading" role="status">${this.loadingText}</span></button>`;',
  )
  .replace(
    'const source = this.iconSource || "";',
    'const source = this.iconSource || this.getAttribute("icon-source") || this.getAttribute("iconsource") || "";',
  )
  .replace(
    'get iconSrc() {\n    return this.iconSource || "";\n  }',
    'get iconSrc() {\n    return this.iconSource || this.getAttribute("icon-source") || this.getAttribute("iconsource") || "";\n  }',
  )
  .replace(
    'const hideLabel = parse(this.hideLabel, false);',
    'const hideLabel = parse(this.getAttribute("hide-label") ?? this.hideLabel, false);',
  )
  .replace(
    'const compact = parse(this.compact, false);',
    'const compact = parse(this.getAttribute("compact") ?? this.compact, false);',
  );
if (after === before) {
  console.warn('strip-button-whitespace: no button render template to compact');
} else {
  await writeFile(file, after);
  console.warn('strip-button-whitespace: compacted Button.ts render template');
}
