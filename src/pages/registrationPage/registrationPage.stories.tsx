import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationPage } from './registrationPage';

const meta: Meta<typeof RegistrationPage> = {
  title: 'Pages/RegistrationPage',
  component: RegistrationPage,
};

export default meta;
type Story = StoryObj<typeof RegistrationPage>;

export const Default: Story = {
  render: () => <RegistrationPage />,
};
