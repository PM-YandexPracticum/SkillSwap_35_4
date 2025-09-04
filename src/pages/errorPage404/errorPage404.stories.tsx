import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorPage404 } from './errorPage404';

const meta: Meta<typeof ErrorPage404> = {
  title: 'pages/ErrorPage404',
  component: ErrorPage404,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorPage404>;

export const Default: Story = {};
