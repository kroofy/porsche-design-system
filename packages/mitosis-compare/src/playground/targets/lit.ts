import deps from 'virtual:pds-lit-deps';
import { kebab } from '../demos';
import type { RootNode } from '../frame';
import { appendDom, collectTags } from './tree';

const loaded = new Map<string, Promise<void>>();

const closure = (tags: Iterable<string>) => {
  const out = new Set<string>();
  const visit = (tag: string) => {
    if (out.has(tag)) return;
    out.add(tag);
    for (const dep of deps[tag] ?? []) visit(dep);
  };
  for (const tag of tags) visit(tag);
  return out;
};

const loadIife = (tag: string) => {
  if (!loaded.has(tag)) {
    loaded.set(
      tag,
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `pds-assets/p-${tag}.iife.js`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`failed to load p-${tag}.iife.js`));
        document.head.appendChild(script);
      })
    );
  }
  return loaded.get(tag) as Promise<void>;
};

/** Attributes drive `:host([attr])` styling in the Lit build; objects go through properties. */
export const applyProps = (element: Element, props: Record<string, unknown> = {}) => {
  for (const [name, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'object') {
      element.setAttribute(kebab(name), JSON.stringify(value));
    } else if (value === true) {
      element.setAttribute(kebab(name), '');
    } else if (value !== false) {
      element.setAttribute(kebab(name), String(value));
    }
    (element as unknown as Record<string, unknown>)[name] = value;
  }
};

export async function render(mount: HTMLElement, root: RootNode) {
  await Promise.all([...closure(collectTags(root))].map(loadIife));
  appendDom(mount, root, (node) => {
    const element = document.createElement(`p-${node.c}`);
    applyProps(element, node.props);
    return element;
  });
  await Promise.all(
    [...mount.querySelectorAll('*')].map((element) => (element as { updateComplete?: Promise<unknown> }).updateComplete)
  );
}
