import { useId } from 'vue';
import {
  type FieldDescribedByOptions,
  type FieldIds,
  createFieldIds,
  toGeneratedFieldId,
} from '../../../../../components/src/elements/field-ids';

export type { FieldDescribedByOptions, FieldIds };
export {
  createFieldIds,
  fieldDescribedBy,
  fieldIds,
  nextFieldId,
} from '../../../../../components/src/elements/field-ids';

export const useFieldIds = (id?: string): FieldIds => createFieldIds(id ?? toGeneratedFieldId(useId()));
