import { DEMOS, pascal } from '../catalog';
import { openCompareRoot } from '../host';
import { renderAngularEmit } from './render-lite';

const modules = import.meta.glob('../../../../packages/components/mitosis/*/output/frameworks/angular/*.ts');

const byTag = new Map<string, () => Promise<{ default: any }>>();
for (const [path, loader] of Object.entries(modules)) {
  const match = path.match(/mitosis\/([^/]+)\/output\/frameworks\/angular\/([^/]+)\.ts$/);
  if (!match) continue;
  byTag.set(match[1], loader as () => Promise<{ default: any }>);
}

async function load(tag: string) {
  const loader = byTag.get(tag);
  if (!loader) return null;
  return (await loader()).default;
}

function childNodes(demo: (typeof DEMOS)[number], comps: Record<string, any>): Node[] {
  const child = demo.child;
  if (!child) return [];
  if ('text' in child) return [document.createTextNode(child.text)];
  if ('img' in child) {
    const img = document.createElement('img');
    img.src = child.img.src;
    img.alt = child.img.alt;
    return [img];
  }
  if ('buttons' in child) {
    return child.buttons.map((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      return button;
    });
  }
  if ('items' in child && comps['text-list-item']) {
    return child.items.map((label) =>
      renderAngularEmit(comps['text-list-item'], {}, [document.createTextNode(label)])
    );
  }
  if ('radio' in child && comps['radio-group-option']) {
    return child.radio.map((opt) => renderAngularEmit(comps['radio-group-option'], opt, []));
  }
  if ('segmented' in child && comps['segmented-control-item']) {
    return child.segmented.map((opt) =>
      renderAngularEmit(comps['segmented-control-item'], { value: opt.value }, [document.createTextNode(opt.label)])
    );
  }
  if ('steps' in child && comps['stepper-horizontal-item']) {
    return child.steps.map((step) =>
      renderAngularEmit(comps['stepper-horizontal-item'], { state: step.state }, [
        document.createTextNode(step.label),
      ])
    );
  }
  if ('table' in child && comps['table-head']) {
    const note = document.createElement('div');
    note.textContent = `${child.table.head.join(' / ')} — ${child.table.rows.map((row) => row.join(' ')).join(', ')}`;
    return [note];
  }
  return [];
}

export async function mountAngular() {
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
  const comps: Record<string, any> = {};
  for (const tag of [...new Set([...DEMOS.map((demo) => demo.tag), ...extra])]) {
    try {
      const Comp = await load(tag);
      if (Comp) comps[tag] = Comp;
    } catch (error) {
      console.warn(`angular load ${tag}`, error);
    }
  }

  for (const demo of DEMOS) {
    const el = document.querySelector(`[data-cell="angular:${demo.tag}"]`) as HTMLElement | null;
    if (!el) continue;
    const Comp = comps[demo.tag];
    if (!Comp) {
      el.textContent = `missing ${pascal(demo.tag)}.ts`;
      continue;
    }
    try {
      const mount = openCompareRoot(el, demo.tag);
      mount.append(renderAngularEmit(Comp, demo.props ?? {}, childNodes(demo, comps)));
    } catch (error) {
      el.textContent = `angular render failed: ${(error as Error).message}`;
    }
  }
}
