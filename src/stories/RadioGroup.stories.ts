import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroupDemo } from './RadioGroup';

const meta: Meta<typeof RadioGroupDemo> = {
  title: 'UI/RadioGroup',
  component: RadioGroupDemo,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroupDemo>;

export const GoalOptions: Story = {
  args: {
    title: 'Цель поиска',
    options: [
      { value: 'all', label: 'Всё' },
      { value: 'learn', label: 'Хочу научиться' },
      { value: 'teach', label: 'Могу научить' },
    ],
  },
};

export const GenderOptions: Story = {
  args: {
    title: 'Пол автора',
    options: [
      { value: 'any', label: 'Не имеет значения' },
      { value: 'male', label: 'Мужской' },
      { value: 'female', label: 'Женский' },
    ],
  },
};

export const WithDisabledOptions: Story = {
  args: {
    title: 'Радио-группа с отключенными опциями',
    options: [
      { value: 'active1', label: 'Активная опция 1' },
      { value: 'disabled', label: 'Отключенная опция', disabled: true },
      { value: 'active2', label: 'Активная опция 2' },
    ],
  },
};
