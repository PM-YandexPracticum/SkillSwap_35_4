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
import search from '../../shared/assets/icons/search.svg?url';

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
      noOptionsMessage = 'Ничего не найдено',
      icon = <img src={search} alt=""></img>,
      maxHeight = 100,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] =
      useState<AutocompleteOption | null>(null);
    const [filteredOptions, setFilteredOptions] = useState<
      AutocompleteOption[]
    >([]);
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

    // Обработчик выбора опции
    const handleSelectOption = useCallback(
      (option: AutocompleteOption) => {
        setInputValue(option.label);
        setSelectedOption(option);
        onChange?.(option.label);
        onSelect?.(option);
        setIsOpen(false);
      },
      [onChange, onSelect],
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
          const filtered = filterOptions(newValue);
          setFilteredOptions(filtered);
          setIsOpen(newValue.length >= minChars);
        }, debounceDelay);
      },
      [onChange, minChars, filterOptions, debounceDelay],
    );

    // Обработчик фокуса
    const handleFocus = useCallback(() => {
      if (inputValue.length >= minChars) {
        const filtered = filterOptions(inputValue);
        setFilteredOptions(filtered);
        setIsOpen(true);
      }
    }, [inputValue, minChars, filterOptions]);

    // Обработчик клика вне компонента
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Обработчик клавиатуры
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          inputRef.current?.blur();
        } else if (e.key === 'Enter' && filteredOptions.length > 0 && isOpen) {
          handleSelectOption(filteredOptions[0]);
        }
      },
      [filteredOptions, isOpen, handleSelectOption],
    );

    // Синхронизация внешнего value
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Очистка таймера при размонтировании
    useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);

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

    // Рендер опции по умолчанию
    const defaultRenderOption = (option: AutocompleteOption) => (
      <div key={option.value} className={styles.option}>
        {option.label}
      </div>
    );

    // Проверка, является ли опция выбранной
    const isOptionSelected = useCallback(
      (option: AutocompleteOption) => {
        return selectedOption?.value === option.value;
      },
      [selectedOption],
    );

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
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={clsx(styles.autocompleteInput)}
          icon={icon}
        />

        {isOpen && (
          <div
            className={clsx(styles.dropdown)}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={clsx(
                    styles.optionItem,
                    isOptionSelected(option) && styles.optionItemSelected,
                  )}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add(styles.optionHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.classList.remove(styles.optionHover);
                  }}
                >
                  {renderOption
                    ? renderOption(option)
                    : defaultRenderOption(option)}
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>{noOptionsMessage}</div>
            )}
          </div>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';
