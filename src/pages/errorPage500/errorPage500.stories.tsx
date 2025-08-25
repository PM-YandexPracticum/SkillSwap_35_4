import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorPage500 } from './errorPage500';

const meta: Meta<typeof ErrorPage500> = {
  title: 'pages/ErrorPage500',
  component: ErrorPage500,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorPage500>;

export const Default: Story = {};
