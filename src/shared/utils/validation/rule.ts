import type { Rule, Values } from './type';

const isEmpty = (value: unknown) =>
  value === null ||
  value === undefined ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0) ||
  (value instanceof Date && isNaN(value.getTime()));

export const required =
  (massage = 'Обязательное поле'): Rule =>
  (value) =>
    isEmpty(value) ? massage : undefined;

export const minLength =
  (number: number, massage?: string): Rule =>
  (value) => {
    if (isEmpty(value)) return undefined;
    return typeof value === 'string' && value.length < number
      ? (massage ?? `Минимум ${number} символов`)
      : undefined;
  };

export const maxLength =
  (number: number, massage?: string): Rule =>
  (value) => {
    if (isEmpty(value)) return undefined;
    return typeof value === 'string' && value.length > number
      ? (massage ?? `Не более ${number} символов`)
      : undefined;
  };

export const pattern =
  (re: RegExp, massage = 'Неверный формат'): Rule =>
  (value) =>
    typeof value === 'string' && !isEmpty(value) && !re.test(value)
      ? massage
      : undefined;

export const email = (massage = 'Некорректный email'): Rule =>
  pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, massage);

export const number =
  (massage = 'Должно быть числом'): Rule =>
  (value) =>
    isEmpty(value)
      ? undefined
      : typeof value === 'number' || !isNaN(Number(value))
        ? undefined
        : massage;

export const min =
  (number: number, massage?: string): Rule =>
  (value) => {
    if (isEmpty(value)) return undefined;
    const num = typeof value === 'number' ? value : Number(value);
    return num < number ? (massage ?? `Минимум ${number}`) : undefined;
  };

export const max =
  (number: number, massage?: string): Rule =>
  (value) => {
    if (isEmpty(value)) return undefined;
    const num = typeof value === 'number' ? value : Number(value);
    return num > number ? (massage ?? `Максимум ${number}`) : undefined;
  };

export const matches =
  (otherField: string, massage = 'Поле не совпадает'): Rule =>
  (value, values: Values) =>
    value !== values[otherField] ? massage : undefined;

export const custom =
  (fn: (value: unknown, values: Values) => boolean, massage: string): Rule =>
  (v, values) =>
    fn(v, values) ? undefined : massage;
