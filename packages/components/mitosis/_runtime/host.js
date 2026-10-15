/**
 * Light-DOM stand-in for Lit host attributes. Framework emit has no custom
 * element host, so `:host([disabled])` (scoped to `.p-button[disabled]`) only
 * matches when the wrapper carries the same attributes Lit would.
 *
 * @param {unknown} value
 * @returns {string | undefined}
 */
export function hostAttr(value) {
  if (value === undefined || value === null || value === false || value === 'false') return undefined;
  if (value === true) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * @param {Record<string, unknown>} attrs  attribute name -> prop value
 * @returns {Record<string, string>}
 */
export function hostAttrs(attrs) {
  const out = {};
  for (const name of Object.keys(attrs)) {
    const value = hostAttr(attrs[name]);
    if (value !== undefined) out[name] = value;
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
