import type { Meta, StoryObj } from '@storybook/react';
import ErrorPageContent from './errorPageContent';
import Error404Icon from '../../shared/assets/icons/error 404.svg?url';
import Error500Icon from '../../shared/assets/icons/error 500.svg?url';

const meta: Meta<typeof ErrorPageContent> = {
  title: 'Widgets/ErrorPageContent',
  component: ErrorPageContent,
  tags: ['autodocs'],
  args: {
    image: Error404Icon,
    alt: 'Ошибка 404',
    title: 'Страница не найдена',
    description:
      'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
    onReportClick: () => alert('Нажата кнопка Сообщить об ошибке'),
    onMainPageClick: () => alert('Нажата кнопка На главную'),
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPageContent>;

export const Error404: Story = {
  name: 'Ошибка 404',
};

export const Error500: Story = {
  name: 'Ошибка 500',
  args: {
    image: Error500Icon,
    title: 'На сервере произошла ошибка',
    description: 'Попробуйте позже или вернитесь на главную страницу',
  },
};
