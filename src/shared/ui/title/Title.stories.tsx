import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta: Meta<typeof Title> = {
  title: 'Shared/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    as: {
      options: ['h1', 'h2', 'h3', 'h4'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'secondary', 'accent', 'error'],
      control: { type: 'radio' },
    },
    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
    },
    weight: {
      options: ['regular', 'medium', 'semibold'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Заголовок',
    as: 'h1',
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Игра на барабанах',
    weight: 'medium',
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Иван',
    weight: 'medium',
  },
};

export const ErrorTitle: Story = {
  args: {
    as: 'h2',
    children: 'Ошибка!',
    color: 'error',
  },
};

export const WithCustomWeight: Story = {
  args: {
    as: 'h3',
    children: 'Полужирный заголовок',
    weight: 'semibold',
  },
};
