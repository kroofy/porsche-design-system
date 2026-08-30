import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PHeading } from '../../../../projects/angular-wrapper/src/elements/PHeading';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PHeading', () => {
  it('returns an h2 with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PHeading],
      template: `<h2 pHeading>Title</h2>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const heading = host.firstElementChild as HTMLHeadingElement;

    expect(host.childElementCount).toBe(1);
    expect(heading.tagName).toBe('H2');
    expect(host.querySelector('p-heading')).toBeNull();
    expect(heading.classList.contains('p-heading')).toBe(true);
  });

  it('encodes non-default appearance on the heading', () => {
    @Component({
      standalone: true,
      imports: [PHeading],
      template: `<h6 pHeading size="sm" weight="bold">Title</h6>`,
    })
    class Host {}

    const fixture = render(Host);
    const heading = fixture.nativeElement.querySelector('h6') as HTMLHeadingElement;

    expect(heading.getAttribute('data-p-size')).toBe('sm');
    expect(heading.getAttribute('data-p-weight')).toBe('bold');
  });
});
