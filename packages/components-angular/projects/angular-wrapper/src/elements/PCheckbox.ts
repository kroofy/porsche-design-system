import { booleanAttribute, Component, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import { type FieldState, checkboxAppearance } from './core/input/input.appearance';
import { syncAppearance } from './apply-appearance';

@Component({
  selector: 'input[pCheckbox]',
  standalone: true,
  template: '',
  host: {
    '[class.p-checkbox]': 'true',
    '[attr.type]': '"checkbox"',
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
  },
})
export class PCheckbox implements OnInit, OnChanges {
  @Input() compact?: Responsive<boolean>;
  @Input() state?: FieldState;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) indeterminate = false;

  private readonly el = inject(ElementRef).nativeElement as HTMLInputElement;
  private readonly applied = new Set<string>();

  ngOnInit(): void {
    this.sync();
  }

  ngOnChanges(): void {
    this.sync();
  }

  private sync(): void {
    this.el.indeterminate = this.indeterminate;
    syncAppearance(
      this.el,
      checkboxAppearance({
        compact: this.compact,
        state: this.state,
        loading: this.loading,
        indeterminate: this.indeterminate,
      }),
      this.applied
    );
  }
}
