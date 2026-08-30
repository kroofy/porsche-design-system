import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../../../../components/src/elements/icon/icon-url';
import { PTagDismissible } from '../../../../src/elements/PTagDismissible';

describe('PTagDismissible', () => {
  it('returns a button with nothing wrapping it', () => {
    const { container } = render(PTagDismissible, { slots: { default: 'Default' } });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(container.childElementCount).toBe(1);
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.className).toBe('p-tag-dismissible');
    expect(container.querySelector('p-tag-dismissible')).toBeNull();
    expect(button.querySelector('.p-tag-dismissible__sr')?.textContent).toBe('Remove:');
    const icon = button.querySelector('img.p-icon') as HTMLImageElement;
    expect(icon.getAttribute('src')).toBe(nativeIconUrl('close'));
  });

  it('encodes compact and a label child', () => {
    const { container } = render(PTagDismissible, {
      props: { compact: true, label: 'Some label' },
      slots: { default: 'Default' },
    });
    const button = container.firstElementChild as HTMLButtonElement;

    expect(button.getAttribute('data-p-compact')).toBe('true');
    expect(button.querySelector('.p-tag-dismissible__label')?.textContent).toBe('Some label');
  });
});
