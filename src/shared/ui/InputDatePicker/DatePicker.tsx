import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss'
import IconCalendar from '../../../assets/icons/calendar/calendar.svg'
import { Button } from '../button';
import SelectPicker from '../SelectPicker/SelectPicker';


const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayWeekIndex(year: number, month: number) {
  const day = new Date(year, month, 1).getDay(); 
  return (day === 0 ? 6 : day - 1);
}

function formatDate(day: number, month: number, year: number) {
  const dd = day.toString().padStart(2, '0');
  const mm = (month + 1).toString().padStart(2, '0');
  return `${dd}.${mm}.${year}`;
}

const DatePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

 
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());

  const [tempSelectedDay, setTempSelectedDay] = useState<number | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTempSelectedDay(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const years = Array.from({length: 201}, (_, i) => 1900 + i);

  const daysInMonth = getDaysInMonth(displayYear, displayMonth);

  const firstDayIndex = getFirstDayWeekIndex(displayYear, displayMonth);

  const handleSelectDate = (day: number) => {
    setTempSelectedDay(day);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTempSelectedDay(null);
  };

  const handleConfirm = () => {
    if (tempSelectedDay !== null) {
      const chosen = new Date(displayYear, displayMonth, tempSelectedDay);
      setSelectedDate(chosen);
      setIsOpen(false);
      setTempSelectedDay(null);
    }
  };

  const displayValue = selectedDate
    ? formatDate(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear())
    : '';

  return (
    <div style={{ position: 'relative', width: 208 }} ref={wrapperRef}>
      <div
        onClick={() => setIsOpen(v => !v)}
        className={styles.input__date}
        aria-expanded={isOpen}
      >
        <input
          type="text"
          placeholder="дд.мм.гггг"
          value={displayValue}
          className={styles.input}
          readOnly
          style={{
            color: selectedDate ? '#000' : '#999',
          }}
        />
       
      <div style={{position: 'relative'}}><IconCalendar/></div>

      </div>

      {isOpen && (
        <div
          className={styles.calendar}
          role="dialog"
          aria-modal="true"
        >
          <div style={{display: 'flex', justifyContent: 'center', gap: '8px'}}>
          <SelectPicker
          selectPickerClassName={styles.select__picker}
          className={styles.input__month}
          optionsClassName={styles.options}
  onChange={(selectedMonthName) => {
    const monthIndex = months.indexOf(selectedMonthName);
    if (monthIndex !== -1) {
      setDisplayMonth(monthIndex);
    }
  }}
  value={months[displayMonth]}
  options={months}
/>

<SelectPicker
      selectPickerClassName={styles.select__picker}
          className={styles.input__year}
          optionsClassName={styles.options_year}
  onChange={(selectedYearhName) => {
    const yearIndex = years.indexOf(Number(selectedYearhName));
    if (yearIndex !== -1) {
      setDisplayYear(yearIndex);
    }
  }}
  value={years[displayYear]}
  options={years}
/>
          </div>

          <div
           className={styles.daysOfWeek}
          >
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div
  className={styles.dates}
>
  {Array.from({ length: firstDayIndex }).map((_, idx) => (
    <div key={'empty-' + idx} />
  ))}

  {Array.from({ length: daysInMonth }).map((_, idx) => {
    const dayNum = idx + 1;
    const isSelected = tempSelectedDay === dayNum;

    return (
      <div
        key={dayNum}
        onClick={() => handleSelectDate(dayNum)}
        className={styles.nums}
        style={{
          borderRadius: isSelected ? 40 : 0,
          backgroundColor: isSelected ? '#ABD27A' : 'transparent',
          userSelect: 'none'
        }}
        aria-pressed={isSelected}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelectDate(dayNum);
          }
        }}
      >
        {dayNum}
      </div>
    );
  })}
</div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onClick={handleCancel}
              className={styles.btn__revoke}
            >
              Отменить
            </Button>
            <Button
              className={styles.btn__choose}
              onClick={handleConfirm}
              disabled={tempSelectedDay === null}
            >
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;