import { createFieldIds, fieldDescribedBy, fieldIds, nextFieldId, resetFieldId, toGeneratedFieldId } from './field-ids';

describe('createFieldIds()', () => {
  it('derives description and message ids from the control id', () => {
    expect(createFieldIds('email')).toEqual({
      control: 'email',
      description: 'email-description',
      message: 'email-message',
    });
  });
});

describe('fieldDescribedBy()', () => {
  const ids = createFieldIds('name');

  it('returns undefined when nothing is described', () => {
    expect(fieldDescribedBy(ids)).toBeUndefined();
    expect(fieldDescribedBy(ids, { description: false, message: false })).toBeUndefined();
  });

  it('puts description before message', () => {
    expect(fieldDescribedBy(ids, { description: true })).toBe('name-description');
    expect(fieldDescribedBy(ids, { message: true })).toBe('name-message');
    expect(fieldDescribedBy(ids, { description: true, message: true })).toBe('name-description name-message');
  });
});

describe('fieldIds() / nextFieldId()', () => {
  beforeEach(() => {
    resetFieldId();
  });

  it('uses the passed id', () => {
    expect(fieldIds('phone').control).toBe('phone');
  });

  it('allocates unique ids when omitted', () => {
    expect(nextFieldId()).toBe('p-field-1');
    expect(fieldIds().control).toBe('p-field-2');
    expect(fieldIds().control).toBe('p-field-3');
  });
});

describe('toGeneratedFieldId()', () => {
  it('keeps a valid id', () => {
    expect(toGeneratedFieldId('email')).toBe('email');
  });

  it('strips react useId colons and prefixes if needed', () => {
    expect(toGeneratedFieldId(':r1:')).toBe('r1');
    expect(toGeneratedFieldId('_hidden')).toBe('p_hidden');
  });
});
