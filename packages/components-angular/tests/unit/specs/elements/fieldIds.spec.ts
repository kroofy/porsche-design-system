import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { resetFieldId } from '../../../../../components/src/elements/field-ids';
import { fieldDescribedBy, fieldIds } from '../../../../projects/angular-wrapper/src/elements/fieldIds';
import { PInputText } from '../../../../projects/angular-wrapper/src/elements/PInputText';
import { PLabel } from '../../../../projects/angular-wrapper/src/elements/PLabel';

const render = (component: Parameters<typeof TestBed.createComponent>[0]) => {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('fieldIds', () => {
  it('wires label for, control id, and describedby without wrapping the input', () => {
    const ids = fieldIds('name');

    @Component({
      standalone: true,
      imports: [PLabel, PInputText],
      template: `
        <label pLabel [attr.for]="ids.control" required>Name</label>
        <span class="p-description" [id]="ids.description">Hint</span>
        <input
          pInputText
          [attr.id]="ids.control"
          [attr.aria-describedby]="describedBy"
          aria-invalid="true"
        />
        <span class="p-message" [id]="ids.message" data-p-state="error">Bad</span>
      `,
    })
    class Host {
      ids = ids;
      describedBy = fieldDescribedBy(ids, { description: true, message: true });
    }

    const fixture = render(Host);
    const host = fixture.nativeElement as HTMLElement;
    const label = host.querySelector('label') as HTMLLabelElement;
    const input = host.querySelector('input') as HTMLInputElement;
    const description = host.querySelector('.p-description') as HTMLElement;
    const message = host.querySelector('.p-message') as HTMLElement;

    expect(host.querySelector('p-input-text')).toBeNull();
    expect(input.parentElement).toBe(host);
    expect(label.htmlFor).toBe('name');
    expect(input.id).toBe('name');
    expect(description.id).toBe('name-description');
    expect(message.id).toBe('name-message');
    expect(input.getAttribute('aria-describedby')).toBe('name-description name-message');
    expect(label.querySelector('.p-label__required')?.parentElement).toBe(label);
  });

  it('allocates unique ids when omitted', () => {
    resetFieldId();
    expect(fieldIds().control).not.toBe(fieldIds().control);
  });
});
