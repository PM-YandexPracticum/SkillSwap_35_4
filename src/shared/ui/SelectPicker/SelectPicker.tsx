import React, { useState, useRef, useEffect, type ChangeEvent } from 'react';
import styles from './index.module.scss'
import IconArrowDown from '../../../assets/icons/arrow/chevron-down.svg'
import IconArrowUp from '../../../assets/icons/arrow/chevron-up.svg'
import clsx from 'clsx';

interface SelectPickerProps {
  options: string[] | number[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value: string | number,
  className?: string,
  optionsClassName?: string,
  selectPickerClassName?: string
}

const SelectPicker: React.FC<SelectPickerProps> = ({
  options,
  placeholder = options[0],
  onChange,
  className,
  optionsClassName,
  selectPickerClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  const toggleOpen = () => setIsOpen(prev => !prev);


  return (
    <div
      ref={selectRef}
      tabIndex={0}
      className={clsx(styles.select__picker, selectPickerClassName)}
    >
      <div
        onClick={toggleOpen}
        className={clsx(styles.input, className)}
        style={{
            borderBottom: isOpen ? '1px solid lightgray' : ''
        }}
      >
        {selected ?? placeholder}
        {isOpen ? <IconArrowUp/> : <IconArrowDown/>}
      </div>
      {isOpen && (
        <div
         className={clsx(styles.options__container, optionsClassName)}
        >
          {options.map(option => (
            <div
            className={styles.option}
              key={option}
              style={{ padding: '8px 18px', cursor: 'pointer' }}
              onClick={() => handleSelect(String(option))}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSelect(String(option));
              }}
              tabIndex={0}
              role="option"
              aria-selected={selected === option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectPicker;
