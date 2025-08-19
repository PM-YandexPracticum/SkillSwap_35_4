import type { Meta, StoryObj } from '@storybook/react';
import { LikeButton } from './likeButton';

const meta: Meta<typeof LikeButton> = {
  title: 'Shared/LikeButton',
  component: LikeButton,
  args: {
    active: false,
  },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    active: false,
  },
};

export const Active: Story = {
  args: {
    active: true,
  },
};

export const WithClick: Story = {
  args: {
    active: false,
    onClick: () => alert('Clicked!'),
  },
};
