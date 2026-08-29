import type { NativeAppearance } from './core/appearance';

export const syncAppearance = (el: HTMLElement, appearance: NativeAppearance, applied: Set<string>): void => {
  el.classList.add(appearance.className);

  const next = new Set(Object.keys(appearance.attrs));
  for (const name of applied) {
    if (!next.has(name)) {
      el.removeAttribute(name);
      applied.delete(name);
    }
  }

  for (const [name, value] of Object.entries(appearance.attrs)) {
    el.setAttribute(name, value);
    applied.add(name);
  }
};
