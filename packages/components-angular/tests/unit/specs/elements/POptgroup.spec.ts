import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { POptgroup } from '../../../../projects/angular-wrapper/src/elements/POptgroup';
import { PSelect } from '../../../../projects/angular-wrapper/src/elements/PSelect';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('POptgroup', () => {
  it('returns an optgroup with nothing wrapping it', () => {
    @Component({
      standalone: true,
      imports: [PSelect, POptgroup],
      template: `<select pSelect><optgroup pOptgroup label="Group"><option value="a">A</option></optgroup></select>`,
    })
    class Host {}

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const select = host.firstElementChild as HTMLSelectElement;
    const group = select.querySelector('optgroup') as HTMLOptGroupElement;

    expect(host.childElementCount).toBe(1);
    expect(select.tagName).toBe('SELECT');
    expect(host.querySelector('p-optgroup')).toBeNull();
    expect(group.label).toBe('Group');
    expect(group.classList.contains('p-optgroup')).toBe(true);
    expect(group.querySelector('option')?.textContent).toBe('A');
  });

  it('uses the native disabled attribute', () => {
    @Component({
      standalone: true,
      imports: [POptgroup],
      template: `<optgroup pOptgroup label="Group" disabled><option value="a">A</option></optgroup>`,
    })
    class Host {}

    const fixture = render(Host);
    const group = fixture.nativeElement.firstElementChild as HTMLOptGroupElement;

    expect(group.tagName).toBe('OPTGROUP');
    expect(group.disabled).toBe(true);
  });
});
