import { forwardRef, type InputHTMLAttributes } from 'react';
import { type InputAppearanceProps, type NativeInputType, inputAppearance } from '../../../../../components/src/elements/input/input.appearance';

export type PNativeInputProps = InputAppearanceProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputAppearanceProps | 'type'> & {
    type?: NativeInputType;
  };

export const createNativeInput = (defaultType: NativeInputType, displayName: string) => {
  const Component = forwardRef<HTMLInputElement, PNativeInputProps>(function NativeInput(
    { compact, state, loading = false, disabled = false, className, type = defaultType, ...rest },
    ref
  ) {
    const appearance = inputAppearance({ compact, state, loading });

    return (
      <input
        {...rest}
        {...appearance.attrs}
        ref={ref}
        type={type}
        disabled={Boolean(disabled || loading)}
        aria-busy={loading || undefined}
        dir="auto"
        className={[appearance.className, className].filter(Boolean).join(' ')}
      />
    );
  });

  Component.displayName = displayName;
  return Component;
};

export const PInputEmail = createNativeInput('email', 'PInputEmail');
export const PInputTel = createNativeInput('tel', 'PInputTel');
export const PInputUrl = createNativeInput('url', 'PInputUrl');
export const PInputSearch = createNativeInput('search', 'PInputSearch');
export const PInputPassword = createNativeInput('password', 'PInputPassword');
export const PInputNumber = createNativeInput('number', 'PInputNumber');
export const PInputDate = createNativeInput('date', 'PInputDate');
export const PInputTime = createNativeInput('time', 'PInputTime');
export const PInputMonth = createNativeInput('month', 'PInputMonth');
export const PInputWeek = createNativeInput('week', 'PInputWeek');

export type PInputEmailProps = PNativeInputProps;
export type PInputTelProps = PNativeInputProps;
export type PInputUrlProps = PNativeInputProps;
export type PInputSearchProps = PNativeInputProps;
export type PInputPasswordProps = PNativeInputProps;
export type PInputNumberProps = PNativeInputProps;
export type PInputDateProps = PNativeInputProps;
export type PInputTimeProps = PNativeInputProps;
export type PInputMonthProps = PNativeInputProps;
export type PInputWeekProps = PNativeInputProps;
