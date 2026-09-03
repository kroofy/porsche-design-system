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
  next = next.replace(/:not\(:defined,\[data-ssr\]\)\{visibility:hidden\}/g, '');
  next = rewriteHost(next, host);
  next = next.replace(/::slotted\(([^)]+)\)/g, ' $1');
  next = next.replace(/slot\[name=["']([^"']+)["']\]/g, '[data-pds-slot="$1"]');
  next = rewritePdsTags(next, pdsTags);
  return prefixSelectors(next, host);
}

export function rewriteHost(css, host) {
  return css
    .replace(/:host\(([^)]+)\)/g, (_, inner) => {
      const sel = String(inner).trim();
      return `${host}${sel}`;
    })
    .replace(/:host(?![\w-(])/g, host);
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
  return css.replace(/(^|[}{])(\s*)([^{}@][^{}]*)\{/g, (match, brace, space, selectors) => {
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
    return `${brace}${space}${scoped}{`;
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
