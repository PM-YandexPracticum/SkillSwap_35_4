import React from 'react';
import type { CardProps } from './types';
import { Skill } from '../skill/skill';
import { Button } from '../button/index';
import { LikeButton } from '../likeButton/likeButton';
import styles from './card.module.scss';
import {
  getSkillType,
  getSkillKey,
  getSkillName,
} from '../../utils/skillTypeHelper';
import { Title } from '../title/Title';

// заглушка для обмена
const useExchange = () => ({
  hasSentRequest: (id: string) => false,
});

export const Card: React.FC<CardProps> = ({
  id,
  avatarUrl,
  name,
  location,
  age,
  description,
  skillCanTeach,
  subcategoriesWantToLearn,
  isLiked,
  hasRequested,
  onToggleLike,
  onDetailsClick,
  showLike = true,
  showDetails = true,
  showDescription = false,
  variant = 'list',
}) => {
  const { hasSentRequest } = useExchange();
  const alreadyRequested = hasRequested || hasSentRequest(id);

  const learnSkill = subcategoriesWantToLearn.slice(0, 2);
  const moreSkills = subcategoriesWantToLearn.length - learnSkill.length;

  return (
    <div className={styles['card-container']}>
      <div className={styles['card-header']}>
        <img
          src={avatarUrl}
          alt={`Avatar ${name}`}
          className={styles['card-avatar']}
        />

        {showLike && (
          <div className={styles['card-like']}>
            <LikeButton active={isLiked} onClick={onToggleLike} />
          </div>
        )}

        <div className={styles['card-user-info']}>
          <Title as="h3" weight="medium" className={styles['card-username']}>
            {name}
          </Title>
          {variant === 'list' ? (
            <p className={styles['card-user-meta']}>
              {location}
              {age ? `, ${age}` : ''}
            </p>
          ) : (
            <p className={styles['card-user-meta']}>{location}</p>
          )}
        </div>
      </div>

      <div className={styles['card-body']}>
        {(showDescription || variant === 'profile') && description && (
          <p className={styles['card-description']}>{description}</p>
        )}

        <div className={styles['card-teach']}>
          <p className={styles['card-point']}>Может научить:</p>
          <div className={styles['card-skills']}>
            {skillCanTeach.map((skill) => (
              <Skill
                type={getSkillType(getSkillName(skill))}
                key={getSkillKey(skill)}
              >
                {getSkillName(skill)}
              </Skill>
            ))}
          </div>
        </div>

        <div className={styles['card-teach']}>
          <p className={styles['card-point']}>Хочет научиться:</p>
          <div className={styles['card-skills']}>
            {learnSkill.map((skill) => (
              <Skill
                type={getSkillType(getSkillName(skill))}
                key={getSkillKey(skill)}
              >
                {getSkillName(skill)}
              </Skill>
            ))}

            {subcategoriesWantToLearn.length > 2 && (
              <Skill type={'Остальные категории'}>{`+ ${moreSkills}`}</Skill>
            )}
          </div>
        </div>
      </div>

      {showDetails &&
        (alreadyRequested ? (
          <Button
            variant="secondary"
            onClick={onDetailsClick}
            className={styles['card-button']}
          >
            Обмен предложен
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onDetailsClick}
            className={styles['card-button']}
          >
            Подробнее
          </Button>
        ))}
    </div>
  );
};
