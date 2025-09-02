import type { Meta, StoryObj } from '@storybook/react';
import { CatalogPage } from './catalogPage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof CatalogPage> = {
  title: 'Pages/CatalogPage',
  component: CatalogPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CatalogPage>;

export const Default: Story = {
  args: {
    title: 'Популярное',
  },
};
