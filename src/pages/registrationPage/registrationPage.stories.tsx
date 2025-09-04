import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationPage } from './registrationPage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof RegistrationPage> = {
  title: 'Pages/RegistrationPage',
  component: RegistrationPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegistrationPage>;

export const Default: Story = {
  render: () => <RegistrationPage />,
};
