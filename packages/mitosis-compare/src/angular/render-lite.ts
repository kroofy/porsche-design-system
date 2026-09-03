type AngularEmit = {
  new (sanitizer: unknown): Record<string, unknown>;
  compareTemplate?: string;
  compareStyles?: string;
};

const sanitizer = {
  bypassSecurityTrustHtml: (value: unknown) => value,
  bypassSecurityTrustStyle: (value: unknown) => value,
};

const callOrGet = (instance: Record<string, unknown>, expr: string): unknown => {
  const key = expr.trim();
  const bypass = key.match(/^sanitizer\.bypassSecurityTrust\w+\((.+)\)$/);
  if (bypass) return callOrGet(instance, bypass[1]);
  if (/^['"].*['"]$/.test(key)) return key.slice(1, -1);
  const value = instance[key];
  return typeof value === 'function' ? (value as () => unknown).call(instance) : value;
};

const evalCond = (instance: Record<string, unknown>, cond: string): boolean => {
  const trimmed = cond.trim();
  if (trimmed.startsWith('!(') && trimmed.endsWith(')')) {
    return !evalCond(instance, trimmed.slice(2, -1));
  }
  if (trimmed.startsWith('!')) return !evalCond(instance, trimmed.slice(1));
  return Boolean(callOrGet(instance, trimmed));
};

const applyNgIf = (html: string, instance: Record<string, unknown>) =>
  html.replace(/<ng-container\s+\*ngIf="([^"]+)"\s*>([\s\S]*?)<\/ng-container>/g, (_, cond, body) =>
    evalCond(instance, cond) ? body : ''
  );

export const renderAngularEmit = (
  Comp: AngularEmit,
  props: Record<string, unknown>,
  children: Node[]
): HTMLElement => {
  const instance = new Comp(sanitizer);
  Object.assign(instance, props);
  let html = Comp.compareTemplate ?? '';
  html = applyNgIf(html, instance);
  html = html
    .replace(/\[attr\.([^\]]+)\]="([^"]+)"/g, (_, attr, expr) => `data-attr-${attr}="${expr}"`)
    .replace(/\[([^\]]+)\]="([^"]+)"/g, (_, prop, expr) => `data-bind-${prop}="${expr}"`)
    .replace(/\{\{([^}]+)\}\}/g, (_, expr) => {
      const value = callOrGet(instance, expr);
      return value == null ? '' : String(value);
    });

  const host = document.createElement('div');
  host.innerHTML = html;
  host.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement;
    for (const attr of [...el.attributes]) {
      if (attr.name.startsWith('data-attr-')) {
        const value = callOrGet(instance, attr.value);
        if (value != null && value !== false && value !== '') {
          el.setAttribute(attr.name.slice('data-attr-'.length), String(value));
        }
        el.removeAttribute(attr.name);
      } else if (attr.name.startsWith('data-bind-')) {
        const prop = attr.name.slice('data-bind-'.length);
        const value = callOrGet(instance, attr.value);
        if (prop.toLowerCase() === 'innerhtml') {
          el.innerHTML = value == null ? '' : String(value);
        } else if (value != null) {
          el.setAttribute(prop, String(value));
          (el as unknown as Record<string, unknown>)[prop] = value;
        }
        el.removeAttribute(attr.name);
      }
    }
  });

  host.querySelectorAll('compare-slot').forEach((slot) => {
    const parent = slot.parentNode;
    if (!parent) return;
    for (const child of children) parent.insertBefore(child.cloneNode(true), slot);
    slot.remove();
  });

  if (Comp.compareStyles) {
    const style = document.createElement('style');
    style.textContent = Comp.compareStyles;
    host.prepend(style);
  }

  return host;
};
