import { type FunctionalComponent, h } from '../../../types/html-stencil-element';

export const Required: FunctionalComponent = () => {
  return (
    <span class="required" aria-hidden="true">
      {' '}
      *
    </span>
  );
};
