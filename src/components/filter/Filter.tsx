import React, { useState } from 'react';
import { Filter } from '../../features/filter';
import {
  ACTIVITY_OPTIONS,
  GENDER_OPTIONS,
  CITIES_DATA,
  SKILLS_DATA,
} from './data';

interface BusinessFilterProps {
  onFiltersChange: (filters: {
    activityType: string;
    skills: string[];
    authorGender: string;
    cities: string[];
  }) => void;
  className?: string;
}

export const BusinessFilter: React.FC<BusinessFilterProps> = ({
  onFiltersChange,
  className,
}) => {
  const [activityType, setActivityType] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [authorGender, setAuthorGender] = useState('any');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value);
    notifyFiltersChange({
      activityType: value,
      skills: selectedSkills,
      authorGender,
      cities: selectedCities,
    });
  };

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
    notifyFiltersChange({
      activityType,
      skills,
      authorGender,
      cities: selectedCities,
    });
  };

  const handleAuthorGenderChange = (value: string) => {
    setAuthorGender(value);
    notifyFiltersChange({
      activityType,
      skills: selectedSkills,
      authorGender: value,
      cities: selectedCities,
    });
  };

  const handleCitiesChange = (cities: string[]) => {
    setSelectedCities(cities);
    notifyFiltersChange({
      activityType,
      skills: selectedSkills,
      authorGender,
      cities,
    });
  };

  const notifyFiltersChange = (filters: {
    activityType: string;
    skills: string[];
    authorGender: string;
    cities: string[];
  }) => {
    onFiltersChange(filters);
  };

  return (
    <Filter
      activityType={{
        value: activityType,
        options: ACTIVITY_OPTIONS,
        onChange: handleActivityTypeChange,
      }}
      skills={{
        selectedIds: selectedSkills,
        items: SKILLS_DATA,
        onChange: handleSkillsChange,
      }}
      authorGender={{
        value: authorGender,
        options: GENDER_OPTIONS,
        onChange: handleAuthorGenderChange,
      }}
      cities={{
        selectedIds: selectedCities,
        items: CITIES_DATA,
        onChange: handleCitiesChange,
      }}
      className={className}
    />
  );
};
