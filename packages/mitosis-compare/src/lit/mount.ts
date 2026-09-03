import { CHILD_ONLY_TAGS, DEMOS, pascal, type Demo } from '../catalog';

const kebab = (key: string) => key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const EXTRA_TAGS = [
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
  'icon',
  'spinner',
] as const;

const loadIife = (tag: string) =>
  new Promise<void>((resolve, reject) => {
    if (customElements.get(`p-${tag}`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `/pds-assets/p-${tag}.iife.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`failed to load p-${tag}.iife.js`));
    document.head.append(script);
  });

const applyProps = (el: HTMLElement, props: Record<string, unknown> | undefined) => {
  if (!props) return;
  for (const [key, value] of Object.entries(props)) {
    const attr = kebab(key);
    (el as unknown as Record<string, unknown>)[key] = value;
    if (value === true) el.setAttribute(attr, '');
    else if (value === false || value == null) el.removeAttribute(attr);
    else el.setAttribute(attr, String(value));
  }
};

const ce = (tag: string, props?: Record<string, unknown>, children: Node[] = []) => {
  const el = document.createElement(`p-${tag}`);
  applyProps(el, props);
  el.append(...children);
  return el;
};

const childNodes = (demo: Demo): Node[] => {
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
  if ('items' in child) {
    return child.items.map((label) => ce('text-list-item', {}, [document.createTextNode(label)]));
  }
  if ('radio' in child) {
    return child.radio.map((opt) => ce('radio-group-option', { value: opt.value, label: opt.label }));
  }
  if ('segmented' in child) {
    return child.segmented.map((opt) =>
      ce('segmented-control-item', { value: opt.value }, [document.createTextNode(opt.label)])
    );
  }
  if ('steps' in child) {
    return child.steps.map((step) =>
      ce('stepper-horizontal-item', { state: step.state }, [document.createTextNode(step.label)])
    );
  }
  if ('table' in child) {
    const head = ce(
      'table-head',
      {},
      [
        ce(
          'table-head-row',
          {},
          child.table.head.map((label) => ce('table-head-cell', {}, [document.createTextNode(label)]))
        ),
      ]
    );
    const body = ce(
      'table-body',
      {},
      child.table.rows.map((row) =>
        ce(
          'table-row',
          {},
          row.map((cell) => ce('table-cell', {}, [document.createTextNode(cell)]))
        )
      )
    );
    return [head, body];
  }
  return [];
};

export async function mountLit() {
  const tags = [...new Set([...DEMOS.map((demo) => demo.tag), ...EXTRA_TAGS, ...CHILD_ONLY_TAGS])];
  await Promise.all(
    tags.map(async (tag) => {
      try {
        await loadIife(tag);
      } catch (error) {
        console.warn(`lit load ${tag}`, error);
      }
    })
  );

  for (const demo of DEMOS) {
    const cell = document.querySelector(`[data-cell="lit:${demo.tag}"]`) as HTMLElement | null;
    if (!cell) continue;
    if (!customElements.get(`p-${demo.tag}`)) {
      cell.textContent = `missing ${pascal(demo.tag)} Lit IIFE`;
      continue;
    }
    try {
      await customElements.whenDefined(`p-${demo.tag}`);
      cell.replaceChildren(ce(demo.tag, demo.props, childNodes(demo)));
    } catch (error) {
      cell.textContent = `lit render failed: ${(error as Error).message}`;
    }
  }
}
