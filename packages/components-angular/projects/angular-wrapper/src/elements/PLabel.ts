import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import { LABEL_REQUIRED_CLASS, labelAppearance } from './core/label/label.appearance';
import { syncAppearance } from './apply-appearance';

@Component({
  selector: 'label[pLabel]',
  standalone: true,
  template: `
    <ng-content />
    @if (required) {
      <span [class]="requiredClass" aria-hidden="true"> *</span>
    }
  `,
  host: {
    '[class.p-label]': 'true',
  },
})
export class PLabel implements OnInit, OnChanges {
  @Input() hideLabel?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) required = false;

  readonly requiredClass = LABEL_REQUIRED_CLASS;

  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    syncAppearance(this.el, labelAppearance({ hideLabel: this.hideLabel }), this.applied);
  }
}
