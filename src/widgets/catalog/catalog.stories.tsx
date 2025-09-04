import '../..//styles/variables.scss';
import data from '../../api/mok.json';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Catalog } from './index';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Catalog> = {
  title: 'Widgets/Catalog',
  component: Catalog,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Catalog',
    moreBtn: true,
    moreBtnType: 'viewAll',
    data: data.users,
  },
};
export const WithSortButton: Story = {
  args: {
    title: 'Catalog with Sort Button',
    moreBtn: true,
    moreBtnType: 'sort',
    data: data.users,
  },
};
export const WithNoButton: Story = {
  args: {
    title: 'Catalog with no Button',
    moreBtn: false,
    data: data.users,
  },
};
