import type { Meta, StoryObj } from '@storybook/react';
import { Skill } from './skill';
import {
  skillsConfig,
  type SkillType,
} from '../../constants/skills/skills.config';

const meta: Meta<typeof Skill> = {
  title: 'Shared/Skill',
  component: Skill,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(skillsConfig) as SkillType[],
    },
    variant: {
      control: 'radio',
      options: ['icon', 'label'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skill>;

// Плашка с текстом
export const Label: Story = {
  args: {
    type: 'Бизнес и карьера',
    variant: 'label',
    children: 'Бизнес',
  },
};

// Только иконка в кружке
export const IconOnly: Story = {
  args: {
    type: 'Бизнес и карьера',
    variant: 'icon',
  },
};

// Все типы в режиме label
export const AllLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(Object.keys(skillsConfig) as SkillType[]).map((type) => (
        <Skill key={type} type={type} variant="label">
          {type}
        </Skill>
      ))}
    </div>
  ),
};

// Все типы в режиме icon
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {(Object.keys(skillsConfig) as SkillType[]).map((type) => (
        <Skill key={type} type={type} variant="icon" />
      ))}
    </div>
  ),
};
