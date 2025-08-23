import type { Meta, StoryObj } from "@storybook/react-vite";
import { Profile } from "./profilePage";

const meta: Meta<typeof Profile> = {
  title: 'widgets/ProfilePage',
  component: Profile,
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
