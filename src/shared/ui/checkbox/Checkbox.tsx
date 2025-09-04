import React from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <label
      className={clsx(
        styles.checkbox,
        disabled && styles.checkboxDisabled,
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxCustom}>
        <svg className={styles.checkboxIcon} viewBox="0 0 12 12" fill="none">
          <path
            d="M1 6L4 9L11 2"
            stroke="transparent"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};
