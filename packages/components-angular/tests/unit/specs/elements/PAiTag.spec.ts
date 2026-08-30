import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PAiTag } from '../../../../projects/angular-wrapper/src/elements/PAiTag';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PAiTag', () => {
  it('returns a span with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PAiTag],
      template: `<span pAiTag></span>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const span = host.firstElementChild as HTMLElement;

    expect(host.childElementCount).toBe(1);
    expect(span.tagName).toBe('SPAN');
    expect(host.querySelector('p-ai-tag')).toBeNull();
    expect(span.classList.contains('p-ai-tag')).toBe(true);
    expect(span.textContent?.trim()).toBe('AI-generated');
    expect(span.parentElement).toBe(host);
  });

  it('renders abbreviation as a real abbr', () => {
    @Component({
      standalone: true,
      imports: [PAiTag],
      template: `<span pAiTag variant="abbreviation"></span>`,
    })
    class Host {}

    const fixture = render(Host);
    const abbr = fixture.nativeElement.querySelector('abbr') as HTMLElement;
    expect(abbr.getAttribute('title')).toBe('artificial intelligence');
    expect(abbr.textContent).toBe('AI');
  });

  it('resolves locale copy', () => {
    @Component({
      standalone: true,
      imports: [PAiTag],
      template: `<span pAiTag variant="modified" locale="de-DE"></span>`,
    })
    class Host {}

    const fixture = render(Host);
    expect((fixture.nativeElement.querySelector('span') as HTMLElement).textContent?.trim()).toBe('KI-modifiziert');
  });
});
