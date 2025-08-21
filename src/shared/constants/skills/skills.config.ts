import { getCSSVariable } from '../../utils/getCSSVariable';
import styles from '../../ui/skill/skill.module.scss';

// список всех категорий авто-типизации
export const SKILL_TYPES = [
  'Бизнес и карьера',
  'Иностранные языки',
  'Дом и уют',
  'Творчество и искусство',
  'Образование и развитие',
  'Здоровье и лайфстайл',
  'Остальные категории',
] as const;

export type SkillType = (typeof SKILL_TYPES)[number];

export interface SkillMeta {
  cssClass: string;
  items: string[];
  color: string;
  icon: string;
}

export const skillsConfig: Record<SkillType, SkillMeta> = {
  'Бизнес и карьера': {
    cssClass: styles.business,
    items: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство',
    ],
    color: getCSSVariable('--color-skill-business'),
    icon: '/src/shared/assets/icons/briefcase.svg',
  },

  'Иностранные языки': {
    cssClass: styles.languages,
    items: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)',
    ],
    color: getCSSVariable('--color-skill-languages'),
    icon: '/src/shared/assets/icons/global.svg',
  },

  'Дом и уют': {
    cssClass: styles.home,
    items: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей',
    ],
    color: getCSSVariable('--color-skill-home'),
    icon: '/src/shared/assets/icons/home.svg',
  },

  'Творчество и искусство': {
    cssClass: styles.creativity,
    items: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY',
    ],
    color: getCSSVariable('--color-skill-creativity'),
    icon: '/src/shared/assets/icons/palette.svg',
  },

  'Образование и развитие': {
    cssClass: styles.development,
    items: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг',
    ],
    color: getCSSVariable('--color-skill-education'),
    icon: '/src/shared/assets/icons/book.svg',
  },

  'Здоровье и лайфстайл': {
    cssClass: styles.health,
    items: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы',
    ],
    color: getCSSVariable('--color-skill-health'),
    icon: '/src/shared/assets/icons/lifestyle.svg',
  },

  'Остальные категории': {
    cssClass: styles.extra,
    items: [],
    color: getCSSVariable('--color-skill-extra'),
    icon: '',
  },
};
