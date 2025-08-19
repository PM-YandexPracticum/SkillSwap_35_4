import React, { useMemo, useState } from 'react';
import style from './form.module.scss';
import type { FormProps, FormValues, FieldConfig } from './type';
import { Input } from '../input';
import { Button } from '../button';

const buildInitial = (
  fields: FieldConfig[],
  initial?: FormValues,
): FormValues =>
  fields.reduce((acc, field) => {
    acc[field.name] =
      initial?.[field.name] ??
      field.defaultValue ??
      (field.variant === 'number' ? '' : '');
    return acc;
  }, {} as FormValues);

const requiredError = (value: any, _variant: FieldConfig['variant']) => {
  const empty =
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0);
  return empty ? 'Обязательное поле' : undefined;
};

export const Form: React.FC<FormProps> = ({
  fields,
  initialValues,
  onSubmit,
  submitLabel = 'Сохранить',
  className,
  validate,
  disabled,
}) => {
  const [values, setValues] = useState<FormValues>(() =>
    buildInitial(fields, initialValues),
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const err: Record<string, string | undefined> = {};
    for (const field of fields) {
      if (field.required) {
        const massage = requiredError(values[field.name], field.variant);
        if (massage) err[field.name] = massage;
      }
    }
    return { ...err, ...(validate?.(values) ?? {}) };
  }, [fields, values, validate]);

  const setValue = (name: string, value: any) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const submit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setTouched(Object.fromEntries(fields.map((field) => [field.name, true])));
    const hasErr = Object.values(errors).some(Boolean);
    if (!hasErr && !disabled) {
      await onSubmit(values);
    }
  };

  const renderField = (field: FieldConfig) => {
    const id = `f_${field.name}`;
    const err = touched[field.name] ? errors[field.name] : undefined;
    const common = {
      id,
      name: field.name,
      placeholder: field.placeholder,
      disabled,
      onBlur: () => setTouched((t) => ({ ...t, [field.name]: true })),
    };

    return (
      <div
        key={field.name}
        className={`${style.field} ${field.full ? style.full : ''}`}
      >
        <label htmlFor={id} className={style.label}>
          {field.label}
          {field.required ? <span className={style.req}>*</span> : null}
        </label>

        {field.variant === 'textarea' ? (
          <textarea
            className={style.textarea}
            {...common}
            value={values[field.name] ?? ''}
            onChange={(err) => setValue(field.name, err.target.value)}
          />
        ) : (
          <Input
            {...common}
            type={field.variant}
            value={values[field.name] ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(
                field.name,
                field.variant === 'number'
                  ? e.target.value === ''
                    ? ''
                    : Number(e.target.value)
                  : e.target.value,
              )
            }
            error={Boolean(err)}
          />
        )}
        {err ? (
          <div className={style.error}>{err}</div>
        ) : field.hint ? (
          <div className={style.hint}>{field.hint}</div>
        ) : null}
      </div>
    );
  };
  return (
    <form onSubmit={submit} className={`${style.form} ${className ?? ''}`}>
      <div className={style.grid}>{fields.map(renderField)}</div>
      <div className={style.actions}>
        <Button type="submit" disabled={disabled}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default Form;
