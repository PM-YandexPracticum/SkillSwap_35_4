import type { Meta, StoryObj } from '@storybook/react';
import { BlockSimilarOffers } from './blockSimilarOffers';
import type { CardProps } from '../card/types';
import type { UserSkill } from '../../models/user/model';

const meta: Meta<typeof BlockSimilarOffers> = {
  title: 'Features/BlockSimilarOffers',
  component: BlockSimilarOffers,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlockSimilarOffers>;

const createMockSkill = (name: string): UserSkill => {
  return {
    id: Math.random().toString(),
    name,
    category: 'Бизнес и карьера',
    subcategoryId: Math.random().toString(),
  } as unknown as UserSkill;
};

// Моковые данные для карточек
const mockCards: CardProps[] = [
  {
    id: '1',
    avatarUrl: 'https://via.placeholder.com/60x60',
    name: 'Иван Иванов',
    location: 'Москва',
    age: 28,
    description: 'Опытный разработчик с 5+ годами опыта в веб-разработке',
    skillCanTeach: [
      createMockSkill('JavaScript'),
      createMockSkill('React'),
      createMockSkill('TypeScript'),
    ],
    subcategoriesWantToLearn: [
      createMockSkill('UI/UX дизайн'),
      createMockSkill('Node.js'),
    ],
    isLiked: false,
    hasRequested: false,
    onToggleLike: () => console.log('Toggle like'),
    onDetailsClick: () => console.log('Details clicked'),
    showLike: true,
    showDetails: true,
    variant: 'list',
    login: '',
    gender: 'Не указан',
    birthday: '',
    email: '',
  },
  {
    id: '2',
    avatarUrl: 'https://via.placeholder.com/60x60',
    name: 'Мария Петрова',
    location: 'Санкт-Петербург',
    age: 25,
    description: 'Фронтенд разработчик, специализируюсь на Vue.js',
    skillCanTeach: [
      createMockSkill('Vue.js'),
      createMockSkill('CSS'),
      createMockSkill('HTML'),
    ],
    subcategoriesWantToLearn: [
      createMockSkill('React'),
      createMockSkill('Angular'),
    ],
    isLiked: true,
    hasRequested: true,
    onToggleLike: () => console.log('Toggle like'),
    onDetailsClick: () => console.log('Details clicked'),
    showLike: true,
    showDetails: true,
    variant: 'list',
    login: '',
    gender: 'Не указан',
    birthday: '',
    email: '',
  },
  {
    id: '3',
    avatarUrl: 'https://via.placeholder.com/60x60',
    name: 'Алексей Смирнов',
    location: 'Казань',
    age: 32,
    description: 'Бэкенд разработчик с опытом работы с Python и Django',
    skillCanTeach: [
      createMockSkill('Python'),
      createMockSkill('Django'),
      createMockSkill('PostgreSQL'),
    ],
    subcategoriesWantToLearn: [
      createMockSkill('Docker'),
      createMockSkill('Kubernetes'),
    ],
    isLiked: false,
    hasRequested: false,
    onToggleLike: () => console.log('Toggle like'),
    onDetailsClick: () => console.log('Details clicked'),
    showLike: true,
    showDetails: true,
    variant: 'list',
    login: '',
    gender: 'Не указан',
    birthday: '',
    email: '',
  },
  {
    id: '4',
    avatarUrl: 'https://via.placeholder.com/60x60',
    name: 'Екатерина Волкова',
    location: 'Новосибирск',
    age: 29,
    description: 'Full-stack разработчик, люблю создавать сложные приложения',
    skillCanTeach: [
      createMockSkill('React'),
      createMockSkill('Node.js'),
      createMockSkill('MongoDB'),
    ],
    subcategoriesWantToLearn: [
      createMockSkill('Machine Learning'),
      createMockSkill('Data Science'),
    ],
    isLiked: false,
    hasRequested: true,
    onToggleLike: () => console.log('Toggle like'),
    onDetailsClick: () => console.log('Details clicked'),
    showLike: true,
    showDetails: true,
    variant: 'list',
    login: '',
    gender: 'Не указан',
    birthday: '',
    email: '',
  },
  {
    id: '5',
    avatarUrl: 'https://via.placeholder.com/60x60',
    name: 'Дмитрий Козлов',
    location: 'Екатеринбург',
    age: 31,
    description: 'Mobile разработчик с опытом в iOS и Android',
    skillCanTeach: [
      createMockSkill('Swift'),
      createMockSkill('Kotlin'),
      createMockSkill('Flutter'),
    ],
    subcategoriesWantToLearn: [
      createMockSkill('React Native'),
      createMockSkill('Firebase'),
    ],
    isLiked: true,
    hasRequested: false,
    onToggleLike: () => console.log('Toggle like'),
    onDetailsClick: () => console.log('Details clicked'),
    showLike: true,
    showDetails: true,
    variant: 'list',
    login: '',
    gender: 'Не указан',
    birthday: '',
    email: '',
  },
];

export const Default: Story = {
  args: {
    cards: mockCards,
  },
};

export const ManyCards: Story = {
  args: {
    cards: [
      ...mockCards,
      ...mockCards.map((card, index) => ({
        ...card,
        id: `${Number(card.id) + 5 + index}`,
        name: `${card.name} ${index + 1}`,
      })),
    ],
  },
};

export const SingleCard: Story = {
  args: {
    cards: [mockCards[0]],
  },
};
