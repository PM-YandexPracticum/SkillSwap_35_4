import '../../../styles/variables.scss'
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './index';

const meta: Meta<typeof SearchBar> = {
  title: 'Shared/SearchBar',
  component: SearchBar,
  argTypes: {
    onSearch: { action: 'searched' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    placeholder: 'Искать навык',
  },
};