/**
 * Light-DOM stand-in for Lit host attributes. Framework emit has no custom
 * element host, so `:host([disabled])` (scoped to `.p-button[disabled]`) only
 * matches when the wrapper carries the same attributes Lit would.
 *
 * `true` maps to "true", not "": React drops "" for boolean attributes such as `disabled`.
 *
 * @param {unknown} value
 * @param {boolean} [keepFalse]  emit "false" for attributes the CSS compares against `="false"`
 * @returns {string | undefined}
 */
export function hostAttr(value, keepFalse = false) {
  if (value === false || value === 'false') return keepFalse ? 'false' : undefined;
  if (value === undefined || value === null) return undefined;
  if (value === true) return 'true';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

// React warns on "true" for these and on `true` for every other attribute.
const BOOLEAN_ATTRS = new Set([
  'checked',
  'disabled',
  'hidden',
  'multiple',
  'open',
  'readonly',
  'required',
  'selected',
]);

/**
 * Spread-ready attributes for React / Vue / Svelte wrappers.
 *
 * @param {Record<string, unknown>} attrs  attribute name -> prop value
 * @param {string[]} [keepFalse]
 * @returns {Record<string, string | boolean>}
 */
export function hostAttrs(attrs, keepFalse = []) {
  const out = {};
  for (const name of Object.keys(attrs)) {
    const value = hostAttr(attrs[name], keepFalse.includes(name));
    if (value !== undefined) out[name] = value === 'true' && BOOLEAN_ATTRS.has(name) ? true : value;
  }
  return out;
}

/**
 * Svelte `style=` takes a string; `hostStyle` returns custom properties.
 *
 * @param {Record<string, string> | undefined} vars
 * @returns {string}
 */
export function styleString(vars) {
  if (!vars) return '';
  return Object.keys(vars)
    .filter((name) => vars[name] != null && vars[name] !== '')
    .map((name) => `${name}: ${vars[name]}`)
    .join('; ');
}
