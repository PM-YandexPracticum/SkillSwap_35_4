import style from './catalog.module.scss';
import data from '../../api/mok.json';
import type { CardProps } from '../../features/card/types';
import type { CustomSkill } from '../../models/skill/model';
import { Card } from '../../features/card/card';
import { skillsConfig } from '../../shared/constants/skills/skills.config';
import { Button } from '../../shared/ui/button/button';
import chevronRight from '../../shared/assets/icons/chevron-right.svg?url';
import sort from '../../shared/assets/icons/sort.svg?url';

type cardType = (typeof data.users)[number];

type SkillsConfig = typeof skillsConfig;
type SkillKey = keyof SkillsConfig;

const DEFAULT_CATEGORY = Object.keys(skillsConfig)[0] as SkillKey;
const DEFAULT_SUBCATEGORY = skillsConfig[DEFAULT_CATEGORY].items[0];

type CatalogProps = {
  title: string;
  moreBtn: boolean;
  moreBtnType?: 'viewAll' | 'sort';
  data: cardType[];
};

export const Catalog: React.FC<CatalogProps> = ({
  title,
  moreBtn,
  moreBtnType,
  data,
}) => {
  function mapToCustomSkills(
    items: { id: number; name: string }[],
  ): CustomSkill[] {
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

  function toUserCardArgs(u: cardType[][number]): CardProps {
    return {
      id: String(u.id),
      login: u.login,
      age: u.age,
      gender: u.gender as 'Мужской' | 'Женский' | 'Не указан',
      email: `${u.login}@example.com`,
      avatarUrl: u.avatarUrl,
      name: u.name,
      location: u.location,
      birthday: '',
      description: u.description,
      skillCanTeach: mapToCustomSkills(u.skillCanTeach),
      subcategoriesWantToLearn: mapToCustomSkills(u.subcategoriesWantToLearn),
      isLiked: false,
      hasRequested: false,
      onToggleLike: () => alert(`toggle like: ${u.id}`),
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
        {data.map((cardData) => (
          <Card key={cardData.id} {...toUserCardArgs(cardData)} />
        ))}
      </div>
    </div>
  );
};
