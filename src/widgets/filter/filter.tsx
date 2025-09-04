import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from '../../shared/ui/radiogroup';
import { Title } from '../../shared/ui/title/title';
import { NestedCheckbox } from '../../shared/ui/nestedCheckbox';
import { Checkbox } from '../../shared/ui/checkbox';
import styles from './Filter.module.scss';
import { CollapsibleList } from '../../shared/ui/collapsibleList/collapsibleList';
import ChevronDownIcon from '../../shared/assets/icons/chevronDown.svg';

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
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  const visibleSkills = showAllSkills ? skills.items : skills.items.slice(0, 4);

  const visibleCities = showAllCities ? cities.items : cities.items.slice(0, 4);

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
          {visibleSkills.map((skill) => (
            <NestedCheckbox
              key={skill.id}
              item={skill}
              selectedIds={skills.selectedIds}
              onSelectionChange={skills.onChange}
              className={styles.nestedCheckboxItem}
            />
          ))}
        </div>

        {skills.items.length > 4 && (
          <CollapsibleList
            onClick={() => setShowAllSkills(!showAllSkills)}
            text={showAllSkills ? 'Свернуть' : 'Все категории'}
            className={styles.showAllButton}
          />
        )}
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
          {visibleCities.map((city) => (
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

        {cities.items.length > 4 && (
          <CollapsibleList
            onClick={() => setShowAllCities(!showAllCities)}
            text={showAllCities ? 'Свернуть' : 'Все города'}
            className={styles.showAllButton}
          />
        )}
      </div>
    </div>
  );
};
