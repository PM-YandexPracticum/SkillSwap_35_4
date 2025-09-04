export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'date';

export interface FieldConfig {
  name: string;
  label: string;
  variant: FieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  hint?: string;
  full?: boolean;
}

export type FormValues = Record<string, any>;

export interface FormProps {
  fields: FieldConfig[];
  onSubmit: (values: FormValues) => void | Promise<void>;
  initialValues?: FormValues;
  submitLabel?: string;
  className?: string;
  validate?: (values: FormValues) => Partial<Record<string, string>>;
  disabled?: boolean;
}
