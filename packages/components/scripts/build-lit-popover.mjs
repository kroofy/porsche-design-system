import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { assertLitIdiom } = require('../mitosis/_runtime/assert-lit-idiom.js');

const componentsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mitosisDir = resolve(componentsRoot, 'mitosis/popover');
const probeNodeModules = resolve(componentsRoot, '../mitosis-probe-lit/node_modules');
const mitosisBin = resolve(probeNodeModules, '.bin/mitosis');
const esbuildBin = resolve(componentsRoot, '../../node_modules/.bin/esbuild');
const outfile = resolve(componentsRoot, 'src/assets/p-popover.iife.js');

const env = {
  ...process.env,
  NODE_PATH: [probeNodeModules, resolve(componentsRoot, '../../node_modules')].join(':'),
};

const mit = spawnSync(mitosisBin, ['build'], { cwd: mitosisDir, env, stdio: 'inherit' });
if (mit.status !== 0) process.exit(mit.status ?? 1);

const generatedCandidates = [
  resolve(mitosisDir, 'output/lit/src/Popover.ts'),
  resolve(mitosisDir, 'output/lit/Popover.ts'),
];
const generated = generatedCandidates.find((path) => existsSync(path));
if (!generated) {
  console.error('build-lit-popover: generated Popover.ts not found');
  process.exit(1);
}

const extraMethods = `  _isInitialRender = true;
  _isOpen = false;
  _cleanUpAutoUpdate;
  _boundTrigger;

  applyHostStyle() {
    const vars = this.hostStyle;
    if (!vars) return;
    for (const name of Object.keys(vars)) {
      const value = vars[name];
      if (value == null || value === "") this.style.removeProperty(name);
      else this.style.setProperty(name, String(value));
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.applyHostStyle();
    this._childObserver = new MutationObserver(() => this.requestUpdate());
    this._childObserver.observe(this, { childList: true, subtree: false });
    this.addEventListener("click", this._onHostClick);
    this.addEventListener("slotchange", () => this.requestUpdate());
    queueMicrotask(() => {
      this.stampSlottedIcons();
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    this._childObserver?.disconnect();
    this.removeEventListener("click", this._onHostClick);
    this._cleanUpAutoUpdate?.();
    this._cleanUpAutoUpdate = undefined;
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.renderRoot?.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => this.requestUpdate());
    });
  }

  _onHostClick = (e) => {
    if (this.isControlled()) return;
    if (e.target?.closest?.('[slot="button"]')) {
      this._isOpen = !this._isOpen;
      this.requestUpdate();
    }
  };

  isControlled() {
    if (this.open === true || this.open === false) return true;
    return this.hasAttribute("open");
  }

  effectiveOpen() {
    if (this.isControlled()) {
      const raw = this.open ?? this.getAttribute("open");
      return raw === true || raw === "true" || raw === "";
    }
    return !!this._isOpen;
  }

  hasSlottedButton() {
    return !!this.querySelector('[slot="button"]');
  }

  stampSlottedIcons() {
    const files = { information: "information.da41162.svg" };
    for (const el of this.querySelectorAll('[slot="button"]')) {
      const icon = el.icon ?? el.getAttribute("icon");
      if (files[icon] && !(el.iconSource || el.getAttribute("icon-source"))) {
        el.iconSource = "http://localhost:3001/icons/" + files[icon];
      }
    }
  }

  triggerElement() {
    const root = this.renderRoot;
    const button = root?.querySelector("button");
    if (button) return button;
    const slot = root?.querySelector('slot[name="button"]');
    return slot?.assignedElements?.()[0] ?? this.querySelector('[slot="button"]');
  }

  async positionPopover() {
    const pop = this.renderRoot?.querySelector("[popover]");
    const arrowEl = this.renderRoot?.querySelector(".arrow");
    const trigger = this.triggerElement();
    if (!pop || !arrowEl || !trigger) return;
    const { x, y, placement, middlewareData } = await computePosition(trigger, pop, {
      placement: this.direction ?? this.getAttribute("direction") ?? "bottom",
      strategy: "fixed",
      middleware: [
        offset(18),
        shift({
          padding: 8,
          limiter: limitShift({
            offset: ({ rects }) => (rects.reference.width > 33 ? 0 : rects.reference.width),
          }),
        }),
        flip({
          padding: 8,
          fallbackAxisSideDirection: "end",
        }),
        arrow({
          element: arrowEl,
          padding: Number.parseFloat(getComputedStyle(pop).borderRadius) || 12,
        }),
      ],
    });
    const placementVertical = placement === "top" || placement === "bottom";
    const placementTopLeft = placement === "top" || placement === "left";
    Object.assign(pop.style, { left: x + "px", top: y + "px" });
    const { x: xArrow, y: yArrow } = middlewareData.arrow || {};
    Object.assign(arrowEl.style, {
      clipPath: placementVertical ? "polygon(50% 0, 100% 110%, 0 110%)" : "polygon(0 50%, 110% 0, 110% 100%)",
      width: placementVertical ? "24px" : "12px",
      height: placementVertical ? "12px" : "24px",
      transform: "rotate(" + (placementTopLeft ? "180deg" : "0") + ")",
      left: ["right", "bottom", "top"].includes(placement)
        ? xArrow != null
          ? xArrow + "px"
          : "-12px"
        : "",
      right: placement === "left" ? (xArrow != null ? xArrow + "px" : "-12px") : "",
      top: ["bottom", "left", "right"].includes(placement)
        ? yArrow != null
          ? yArrow + "px"
          : "-12px"
        : "",
      bottom: placement === "top" ? (yArrow != null ? yArrow + "px" : "-12px") : "",
    });
  }

  syncAutoUpdate(active) {
    const trigger = this.triggerElement();
    const pop = this.renderRoot?.querySelector("[popover]");
    if (active && this._cleanUpAutoUpdate && this._boundTrigger !== trigger) {
      this._cleanUpAutoUpdate();
      this._cleanUpAutoUpdate = undefined;
    }
    if (active && trigger && pop && !this._cleanUpAutoUpdate) {
      this._cleanUpAutoUpdate = autoUpdate(trigger, pop, () => this.positionPopover());
      this._boundTrigger = trigger;
    } else if (!active && this._cleanUpAutoUpdate) {
      this._cleanUpAutoUpdate();
      this._cleanUpAutoUpdate = undefined;
      this._boundTrigger = undefined;
    }
  }

  async updated() {
    this.applyHostStyle();
    this.stampSlottedIcons();
    const pop = this.renderRoot?.querySelector("[popover]");
    const open = this.effectiveOpen();
    if (pop) {
      if (open) {
        const nested = [...this.querySelectorAll("p-popover")];
        await Promise.all(nested.map((el) => el.updateComplete).filter(Boolean));
        if (pop.matches(":popover-open")) {
          if (nested.length) {
            pop.hidePopover();
            pop.showPopover();
          }
        } else {
          pop.showPopover();
        }
      } else if (pop.matches(":popover-open")) {
        pop.hidePopover();
      }
    }
    this.syncAutoUpdate(open);
    if (open) await this.positionPopover();
    this._isInitialRender = false;
  }

  render() {
    const open = this.effectiveOpen();
    const description = this.description ?? this.getAttribute("description") ?? "";
    const hasDescription = !!(description && description !== "undefined");
    const trigger = this.hasSlottedButton()
      ? html\`<slot name="button"></slot>\`
      : html\`<button type="button" aria-label="More information" aria-details="popover" aria-expanded=\${open ? "true" : "false"} @click=\${() => {
          if (!this.isControlled()) {
            this._isOpen = !this._isOpen;
            this.requestUpdate();
          }
        }}></button>\`;
    const body = hasDescription ? html\`<p>\${description}</p>\` : html\`<slot></slot>\`;
    return html\`\${trigger}<div id="popover" popover="manual" ?inert=\${!open}><div class="arrow"></div>\${body}</div>\`;
  }
}`;

