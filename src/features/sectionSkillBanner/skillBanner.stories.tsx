import type { Meta, StoryObj } from '@storybook/react';
import { SkillBanner } from './skillBanner';
import type { skillBannerProps } from './types';
import React from 'react';

const meta: Meta<typeof SkillBanner> = {
  title: 'Shared/SkillBanner',
  component: SkillBanner,
};

export default meta;
type Story = StoryObj<typeof SkillBanner>;

const mockSkillData: skillBannerProps = {
  skillCategory: 'Творчество и искусство',
  title: 'Игра на барабанах',
  description:
    'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
};

export const Default: Story = {
  render: (args) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [isShare, setIsShare] = React.useState(false);
    const [isMore, setIsMore] = React.useState(false);

    return (
      <SkillBanner
        {...args}
        isLiked={isLiked}
        isShare={isShare}
        isMore={isMore}
        onToggleLike={() => setIsLiked(!isLiked)}
        onToggleShare={() => setIsShare(!isShare)}
        onToggleMore={() => setIsMore(!isMore)}
      />
    );
  },
  args: mockSkillData,
};

export const Liked: Story = {
  args: {
    ...mockSkillData,
    isLiked: true,
    isShare: false,
    isMore: false,
  },
};

export const Shared: Story = {
  args: {
    ...mockSkillData,
    isLiked: false,
    isShare: true,
    isMore: false,
  },
};

export const Expanded: Story = {
  args: {
    ...mockSkillData,
    isLiked: false,
    isShare: false,
    isMore: true,
  },
};

export const AllActionsActive: Story = {
  args: {
    ...mockSkillData,
    isLiked: true,
    isShare: true,
    isMore: true,
  },
};

// Дополнительные моки для демонстрации разных категорий
const programmingSkill: skillBannerProps = {
  skillCategory: 'Бизнес и карьера',
  title: 'React разработка',
  description:
    'Опытный React-разработчик с 5+ годами опыта. Научу создавать современные веб-приложения, работать с хуками, контекстом и популярными библиотеками',
};

export const ProgrammingSkill: Story = {
  args: programmingSkill,
};

export const MultipleSkills: Story = {
  render: () => {
    const skills = [mockSkillData, programmingSkill];
    const [activeStates, setActiveStates] = React.useState(
      skills.map(() => ({ isLiked: false, isShare: false, isMore: false })),
    );

    const updateState = (
      index: number,
      key: 'isLiked' | 'isShare' | 'isMore',
    ) => {
      setActiveStates((prev) => {
        const newStates = [...prev];
        newStates[index] = {
          ...newStates[index],
          [key]: !newStates[index][key],
        };
        return newStates;
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {skills.map((skill, index) => (
          <SkillBanner
            key={index}
            {...skill}
            isLiked={activeStates[index].isLiked}
            isShare={activeStates[index].isShare}
            isMore={activeStates[index].isMore}
            onToggleLike={() => updateState(index, 'isLiked')}
            onToggleShare={() => updateState(index, 'isShare')}
            onToggleMore={() => updateState(index, 'isMore')}
          />
        ))}
      </div>
    );
  },
};
