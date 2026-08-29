import { useId, useMemo } from 'react';
import {
  type FieldDescribedByOptions,
  type FieldIds,
  createFieldIds,
  fieldDescribedBy,
  toGeneratedFieldId,
} from '../../../../../components/src/elements/field-ids';

export type { FieldDescribedByOptions, FieldIds };
export {
  createFieldIds,
  fieldDescribedBy,
  fieldIds,
  nextFieldId,
} from '../../../../../components/src/elements/field-ids';

export const useFieldIds = (id?: string): FieldIds => {
  const reactId = useId();
  return useMemo(() => createFieldIds(id ?? toGeneratedFieldId(reactId)), [id, reactId]);
};
