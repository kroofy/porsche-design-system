import { type Component, createApp, h, type VNodeChild } from 'vue';
import type { DemoNode } from '../demos';
import type { RootNode } from '../frame';
import { collectTags, loadComponents, splitSlots } from './tree';

const modules = import.meta.glob('../../../../components/mitosis/*/output/frameworks/vue/*.vue');

const toVue = (node: DemoNode, comps: Record<string, Component>): VNodeChild => {
  if (typeof node === 'string') return node;
  if ('el' in node) {
    return h(node.el, { ...node.attrs, slot: node.slot }, (node.children ?? []).map((child) => toVue(child, comps)));
  }
  const { rest, named } = splitSlots(node.children);
  const slots: Record<string, () => VNodeChild[]> = {
    default: () => rest.map((child) => toVue(child, comps)),
  };
  for (const [name, nodes] of Object.entries(named)) slots[name] = () => nodes.map((child) => toVue(child, comps));
  return h(comps[node.c], { ...node.props }, slots);
};

export async function render(mount: HTMLElement, root: RootNode) {
  const comps = await loadComponents<Component>(modules, /mitosis\/([^/]+)\/output\/frameworks\/vue\//, collectTags(root));
  const errors: unknown[] = [];
  const app = createApp({ render: () => toVue(root, comps) });
  app.config.errorHandler = (error) => {
    errors.push(error);
    window.__frameErrors.push(error instanceof Error ? error.message : String(error));
  };
  app.mount(mount);
  if (errors.length) throw errors[0];
}
