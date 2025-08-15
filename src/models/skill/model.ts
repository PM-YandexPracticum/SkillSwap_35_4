import { skillsTypes } from '../../shared/constants/skillsTypes/skillsTypes';

export type SkillType = keyof typeof skillsTypes;

export type SkillSubcategory<C extends SkillType> =
  (typeof skillsTypes)[C][number];

export interface BaseSkill<C extends SkillType = SkillType> {
  category: C;
  subcategory: SkillSubcategory<C>;
  subcategoryId: string;
}

export type Skill = {
  [C in SkillType]: BaseSkill<C>;
}[SkillType];

export type CustomSkill = {
  [C in SkillType]: BaseSkill<C> & {
    name: string;
    image: string[] | File[];
    description: string;
    customSkillId: string;
  };
}[SkillType];
