import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PAccordion } from '../../../../projects/angular-wrapper/src/elements/PAccordion';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PAccordion', () => {
  it('returns a details with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PAccordion],
      template: `<details pAccordion><summary>Some summary</summary><div>Some details</div></details>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const details = host.firstElementChild as HTMLDetailsElement;

    expect(host.childElementCount).toBe(1);
    expect(details.tagName).toBe('DETAILS');
    expect(host.querySelector('p-accordion')).toBeNull();
    expect(details.classList.contains('p-accordion')).toBe(true);
    expect(details.parentElement).toBe(host);
  });

  it('puts open and aria on the details', () => {
    @Component({
      standalone: true,
      imports: [PAccordion],
      template: `<details pAccordion open aria-label="Some accordion"></details>`,
    })
    class Host {}

    const fixture = render(Host);
    const details = fixture.nativeElement.querySelector('details') as HTMLDetailsElement;

    expect(details.open).toBe(true);
    expect(details.getAttribute('aria-label')).toBe('Some accordion');
  });

  it('encodes non-default appearance on the details', () => {
    @Component({
      standalone: true,
      imports: [PAccordion],
      template: `<details pAccordion alignMarker="start" background="surface" compact indent="true" sticky size="medium"></details>`,
    })
    class Host {}

    const fixture = render(Host);
    const details = fixture.nativeElement.querySelector('details') as HTMLDetailsElement;

    expect(details.getAttribute('data-p-align-marker')).toBe('start');
    expect(details.getAttribute('data-p-background')).toBe('surface');
    expect(details.getAttribute('data-p-compact')).toBe('true');
    expect(details.getAttribute('data-p-indent')).toBe('true');
    expect(details.getAttribute('data-p-sticky')).toBe('true');
    expect(details.getAttribute('data-p-size')).toBe('medium');
  });
});
