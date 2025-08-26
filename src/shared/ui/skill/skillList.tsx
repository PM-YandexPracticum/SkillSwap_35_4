import React, { useEffect, useRef, useState } from 'react';
import { Skill } from './skill';
import {
  getSkillType,
  getSkillKey,
  getSkillName,
} from '../../utils/skillTypeHelper';
import styles from './skill.module.scss';
import type { UserSkill } from '../../../models/user/model';

interface SkillListProps {
  skills: UserSkill[];
}

export const SkillList: React.FC<SkillListProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canShowSecond, setCanShowSecond] = useState(true);

  useEffect(() => {
    if (!containerRef.current || skills.length < 2) return;

    const [first, second] = Array.from(
      containerRef.current.children,
    ) as HTMLElement[];

    if (!first || !second) return;

    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();

    if (secondRect.top > firstRect.top) {
      setCanShowSecond(false);
    } else {
      setCanShowSecond(true);
    }
  }, [skills]);

  const hiddenCount = !canShowSecond ? skills.length - 1 : 0;

  return (
    <div ref={containerRef} className={styles.skillList}>
      {skills.length > 0 && (
        <Skill
          type={getSkillType(getSkillName(skills[0]))}
          key={getSkillKey(skills[0])}
        >
          {getSkillName(skills[0])}
        </Skill>
      )}

      {canShowSecond &&
        skills.slice(1).map((skill) => (
          <Skill
            type={getSkillType(getSkillName(skill))}
            key={getSkillKey(skill)}
          >
            {getSkillName(skill)}
          </Skill>
        ))}

      {!canShowSecond && hiddenCount > 0 && (
        <Skill type="Остальные категории">
          <>
            <span className={styles.plus}>+</span>
            {hiddenCount}
          </>
        </Skill>
      )}
    </div>
  );
};
