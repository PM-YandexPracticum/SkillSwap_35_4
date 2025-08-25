export type Value = unknown;
export type Values = Record<string, Value>;

export type Rule = (value: Value, values: Values) => string | undefined;

export type FieldRules = Rule | Rule[];

export type Schema = Record<string, FieldRules>;

export type Errors = Partial<Record<string, string>>;
