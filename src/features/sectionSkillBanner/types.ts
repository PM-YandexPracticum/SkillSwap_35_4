import { type SkillType } from '../../shared/constants/skills/skills.config';

export interface skillBannerProps {
  skillCategory: SkillType;
  title: string;
  description: string;
  isLiked?: boolean;
  isShare?: boolean;
  isMore?: boolean;
  onToggleLike?: () => void;
  onToggleShare?: () => void;
  onToggleMore?: () => void;
}
