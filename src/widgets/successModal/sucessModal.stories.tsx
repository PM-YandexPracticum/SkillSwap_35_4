import type { Meta, StoryObj } from "@storybook/react-vite";
import { SuccessModal } from "./successModal";
import '../../styles/variables.scss';

const meta: Meta<typeof SuccessModal> = {
  title: 'Widgets/SuccessModal',
  component: SuccessModal,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log('Modal closed'),
  },
};