const before = await readFile(generated, 'utf8');
let after = before
  .replace(/<my-fragment[\s\S]*?>/g, '')
  .replace(/<\/my-fragment>/g, '')
  .replace(
    'import { LitElement, html, css } from "lit";',
    'import { LitElement, html, css, nothing } from "lit";'
  )
  .replaceAll('const isOpen = isTrue(this.open);', 'const isOpen = this.effectiveOpen();')
  .replaceAll(
    'const compact = isTrue(this.compact);',
    'const compact = isTrue(this.compact ?? this.getAttribute("compact"));'
  )
  .replace('return this.description || "";', 'return this.description ?? this.getAttribute("description") ?? "";');

if (!after.includes('@floating-ui/dom')) {
  after = after.replace(
    'import { customElement, property, state, query } from "lit/decorators";',
    'import { customElement, property, state, query } from "lit/decorators";\nimport { arrow, autoUpdate, computePosition, flip, limitShift, offset, shift } from "@floating-ui/dom";'
  );
}

const propsToEnsure = ['open', 'direction', 'description', 'compact', 'aria'];
for (const prop of propsToEnsure) {
  if (!after.includes(`@property() ${prop}`) && !after.includes(`@property() ${prop}:`)) {
    after = after.replace(
      'export default class LitPopover extends LitElement {',
      `export default class LitPopover extends LitElement {\n  @property() ${prop}: any;`
    );
  }
}

after = after.replace(/  render\(\) \{[\s\S]*?\n  \}\n\}/, extraMethods);

if (after.includes('my-fragment')) {
  console.error('build-lit-popover: my-fragment leaked after strip');
  process.exit(1);
}
if (!after.includes('@customElement("p-popover")')) {
  console.error('build-lit-popover: expected @customElement("p-popover")');
  process.exit(1);
}

const required = [
  'popover="manual"',
  'showPopover',
  'hidePopover',
  'effectiveOpen',
  'isControlled',
  'hasSlottedButton',
  'querySelectorAll("p-popover")',
  'MutationObserver',
  'slotchange',
  'queueMicrotask',
  'information.da41162.svg',
  'stampSlottedIcons',
  'computePosition',
  'autoUpdate',
  'static styles',
  'hostStyle',
  'applyHostStyle',
  '@starting-style',
  '--p-pop-pad',
];
const missing = required.filter((needle) => !after.includes(needle));
if (missing.length) {
  console.error(`build-lit-popover: missing ${missing.join(', ')}`);
  process.exit(1);
}
if (after.includes('<style') || after.includes('.innerHTML') || after.includes('get cssText')) {
  console.error('build-lit-popover: injected style must be gone');
  process.exit(1);
}
try {
  assertLitIdiom(after, { tag: 'p-popover', requireHostStyle: true });
} catch (err) {
  console.error(`build-lit-popover: ${err.message}`);
  process.exit(1);
}
if (after.includes('lit-popover') || after.includes('delegatesFocus') || after.includes('formAssociated')) {
  console.error('build-lit-popover: generated output must stay p-* and not fake delegatesFocus/formAssociated');
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
