import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PSelect } from '../../../../projects/angular-wrapper/src/elements/PSelect';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('PSelect', () => {
  it('returns a select with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PSelect],
      template: `<select pSelect id="choice"><option value="a">A</option></select>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const select = host.firstElementChild as HTMLSelectElement;

    expect(host.childElementCount).toBe(1);
    expect(select.tagName).toBe('SELECT');
    expect(select.classList.contains('p-select')).toBe(true);
    expect(host.querySelector('p-select')).toBeNull();
    expect(select.querySelector('option')?.textContent).toBe('A');
  });

  it('uses native disabled and aria-busy when loading', () => {
    @Component({
      standalone: true,
      imports: [PSelect],
      template: `<select pSelect loading></select>`,
    })
    class Host {}

    const fixture = render(Host);
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    expect(select.disabled).toBe(true);
    expect(select.getAttribute('aria-busy')).toBe('true');
    expect(select.getAttribute('data-p-loading')).toBe('true');
  });
});
