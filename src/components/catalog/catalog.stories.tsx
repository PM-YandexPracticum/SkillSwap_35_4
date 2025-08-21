import '../..//styles/variables.scss';
import data from '../../api/mok.json';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Catalog } from './index';

const meta: Meta<typeof Catalog> = {
  title: 'Components/Catalog',
  component: Catalog,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Catalog',
    moreBtn: true,
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
