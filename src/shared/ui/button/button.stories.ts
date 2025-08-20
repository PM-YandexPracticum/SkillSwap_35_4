import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
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
    text: {
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
    text: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    text: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    text: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    text: 'Disabled Button',
    disabled: true,
  },
};

// Дополнительные stories для демонстрации всех вариантов
export const PrimarySmall: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    text: 'Primary Small',
  },
};

export const SecondaryLarge: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    text: 'Secondary Large',
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Disabled Secondary',
    disabled: true,
  },
};
