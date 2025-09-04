import React from 'react';
import clsx from 'clsx';
import type { RadioGroupProps, RadioOption } from './type';
import styles from './RadioGroup.module.scss';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  name,
  className,
  disabled = false,
}) => {
  const handleChange = (value: string) => {
    if (!disabled) {
      onChange?.(value);
    }
  };

  return (
    <fieldset
      className={clsx(styles.radioGroup, className)}
      disabled={disabled}
    >
      {options.map((option: RadioOption) => (
        <label
          key={option.value}
          className={clsx(
            styles.radioLabel,
            (disabled || option.disabled) && styles.radioLabelDisabled,
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled || option.disabled}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};
