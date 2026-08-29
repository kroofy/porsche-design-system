import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PCheckbox } from '../../../../projects/angular-wrapper/src/elements/PCheckbox';
import { PLabel } from '../../../../projects/angular-wrapper/src/elements/PLabel';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PCheckbox', () => {
  it('returns a checkbox with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PCheckbox],
      template: `<input pCheckbox id="opt" />`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const input = host.firstElementChild as HTMLInputElement;

    expect(host.childElementCount).toBe(1);
    expect(input.type).toBe('checkbox');
    expect(input.classList.contains('p-checkbox')).toBe(true);
    expect(host.querySelector('p-checkbox')).toBeNull();
  });

  it('sets native indeterminate', () => {
    @Component({
      standalone: true,
      imports: [PCheckbox],
      template: `<input pCheckbox indeterminate />`,
    })
    class Host {}

    const fixture = render(Host);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('data-p-indeterminate')).toBe('true');
  });
});

describe('PLabel + PCheckbox', () => {
  it('keeps the label a sibling with for', () => {
    @Component({
      standalone: true,
      imports: [PCheckbox, PLabel],
      template: `
        <input pCheckbox id="opt" />
        <label pLabel for="opt">Option</label>
      `,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('label')?.htmlFor).toBe('opt');
    expect(host.querySelector('input')?.parentElement).toBe(host);
    expect(host.querySelector('label')?.parentElement).toBe(host);
  });
});
