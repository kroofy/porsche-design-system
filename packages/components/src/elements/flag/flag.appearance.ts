import { type NativeAppearance, type Responsive, serializeResponsive } from '../appearance';

export const FLAG_ROOT_CLASS = 'p-flag' as const;

export const FLAG_SIZES = [
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  'inherit',
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const;
export type FlagSize = (typeof FLAG_SIZES)[number];

export type FlagAppearanceProps = {
  size?: Responsive<FlagSize>;
};

const DEFAULT_SIZE: FlagSize = 'sm';

export const flagAppearance = (props: FlagAppearanceProps = {}): NativeAppearance => {
  const { size = DEFAULT_SIZE } = props;
  return {
    className: FLAG_ROOT_CLASS,
    attrs: {
      ...serializeResponsive('size', size, DEFAULT_SIZE),
    },
  };
};
