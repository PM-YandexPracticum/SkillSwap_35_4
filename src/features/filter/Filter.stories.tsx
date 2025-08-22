import type { Meta, StoryObj } from '@storybook/react';
import { BusinessFilter } from './Filter';

const meta: Meta<typeof BusinessFilter> = {
  title: 'Features/BusinessFilter',
  component: BusinessFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BusinessFilter>;

export const Interactive: Story = {
  args: {
    onFiltersChange: (filters) => console.log('Фильтры:', filters),
  },
};
