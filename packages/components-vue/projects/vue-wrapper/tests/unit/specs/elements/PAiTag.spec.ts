import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { PAiTag } from '../../../../src/elements/PAiTag';

describe('PAiTag', () => {
  it('returns a span with nothing wrapping it', () => {
    const { container } = render(PAiTag);
    const span = container.firstElementChild as HTMLElement;
    expect(container.childElementCount).toBe(1);
    expect(span.tagName).toBe('SPAN');
    expect(span.getAttribute('class')).toBe('p-ai-tag');
    expect(container.querySelector('p-ai-tag')).toBeNull();
    expect(span.textContent).toBe('AI-generated');
  });

  it('renders abbreviation as a real abbr', () => {
    const { container } = render(PAiTag, { props: { variant: 'abbreviation' } });
    const abbr = container.querySelector('abbr');
    expect(abbr?.getAttribute('title')).toBe('artificial intelligence');
    expect(abbr?.textContent).toBe('AI');
  });

  it('resolves locale copy', () => {
    const { container } = render(PAiTag, { props: { variant: 'modified', locale: 'de-DE' } });
    expect(container.firstElementChild?.textContent).toBe('KI-modifiziert');
  });
});
