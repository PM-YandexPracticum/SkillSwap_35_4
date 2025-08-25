import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleList } from './collapsibleList';

const meta: Meta<typeof CollapsibleList> = {
  title: 'Components/CollapsibleList',
  component: CollapsibleList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CollapsibleList>;

const icon = <span style={{ fontSize: '16px' }}>▼</span>;

export const Primary: Story = {
  args: {
    text: 'Все города',
    icon: icon,
  },
};
