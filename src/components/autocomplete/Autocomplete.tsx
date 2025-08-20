import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type {
  AutocompleteOption,
  AutocompleteProps,
  AutocompleteRef,
} from './types';
import clsx from 'clsx';
import styles from './Autocomplete.module.scss';
import { Input } from '../../shared/ui/input/Input';

export const Autocomplete = forwardRef<AutocompleteRef, AutocompleteProps>(
  (
    {
      options,
      value = '',
      onChange,
      onSelect,
      placeholder = 'Искать навык',
      className,
      debounceDelay = 300,
      filterFn,
      minChars = 1,
      renderOption,
      noOptionsMessage = 'No options found',
      icon = <span className={styles.searchIcon}></span>,
      maxHeight = 200,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout>(null);

    // Базовая функция фильтрации
    const defaultFilterFn = useCallback(
      (option: AutocompleteOption, searchValue: string) => {
        return option.label.toLowerCase().includes(searchValue.toLowerCase());
      },
      [],
    );

    // Фильтрация опций
    const filterOptions = useCallback(
      (searchValue: string) => {
        if (searchValue.length < minChars) {
          return [];
        }

        const filterFunction = filterFn || defaultFilterFn;
        return options.filter((option) => filterFunction(option, searchValue));
      },
      [options, filterFn, defaultFilterFn, minChars],
    );

    // Обработчик изменения input
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange?.(newValue);

        // Дебаунс для больших объемов данных
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
          if (newValue.length >= minChars) {
            const filtered = filterOptions(newValue);
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }, debounceDelay);
      },
      [onChange, minChars, filterOptions, debounceDelay],
    );

    // Синхронизация внешнего value
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Методы для ref
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        setInputValue('');
        onChange?.('');
        setIsOpen(false);
      },
    }));

    return (
      <div
        ref={wrapperRef}
        className={clsx(styles.autocomplete, className)}
        {...props}
      >
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={clsx(styles.autocompleteInput)}
          icon={icon}
        />

        {isOpen && (
          <div
            className={clsx(styles.dropdown)}
            style={{ maxHeight: `${maxHeight}px` }}
          ></div>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';
