import * as React from 'react';
import { createRoot } from 'react-dom/client';
import type { DemoNode } from '../demos';
import type { RootNode } from '../frame';
import { collectTags, loadComponents, splitSlots, styleObject } from './tree';

const modules = import.meta.glob('../../../../components/mitosis/*/output/frameworks/react/*.tsx');

type Comp = React.ComponentType<Record<string, unknown>>;

class Boundary extends React.Component<
  { onError: (error: Error) => void; children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  componentDidCatch(error: Error) {
    window.__frameErrors.push(error.message);
    this.props.onError(error);
  }
  render() {
    return this.state.error ? (
      <pre className="variant-error">react render failed: {this.state.error}</pre>
    ) : (
      this.props.children
    );
  }
}

const toReact = (node: DemoNode, comps: Record<string, Comp>, key?: number): React.ReactNode => {
  if (typeof node === 'string') return node;
  if ('el' in node) {
    const { class: className, style, ...attrs } = node.attrs ?? {};
    return React.createElement(
      node.el,
      { key, ...attrs, className, style: styleObject(style), slot: node.slot },
      ...(node.children ?? []).map((child, i) => toReact(child, comps, i))
    );
  }
  // Named <slot name="x"> becomes props.x in the React emit.
  const { rest, named } = splitSlots(node.children);
  const slotProps = Object.fromEntries(
    Object.entries(named).map(([name, nodes]) => [name, nodes.map((child, i) => toReact(child, comps, i))])
  );
  return React.createElement(
    comps[node.c],
    { key, ...node.props, ...slotProps },
    ...rest.map((child, i) => toReact(child, comps, i))
  );
};

export async function render(mount: HTMLElement, root: RootNode) {
  const comps = await loadComponents<Comp>(modules, /mitosis\/([^/]+)\/output\/frameworks\/react\//, collectTags(root));
  await new Promise<void>((resolve, reject) => {
    const reactRoot = createRoot(mount);
    reactRoot.render(<Boundary onError={reject}>{toReact(root, comps)}</Boundary>);
    setTimeout(resolve, 50);
  });
}
