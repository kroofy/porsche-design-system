import { useMetadata, useStore, useStyle } from '@builder.io/mitosis';

useMetadata({ tagName: 'p-text-list' });

export default function LitTextList(props: { type?: string }) {
  const state = useStore({
    get hostStyle(): Record<string, string> {
      const type = props.type || 'unordered';
      if (type === 'numbered') {
        return {
          '--p-text-list-e': 'var(--_p-text-list-a, 1.5rem)',
          '--p-text-list-before': "counters(p-text-list-counter, '.', decimal) var(--_p-text-list-b, '.')",
          '--p-text-list-inc': 'p-text-list-counter',
          '--p-text-list-justify': 'flex-end',
          '--p-text-list-ws': 'nowrap',
        };
      }
      if (type === 'alphabetically') {
        return {
          '--p-text-list-e': 'var(--_p-text-list-a, 1.5rem)',
          '--p-text-list-before': "counters(p-text-list-counter, '.', lower-latin) var(--_p-text-list-b, '.')",
          '--p-text-list-inc': 'p-text-list-counter',
          '--p-text-list-justify': 'flex-end',
          '--p-text-list-ws': 'nowrap',
        };
      }
      return {
        '--p-text-list-e': 'var(--_p-text-list-f, .375rem)',
        '--p-text-list-before': "var(--_p-text-list-g, '•')",
        '--p-text-list-inc': 'none',
        '--p-text-list-justify': 'unset',
        '--p-text-list-ws': 'unset',
      };
    },
    get isOrdered(): any {
      const type = props.type || 'unordered';
      return type !== 'unordered';
    },
  });

  useStyle(`
    :host {
      display: block;
      counter-reset: p-text-list-counter !important;
    }
    :host([hidden]) {
      display: none !important;
    }
    ol,
    ul {
      font: var(--p-font-weight-normal) var(--p-typescale-sm) / var(--p-leading-normal) var(--p-font-porsche-next);
      margin: 0;
      padding: var(--_p-text-list-d, 0) 0 var(--_p-text-list-c, 0) 0;
      list-style-type: none;
      color: var(--p-color-primary);
    }
    ::slotted(*) {
      --_p-text-list-d: var(--p-spacing-static-xs) !important;
      --_p-text-list-c: var(--p-spacing-static-md) !important;
      --_p-text-list-e: var(--p-text-list-e, var(--_p-text-list-f, .375rem)) !important;
    }
    ::slotted(*)::before {
      content: var(--p-text-list-before, var(--_p-text-list-g, '•')) !important;
      counter-increment: var(--p-text-list-inc, none) !important;
      justify-self: var(--p-text-list-justify, unset) !important;
      white-space: var(--p-text-list-ws, unset) !important;
    }
  `);

  return (
    <ul>
      <slot />
    </ul>
  );
}
