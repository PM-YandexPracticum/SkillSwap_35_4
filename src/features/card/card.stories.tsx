import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card';
import type { CardProps } from './types';
import data from '../../api/mok.json';
import { skillsConfig } from '../../shared/constants/skills/skills.config';
import type { CustomSkill } from '../../models/skill/model';
import React from 'react';

type SkillsConfig = typeof skillsConfig;
type SkillKey = keyof SkillsConfig;

const DEFAULT_CATEGORY = Object.keys(skillsConfig)[0] as SkillKey;
const DEFAULT_SUBCATEGORY = skillsConfig[DEFAULT_CATEGORY].items[0];

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

function toUserCardArgs(u: (typeof data.users)[number]): CardProps {
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

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const FirstFromMock: Story = {
  render: (args) => {
    const [liked, setLiked] = React.useState(false);

    return (
      <Card
        {...args}
        isLiked={liked}
        onToggleLike={() => setLiked((prev) => !prev)}
      />
    );
  },
  args: toUserCardArgs(data.users[0]),
};

export const AllFromMock: Story = {
  render: () => {
    const [likedUsers, setLikedUsers] = React.useState<Record<string, boolean>>(
      {},
    );

    const toggleLike = (id: string) => {
      setLikedUsers((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {data.users.map((u) => (
          <Card
            key={u.id}
            {...toUserCardArgs(u)}
            isLiked={likedUsers[u.id] ?? false}
            onToggleLike={() => toggleLike(String(u.id))}
          />
        ))}
      </div>
    );
  },
};
