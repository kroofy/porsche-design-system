import '@angular/compiler';
import {
  type ApplicationRef,
  createComponent,
  provideZonelessChangeDetection,
  reflectComponentType,
  type Type,
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import type { DemoNode } from '../demos';
import type { RootNode } from '../frame';
import { collectTags, loadComponents, slotOf } from './tree';

const modules = import.meta.glob('../../../../components/mitosis/*/output/frameworks/angular/*.ts');

let appPromise: Promise<ApplicationRef> | undefined;
const app = () => {
  appPromise ??= createApplication({ providers: [provideZonelessChangeDetection()] });
  return appPromise;
};

const selectorSlot = (selector: string) => selector.match(/^\[slot=["']?([^"'\]]+)["']?\]$/)?.[1];

const build = (node: DemoNode, comps: Record<string, Type<unknown>>, appRef: ApplicationRef): Node => {
  if (typeof node === 'string') return document.createTextNode(node);
  if ('el' in node) {
    const element = document.createElement(node.el);
    for (const [name, value] of Object.entries(node.attrs ?? {})) element.setAttribute(name, value);
    if (node.slot) element.setAttribute('slot', node.slot);
    for (const child of node.children ?? []) element.appendChild(build(child, comps, appRef));
    return element;
  }
  const Comp = comps[node.c];
  const mirror = reflectComponentType(Comp);
  if (!mirror) throw new Error(`p-${node.c} is not an Angular component`);
  // Dynamic projection is positional: bucket children by the template's ng-content selectors.
  const selectors = mirror.ngContentSelectors;
  const buckets: Node[][] = selectors.map(() => []);
  for (const child of node.children ?? []) {
    const slot = slotOf(child);
    let index = selectors.findIndex((selector) => (slot ? selectorSlot(selector) === slot : selector === '*'));
    if (index < 0) index = selectors.indexOf('*');
    if (index >= 0) buckets[index].push(build(child, comps, appRef));
  }
  const ref = createComponent(Comp, { environmentInjector: appRef.injector, projectableNodes: buckets });
  const inputs = new Set(mirror.inputs.map((input) => input.templateName));
  for (const [name, value] of Object.entries(node.props ?? {})) {
    if (inputs.has(name)) ref.setInput(name, value);
  }
  if (node.slot) (ref.location.nativeElement as HTMLElement).setAttribute('slot', node.slot);
  appRef.attachView(ref.hostView);
  return ref.location.nativeElement;
};

export async function render(mount: HTMLElement, root: RootNode) {
  const comps = await loadComponents<Type<unknown>>(
    modules,
    /mitosis\/([^/]+)\/output\/frameworks\/angular\//,
    collectTags(root)
  );
  const appRef = await app();
  mount.appendChild(build(root, comps, appRef));
  appRef.tick();
}
