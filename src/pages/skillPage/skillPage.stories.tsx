import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SkillPage from './skillPage';

const meta: Meta<typeof SkillPage> = {
  title: 'Pages/SkillPage',
  component: SkillPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SkillPage>;

export const Default: Story = {
  args: {},
};

