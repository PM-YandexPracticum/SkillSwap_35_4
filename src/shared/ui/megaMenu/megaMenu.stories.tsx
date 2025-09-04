import '../../../styles/variables.scss'
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MegaMenu } from './index';

const meta: Meta<typeof MegaMenu> = {
  title: 'shared/MegaMenu',
  component: MegaMenu,
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
