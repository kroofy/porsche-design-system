import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = resolve(dirname(fileURLToPath(import.meta.url)), '../output/lit/src/Scroller.ts');
const before = await readFile(file, 'utf8');
let after = before;

after = after.replace(
  'import { LitElement, html, css } from "lit";',
  'import { LitElement, html, css, nothing } from "lit";',
);
after = after.replace(
  'import { html, LitElement } from "lit";',
  'import { html, LitElement, nothing } from "lit";',
);

const propsToEnsure = ['scrollbar', 'compact', 'sticky'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitScroller extends LitElement {',
      `export default class LitScroller extends LitElement {\n  @property() ${prop}: any;`,
    );
  }
}

after = after.replace(
  /let prevVis(?:: any)? = false;/,
  'let prevVis: any = !!this._prevVisible;',
);
after = after.replace(
  /let nextVis(?:: any)? = false;/,
  'let nextVis: any = !!this._nextVisible;',
);
after = after.replace(
  /let hasBar(?:: any)? = this\.scrollbar;/,
  'let hasBar: any = this.scrollbar ?? this.getAttribute("scrollbar");',
);
after = after.replace(
  /let isCompact(?:: any)? = this\.compact;/,
  'let isCompact: any = this.compact ?? this.getAttribute("compact");',
);
after = after.replace(
  /let isSticky(?:: any)? = this\.sticky;/,
  'let isSticky: any = this.sticky ?? this.getAttribute("sticky");',
);

after = after.replace(
  /  render\(\) \{[\s\S]*?\n  \}\n\}/,
  `  render() {
    return html\`<div class="root"><style .innerHTML="\${this.cssText}"></style><span class="prev"></span><span class="next"></span><div class="scroll" tabindex="\${this._prevVisible || this._nextVisible ? 0 : nothing}"><span class="sentinel"></span><slot></slot><span class="sentinel"></span></div></div>\`;
  }
}`,
);

if (!after.includes('firstUpdated(')) {
  after = after.replace(
    /\n\}\s*$/,
    `
  firstUpdated() {
    const scroll = this.renderRoot.querySelector(".scroll");
    const sentinels = this.renderRoot.querySelectorAll(".sentinel");
    const left = sentinels[0];
    const right = sentinels[1];
    const prev = this.renderRoot.querySelector(".prev");
    const next = this.renderRoot.querySelector(".next");
    if (prev && scroll) {
      prev.addEventListener("click", () => {
        scroll.scrollBy({ left: -scroll.offsetWidth * 0.5, behavior: "smooth" });
      });
    }
    if (next && scroll) {
      next.addEventListener("click", () => {
        scroll.scrollBy({ left: scroll.offsetWidth * 0.5, behavior: "smooth" });
      });
    }
    if (!scroll || !left || !right) {
      return;
    }
    this._io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === left) {
            this._prevVisible = !entry.isIntersecting;
          } else if (entry.target === right) {
            this._nextVisible = !entry.isIntersecting;
          }
        }
        this.requestUpdate();
      },
      { root: scroll, threshold: 0.1 },
    );
    this._io.observe(left);
    this._io.observe(right);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._io?.disconnect();
  }
}
`,
  );
}

if (after === before) {
  console.warn('strip-scroller-whitespace: no scroller patches applied');
} else {
  await writeFile(file, after);
  console.warn('strip-scroller-whitespace: patched Scroller.ts');
}
