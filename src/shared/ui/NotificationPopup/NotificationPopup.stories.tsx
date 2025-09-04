import type { Meta, StoryObj } from '@storybook/react';
import { NotificationPopup } from './notificationPopup';

const meta: Meta<typeof NotificationPopup> = {
  title: 'Shared/NotificationPopup',
  component: NotificationPopup,
  tags: ['autodocs'],
  args: {
    message: 'Олег предлагает вам обмен',
    onClose: () => alert('Нажали кнопку Крестик'),
  },
};

export default meta;
type Story = StoryObj<typeof NotificationPopup>;

export const Default: Story = {
  name: 'Уведомление без кнопки перехода',
  args: {
    message: 'Олег предлагает вам обмен',
  },
};

export const LongText: Story = {
  name: 'Уведомление с длинным текстом',
  args: {
    message:
      'Очень длинное уведомление, чтобы проверить как ведет себя компонент при переполнении текста. ',
  },
};

export const WithNavigate: Story = {
  name: 'Уведомление с кнопкой перехода',
  args: {
    message: 'Олег предлагает вам обмен',
    onNavigate: () => alert('Нажали кнопку Перейти'),
  },
};
