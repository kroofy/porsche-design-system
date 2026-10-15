/**
 * Map Lit/CE cssText (`:host`, `::slotted`, `p-*` tags) onto a light-DOM
 * host so the same .lite.tsx styles work in React/Vue/Svelte/Angular.
 *
 * @param {string} css
 * @param {string} host  CSS selector for the framework host, e.g. `.p-button`
 * @param {string[]} [pdsTags]  tag names like `p-icon` to rewrite to classes
 * @returns {string}
 */
export function scopeCss(css, host, pdsTags = DEFAULT_PDS_TAGS) {
  if (!css) return '';
  let next = String(css);
  // Lit FOUC guard: framework hosts (e.g. Angular `<p-icon>`) are never `:defined`.
  next = next.replace(/(^|[{}])\s*:not\(:defined,\s*\[data-ssr\]\)\s*\{\s*visibility:\s*hidden;?\s*\}/g, '$1');
  next = rewriteHost(next, host);
  next = `:where(${SLOT_MARKER}){display:contents}\n${rewriteSlots(next)}`;
  next = rewritePdsTags(next, pdsTags);
  return prefixSelectors(next, host);
}

/** Framework adapters wrap every `<slot>` outlet in `<span data-pds-slot="name">`. */
const SLOT_MARKER = '[data-pds-slot]';

const closingParen = (text, open) => {
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    if (text[i] === '(') depth += 1;
    else if (text[i] === ')' && --depth === 0) return i;
  }
  return text.length;
};

const mapSlotSelector = (part) => {
  const sel = part
    .replace(/(^|[\s>+~(,])slot(?=$|[\s>+~:.[)])/g, `$1${SLOT_MARKER}`)
    .replace(/\[data-pds-slot\]\[name=["']?([^"'\]]+)["']?\]/g, '[data-pds-slot="$1"]');
  let out = '';
  let index = 0;
  for (let start = sel.indexOf('::slotted(', index); start >= 0; start = sel.indexOf('::slotted(', index)) {
    const end = closingParen(sel, start + '::slotted'.length);
    const before = sel.slice(index, start);
    const attached = /\[data-pds-slot(?:="[^"]*")?\]$/.test(before);
    const lead = attached ? '' : `${before.trim() && !/\s$/.test(before) ? ' ' : ''}${SLOT_MARKER}`;
    out += `${before}${lead} > ${sel.slice(start + '::slotted('.length, end)}`;
    index = end + 1;
  }
  return out + sel.slice(index);
};

/**
 * `slot` -> the marker, `::slotted(x)` -> `x` as a direct child of the marker.
 * A plain descendant selector would also hit the component's own markup.
 */
export function rewriteSlots(css) {
  return css.replace(/(?<=^|[{}])(\s*)([^{}]+)\{/g, (match, space, prelude) => {
    if (!prelude.trim() || prelude.trim().startsWith('@')) return match;
    return `${space}${splitSelectors(prelude).map(mapSlotSelector).join(',')}{`;
  });
}

export function rewriteHost(css, host) {
  let out = '';
  let index = 0;
  for (let start = css.indexOf(':host(', index); start >= 0; start = css.indexOf(':host(', index)) {
    // Balanced: `:host(:not([a]):not([b]))` holds nested parens.
    let depth = 0;
    let end = start + ':host'.length;
    for (; end < css.length; end += 1) {
      if (css[end] === '(') depth += 1;
      else if (css[end] === ')' && --depth === 0) break;
    }
    out += `${css.slice(index, start)}${host}${css.slice(start + ':host('.length, end).trim()}`;
    index = end + 1;
  }
  return `${out}${css.slice(index)}`.replace(/:host(?![\w-(])/g, host);
}

export function rewritePdsTags(css, pdsTags = DEFAULT_PDS_TAGS) {
  if (!pdsTags.length) return css;
  const tags = [...pdsTags].sort((a, b) => b.length - a.length);
  const re = new RegExp(`(?<![.\\w-])(${tags.map(escapeRe).join('|')})(?![\\w-])`, 'g');
  return css.replace(re, '.$1');
}

const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const alreadyScoped = (sel, host) => new RegExp(`^${escapeRe(host)}(?:$|[\\s.:#[>+~])`).test(sel);

const splitSelectors = (selectors) => {
  const parts = [];
  let current = '';
  let depth = 0;
  for (const char of selectors) {
    if (char === '(') depth += 1;
    else if (char === ')') depth = Math.max(0, depth - 1);
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  parts.push(current);
  return parts;
};

export function prefixSelectors(css, host) {
  // Lookbehind so the `{` that opens an @media body stays available to its first rule.
  return css.replace(/(?<=^|[{}])(\s*)([^{}]+)\{/g, (match, space, selectors) => {
    const trimmed = selectors.trim();
    if (!trimmed) return match;
    if (trimmed.startsWith('@')) return match;
    const scoped = splitSelectors(selectors)
      .map((part) => {
        const leading = part.match(/^\s*/)?.[0] ?? '';
        const sel = part.trim();
        if (!sel) return part;
        if (/^(from|to|\d+(?:\.\d+)?%)$/i.test(sel)) return part;
        if (alreadyScoped(sel, host)) return part;
        return `${leading}${host} ${sel}`;
      })
      .join(',');
    return `${space}${scoped}{`;
  });
}

export const DEFAULT_PDS_TAGS = [
  'p-accordion',
  'p-ai-tag',
  'p-banner',
  'p-button-pure',
  'p-button-tile',
  'p-button',
  'p-canvas',
  'p-carousel',
  'p-checkbox',
  'p-crest',
  'p-display',
  'p-divider',
  'p-drilldown-item',
  'p-drilldown-link',
  'p-drilldown',
  'p-fieldset',
  'p-flag',
  'p-flyout',
  'p-heading',
  'p-icon',
  'p-inline-notification',
  'p-input-date',
  'p-input-email',
  'p-input-month',
  'p-input-number',
  'p-input-password',
  'p-input-search',
  'p-input-tel',
  'p-input-text',
  'p-input-time',
  'p-input-url',
  'p-input-week',
  'p-link-pure',
  'p-link-tile-product',
  'p-link-tile',
  'p-link',
  'p-modal',
  'p-model-signature',
  'p-multi-select-option',
  'p-multi-select',
  'p-optgroup',
  'p-pagination',
  'p-pin-code',
  'p-popover',
  'p-radio-group-option',
  'p-radio-group',
  'p-scroller',
  'p-segmented-control-item',
  'p-segmented-control',
  'p-select-option',
  'p-select',
  'p-sheet',
  'p-spinner',
  'p-stepper-horizontal-item',
  'p-stepper-horizontal',
  'p-switch',
  'p-table-body',
  'p-table-cell',
  'p-table-head-cell',
  'p-table-head-row',
  'p-table-head',
  'p-table-row',
  'p-table',
  'p-tabs-bar',
  'p-tabs-item',
  'p-tabs',
  'p-tag-dismissible',
  'p-tag',
  'p-text-list-item',
  'p-text-list',
  'p-text',
  'p-textarea',
  'p-toast-item',
  'p-toast',
  'p-wordmark',
];
