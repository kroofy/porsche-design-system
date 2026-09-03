import { type FunctionalComponent, h } from '../../../types/html-stencil-element';

type FilterStatusAnnouncerProps = {
  message: string;
};

export const FilterStatusAnnouncer: FunctionalComponent<FilterStatusAnnouncerProps> = ({ message }) => (
  <div class="filter-status" aria-live="polite" aria-atomic="true">
    {message}
  </div>
);
