import type { FilterOption, CheckboxItem } from '../../shared/ui/filter';

export const ACTIVITY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Всё' },
  { value: 'want-to-learn', label: 'Хочу научиться' },
  { value: 'can-teach', label: 'Могу научить' },
];

export const GENDER_OPTIONS: FilterOption[] = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const CITIES_DATA: CheckboxItem[] = [
  { id: 'moscow', label: 'Москва' },
  { id: 'spb', label: 'Санкт-Петербург' },
  { id: 'novosibirsk', label: 'Новосибирск' },
  { id: 'ekaterinburg', label: 'Екатеринбург' },
  { id: 'kazan', label: 'Казань' },
];

export const SKILLS_DATA: CheckboxItem[] = [
  {
    id: 'business',
    label: 'Бизнес и карьера',
    children: [
      { id: 'business-management', label: 'Управление бизнесом' },
      { id: 'career-growth', label: 'Карьерный рост' },
      { id: 'entrepreneurship', label: 'Предпринимательство' },
    ],
  },
  {
    id: 'creativity',
    label: 'Творчество и искусство',
    children: [
      { id: 'art', label: 'Изобразительное искусство' },
      { id: 'music', label: 'Музыка' },
      { id: 'writing', label: 'Писательство' },
    ],
  },
  {
    id: 'languages',
    label: 'Иностранные языки',
    children: [
      { id: 'european-languages', label: 'Европейские языки' },
      { id: 'asian-languages', label: 'Азиатские языки' },
      { id: 'other-languages', label: 'Другие языки' },
    ],
  },
  {
    id: 'education',
    label: 'Образование и развитие',
    children: [
      { id: 'academic', label: 'Академические знания' },
      { id: 'personal-growth', label: 'Личностный рост' },
      { id: 'professional-skills', label: 'Профессиональные навыки' },
    ],
  },
  {
    id: 'health',
    label: 'Здоровье и лайфстайл',
    children: [
      { id: 'fitness', label: 'Фитнес и спорт' },
      { id: 'nutrition', label: 'Питание' },
      { id: 'wellness', label: 'Велнес' },
    ],
  },
  {
    id: 'home',
    label: 'Дом и уют',
    children: [
      { id: 'interior', label: 'Интерьер' },
      { id: 'gardening', label: 'Садоводство' },
      { id: 'diy', label: 'Сделай сам' },
    ],
  },
];
