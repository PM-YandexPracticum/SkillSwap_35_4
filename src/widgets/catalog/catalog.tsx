import React, { useEffect, useState } from 'react';
import style from './catalog.module.scss';
import type { CardProps } from '../../features/card/types';
import type { CustomSkill } from '../../models/skill/model';
import { Card } from '../../features/card/card';
import { skillsConfig } from '../../shared/constants/skills/skills.config';
import { Button } from '../../shared/ui/button/button';
import chevronRight from '../../shared/assets/icons/chevronRight.svg?url';
import sort from '../../shared/assets/icons/sort.svg?url';

import { useSelector, useAppDispatch } from '../../services/store';
import { getUsers, sendOffer } from '../../services/usersSlice/usersSlice';
import type { User, SwapOffer, Subcategory } from '../../api/types';
import type { RootState } from '../../services/store';

type SkillsConfig = typeof skillsConfig;
type SkillKey = keyof SkillsConfig;

const DEFAULT_CATEGORY = Object.keys(skillsConfig)[0] as SkillKey;
const DEFAULT_SUBCATEGORY = skillsConfig[DEFAULT_CATEGORY].items[0];

type CatalogProps = {
  title: string;
  moreBtn: boolean;
  moreBtnType?: 'viewAll' | 'sort';
};

export const Catalog: React.FC<CatalogProps> = ({ title, moreBtn, moreBtnType }) => {
  const dispatch = useAppDispatch();
  const usersFromState = useSelector((state: RootState) => state.users.usersData);
  const offers = useSelector((state: RootState) => state.users.offers);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);

  const users = (usersFromState as unknown) as User[];

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    offers.forEach((offer: SwapOffer) => {
      map[String(offer.targetUserId)] = true;
    });
    setLikedMap(map);
  }, [offers]);

  function mapToCustomSkills(items: Subcategory[]): CustomSkill[] {
    return items.map((s, idx) => ({
      category: DEFAULT_CATEGORY,
      subcategory: DEFAULT_SUBCATEGORY,
      subcategoryId: String(s.id),
      name: s.name,
      images: [],
      description: '',
      customSkillId: `mock-${s.id}-${idx}`,
    }));
  }

  function toUserCardArgs(u: User): CardProps {
    const id = String(u.id);
    const isActive = !!likedMap[id];


    const avatarUrl = ''; 
    const description = '';


    const ageTimestamp = u.birthDate ? Number(new Date(u.birthDate).getTime()) : 0;

    return {
      id,
      login: u.email.split('@')[0],
      
      age: ageTimestamp as any,
      gender: (u.gender as 'Мужской' | 'Женский') ?? 'Не указан',
      email: u.email,
      avatarUrl,
      name: u.name,
      location: u.location,
      birthday: u.birthDate ? new Date(u.birthDate).toLocaleDateString() : '',
      description,
      skillCanTeach: mapToCustomSkills(u.skillCanTeach),
      subcategoriesWantToLearn: mapToCustomSkills(u.subcategoriesWantToLearn),

      isLiked: isActive,
      onToggleLike: () => {
        const newState = !likedMap[id];
        setLikedMap((prev) => ({ ...prev, [id]: newState }));

        if (newState && u.skillCanTeach.length && u.subcategoriesWantToLearn.length) {
          const offer: SwapOffer = {
            targetUserId: u.id,
            currentUserEmail: 'current@example.com', 
            skillToLearn: u.subcategoriesWantToLearn[0],
            skillToTeach: u.skillCanTeach[0],
          };
          dispatch(sendOffer(offer));
        }
      },

      hasRequested: isActive,
      onDetailsClick: () => alert(`details: ${u.id}`),
      showLike: true,
      showDetails: true,
      showDescription: false,
    };
  }

  return (
    <div className={style.catalog}>
      <div className={style.header}>
        <h2 className={style.title}>{title}</h2>
        {moreBtn &&
          (moreBtnType === 'viewAll' ? (
            <Button>
              {'Смотреть все'} <img src={chevronRight} alt="chevron right" />
            </Button>
          ) : moreBtnType === 'sort' ? (
            <Button>
              <img src={sort} alt="sort" /> {'Сначала новые'}
            </Button>
          ) : null)}
      </div>

      <div className={style.items}>
        {isLoading
          ? 'Загрузка...'
          : users.map((cardData: User) => (
              <Card key={cardData.id} {...toUserCardArgs(cardData)} />
            ))}
      </div>
    </div>
  );
};
