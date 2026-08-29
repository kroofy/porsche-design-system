import { booleanAttribute, Component, Directive, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from './core/appearance';
import { type FieldState, inputAppearance } from './core/input/input.appearance';
import { syncAppearance } from './apply-appearance';

@Directive()
export abstract class NativeInputBase implements OnInit, OnChanges {
  @Input() compact?: Responsive<boolean>;
  @Input() state?: FieldState;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;

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
      inputAppearance({
        compact: this.compact,
        state: this.state,
        loading: this.loading,
      }),
      this.applied
    );
  }
}

@Component({
  selector: 'input[pInputEmail]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'email'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputEmail extends NativeInputBase {}

@Component({
  selector: 'input[pInputTel]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'tel'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputTel extends NativeInputBase {}

@Component({
  selector: 'input[pInputUrl]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'url'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputUrl extends NativeInputBase {}

@Component({
  selector: 'input[pInputSearch]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'search'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputSearch extends NativeInputBase {}

@Component({
  selector: 'input[pInputPassword]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'password'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputPassword extends NativeInputBase {}

@Component({
  selector: 'input[pInputNumber]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'number'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputNumber extends NativeInputBase {}

@Component({
  selector: 'input[pInputDate]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'date'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputDate extends NativeInputBase {}

@Component({
  selector: 'input[pInputTime]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'time'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputTime extends NativeInputBase {}

@Component({
  selector: 'input[pInputMonth]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'month'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputMonth extends NativeInputBase {}

@Component({
  selector: 'input[pInputWeek]',
  standalone: true,
  template: '',
  host: {
    '[class.p-input]': 'true',
    '[attr.type]': "'week'",
    '[disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.dir]': '"auto"',
  },
})
export class PInputWeek extends NativeInputBase {}
