import {
  skillsConfig,
  type SkillType,
} from '../../shared/constants/skills/skills.config';

export type SkillSubcategory<C extends SkillType> =
  (typeof skillsConfig)[C]['items'][number];

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
    images: string[] | File[];
    description: string;
    customSkillId: string;
  };
}[SkillType];
