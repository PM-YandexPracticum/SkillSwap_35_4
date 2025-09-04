import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './header';
import React from 'react';
import UserIcon from '../../shared/assets/icons/userInfo.svg?url';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => {
    const [darkTheme, setDarkTheme] = React.useState(true);

    return (
      <Header
        {...args}
        darkTheme={darkTheme}
        onThemeToggle={() => setDarkTheme((prev) => !prev)}
      />
    );
  },
  args: {
    onLogoClick: () => alert('Лого кликнуто'),
    onAboutClick: () => alert('О проекте кликнуто'),
    onSearch: () => alert('Поиск выполнен'),
    onLogin: () => alert('Войти кликнуто'),
    onRegister: () => alert('Регистрация кликнута'),
  },
};

export const LoggedIn: Story = {
  render: (args) => {
    const [darkTheme, setDarkTheme] = React.useState(true);

    return (
      <Header
        {...args}
        darkTheme={darkTheme}
        onThemeToggle={() => setDarkTheme((prev) => !prev)}
      />
    );
  },
  args: {
    isLoggedIn: true,
    username: 'Иван Иванов',
    avatarUrl: UserIcon, // ← передаём иконку как аватар
    onLogoClick: () => alert('Лого кликнуто'),
    onAboutClick: () => alert('О проекте кликнуто'),
    onSearch: () => alert('Поиск выполнен'),
  },
};
