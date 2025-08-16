import type { Meta, StoryObj } from '@storybook/react-vite';
import LogoUI from './LogoUI';

const meta: Meta<typeof LogoUI> = {
  title: 'Shared/Logo',
  component: LogoUI,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof LogoUI>;

export const Icon: Story = {
  args: {
    variant: 'icon',
    size: 48,
  },
};

export const Title: Story = {
  args: {
    variant: 'title',
    size: 24,
  },
};
