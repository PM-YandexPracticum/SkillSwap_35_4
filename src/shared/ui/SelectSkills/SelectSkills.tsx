import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss'
import IconArrowDown from '../../../assets/icons/arrow/chevron-down.svg'
import IconArrowUp from '../../../assets/icons/arrow/chevron-up.svg'
import clsx from 'clsx';
import { Checkbox } from '../checkbox';

interface SelectSkillsProps {
  options: string[] | number[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value: string | number,
  className?: string,
  optionsClassName?: string,
  selectPickerClassName?: string
}

const SelectSkills: React.FC<SelectSkillsProps> = ({
  options,
  onChange,
  className,
  optionsClassName,
  selectPickerClassName,
  value,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | number>(value || '');


  useEffect(() => {
    setSelected(value || '')
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (option: string | number) => {
    setSelected(option)
    setIsOpen(false)
    if (onChange) onChange(String(option));
  };
  const toggleOpen = () => setIsOpen(prev => !prev);


  return (
    <div
      ref={selectRef}
      tabIndex={0}
      className={clsx(styles.select__picker, selectPickerClassName)}
      style={{color: selected ? '#253017' : '#9ca197'}}
    >
      <div
        onClick={toggleOpen}
        className={clsx(styles.input, className)}
        style={{
            borderBottom: isOpen ? '1px solid lightgray' : '',
            height: '48px',
        }}
      >
        {selected ? selected : placeholder}
        {isOpen ? <IconArrowUp/> : <IconArrowDown/>}
      </div>
      {isOpen && (
        <>
        
        <div
         className={clsx(styles.options__container, optionsClassName)}
        >
          {options.map(option => (
            <div onClick={() => {
             handleCheckboxChange(option)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleCheckboxChange(option);
              }
            }}
            tabIndex={0}
            role="option"
            aria-selected={selected === option}
           key={option} className={styles.optionContainer}>
            <Checkbox  onChange={() => setSelected(option)}
      label=""
      checked={selected === option}/>
            <div
            className={styles.option}
              key={option}
              style={{ padding: '8px 18px', cursor: 'pointer'}}
            >
              {option}
            </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );

};

export default SelectSkills;
