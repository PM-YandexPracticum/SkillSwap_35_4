import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './iconButton';
import MoonIcon from '../../../assets/icons/themeType/moon.svg';
import SunIcon from '../../../assets/icons/themeType/sun.svg';
import { fn } from 'storybook/test';

const meta = {
  title: 'Shared/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'select',
      },
      options: ['moon', 'sun'],
      mapping: {
        moon: <MoonIcon />,
        sun: <SunIcon />,
      },
      description: 'Иконка для кнопки',
      table: {
        category: 'Content',
      },
    },

    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
      table: {
        category: 'Events',
      },
    },
  },

  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DarkTheme: Story = {
  args: {
    children: 'moon',
  },
  name: 'Тёмная тема',
};

export const LightTheme: Story = {
  args: {
    children: 'sun',
  },
  name: 'Светлая тема',
};
