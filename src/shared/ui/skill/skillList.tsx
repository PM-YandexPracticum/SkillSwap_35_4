import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [canShowSecond, setCanShowSecond] = useState(true);

  useLayoutEffect(() => {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isCollapsed, skills]);

  const recalc = () => {
    if (!containerRef.current || skills.length < 2 || !isCollapsed) {
      if (!canShowSecond) setCanShowSecond(true);
      return;
    }

    const children = Array.from(containerRef.current.children) as HTMLElement[];
    const first = children[0];
    const second = children[1];
    if (!first || !second) {
      if (!canShowSecond) setCanShowSecond(true);
      return;
    }

    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();

    const isWrapped = secondRect.top - firstRect.top > 5;
    const nextValue = !isWrapped;

    if (nextValue !== canShowSecond) {
      setCanShowSecond(nextValue);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const observer = new ResizeObserver(() => {
      recalc();
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [skills, isCollapsed]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(recalc);
    return () => cancelAnimationFrame(id);
  }, [skills, isCollapsed]);

  const hiddenCount = !canShowSecond ? skills.length - 1 : 0;

  return (
    <div ref={containerRef} className={styles.skillList}>
      {isCollapsed ? (
        <>
          {skills.length > 0 && (
            <Skill
              type={getSkillType(getSkillName(skills[0]))}
              key={
                getSkillKey(skills[0]) ??
                (skills[0] as any).customSkillId ??
                JSON.stringify(skills[0])
              }
            >
              {getSkillName(skills[0])}
            </Skill>
          )}
          {canShowSecond &&
            skills.slice(1).map((skill) => (
              <Skill
                type={getSkillType(getSkillName(skill))}
                key={
                  getSkillKey(skill) ??
                  (skill as any).customSkillId ??
                  JSON.stringify(skill)
                }
              >
                {getSkillName(skill)}
              </Skill>
            ))}
          {!canShowSecond && hiddenCount > 0 && (
            <Skill
              type="Остальные категории"
              key="expand"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsCollapsed(false)}
            >
              <>
                <span className={styles.plus}>+</span>
                {hiddenCount}
              </>
            </Skill>
          )}
        </>
      ) : (
        skills.map((skill) => (
          <Skill
            type={getSkillType(getSkillName(skill))}
            key={
              getSkillKey(skill) ??
              (skill as any).customSkillId ??
              JSON.stringify(skill)
            }
          >
            {getSkillName(skill)}
          </Skill>
        ))
      )}
    </div>
  );
};
