import {
  skillsConfig,
  type SkillType,
} from '../constants/skills/skills.config';
import { type UserSkill } from '../../models/user/model';

export const getSkillType = (skillName: string): SkillType => {
  for (const [type, meta] of Object.entries(skillsConfig)) {
    if (meta.items.includes(skillName)) {
      return type as SkillType;
    }
  }
  return 'Остальные категории';
};

export const getSkillName = (skill: UserSkill): string => {
  if ('name' in skill) return skill.name;
  if ('subcategory' in skill) return skill.subcategory;
  return '';
};

export const getSkillKey = (skill: UserSkill): string | number => {
  if ('id' in skill) return skill.id;
  if ('subcategoryId' in skill) return skill.subcategoryId;
  return Math.random();
};
