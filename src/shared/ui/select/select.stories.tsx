import { useState } from 'react';
import { Select } from './select';
import { type Option } from './types';

const basicOptions: Option[] = [
  { value: 'apple', label: 'Яблоко' },
  { value: 'banana', label: 'Банан' },
  { value: 'orange', label: 'Апельсин' },
  { value: 'disabled', label: 'Недоступно', disabled: true },
];

export default {
  title: 'Shared/Select',
  component: Select,
};

export const SingleSelect = () => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <Select
      options={basicOptions}
      value={value}
      onChange={(v) => setValue(v as string)}
      placeholder="Выберите фрукт"
    />
  );
};

export const MultiSelect = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Select
      options={basicOptions}
      value={value}
      onChange={(v) => setValue(Array.isArray(v) ? v : [])}
      multiple
      placeholder="Выберите фрукты"
    />
  );
};

export const Disabled = () => (
  <Select
    options={basicOptions}
    value={undefined}
    onChange={() => {}}
    placeholder="Отключено"
    disabled
  />
);
