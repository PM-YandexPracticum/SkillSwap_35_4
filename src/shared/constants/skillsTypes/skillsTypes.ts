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
    icon: '/src/assets/icons/skillsTypes/briefcase.svg',
  },
  'Иностранные языки': {
    color: getCSSVariable('--color-skill-languages'),
    icon: '/src/assets/icons/skillsTypes/global.svg',
  },
  'Дом и уют': {
    color: getCSSVariable('--color-skill-home'),
    icon: '/src/assets/icons/skillsTypes/home.svg',
  },
  'Творчество и искусство': {
    color: getCSSVariable('--color-skill-creativity'),
    icon: '/src/assets/icons/skillsTypes/palette.svg',
  },
  'Образование и развитие': {
    color: getCSSVariable('--color-skill-education'),
    icon: '/src/assets/icons/skillsTypes/book.svg',
  },
  'Здоровье и лайфстайл': {
    color: getCSSVariable('--color-skill-health'),
    icon: '/src/assets/icons/skillsTypes/lifestyle.svg',
  },
};
