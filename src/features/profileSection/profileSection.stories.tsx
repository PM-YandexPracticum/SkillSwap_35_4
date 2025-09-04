import '../../styles/variables.scss';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileSection } from './index';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../services/store';

const meta: Meta<typeof ProfileSection> = {
  title: 'widgets/ProfileSection',
  component: ProfileSection,
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
export const Default: Story = {
  args: {
    email: 'user@example.com',
    name: 'John Doe',
    birthday: new Date('1990-01-01'),
    gender: 'Мужской',
    location: 'New York',
    description: 'Lorem ipsum dolor sit amet.',
    avatarUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
};
