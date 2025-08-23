import type { Meta, StoryObj } from "@storybook/react-vite";
import { Profile } from "./profilePage";

const meta: Meta<typeof Profile> = {
  title: 'pages/ProfilePage',
  component: Profile,
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
