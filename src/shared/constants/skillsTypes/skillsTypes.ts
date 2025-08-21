import { getCSSVariable } from '../../utils/getCSSVariable';

export const skillsTypes = {
  'Бизнес и карьера': [
    'Управление командой',
    'Маркетинг и реклама',
    'Продажи и переговоры',
    'Личный бренд',
    'Резюме и собеседование',
    'Тайм-менеджмент',
    'Проектное управление',
    'Предпринимательство',
  ],
  'Иностранные языки': [
    'Английский',
    'Французский',
    'Испанский',
    'Немецкий',
    'Китайский',
    'Японский',
    'Подготовка к экзаменам (IELTS, TOEFL)',
  ],
  'Дом и уют': [
    'Уборка и организация',
    'Домашние финансы',
    'Приготовление еды',
    'Домашние растения',
    'Ремонт',
    'Хранение вещей',
  ],
  'Творчество и искусство': [
    'Рисование и иллюстрация',
    'Фотография',
    'Видеомонтаж',
    'Музыка и звук',
    'Актёрское мастерство',
    'Креативное письмо',
    'Арт-терапия',
    'Декор и DIY',
  ],
  'Образование и развитие': [
    'Личностное развитие',
    'Навыки обучения',
    'Когнитивные техники',
    'Скорочтение',
    'Навыки преподавания',
    'Коучинг',
  ],
  'Здоровье и лайфстайл': [
    'Йога и медитация',
    'Питание и ЗОЖ',
    'Ментальное здоровье',
    'Осознанность',
    'Физические тренировки',
    'Сон и восстановление',
    'Баланс жизни и работы',
  ],
};

export const skillsMap: Record<
  keyof typeof skillsTypes,
  { color: string; icon: string }
> = {
  'Бизнес и карьера': {
    color: getCSSVariable('--color-skill-business'),
    icon: '/src/shared/assets/icons/briefcase.svg',
  },
  'Иностранные языки': {
    color: getCSSVariable('--color-skill-languages'),
    icon: '/src/shared/assets/icons/global.svg',
  },
  'Дом и уют': {
    color: getCSSVariable('--color-skill-home'),
    icon: '/src/shared/assets/icons/home.svg',
  },
  'Творчество и искусство': {
    color: getCSSVariable('--color-skill-creativity'),
    icon: '/src/shared/assets/icons/palette.svg',
  },
  'Образование и развитие': {
    color: getCSSVariable('--color-skill-education'),
    icon: '/src/shared/assets/icons/book.svg',
  },
  'Здоровье и лайфстайл': {
    color: getCSSVariable('--color-skill-health'),
    icon: '/src/shared/assets/icons/lifestyle.svg',
  },
};
