import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { nativeIconUrl } from '../../../../projects/angular-wrapper/src/elements/core/icon/icon-url';
import { PTag } from '../../../../projects/angular-wrapper/src/elements/PTag';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PTag', () => {
  it('returns a span with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PTag],
      template: `<span pTag>Default</span>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const tag = host.firstElementChild as HTMLElement;

    expect(host.childElementCount).toBe(1);
    expect(tag.tagName).toBe('SPAN');
    expect(host.querySelector('p-tag')).toBeNull();
    expect(tag.classList.contains('p-tag')).toBe(true);
    expect(tag.parentElement).toBe(host);
  });

  it('returns a bare a and button when those hosts are used', () => {
    @Component({
      standalone: true,
      imports: [PTag],
      template: `<a pTag href="#">primary</a><button pTag type="button">primary</button>`,
    })
    class Host {}

    const fixture = render(Host);
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(a.classList.contains('p-tag')).toBe(true);
    expect(a.getAttribute('href')).toBe('#');
    expect(button.classList.contains('p-tag')).toBe(true);
    expect(button.getAttribute('type')).toBe('button');
  });

  it('encodes non-default appearance on the tag', () => {
    @Component({
      standalone: true,
      imports: [PTag],
      template: `<span pTag variant="primary" compact icon="car">primary</span>`,
    })
    class Host {}

    const fixture = render(Host);
    const tag = fixture.nativeElement.querySelector('span') as HTMLElement;

    expect(tag.getAttribute('data-p-variant')).toBe('primary');
    expect(tag.getAttribute('data-p-compact')).toBe('true');
    const icon = tag.querySelector('img.p-tag__icon') as HTMLImageElement;
    expect(icon.getAttribute('src')).toBe(nativeIconUrl('car'));
    expect(icon.parentElement).toBe(tag);
  });
});
