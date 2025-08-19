import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './skill.module.scss';
import {
  skillsConfig,
  type SkillType,
} from '../../constants/skills/skills.config';

interface SkillProps {
  type: SkillType;
  children?: ReactNode;
  variant?: 'icon' | 'label';
}

export const Skill: React.FC<SkillProps> = ({
  type,
  children,
  variant = 'label',
}) => {
  const meta = skillsConfig[type];
  const cssClass = meta?.cssClass ?? styles.default;

  return (
    <div
      className={clsx(
        styles.skill,
        cssClass,
        variant === 'icon' && styles.iconOnly,
        variant === 'label' && styles.labelVariant,
      )}
    >
      {variant === 'icon' ? (
        <img src={meta.icon} alt={type} width={16} height={16} />
      ) : (
        <span className={styles.content}>{children ?? type}</span>
      )}
    </div>
  );
};
