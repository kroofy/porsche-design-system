import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PDisplay } from '../../../../projects/angular-wrapper/src/elements/PDisplay';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PDisplay', () => {
  it('returns an h1 with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PDisplay],
      template: `<h1 pDisplay>Hero</h1>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const heading = host.firstElementChild as HTMLHeadingElement;

    expect(host.childElementCount).toBe(1);
    expect(heading.tagName).toBe('H1');
    expect(host.querySelector('p-display')).toBeNull();
    expect(heading.classList.contains('p-display')).toBe(true);
  });

  it('encodes non-default appearance on the display', () => {
    @Component({
      standalone: true,
      imports: [PDisplay],
      template: `<h3 pDisplay size="small" align="center">Hero</h3>`,
    })
    class Host {}

    const fixture = render(Host);
    const heading = fixture.nativeElement.querySelector('h3') as HTMLHeadingElement;

    expect(heading.getAttribute('data-p-size')).toBe('small');
    expect(heading.getAttribute('data-p-align')).toBe('center');
  });
});
