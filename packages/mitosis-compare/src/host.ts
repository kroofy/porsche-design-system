export const hostClass = (tag: string) => `mitosis-host mh-${tag}`;

/** Light-DOM mount. Generated emit now scopes cssText to `[data-pds]` / `.p-*`. */
export function openCompareRoot(cell: Element, tag: string): HTMLElement {
  const mount = document.createElement('div');
  mount.className = hostClass(tag);
  mount.setAttribute('data-compare-mount', '');
  cell.replaceChildren(mount);
  return mount;
}

export function compareCellText(el: Element): string {
  return (el.textContent || '').replace(/\s+/g, ' ').trim();
}
