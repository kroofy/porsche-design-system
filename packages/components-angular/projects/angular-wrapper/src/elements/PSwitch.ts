import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import { syncAppearance } from './apply-appearance';
import type { Responsive } from './core/appearance';
import {
  SWITCH_KNOB_CLASS,
  SWITCH_LABEL_CLASS,
  SWITCH_SPINNER_CLASS,
  SWITCH_TOGGLE_CLASS,
  type SwitchAlignLabel,
  switchAppearance,
} from './core/switch/switch.appearance';
import { PSpinner } from './PSpinner';

@Component({
  selector: 'button[pSwitch]',
  standalone: true,
  imports: [PSpinner],
  template: `
    <span [class]="toggleClass">
      <span [class]="knobClass">
        @if (loading) {
          <svg pSpinner [class]="spinnerClass" aria-hidden="true" role="presentation" />
        }
      </span>
    </span>
    <span [class]="labelClass"><ng-content /></span>
  `,
  host: {
    '[class.p-switch]': 'true',
    '[attr.type]': '"button"',
    '[attr.role]': '"switch"',
    '[disabled]': 'disabled || loading',
    '[attr.aria-checked]': 'checked ? "true" : "false"',
    '[attr.aria-busy]': 'loading ? "true" : null',
  },
})
export class PSwitch implements OnInit, OnChanges {
  @Input() alignLabel?: Responsive<SwitchAlignLabel>;
  @Input() hideLabel?: Responsive<boolean>;
  @Input() stretch?: Responsive<boolean>;
  @Input() compact?: Responsive<boolean>;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  readonly toggleClass = SWITCH_TOGGLE_CLASS;
  readonly knobClass = SWITCH_KNOB_CLASS;
  readonly spinnerClass = SWITCH_SPINNER_CLASS;
  readonly labelClass = SWITCH_LABEL_CLASS;

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
      switchAppearance({
        alignLabel: this.alignLabel,
        hideLabel: this.hideLabel,
        stretch: this.stretch,
        compact: this.compact,
        loading: this.loading,
      }),
      this.applied
    );
  }
}
