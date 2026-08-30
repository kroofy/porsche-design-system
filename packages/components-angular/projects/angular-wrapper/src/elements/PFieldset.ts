import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import { type FieldsetLabelSize, type FieldsetState, fieldsetAppearance } from './core/fieldset/fieldset.appearance';

@Component({
  selector: 'fieldset[pFieldset]',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[class.p-fieldset]': 'true',
  },
})
export class PFieldset implements OnInit, OnChanges {
  @Input() labelSize?: FieldsetLabelSize;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() state?: FieldsetState;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(
      this.el,
      fieldsetAppearance({
        labelSize: this.labelSize,
        required: this.required,
        state: this.state,
      }),
      this.applied
    );
  }
}
