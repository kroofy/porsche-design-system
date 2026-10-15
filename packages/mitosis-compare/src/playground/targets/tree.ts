import type { DemoNode } from '../demos';

export const collectTags = (node: DemoNode, acc = new Set<string>()): Set<string> => {
  if (typeof node === 'string') return acc;
  if ('c' in node) acc.add(node.c);
  for (const child of node.children ?? []) collectTags(child, acc);
  return acc;
};

export const slotOf = (node: DemoNode): string | undefined =>
  typeof node === 'string' ? undefined : (node.slot ?? ('el' in node ? node.attrs?.slot : undefined));

/** Split children into the default slot and named slots. */
export const splitSlots = (children: DemoNode[] = []) => {
  const named: Record<string, DemoNode[]> = {};
  const rest: DemoNode[] = [];
  for (const child of children) {
    const slot = slotOf(child);
    if (slot) (named[slot] ??= []).push(child);
    else rest.push(child);
  }
  return { rest, named };
};

export const styleObject = (style?: string): Record<string, string> | undefined => {
  if (!style) return undefined;
  const out: Record<string, string> = {};
  for (const decl of style.split(';')) {
    const [prop, ...value] = decl.split(':');
    if (!prop?.trim() || !value.length) continue;
    out[prop.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase())] = value.join(':').trim();
  }
  return out;
};

/** Load framework emit modules for every tag in the tree. */
export const loadComponents = async <T>(
  modules: Record<string, () => Promise<unknown>>,
  pattern: RegExp,
  tags: Set<string>
): Promise<Record<string, T>> => {
  const byTag = new Map<string, () => Promise<unknown>>();
  for (const [path, loader] of Object.entries(modules)) {
    const match = path.match(pattern);
    if (match) byTag.set(match[1], loader);
  }
  const comps: Record<string, T> = {};
  for (const tag of tags) {
    const loader = byTag.get(tag);
    if (!loader) throw new Error(`no emit for p-${tag}`);
    comps[tag] = ((await loader()) as { default: T }).default;
  }
  return comps;
};

export const appendDom = (
  parent: Node,
  node: DemoNode,
  createComponent: (node: Extract<DemoNode, { c: string }>) => Element
) => {
  if (typeof node === 'string') {
    parent.appendChild(document.createTextNode(node));
    return;
  }
  if ('el' in node) {
    const element = document.createElement(node.el);
    for (const [name, value] of Object.entries(node.attrs ?? {})) element.setAttribute(name, value);
    if (node.slot) element.setAttribute('slot', node.slot);
    for (const child of node.children ?? []) appendDom(element, child, createComponent);
    parent.appendChild(element);
    return;
  }
  const element = createComponent(node);
  if (node.slot) element.setAttribute('slot', node.slot);
  for (const child of node.children ?? []) appendDom(element, child, createComponent);
  parent.appendChild(element);
};
