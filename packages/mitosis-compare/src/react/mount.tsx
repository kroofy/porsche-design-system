import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DEMOS, pascal, type Demo, type DemoChild } from '../catalog';
import { hostClass } from '../host';

class ErrorBoundary extends React.Component<
  { label: string; children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    if (this.state.error) {
      return <pre className="cell-error">{this.props.label}: {this.state.error}</pre>;
    }
    return this.props.children;
  }
}

const modules = import.meta.glob([
  '../../../../packages/components/mitosis/*/output/frameworks/react/*.tsx',
  '!../../../../packages/components/mitosis/button-pure/output/frameworks/react/*',
  '!../../../../packages/components/mitosis/tag-dismissible/output/frameworks/react/*',
]);
const fixedModules = import.meta.glob('./fixed/*.tsx');

const byTag = new Map<string, () => Promise<{ default: React.ComponentType<any> }>>();
for (const [path, loader] of Object.entries(modules)) {
  const match = path.match(/mitosis\/([^/]+)\/output\/frameworks\/react\/([^/]+)\.tsx$/);
  if (!match) continue;
  byTag.set(match[1], loader as () => Promise<{ default: React.ComponentType<any> }>);
}
for (const [path, loader] of Object.entries(fixedModules)) {
  const match = path.match(/fixed\/([^/]+)\.tsx$/);
  if (!match) continue;
  const tag = match[1]
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
  byTag.set(tag, loader as () => Promise<{ default: React.ComponentType<any> }>);
}

function childNodes(demo: Demo, comps: Record<string, React.ComponentType<any>>): React.ReactNode {
  const child = demo.child;
  if (!child) return null;
  if ('text' in child) return child.text;
  if ('img' in child) return <img src={child.img.src} alt={child.img.alt} />;
  if ('buttons' in child) {
    return child.buttons.map((label) => (
      <button key={label} type="button">
        {label}
      </button>
    ));
  }
  if ('items' in child) {
    const Item = comps['text-list-item'];
    return child.items.map((label) => (Item ? <Item key={label}>{label}</Item> : <li key={label}>{label}</li>));
  }
  if ('radio' in child) {
    const Option = comps['radio-group-option'];
    return child.radio.map((opt) => (Option ? <Option key={opt.value} value={opt.value} label={opt.label} /> : null));
  }
  if ('segmented' in child) {
    const Item = comps['segmented-control-item'];
    return child.segmented.map((opt) =>
      Item ? <Item key={opt.value} value={opt.value}>{opt.label}</Item> : null
    );
  }
  if ('steps' in child) {
    const Item = comps['stepper-horizontal-item'];
    return child.steps.map((step) =>
      Item ? (
        <Item key={step.label} state={step.state}>
          {step.label}
        </Item>
      ) : null
    );
  }
  if ('table' in child) {
    const Head = comps['table-head'];
    const HeadRow = comps['table-head-row'];
    const HeadCell = comps['table-head-cell'];
    const Body = comps['table-body'];
    const Row = comps['table-row'];
    const Cell = comps['table-cell'];
    if (!Head || !HeadRow || !HeadCell || !Body || !Row || !Cell) return null;
    return (
      <>
        <Head>
          <HeadRow>
            {child.table.head.map((label) => (
              <HeadCell key={label}>{label}</HeadCell>
            ))}
          </HeadRow>
        </Head>
        <Body>
          {child.table.rows.map((row, i) => (
            <Row key={i}>
              {row.map((cell) => (
                <Cell key={cell}>{cell}</Cell>
              ))}
            </Row>
          ))}
        </Body>
      </>
    );
  }
  return null;
}

async function load(tag: string) {
  const loader = byTag.get(tag);
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export async function mountReact() {
  const extra = [
    'text-list-item',
    'radio-group-option',
    'segmented-control-item',
    'stepper-horizontal-item',
    'table-head',
    'table-head-row',
    'table-head-cell',
    'table-body',
    'table-row',
    'table-cell',
    'tabs-item',
  ];
  const comps: Record<string, React.ComponentType<any>> = {};
  for (const tag of [...new Set([...DEMOS.map((d) => d.tag), ...extra])]) {
    const Comp = await load(tag);
    if (Comp) comps[tag] = Comp;
  }

  for (const demo of DEMOS) {
    const el = document.querySelector(`[data-cell="react:${demo.tag}"]`);
    if (!el) continue;
    const Comp = comps[demo.tag];
    if (!Comp) {
      el.textContent = `missing ${pascal(demo.tag)}.tsx`;
      continue;
    }
    createRoot(el).render(
      <div className={hostClass(demo.tag)}>
        <ErrorBoundary label={demo.tag}>
          <Comp {...(demo.props ?? {})}>{childNodes(demo, comps)}</Comp>
        </ErrorBoundary>
      </div>
    );
  }
}

export type { Demo, DemoChild };
