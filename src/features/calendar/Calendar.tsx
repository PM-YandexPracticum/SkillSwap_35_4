import { useCallback, useMemo, useRef, useState } from 'react';
import type { BDayInputProps } from './types';
import styles from './BDayInput.module.scss';
import { Input } from '../../shared/ui/input';
import calendar from '../../shared/assets/icons/calendar.svg?url';
import chevronDown from '../../shared/assets/icons/chevronDown.svg?url';
import { Button } from '../../shared/ui/button';

export const BDayInput: React.FC<BDayInputProps> = ({
  value,
  onDateSelect,
  placeholder = 'дд.мм.гггг',
  className = '',
  label,
  error,
  errorMessage,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? value.getMonth() : new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    value ? value.getFullYear() : new Date().getFullYear(),
  );

  const months = useMemo(
    () => [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    [],
  );

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const years = useMemo(() => {
    const yearsList = [];
    for (let year = maxYear; year >= minYear; year--) {
      yearsList.push(year);
    }
    return yearsList;
  }, [minYear, maxYear]);

  const generateCalendar = useCallback((month: number, year: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarGenerate = [];
    let day = 1;

    for (let week = 0; week < 6; week++) {
      const weekDays = [];

      for (let weekday = 0; weekday < 7; weekday++)
        if (
          (week === 0 && weekday < (startDay === 0 ? 6 : startDay - 1)) ||
          day > daysInMonth
        ) {
          weekDays.push(null);
        } else {
          weekDays.push(day++);
        }
      calendarGenerate.push(weekDays);
    }
    return calendarGenerate;
  }, []);

  const handleDateSelect = useCallback(
    (day: number | null) => {
      if (day !== null) {
        const newDate = new Date(currentYear, currentMonth, day);
        setShowCalendar(false);
        onDateSelect?.(newDate);
        inputRef.current?.focus();
      }
    },
    [currentMonth, currentYear, onDateSelect],
  );

  const handleMonthChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentMonth(parseInt(event.target.value));
    },
    [],
  );

  const handleYearChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentYear(parseInt(event.target.value));
    },
    [],
  );

  const formatDate = useCallback((date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  const handleInputClick = useCallback(() => {
    setShowCalendar((prev) => !prev);
  }, []);

  const handleCalendarClose = useCallback(() => {
    setShowCalendar(false);
    inputRef.current?.focus();
  }, []);

  const calendarUI = generateCalendar(currentMonth, currentYear);

  return (
    <div className={`${styles.container} ${className}`}>
      <Input
        ref={inputRef}
        label={label}
        error={error}
        errorMessage={errorMessage}
        value={formatDate(value || null)} // <-- теперь берём из пропа
        placeholder={placeholder}
        readOnly
        onClick={handleInputClick}
        className={styles.Input}
        icon={
          <span className={styles.calendarIcon} onClick={handleInputClick}>
            <img src={calendar} alt="Календарь" />
          </span>
        }
        {...props}
      />

      {showCalendar && (
        <div className={styles.calendarPopup}>
          <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <div className={styles.dropdowns}>
                <select
                  className={styles.dropdown}
                  value={currentMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                  <img src={chevronDown} alt="Стрелочка вниз" />
                </select>
                <select
                  className={styles.dropdown}
                  value={currentYear}
                  onChange={handleYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                  <img src={chevronDown} alt="Стрелочка вниз" />
                </select>
              </div>
            </div>
            <div className={styles.calendarGrid}>
              {daysOfWeek.map((day) => (
                <div key={day} className={styles.weekDay}>
                  {day}
                </div>
              ))}
              {calendarUI.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`${styles.calendarDay} ${
                      day === null ? styles.empty : ''
                    } ${
                      value &&
                      day === value.getDate() &&
                      currentMonth === value.getMonth() &&
                      currentYear === value.getFullYear()
                        ? styles.selected
                        : ''
                    }`}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day}
                  </div>
                )),
              )}
            </div>
            <div className={styles.calendarFooter}>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCalendarClose}
                className={styles.footerButton}
              >
                Отменить
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCalendarClose}
                className={styles.footerButton}
              >
                Выбрать
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
