export declare function hostAttr(value: unknown, keepFalse?: boolean): string | undefined;
export declare function hostAttrs(
  attrs: Record<string, unknown>,
  keepFalse?: string[]
): Record<string, string | boolean>;
export declare function styleString(vars: Record<string, string> | undefined): string;
