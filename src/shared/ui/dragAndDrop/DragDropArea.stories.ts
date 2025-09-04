import type { Meta, StoryObj } from '@storybook/react-vite';
import { DragDropArea } from './DragDropArea';

const mockOnFilesSelect = () => {};

const meta = {
  title: 'Shared/DragDropArea',
  component: DragDropArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxSize: {
      control: { type: 'number' },
      description: 'Максимальный размер файла в байтах',
    },
    accept: {
      control: { type: 'text' },
      description: 'Разрешенные типы файлов',
    },
    maxFiles: {
      control: { type: 'number' },
      description: 'Максимальное количество файлов',
    },
    className: {
      control: { type: 'text' },
      description: 'Дополнительные CSS классы',
    },
  },
  args: {
    onFilesSelect: mockOnFilesSelect,
  },
} satisfies Meta<typeof DragDropArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxSize: 2 * 1024 * 1024,
    accept: 'image/jpeg, image/png',
    maxFiles: 5,
  },
};
