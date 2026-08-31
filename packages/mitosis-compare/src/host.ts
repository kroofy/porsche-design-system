export const hostClass = (tag: string) => `mitosis-host mh-${tag}`;

/** Mount point inside a per-cell shadow root so cssText `<style>` cannot leak. */
export function openCompareRoot(cell: Element, tag: string): HTMLElement {
  const host = document.createElement('div');
  host.className = hostClass(tag);
  const shadow = host.attachShadow({ mode: 'open' });
  const mount = document.createElement('div');
  mount.setAttribute('data-compare-mount', '');
  shadow.append(mount);
  cell.replaceChildren(host);
  return mount;
}

export function compareCellText(el: Element): string {
  const host = el.querySelector('.mitosis-host');
  const root = host?.shadowRoot;
  const source = root ?? el;
  return (source.textContent || '').replace(/\s+/g, ' ').trim();
}
