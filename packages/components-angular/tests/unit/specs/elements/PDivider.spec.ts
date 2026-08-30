import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PDivider } from '../../../../projects/angular-wrapper/src/elements/PDivider';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PDivider', () => {
  it('returns an hr with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PDivider],
      template: `<hr pDivider />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const hr = host.firstElementChild as HTMLHRElement;

    expect(host.childElementCount).toBe(1);
    expect(hr.tagName).toBe('HR');
    expect(host.querySelector('p-divider')).toBeNull();
    expect(hr.classList.contains('p-divider')).toBe(true);
    expect(hr.parentElement).toBe(host);
  });

  it('puts aria attributes on the hr', () => {
    @Component({
      standalone: true,
      imports: [PDivider],
      template: `<hr pDivider aria-hidden="true" />`,
    })
    class Host {}

    const fixture = render(Host);
    const hr = fixture.nativeElement.querySelector('hr') as HTMLHRElement;

    expect(hr.getAttribute('aria-hidden')).toBe('true');
  });

  it('encodes non-default appearance on the hr', () => {
    @Component({
      standalone: true,
      imports: [PDivider],
      template: `<hr pDivider color="contrast-high" direction="vertical" />`,
    })
    class Host {}

    const fixture = render(Host);
    const hr = fixture.nativeElement.querySelector('hr') as HTMLHRElement;

    expect(hr.getAttribute('data-p-color')).toBe('contrast-high');
    expect(hr.getAttribute('data-p-direction')).toBe('vertical');
  });
});
