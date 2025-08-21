import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Вариант кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    children: {
      control: 'text',
      description: 'Текст кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние disabled',
    },
  },
  args: {
    onClick: () => console.log('Button clicked'),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

// Дополнительные stories для демонстрации всех вариантов
export const PrimarySmall: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Primary Small',
  },
};

export const SecondaryLarge: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    children: 'Secondary Large',
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Disabled Secondary',
    disabled: true,
  },
};
