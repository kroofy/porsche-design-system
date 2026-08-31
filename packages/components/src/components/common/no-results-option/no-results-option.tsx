import { type FunctionalComponent, h } from '../../../types/html-stencil-element';

export const NoResultsOption: FunctionalComponent = () => {
  return (
    <div class="no-results" role="option">
      <span aria-hidden="true">–</span>
      <span class="sr-only">No results found</span>
    </div>
  );
};
