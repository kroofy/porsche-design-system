import { effect, ElementRef, inject, type Signal } from '@angular/core';
import type { NativeAppearance } from '../../../../components/src/elements/appearance';

export const applyAppearance = (appearance: Signal<NativeAppearance>): void => {
  const el: HTMLElement = inject(ElementRef).nativeElement;
  const applied = new Set<string>();

  effect(() => {
    const { className, attrs } = appearance();
    el.classList.add(className);

    const next = new Set(Object.keys(attrs));
    for (const name of applied) {
      if (!next.has(name)) {
        el.removeAttribute(name);
        applied.delete(name);
      }
    }

    for (const [name, value] of Object.entries(attrs)) {
      el.setAttribute(name, value);
      applied.add(name);
    }
  });
};
