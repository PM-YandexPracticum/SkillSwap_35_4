import React, { useState, useRef, useEffect } from 'react';
import type { SelectProps, Option } from './types';
import styles from './select.module.scss';
import ArrowIcon from '../../assets/icons/chevronDown.svg?url';
import { Checkbox } from '../checkbox';

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = 'Выберите...',
  disabled = false,
  className = '',
  label,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    if (disabled) return;

    if (multiple) {
      const currentArr = Array.isArray(value) ? value : [];
      const alreadySelected = currentArr.includes(option.value);
      const newValue = alreadySelected
        ? currentArr.filter((v) => v !== option.value)
        : [...currentArr, option.value];
      onChange(newValue);
    } else {
      setOpen(false);
      onChange(option.value);
    }
  };

  const renderValue = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }
    if (multiple && Array.isArray(value)) {
      return options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label)
        .join(', ');
    }
    const singleOption = options.find((opt) => opt.value === value);
    return singleOption ? (
      singleOption.label
    ) : (
      <span className={styles.placeholder}>{placeholder}</span>
    );
  };

  return (
    <div className={`${styles.wrapper}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.selectWrapper} ${className} ${disabled ? styles.disabled : ''}`}
        ref={ref}
      >
        <button
          type="button"
          className={styles.selectHeader}
          onClick={() => (disabled ? null : setOpen((o) => !o))}
          disabled={disabled}
        >
          <span>{renderValue()}</span>
          <img src={ArrowIcon} className={styles.arrow} alt="arrow" />
        </button>
        {open && (
          <ul className={styles.optionsList}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`${styles.option} ${
                  (multiple &&
                    Array.isArray(value) &&
                    value.includes(option.value)) ||
                  (!multiple && value === option.value)
                    ? styles.selected
                    : ''
                }`}
                onClick={() => {
                  if (!multiple) handleSelect(option);
                }}
              >
                {multiple ? (
                  <Checkbox
                    checked={
                      Array.isArray(value) && value.includes(option.value)
                    }
                    onChange={() => handleSelect(option)}
                    label={option.label}
                    disabled={disabled || option.disabled}
                  />
                ) : (
                  <>{option.label}</>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Select;
