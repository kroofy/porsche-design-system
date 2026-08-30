import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { PAiTag } from '../../../../src/elements/PAiTag';

describe('PAiTag', () => {
  it('returns a span with nothing wrapping it', () => {
    const { container } = render(<PAiTag />);
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild?.tagName).toBe('SPAN');
    expect(container.querySelector('p-ai-tag')).toBeNull();
    expect(container.firstElementChild?.getAttribute('class')).toBe('p-ai-tag');
    expect(container.firstElementChild?.textContent).toBe('AI-generated');
  });

  it('renders abbreviation as a real abbr', () => {
    const { container } = render(<PAiTag variant="abbreviation" />);
    const abbr = container.querySelector('abbr');
    expect(abbr?.getAttribute('title')).toBe('artificial intelligence');
    expect(abbr?.textContent).toBe('AI');
    expect(abbr?.parentElement?.tagName).toBe('SPAN');
  });

  it('resolves locale copy', () => {
    const { container } = render(<PAiTag variant="modified" locale="de-DE" />);
    expect(container.firstElementChild?.textContent).toBe('KI-modifiziert');
  });

  it('forwards a ref to the span', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<PAiTag ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
