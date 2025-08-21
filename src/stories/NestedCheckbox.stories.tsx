import type { Meta, StoryObj } from '@storybook/react';
import { NestedCheckbox } from '../shared/ui/nestedCheckbox';
import type { NestedCheckboxItem } from '../shared/ui/nestedCheckbox/types';
import { useState } from 'react';

const meta: Meta<typeof NestedCheckbox> = {
  title: 'UI/NestedCheckbox',
  component: NestedCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NestedCheckbox>;

const mockData: NestedCheckboxItem[] = [
  {
    id: 'creative',
    label: 'Творчество и искусство',
    children: [
      { id: 'drawing', label: 'Рисование и иллюстрации' },
      { id: 'photo', label: 'Фотография' },
      { id: 'video', label: 'Видеомонтаж' },
    ],
  },
  {
    id: 'languages',
    label: 'Иностранные языки',
    children: [
      { id: 'english', label: 'Английский' },
      { id: 'spanish', label: 'Испанский' },
      { id: 'french', label: 'Французский' },
    ],
  },
  {
    id: 'business',
    label: 'Бизнес и карьера',
    children: [],
  },
];

const Template: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div
        style={{
          width: '300px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
        }}
      >
        <NestedCheckbox
          {...args}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: '#F3F4F6',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#374151',
          }}
        >
          Выбрано: {selectedIds.length} элементов
          {selectedIds.length > 0 && (
            <div style={{ marginTop: '4px' }}>
              IDs: {selectedIds.join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    item: mockData[0],
  },
};

export const WithPartialSelection: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([
      'drawing',
      'photo',
    ]);

    return (
      <div
        style={{
          width: '300px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
        }}
      >
        <NestedCheckbox
          item={mockData[0]}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
          Частичный выбор: рисование и фотография
        </div>
      </div>
    );
  },
};

export const WithFullSelection: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([
      'creative',
      'drawing',
      'photo',
      'video',
    ]);

    return (
      <div
        style={{
          width: '300px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
        }}
      >
        <NestedCheckbox
          item={mockData[0]}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
          Полный выбор всей ветки
        </div>
      </div>
    );
  },
};

export const NoChildren: Story = {
  ...Template,
  args: {
    item: mockData[2],
  },
};

export const MultipleRootItems: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div
        style={{
          width: '320px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginBottom: '16px', color: '#374151' }}>Навыки</h3>
        {mockData.map((item) => (
          <NestedCheckbox
            key={item.id}
            item={item}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        ))}
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: '#F3F4F6',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#374151',
          }}
        >
          Выбрано: {selectedIds.length} элементов
        </div>
      </div>
    );
  },
};
