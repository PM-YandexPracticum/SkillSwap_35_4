import type { Meta, StoryObj } from "@storybook/react-vite";
import { Profile } from "./profilePage";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../services/store";

const meta: Meta<typeof Profile> = {
  title: 'pages/ProfilePage',
  component: Profile,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
