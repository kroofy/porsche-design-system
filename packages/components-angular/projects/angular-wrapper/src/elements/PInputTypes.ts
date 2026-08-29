import { booleanAttribute, Component, Directive, ElementRef, Input, inject, type OnChanges, type OnInit } from '@angular/core';
import type { Responsive } from '../../../../../components/src/elements/appearance';
import { type FieldState, inputAppearance } from '../../../../../components/src/elements/input';
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

const nativeInputHost = (type: string) => ({
  '[class.p-input]': 'true',
  '[attr.type]': `"${type}"`,
  '[disabled]': 'disabled || loading',
  '[attr.aria-busy]': 'loading ? "true" : null',
  '[attr.dir]': '"auto"',
});

@Component({
  selector: 'input[pInputEmail]',
  standalone: true,
  template: '',
  host: nativeInputHost('email'),
})
export class PInputEmail extends NativeInputBase {}

@Component({
  selector: 'input[pInputTel]',
  standalone: true,
  template: '',
  host: nativeInputHost('tel'),
})
export class PInputTel extends NativeInputBase {}

@Component({
  selector: 'input[pInputUrl]',
  standalone: true,
  template: '',
  host: nativeInputHost('url'),
})
export class PInputUrl extends NativeInputBase {}

@Component({
  selector: 'input[pInputSearch]',
  standalone: true,
  template: '',
  host: nativeInputHost('search'),
})
export class PInputSearch extends NativeInputBase {}

@Component({
  selector: 'input[pInputPassword]',
  standalone: true,
  template: '',
  host: nativeInputHost('password'),
})
export class PInputPassword extends NativeInputBase {}

@Component({
  selector: 'input[pInputNumber]',
  standalone: true,
  template: '',
  host: nativeInputHost('number'),
})
export class PInputNumber extends NativeInputBase {}

@Component({
  selector: 'input[pInputDate]',
  standalone: true,
  template: '',
  host: nativeInputHost('date'),
})
export class PInputDate extends NativeInputBase {}

@Component({
  selector: 'input[pInputTime]',
  standalone: true,
  template: '',
  host: nativeInputHost('time'),
})
export class PInputTime extends NativeInputBase {}

@Component({
  selector: 'input[pInputMonth]',
  standalone: true,
  template: '',
  host: nativeInputHost('month'),
})
export class PInputMonth extends NativeInputBase {}

@Component({
  selector: 'input[pInputWeek]',
  standalone: true,
  template: '',
  host: nativeInputHost('week'),
})
export class PInputWeek extends NativeInputBase {}
