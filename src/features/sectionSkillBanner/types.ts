import { type SkillType } from '../../shared/constants/skills/skills.config';

export interface skillBannerProps {
  skillCategory: SkillType;
  title: string;
  description: string;
}
