export type FieldIds = {
  control: string;
  description: string;
  message: string;
};

export type FieldDescribedByOptions = {
  description?: boolean;
  message?: boolean;
};

let count = 0;

export const nextFieldId = (): string => `p-field-${++count}`;

export const resetFieldId = (): void => {
  count = 0;
};

export const createFieldIds = (id: string): FieldIds => ({
  control: id,
  description: `${id}-description`,
  message: `${id}-message`,
});

export const fieldIds = (id?: string): FieldIds => createFieldIds(id ?? nextFieldId());

export const fieldDescribedBy = (ids: FieldIds, opts: FieldDescribedByOptions = {}): string | undefined => {
  const parts = [opts.description ? ids.description : undefined, opts.message ? ids.message : undefined].filter(
    Boolean
  );
  return parts.length ? parts.join(' ') : undefined;
};

export const toGeneratedFieldId = (value: string): string => {
  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, '');
  if (!cleaned) {
    return nextFieldId();
  }
  return /^[a-zA-Z]/.test(cleaned) ? cleaned : `p${cleaned}`;
};
