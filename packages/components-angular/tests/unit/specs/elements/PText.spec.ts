import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PText } from '../../../../projects/angular-wrapper/src/elements/PText';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PText', () => {
  it('returns a p with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PText],
      template: `<p pText>Body</p>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const text = host.firstElementChild as HTMLElement;

    expect(host.childElementCount).toBe(1);
    expect(text.tagName).toBe('P');
    expect(host.querySelector('p-text')).toBeNull();
    expect(text.classList.contains('p-text')).toBe(true);
  });

  it('encodes non-default appearance on the text', () => {
    @Component({
      standalone: true,
      imports: [PText],
      template: `<blockquote pText size="lg" color="error">Quote</blockquote>`,
    })
    class Host {}

    const fixture = render(Host);
    const text = fixture.nativeElement.querySelector('blockquote') as HTMLElement;

    expect(text.classList.contains('p-text')).toBe(true);
    expect(text.getAttribute('data-p-size')).toBe('lg');
    expect(text.getAttribute('data-p-color')).toBe('error');
  });
});
