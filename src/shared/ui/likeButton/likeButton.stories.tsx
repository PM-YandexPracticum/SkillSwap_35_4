import type { Meta, StoryObj } from '@storybook/react';
import { LikeButton } from './likeButton';
import React from 'react';

const meta: Meta<typeof LikeButton> = {
  title: 'Shared/Buttons/LikeButton',
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
  render: (args) => {
    const [active, setActive] = React.useState(false);
    return (
      <LikeButton
        {...args}
        active={active}
        onClick={() => setActive(!active)}
      />
    );
  },
};
