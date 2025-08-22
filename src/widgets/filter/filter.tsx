import React from 'react';
import clsx from 'clsx';
import { RadioGroup } from '../../shared/ui/radiogroup';
import { Title } from '../../shared/ui/title/title';
import { NestedCheckbox } from '../../shared/ui/nestedCheckbox';
import { Checkbox } from '../../shared/ui/checkbox';
import styles from './Filter.module.scss';
import { CollapsibleList } from '../../shared/ui/collapsibleList/collapsibleList';

export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxItem {
  id: string;
  label: string;
  children?: CheckboxItem[];
}

export interface FilterProps {
  activityType: {
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  };

  skills: {
    selectedIds: string[];
    items: CheckboxItem[];
    onChange: (ids: string[]) => void;
  };

  authorGender: {
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  };

  cities: {
    selectedIds: string[];
    items: CheckboxItem[];
    onChange: (ids: string[]) => void;
  };

  className?: string;
}

export const Filter: React.FC<FilterProps> = ({
  activityType,
  skills,
  authorGender,
  cities,
  className,
}) => {
  const DropdownPlaceholder = ({ label }: { label: string }) => (
    <div className={styles.dropdownPlaceholder}>
      {label}
      <span className={styles.dropdownArrow}>▼</span>
    </div>
  );

  return (
    <div className={clsx(styles.filter, className)}>
      <div className={styles.filterSection}>
        <Title as="h3" className={styles.sectionTitle}>
          Фильтры
        </Title>

        <RadioGroup
          options={activityType.options}
          selectedValue={activityType.value}
          onChange={activityType.onChange}
          name="activity-type"
          className={styles.radioGroup}
        />
      </div>

      <div className={styles.filterSection}>
        <Title as="h3" className={styles.sectionTitle}>
          Навыки
        </Title>

        <div className={styles.nestedCheckboxGroup}>
          {skills.items.map((skill) => (
            <NestedCheckbox
              key={skill.id}
              item={skill}
              selectedIds={skills.selectedIds}
              onSelectionChange={skills.onChange}
              className={styles.nestedCheckboxItem}
            />
          ))}
        </div>

        <CollapsibleList
          mode="categories"
          items={['Дизайн', 'Программирование', 'Маркетинг', 'Аналитика']}
        ></CollapsibleList>
      </div>

      <div className={styles.filterSection}>
        <Title as="h3" className={styles.sectionTitle}>
          Пол автора
        </Title>

        <RadioGroup
          options={authorGender.options}
          selectedValue={authorGender.value}
          onChange={authorGender.onChange}
          name="author-gender"
          className={styles.radioGroup}
        />
      </div>

      <div className={styles.filterSection}>
        <Title as="h3" className={styles.sectionTitle}>
          Город
        </Title>

        <div className={styles.checkboxGroup}>
          {cities.items.map((city) => (
            <Checkbox
              key={city.id}
              label={city.label}
              checked={cities.selectedIds.includes(city.id)}
              onChange={(checked) => {
                const newCities = checked
                  ? [...cities.selectedIds, city.id]
                  : cities.selectedIds.filter((id) => id !== city.id);
                cities.onChange(newCities);
              }}
              className={styles.cityCheckbox}
            />
          ))}
        </div>
        <CollapsibleList
          mode="cities"
          items={['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск']}
        />
      </div>
    </div>
  );
};
