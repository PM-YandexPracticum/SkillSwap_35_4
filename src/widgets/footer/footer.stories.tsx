import '../../styles/variables.scss';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
  title: 'Widgets/Footer',
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Footer />,
};
