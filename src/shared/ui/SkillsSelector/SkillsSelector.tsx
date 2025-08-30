import { useState } from 'react';
import SelectSkills from '../SelectSkills/SelectSkills';
import styles from './index.module.scss'
import { SKILL_TYPES, skillsConfig, type SkillType } from '../../constants/skills/skills.config';

type SkillsSelectorProps = {
    span1: string,
    span2: string
}

const SkillsSelector: React.FC<SkillsSelectorProps> = ({span1, span2}) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillType | ''>('');
  const [selectedSubSkill, setSelectedSubSkill] = useState<string | ''>('');

  const handleCategoryChange = (value: string) => {
    if (SKILL_TYPES.includes(value as SkillType)) {
      setSelectedCategory(value as SkillType);
      setSelectedSubSkill('');
    }
  };

  const handleSubSkillChange = (value: string) => {
    setSelectedSubSkill(value);
  };

  const subSkills =
    selectedCategory && skillsConfig[selectedCategory]
      ? skillsConfig[selectedCategory].items
      : [];

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <span className={styles.label}>{span1}</span>
        <SelectSkills
          value={selectedCategory}
          options={[...SKILL_TYPES]}
          onChange={handleCategoryChange}
          placeholder="Выберите категорию"
        />
      </div>

      <div>
        <span className={styles.label}>{span2}</span>
        <SelectSkills
          value={selectedSubSkill}
          options={subSkills}
          onChange={handleSubSkillChange}
          placeholder="Выберите подкатегорию"
        />
      </div>
    </>
  );
};

export default SkillsSelector;