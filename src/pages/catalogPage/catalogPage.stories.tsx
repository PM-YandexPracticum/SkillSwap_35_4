import type { Meta, StoryObj } from '@storybook/react';
import { CatalogPage } from './catalogPage';

const meta: Meta<typeof CatalogPage> = {
  title: 'Pages/CatalogPage',
  component: CatalogPage,
};

export default meta;
type Story = StoryObj<typeof CatalogPage>;

export const Default: Story = {
  args: {
    title: 'Популярное',
  },
};
