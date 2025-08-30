import '../../styles/variables.scss'
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Components/Footer',
  component: Header,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Header />,
};
