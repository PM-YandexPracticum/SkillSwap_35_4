import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};
export const Unchecked: Story = {
  ...Template,
  args: {
    label: 'Невыбранный чекбокс',
    checked: true,
  },
};

export const Checked: Story = {
  ...Template,
  args: {
    label: 'Выбранный чекбокс',
    checked: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Отключенный невыбранный',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Отключенный выбранный',
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  ...Template,
  args: {
    label: '',
    checked: false,
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [values, setValues] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label="Опция 1"
          checked={values.option1}
          onChange={(checked) => setValues({ ...values, option1: checked })}
        />
        <Checkbox
          label="Опция 2"
          checked={values.option2}
          onChange={(checked) => setValues({ ...values, option2: checked })}
        />
        <Checkbox
          label="Опция 3"
          checked={values.option3}
          onChange={(checked) => setValues({ ...values, option3: checked })}
        />
      </div>
    );
  },
};
