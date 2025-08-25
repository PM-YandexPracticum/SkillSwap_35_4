import type { Errors, FieldRules, Rule, Schema, Values } from './type';

const runRules = (rules: Rule[], value: unknown, values: Values) => {
  for (const rule of rules) {
    const err = rule(value, values);
    if (err) return err;
  }
  return undefined;
};

export function createValidator(schema: Schema) {
  return (values: Values): Errors => {
    const errors: Errors = {};
    for (const [name, fieldRules] of Object.entries<FieldRules>(schema)) {
      const rulesArr = Array.isArray(fieldRules) ? fieldRules : [fieldRules];
      const err = runRules(rulesArr, values[name], values);
      if (err) errors[name] = err;
    }
    return errors;
  };
}
